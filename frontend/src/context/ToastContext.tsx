import React, { createContext, useContext, useState, useCallback, useEffect, useRef, ReactNode } from 'react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

/** Payload for centered reminder toast (todo details + beep) */
export interface ReminderToastData {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  priority?: string;
  reminderAt?: string;
  tags?: string[];
}

interface ToastContextType {
  toasts: Toast[];
  showToast: (message: string, type?: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;
  showConfirm: (message: string, onConfirm: () => void, onCancel?: () => void) => void;
  showReminderToast: (data: ReminderToastData) => void;
  clearReminderToast: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

function playBeep() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 800;
    osc.type = 'sine';
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.2);
  } catch {
    // fallback: no sound
  }
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [reminderToast, setReminderToast] = useState<ReminderToastData | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<{
    message: string;
    onConfirm: () => void;
    onCancel?: () => void;
  } | null>(null);

  const showReminderToast = useCallback((data: ReminderToastData) => {
    setReminderToast(data);
  }, []);

  const clearReminderToast = useCallback(() => {
    setReminderToast(null);
  }, []);

  const showToast = useCallback((message: string, type: ToastType = 'info', duration: number = 3000) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: Toast = { id, message, type, duration };

    setToasts((prev) => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showConfirm = useCallback((message: string, onConfirm: () => void, onCancel?: () => void) => {
    setConfirmDialog({ message, onConfirm, onCancel });
  }, []);

  const handleConfirm = useCallback(() => {
    if (confirmDialog) {
      confirmDialog.onConfirm();
      setConfirmDialog(null);
    }
  }, [confirmDialog]);

  const handleCancel = useCallback(() => {
    if (confirmDialog) {
      confirmDialog.onCancel?.();
      setConfirmDialog(null);
    }
  }, [confirmDialog]);

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast, showConfirm, showReminderToast, clearReminderToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      {reminderToast && (
        <ReminderToast data={reminderToast} onClose={clearReminderToast} onMount={playBeep} />
      )}
      {confirmDialog && (
        <ConfirmDialog
          message={confirmDialog.message}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </ToastContext.Provider>
  );
};

// Toast Container Component
interface ToastContainerProps {
  toasts: Toast[];
  removeToast: (id: string) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, removeToast }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  );
};

// Toast Item Component
interface ToastItemProps {
  toast: Toast;
  onClose: () => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onClose }) => {
  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      case 'info':
      default:
        return 'ℹ';
    }
  };

  return (
    <div className={`toast toast-${toast.type}`} onClick={onClose}>
      <span className="toast-icon">{getIcon()}</span>
      <span className="toast-message">{toast.message}</span>
      <button className="toast-close" onClick={onClose} aria-label="Close">
        ×
      </button>
    </div>
  );
};

// Reminder Toast (centered, shows todo details + beep)
interface ReminderToastProps {
  data: ReminderToastData;
  onClose: () => void;
  onMount: () => void;
}

const ReminderToast: React.FC<ReminderToastProps> = ({ data, onClose, onMount }) => {
  const hasRun = useRef(false);
  useEffect(() => {
    if (!hasRun.current) {
      hasRun.current = true;
      onMount();
    }
  }, [onMount]);

  const formatDateTime = (iso?: string) => {
    if (!iso) return null;
    const s = iso.trim();
    const date = /Z|[+-]\d{2}:?\d{2}$/.test(s) ? new Date(s) : new Date(s + (s.includes('T') ? 'Z' : ''));
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const formatDate = (iso?: string) => {
    if (!iso) return null;
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="reminder-toast-overlay" onClick={onClose}>
      <div className="reminder-toast" onClick={(e) => e.stopPropagation()}>
        <div className="reminder-toast-header">
          <span className="reminder-toast-icon">🔔</span>
          <h3 className="reminder-toast-title">Reminder</h3>
          <button className="reminder-toast-close" onClick={onClose} aria-label="Close">×</button>
        </div>
        <div className="reminder-toast-body">
          <p className="reminder-toast-item-title">{data.title}</p>
          {data.description && (
            <p className="reminder-toast-description">{data.description}</p>
          )}
          <dl className="reminder-toast-details">
            {data.dueDate && (
              <>
                <dt>Due</dt>
                <dd>{formatDate(data.dueDate)}</dd>
              </>
            )}
            {data.priority && (
              <>
                <dt>Priority</dt>
                <dd>{data.priority}</dd>
              </>
            )}
            {data.reminderAt && (
              <>
                <dt>Remind at</dt>
                <dd>{formatDateTime(data.reminderAt)}</dd>
              </>
            )}
            {data.tags && data.tags.length > 0 && (
              <>
                <dt>Tags</dt>
                <dd>{data.tags.join(', ')}</dd>
              </>
            )}
          </dl>
        </div>
        <div className="reminder-toast-actions">
          <button className="reminder-toast-dismiss" onClick={onClose}>Dismiss</button>
        </div>
      </div>
    </div>
  );
};

// Confirm Dialog Component
interface ConfirmDialogProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="confirm-dialog-overlay" onClick={onCancel}>
      <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-dialog-content">
          <p className="confirm-dialog-message">{message}</p>
          <div className="confirm-dialog-actions">
            <button className="confirm-dialog-button confirm-dialog-button-cancel" onClick={onCancel}>
              Cancel
            </button>
            <button className="confirm-dialog-button confirm-dialog-button-confirm" onClick={onConfirm}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
