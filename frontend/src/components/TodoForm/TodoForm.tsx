import React, { useState, useEffect } from 'react';
import { useTodos } from '../../hooks/useTodos';
import { useToast } from '../../context/ToastContext';
import { Todo, Priority, RecurrenceRule } from '../../types/todo';
import styles from './TodoForm.module.css';

/** API returns UTC datetimes often without "Z"; parse as UTC so local display is correct. */
function parseUtc(isoString: string): Date {
  const s = isoString.trim();
  if (!/Z|[+-]\d{2}:?\d{2}$/.test(s)) {
    return new Date(s + (s.includes('T') ? 'Z' : ''));
  }
  return new Date(s);
}

/** Convert ISO date string (UTC) to datetime-local value (YYYY-MM-DDTHH:mm) in system local time. */
function isoToDatetimeLocal(isoString: string): string {
  const d = parseUtc(isoString);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const h = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');
  return `${y}-${m}-${day}T${h}:${min}`;
}

interface TodoFormProps {
  todo?: Todo;
  onCancel?: () => void;
  onSubmit?: () => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({ todo, onCancel, onSubmit }) => {
  const { addTodo, updateTodo } = useTodos();
  const { showToast } = useToast();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [tagsInput, setTagsInput] = useState('');
  const [recurrenceRule, setRecurrenceRule] = useState<RecurrenceRule | ''>('');
  const [reminderAt, setReminderAt] = useState('');  // datetime-local: YYYY-MM-DDTHH:mm
  const [errors, setErrors] = useState<{ title?: string }>({});

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description || '');
      setDueDate(todo.dueDate || '');
      setPriority(todo.priority);
      setTagsInput((Array.isArray(todo.tags) ? todo.tags : []).join(', '));
      setRecurrenceRule((todo.recurrenceRule as RecurrenceRule) || '');
      setReminderAt(todo.reminderAt ? isoToDatetimeLocal(todo.reminderAt) : '');
    }
  }, [todo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!title.trim()) {
      setErrors({ title: 'Title is required' });
      return;
    }

    setErrors({});

    try {
      const tagList = tagsInput.trim() ? tagsInput.split(',').map(t => t.trim()).filter(Boolean) : [];
      const recurrence = recurrenceRule === '' ? undefined : recurrenceRule;
      const reminder = reminderAt.trim() ? new Date(reminderAt).toISOString() : undefined;

      if (todo) {
        await updateTodo(todo.id, {
          title: title.trim(),
          description: description.trim() || undefined,
          dueDate: dueDate || undefined,
          priority,
          tags: tagList.length ? tagList : undefined,
          recurrenceRule: recurrence,
          reminderAt: reminder,
        });
        showToast('Todo updated successfully', 'success');
      } else {
        addTodo({
          title: title.trim(),
          description: description.trim() || undefined,
          dueDate: dueDate || undefined,
          priority,
          tags: tagList.length ? tagList : undefined,
          recurrenceRule: recurrence,
          reminderAt: reminder,
          status: 'pending',
        });
        showToast('Todo created successfully', 'success');
        setTitle('');
        setDescription('');
        setDueDate('');
        setPriority('medium');
        setTagsInput('');
        setRecurrenceRule('');
        setReminderAt('');
      }
      onSubmit?.();
    } catch (error) {
      console.error('Failed to save todo:', error);
      const errorMessage = 'Failed to save todo. Please try again.';
      setErrors({ title: errorMessage });
      showToast(errorMessage, 'error');
    }
  };

  const handleCancel = () => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description || '');
      setDueDate(todo.dueDate || '');
      setPriority(todo.priority);
      setTagsInput((Array.isArray(todo.tags) ? todo.tags : []).join(', '));
      setRecurrenceRule((todo.recurrenceRule as RecurrenceRule) || '');
      setReminderAt(todo.reminderAt ? isoToDatetimeLocal(todo.reminderAt) : '');
    } else {
      setTitle('');
      setDescription('');
      setDueDate('');
      setPriority('medium');
      setTagsInput('');
      setRecurrenceRule('');
      setReminderAt('');
    }
    setErrors({});
    onCancel?.();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="title">Title *</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setErrors({});
          }}
          className={errors.title ? styles.inputError : styles.input}
          placeholder="Enter todo title"
          maxLength={200}
        />
        {errors.title && <span className={styles.error}>{errors.title}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.textarea}
          placeholder="Enter todo description (optional)"
          rows={3}
          maxLength={1000}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="tags">Tags (comma-separated)</label>
        <input
          id="tags"
          type="text"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          className={styles.input}
          placeholder="e.g. work, urgent"
        />
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="dueDate">Due Date</label>
          <input
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            className={styles.select}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="recurrence">Recurrence</label>
          <select
            id="recurrence"
            value={recurrenceRule}
            onChange={(e) => setRecurrenceRule(e.target.value as RecurrenceRule | '')}
            className={styles.select}
          >
            <option value="">None</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="reminder">Reminder (date & time)</label>
          <input
            id="reminder"
            type="datetime-local"
            value={reminderAt}
            onChange={(e) => setReminderAt(e.target.value)}
            className={styles.input}
          />
        </div>
      </div>

      <div className={styles.actions}>
        <button type="submit" className={styles.submitButton}>
          {todo ? 'Update Todo' : 'Add Todo'}
        </button>
        {(todo || title || description) && (
          <button type="button" onClick={handleCancel} className={styles.cancelButton}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};
