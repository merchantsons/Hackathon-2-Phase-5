export type Priority = 'low' | 'medium' | 'high';
export type Status = 'pending' | 'completed';
export type RecurrenceRule = 'daily' | 'weekly' | 'monthly';

export interface Todo {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  priority: Priority;
  status: Status;
  tags?: string[];
  recurrenceRule?: RecurrenceRule | null;
  reminderMinutesBefore?: number | null;  // deprecated
  reminderAt?: string | null;  // ISO date and time
  createdAt: string;
  updatedAt: string;
}

export type StatusFilter = 'all' | 'pending' | 'completed';
export type PriorityFilter = 'all' | 'low' | 'medium' | 'high';
export type DueDateFilter = 'all' | 'today' | 'thisWeek' | 'overdue';
export type SortField = 'dueDate' | 'priority' | 'createdAt' | 'title';
export type SortOrder = 'asc' | 'desc';

export interface FilterState {
  status: StatusFilter;
  priority: PriorityFilter;
  dueDate: DueDateFilter;
  sortBy: SortField;
  sortOrder: SortOrder;
  searchQuery: string;
  tagFilter: string;  // '' = all, otherwise filter by tag
}

export interface StorageData {
  todos: Todo[];
  version: string;
}
