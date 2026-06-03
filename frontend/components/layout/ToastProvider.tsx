'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

/* ─── Types ─── */
type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  exiting: boolean;
}

interface ToastContextValue {
  showToast: (message: string, type: ToastType) => void;
}

/* ─── Context ─── */
const ToastContext = createContext<ToastContextValue | null>(null);

/* ─── Constants ─── */
const AUTO_DISMISS_MS = 4000;
const EXIT_ANIMATION_MS = 300;
const MAX_TOASTS = 5;

const TOAST_CONFIG: Record<
  ToastType,
  { borderColor: string; icon: React.ElementType; iconColor: string }
> = {
  success: {
    borderColor: 'border-l-emerald-400',
    icon: CheckCircle,
    iconColor: 'text-emerald-400',
  },
  error: {
    borderColor: 'border-l-red-400',
    icon: AlertCircle,
    iconColor: 'text-red-400',
  },
  info: {
    borderColor: 'border-l-sky-400',
    icon: Info,
    iconColor: 'text-sky-400',
  },
};

/* ─── Provider ─── */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map()
  );

  /* Clear all timers on unmount */
  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  const removeToast = useCallback((id: string) => {
    /* Trigger exit animation first */
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, exiting: true } : t))
    );

    /* Then remove from DOM after animation completes */
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, EXIT_ANIMATION_MS);
  }, []);

  const showToast = useCallback(
    (message: string, type: ToastType) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      const newToast: Toast = { id, message, type, exiting: false };

      setToasts((prev) => {
        const next = [...prev, newToast];
        /* Drop the oldest if over max */
        return next.length > MAX_TOASTS ? next.slice(-MAX_TOASTS) : next;
      });

      /* Auto-dismiss timer */
      const timer = setTimeout(() => {
        removeToast(id);
        timersRef.current.delete(id);
      }, AUTO_DISMISS_MS);

      timersRef.current.set(id, timer);
    },
    [removeToast]
  );

  const handleDismiss = useCallback(
    (id: string) => {
      /* Cancel pending auto-dismiss */
      const existing = timersRef.current.get(id);
      if (existing) {
        clearTimeout(existing);
        timersRef.current.delete(id);
      }
      removeToast(id);
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast container — fixed top-right */}
      <div
        className="fixed top-5 right-5 flex flex-col gap-3 pointer-events-none"
        style={{ zIndex: 9999 }}
        role="region"
        aria-label="Notifications"
      >
        {toasts.map((toast) => {
          const config = TOAST_CONFIG[toast.type];
          const Icon = config.icon;

          return (
            <div
              key={toast.id}
              role="alert"
              className={`
                pointer-events-auto
                flex items-start gap-3 w-80 px-4 py-3
                bg-white/10 backdrop-blur-xl
                border border-white/10 border-l-4 ${config.borderColor}
                rounded-xl
                shadow-lg shadow-black/30
                ${toast.exiting ? 'toast-exit' : 'toast-enter'}
              `}
            >
              {/* Type icon */}
              <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${config.iconColor}`} />

              {/* Message */}
              <p className="flex-1 text-sm text-white/90 font-medium leading-snug">
                {toast.message}
              </p>

              {/* Close button */}
              <button
                onClick={() => handleDismiss(toast.id)}
                className="shrink-0 mt-0.5 text-white/40 hover:text-white transition-colors duration-200"
                aria-label="Dismiss notification"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

/* ─── Hook ─── */
export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
