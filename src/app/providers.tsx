"use client";

import { ReactNode } from "react";
import { ToastContext } from "@/hooks/useToast";
import { ToastContainer } from "@/components/ui/Toast/Toast";
import { ErrorBoundary } from "@/components/ErrorBoundary/ErrorBoundary";
import { useToast } from "@/hooks/useToast";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const toast = useToast();

  return (
    <ToastContext.Provider value={toast}>
      <ErrorBoundary>{children}</ErrorBoundary>
      <ToastContainer toasts={toast.toasts} onDismiss={toast.dismiss} />
    </ToastContext.Provider>
  );
}
