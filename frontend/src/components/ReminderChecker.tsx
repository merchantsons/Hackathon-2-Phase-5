import React, { useEffect, useRef } from 'react';
import { useTodos } from '../hooks/useTodos';
import { useToast } from '../context/ToastContext';

const CHECK_INTERVAL_MS = 15000; // every 15 seconds

function parseUtc(isoString: string): Date {
  const s = isoString.trim();
  if (!/Z|[+-]\d{2}:?\d{2}$/.test(s)) {
    return new Date(s + (s.includes('T') ? 'Z' : ''));
  }
  return new Date(s);
}

export const ReminderChecker: React.FC = () => {
  const { todos } = useTodos();
  const { showReminderToast } = useToast();
  const shownRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const check = () => {
      const now = new Date();
      for (const todo of todos) {
        if (todo.status === 'completed' || !todo.reminderAt) continue;
        const key = `${todo.id}-${todo.reminderAt}`;
        if (shownRef.current.has(key)) continue;
        const reminderTime = parseUtc(todo.reminderAt);
        if (reminderTime.getTime() <= now.getTime()) {
          shownRef.current.add(key);
          showReminderToast({
            id: todo.id,
            title: todo.title,
            description: todo.description || undefined,
            dueDate: todo.dueDate,
            priority: todo.priority,
            reminderAt: todo.reminderAt || undefined,
            tags: todo.tags,
          });
        }
      }
    };

    check();
    const id = setInterval(check, CHECK_INTERVAL_MS);
    return () => clearInterval(id);
  }, [todos, showReminderToast]);

  return null;
};
