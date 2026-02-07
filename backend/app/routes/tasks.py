from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session, select
from sqlalchemy import or_, and_
from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List
import sys
import os
import json
import logging
from app.models import Task
from app.dependencies.auth import get_current_user_id
from app.dependencies.database import get_db_session

router = APIRouter()
logger = logging.getLogger(__name__)

# Pydantic models for request/response (Phase V: tags, recurrence, reminder)
class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    priority: str = "medium"  # low, medium, high
    due_date: Optional[str] = None  # ISO format string
    tags: Optional[List[str]] = None
    recurrence_rule: Optional[str] = None  # daily | weekly | monthly
    reminder_minutes_before: Optional[int] = None  # deprecated
    reminder_at: Optional[str] = None  # ISO format date and time

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    priority: Optional[str] = None
    status: Optional[str] = None  # pending, completed
    due_date: Optional[str] = None
    tags: Optional[List[str]] = None
    recurrence_rule: Optional[str] = None
    reminder_minutes_before: Optional[int] = None  # deprecated
    reminder_at: Optional[str] = None  # ISO format date and time

def _task_to_event_data(task: Task) -> dict:
    return {
        "id": task.id,
        "title": task.title,
        "description": task.description,
        "priority": task.priority,
        "status": task.status,
        "due_date": task.due_date.isoformat() if task.due_date else None,
        "tags": task.tags or [],
        "recurrence_rule": task.recurrence_rule,
        "reminder_minutes_before": task.reminder_minutes_before,
        "reminder_at": task.reminder_at.isoformat() if task.reminder_at else None,
    }


def _publish_task_event(event_type: str, task_id: int, user_id: int, task_data: dict) -> None:
    """Publish task lifecycle event via Dapr Pub/Sub (no direct Kafka). Idempotent if Dapr unavailable."""
    dapr_port = os.environ.get("DAPR_HTTP_PORT")
    if not dapr_port:
        logger.debug("DAPR_HTTP_PORT not set; skipping event publish")
        return
    payload = {
        "event_type": event_type,
        "task_id": task_id,
        "user_id": str(user_id),
        "task_data": task_data,
        "timestamp": datetime.utcnow().isoformat() + "Z",
    }
    try:
        import urllib.request
        req = urllib.request.Request(
            f"http://127.0.0.1:{dapr_port}/v1.0/publish/task-events/task-lifecycle",
            data=json.dumps(payload).encode("utf-8"),
            headers={"Content-Type": "application/json"},
            method="POST",
        )
        with urllib.request.urlopen(req, timeout=2) as _:
            pass
        logger.info("Published task event %s for task_id=%s", event_type, task_id)
    except Exception as e:
        logger.warning("Failed to publish task event (non-fatal): %s", e)


@router.get("/api/tasks")
async def list_tasks(
    authenticated_user_id: int = Depends(get_current_user_id),
    session: Session = Depends(get_db_session),
    search: Optional[str] = Query(None),
    sort_by: Optional[str] = Query("created_at"),
    sort_order: Optional[str] = Query("desc"),
    status: Optional[str] = Query(None),
    priority: Optional[str] = Query(None),
    tag: Optional[str] = Query(None),
):
    """List tasks for the authenticated user with composable filters and sorting."""
    statement = select(Task).where(Task.user_id == authenticated_user_id)

    if search and search.strip():
        q = f"%{search.strip()}%"
        statement = statement.where(
            or_(Task.title.ilike(q), and_(Task.description.is_not(None), Task.description.ilike(q)))
        )
    if status and status.strip():
        statement = statement.where(Task.status == status.strip())
    if priority and priority.strip():
        statement = statement.where(Task.priority == priority.strip())
    if sort_by in ("due_date", "priority", "created_at", "title"):
        order_col = getattr(Task, sort_by)
        if sort_order == "asc":
            statement = statement.order_by(order_col.asc())
        else:
            statement = statement.order_by(order_col.desc())
    else:
        statement = statement.order_by(Task.created_at.desc())

    tasks = list(session.exec(statement).all())
    if tag and tag.strip():
        tag_val = tag.strip()
        tasks = [t for t in tasks if t.tags and tag_val in t.tags]
    return tasks

@router.post("/api/tasks", status_code=201)
async def create_task(
    task_data: TaskCreate,
    authenticated_user_id: int = Depends(get_current_user_id),
    session: Session = Depends(get_db_session)
):
    """Create a new task"""
    # Validate priority
    if task_data.priority not in ["low", "medium", "high"]:
        raise HTTPException(status_code=400, detail="Priority must be 'low', 'medium', or 'high'")

    # Parse due_date if provided
    due_date_obj = None
    if task_data.due_date:
        try:
            due_date_obj = datetime.fromisoformat(task_data.due_date.replace('Z', '+00:00'))
        except ValueError:
            raise HTTPException(status_code=400, detail="Invalid due_date format. Use ISO format.")

    if task_data.recurrence_rule and task_data.recurrence_rule not in ("daily", "weekly", "monthly"):
        raise HTTPException(status_code=400, detail="recurrence_rule must be 'daily', 'weekly', or 'monthly'")

    reminder_at_obj = None
    if task_data.reminder_at:
        try:
            reminder_at_obj = datetime.fromisoformat(task_data.reminder_at.replace('Z', '+00:00'))
        except ValueError:
            raise HTTPException(status_code=400, detail="Invalid reminder_at format. Use ISO date and time.")

    task = Task(
        user_id=authenticated_user_id,
        title=task_data.title,
        description=task_data.description,
        priority=task_data.priority or "medium",
        status="pending",
        due_date=due_date_obj,
        tags=task_data.tags or [],
        recurrence_rule=task_data.recurrence_rule,
        reminder_minutes_before=task_data.reminder_minutes_before,
        reminder_at=reminder_at_obj,
    )

    try:
        session.add(task)
        session.commit()
        session.refresh(task)
        print(f"✅ Task created successfully: {task.id} - {task.title}", file=sys.stderr, flush=True)
        _publish_task_event("created", task.id, authenticated_user_id, _task_to_event_data(task))
        return task
    except Exception as e:
        session.rollback()
        print(f"❌ Failed to create task: {e}", file=sys.stderr, flush=True)
        import traceback
        traceback.print_exc(file=sys.stderr)
        # Get more detailed error information
        error_detail = str(e)
        if hasattr(e, 'orig'):
            error_detail = f"{error_detail} (Original: {e.orig})"
        raise HTTPException(status_code=500, detail=f"Failed to create task: {error_detail}")

@router.get("/api/tasks/{task_id}")
async def get_task(
    task_id: int,
    authenticated_user_id: int = Depends(get_current_user_id),
    session: Session = Depends(get_db_session)
):
    """Get a single task by ID"""
    statement = select(Task).where(
        Task.id == task_id,
        Task.user_id == authenticated_user_id
    )
    task = session.exec(statement).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    return task

@router.put("/api/tasks/{task_id}")
async def update_task(
    task_id: int,
    task_data: TaskUpdate,
    authenticated_user_id: int = Depends(get_current_user_id),
    session: Session = Depends(get_db_session)
):
    """Update an existing task"""
    try:
        statement = select(Task).where(
            Task.id == task_id,
            Task.user_id == authenticated_user_id
        )
        task = session.exec(statement).first()

        if not task:
            raise HTTPException(status_code=404, detail="Task not found")

        # Update fields if provided
        if task_data.title is not None:
            task.title = task_data.title
        if task_data.description is not None:
            task.description = task_data.description
        if task_data.priority is not None:
            if task_data.priority not in ["low", "medium", "high"]:
                raise HTTPException(status_code=400, detail="Priority must be 'low', 'medium', or 'high'")
            task.priority = task_data.priority
        if task_data.status is not None:
            if task_data.status not in ["pending", "completed"]:
                raise HTTPException(status_code=400, detail="Status must be 'pending' or 'completed'")
            task.status = task_data.status
        if task_data.due_date is not None:
            if task_data.due_date == "":
                task.due_date = None
            else:
                try:
                    task.due_date = datetime.fromisoformat(task_data.due_date.replace('Z', '+00:00'))
                except ValueError:
                    raise HTTPException(status_code=400, detail="Invalid due_date format. Use ISO format.")
        if task_data.tags is not None:
            task.tags = task_data.tags
        if task_data.recurrence_rule is not None:
            if task_data.recurrence_rule and task_data.recurrence_rule not in ("daily", "weekly", "monthly"):
                raise HTTPException(status_code=400, detail="recurrence_rule must be 'daily', 'weekly', or 'monthly'")
            task.recurrence_rule = task_data.recurrence_rule
        if task_data.reminder_minutes_before is not None:
            task.reminder_minutes_before = task_data.reminder_minutes_before
        if task_data.reminder_at is not None:
            if task_data.reminder_at == "":
                task.reminder_at = None
            else:
                try:
                    task.reminder_at = datetime.fromisoformat(task_data.reminder_at.replace('Z', '+00:00'))
                except ValueError:
                    raise HTTPException(status_code=400, detail="Invalid reminder_at format. Use ISO date and time.")

        task.updated_at = datetime.utcnow()

        session.add(task)
        session.commit()
        session.refresh(task)
        print(f"✅ Task updated successfully: {task.id} - {task.title}", file=sys.stderr, flush=True)
        _publish_task_event("updated", task.id, authenticated_user_id, _task_to_event_data(task))
        return task
    except HTTPException:
        raise
    except Exception as e:
        session.rollback()
        print(f"❌ Failed to update task: {e}", file=sys.stderr, flush=True)
        import traceback
        traceback.print_exc(file=sys.stderr)
        raise HTTPException(status_code=500, detail=f"Failed to update task: {str(e)}")

@router.delete("/api/tasks/{task_id}", status_code=204)
async def delete_task(
    task_id: int,
    authenticated_user_id: int = Depends(get_current_user_id),
    session: Session = Depends(get_db_session)
):
    """Delete a task"""
    try:
        statement = select(Task).where(
            Task.id == task_id,
            Task.user_id == authenticated_user_id
        )
        task = session.exec(statement).first()

        if not task:
            raise HTTPException(status_code=404, detail="Task not found")

        task_title = task.title
        event_data = _task_to_event_data(task)
        session.delete(task)
        session.commit()
        print(f"✅ Task deleted successfully: {task_id} - {task_title}", file=sys.stderr, flush=True)
        _publish_task_event("deleted", task_id, authenticated_user_id, event_data)
        return None
    except HTTPException:
        raise
    except Exception as e:
        session.rollback()
        print(f"❌ Failed to delete task: {e}", file=sys.stderr, flush=True)
        import traceback
        traceback.print_exc(file=sys.stderr)
        raise HTTPException(status_code=500, detail=f"Failed to delete task: {str(e)}")

@router.patch("/api/tasks/{task_id}/complete")
async def complete_task(
    task_id: int,
    authenticated_user_id: int = Depends(get_current_user_id),
    session: Session = Depends(get_db_session)
):
    """Mark a task as completed"""
    try:
        statement = select(Task).where(
            Task.id == task_id,
            Task.user_id == authenticated_user_id
        )
        task = session.exec(statement).first()

        if not task:
            raise HTTPException(status_code=404, detail="Task not found")

        task.status = "completed"
        task.updated_at = datetime.utcnow()

        session.add(task)
        session.commit()
        session.refresh(task)
        print(f"✅ Task completed successfully: {task.id} - {task.title}", file=sys.stderr, flush=True)
        _publish_task_event("completed", task.id, authenticated_user_id, _task_to_event_data(task))
        return task
    except HTTPException:
        raise
    except Exception as e:
        session.rollback()
        print(f"❌ Error completing task {task_id}: {str(e)}", file=sys.stderr, flush=True)
        raise HTTPException(status_code=500, detail=f"Failed to complete task: {str(e)}")
