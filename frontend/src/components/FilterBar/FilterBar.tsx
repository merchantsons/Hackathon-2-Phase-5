import React, { useMemo } from 'react';
import { useTodos } from '../../hooks/useTodos';
import styles from './FilterBar.module.css';

export const FilterBar: React.FC = () => {
  const { todos, filters, setFilter, clearFilters } = useTodos();

  const uniqueTags = useMemo(
    () => [...new Set(todos.flatMap((t) => (Array.isArray(t.tags) ? t.tags : [])))].sort(),
    [todos]
  );

  const hasActiveFilters =
    filters.status !== 'all' ||
    filters.priority !== 'all' ||
    filters.dueDate !== 'all' ||
    filters.tagFilter !== '' ||
    filters.sortBy !== 'createdAt' ||
    filters.sortOrder !== 'desc';

  return (
    <div className={styles.filterBar}>
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label htmlFor="status-filter">Status:</label>
          <select
            id="status-filter"
            value={filters.status}
            onChange={(e) => setFilter({ status: e.target.value as any })}
            className={styles.select}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="priority-filter">Priority:</label>
          <select
            id="priority-filter"
            value={filters.priority}
            onChange={(e) => setFilter({ priority: e.target.value as any })}
            className={styles.select}
          >
            <option value="all">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="dueDate-filter">Due Date:</label>
          <select
            id="dueDate-filter"
            value={filters.dueDate}
            onChange={(e) => setFilter({ dueDate: e.target.value as any })}
            className={styles.select}
          >
            <option value="all">All</option>
            <option value="today">Today</option>
            <option value="thisWeek">This Week</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>

        {uniqueTags.length > 0 && (
          <div className={styles.filterGroup}>
            <label htmlFor="tag-filter">Tag:</label>
            <select
              id="tag-filter"
              value={filters.tagFilter}
              onChange={(e) => setFilter({ tagFilter: e.target.value })}
              className={styles.select}
            >
              <option value="">All</option>
              {uniqueTags.map((tag) => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
        )}

        <div className={styles.filterGroup}>
          <label htmlFor="sortBy">Sort By:</label>
          <select
            id="sortBy"
            value={filters.sortBy}
            onChange={(e) => setFilter({ sortBy: e.target.value as any })}
            className={styles.select}
          >
            <option value="createdAt">Created Date</option>
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="sortOrder">Order:</label>
          <select
            id="sortOrder"
            value={filters.sortOrder}
            onChange={(e) => setFilter({ sortOrder: e.target.value as any })}
            className={styles.select}
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>

        {hasActiveFilters && (
          <button onClick={clearFilters} className={styles.clearButton}>
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
};
