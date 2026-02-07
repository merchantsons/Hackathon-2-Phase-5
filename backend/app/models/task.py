from sqlmodel import SQLModel, Field, Column
from sqlalchemy import DateTime, func
from sqlalchemy.dialects.postgresql import JSONB
from datetime import datetime
from typing import Optional, List

class Task(SQLModel, table=True):
    __tablename__ = "tasks"

    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="users.id", nullable=False, index=True)
    title: str = Field(max_length=255, nullable=False)
    description: Optional[str] = Field(default=None)
    priority: str = Field(default="medium", nullable=False)  # low, medium, high
    status: str = Field(default="pending", nullable=False)  # pending, completed
    due_date: Optional[datetime] = Field(default=None)
    tags: Optional[List[str]] = Field(default=None, sa_column=Column(JSONB, nullable=True))  # user-defined labels
    recurrence_rule: Optional[str] = Field(default=None)  # daily | weekly | monthly
    parent_task_id: Optional[int] = Field(default=None)  # for recurring chain
    reminder_minutes_before: Optional[int] = Field(default=None)  # deprecated: use reminder_at
    reminder_at: Optional[datetime] = Field(default=None)  # date and time to remind
    created_at: Optional[datetime] = Field(default=None, sa_column=Column(DateTime, server_default=func.now()))
    updated_at: Optional[datetime] = Field(default=None, sa_column=Column(DateTime, server_default=func.now(), onupdate=func.now()))
