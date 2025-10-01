'use client';

import { useEffect } from 'react';
import { Toast as ToastType } from '@/hooks/useToast';
import { cn } from '@/utils/helpers';

interface ToastProps {
  toast: ToastType;
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 5000);

    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const getVariantStyles = () => {
    switch (toast.variant) {
      case 'success':
        return {
          container: 'bg-green-50 border-green-200',
          title: 'text-green-800',
          description: 'text-green-600',
          icon: '✅'
        };
      case 'destructive':
        return {
          container: 'bg-red-50 border-red-200',
          title: 'text-red-800',
          description: 'text-red-600',
          icon: '❌'
        };
      default:
        return {
          container: 'bg-blue-50 border-blue-200',
          title: 'text-blue-800',
          description: 'text-blue-600',
          icon: 'ℹ️'
        };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <div
      className={cn(
        'relative p-4 rounded-lg border shadow-lg mb-3 transition-all duration-300 transform animate-in slide-in-from-right-8',
        variantStyles.container
      )}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        <span className="text-lg mt-0.5">{variantStyles.icon}</span>
        
        <div className="flex-1 min-w-0">
          <h4 className={cn('font-semibold text-sm', variantStyles.title)}>
            {toast.title}
          </h4>
          {toast.description && (
            <p className={cn('text-sm mt-1', variantStyles.description)}>
              {toast.description}
            </p>
          )}
        </div>
        
        <button
          onClick={() => onDismiss(toast.id)}
          className="ml-2 text-gray-400 hover:text-gray-600 text-lg transition-colors"
          aria-label="Dismiss notification"
        >
          ×
        </button>
      </div>
      
      <div className="absolute bottom-0 left-0 h-1 bg-current opacity-20 animate-progress w-full" />
    </div>
  );
};

export const ToastContainer: React.FC<{
  toasts: ToastType[];
  onDismiss: (id: string) => void;
}> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div 
      className="fixed top-4 right-4 z-50 max-w-sm w-full"
      role="region"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
};