"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

import Toast from "@/Component/Toast/Toast";

type ToastType = "success" | "warning" | "danger";

type ToastPosition =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left"
  | "top-center"
  | "bottom-center";

type ToastState = {
  show: boolean;
  type: ToastType;
  message: string;
  position: ToastPosition;
  duration: number;
};

type ToastContextType = {
  success: (
    message: string,
    options?: Partial<Omit<ToastState, "show" | "type" | "message">>,
  ) => void;

  warning: (
    message: string,
    options?: Partial<Omit<ToastState, "show" | "type" | "message">>,
  ) => void;

  danger: (
    message: string,
    options?: Partial<Omit<ToastState, "show" | "type" | "message">>,
  ) => void;

  close: () => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

const initialState: ToastState = {
  show: false,
  type: "success",
  message: "",
  position: "top-right",
  duration: 4000,
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [toast, setToast] = useState(initialState);

  const open = useCallback(
    (
      type: ToastType,
      message: string,
      options?: Partial<Omit<ToastState, "show" | "type" | "message">>,
    ) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }

      const duration = options?.duration ?? 4000;

      setToast({
        show: true,
        type,
        message,
        position: options?.position ?? "top-right",
        duration,
      });

      timer.current = setTimeout(() => {
        setToast((prev) => ({
          ...prev,
          show: false,
        }));
      }, duration);
    },
    [],
  );

  const close = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    setToast((prev) => ({
      ...prev,
      show: false,
    }));
  }, []);

  const value = useMemo(
    () => ({
      success: (
        message: string,
        options?: Partial<Omit<ToastState, "show" | "type" | "message">>,
      ) => open("success", message, options),

      warning: (
        message: string,
        options?: Partial<Omit<ToastState, "show" | "type" | "message">>,
      ) => open("warning", message, options),

      danger: (
        message: string,
        options?: Partial<Omit<ToastState, "show" | "type" | "message">>,
      ) => open("danger", message, options),

      close,
    }),
    [open, close],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}

      <Toast
        show={toast.show}
        type={toast.type}
        message={toast.message}
        position={toast.position}
        duration={toast.duration}
      />
    </ToastContext.Provider>
  );
}

export function useToastContext() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }

  return context;
}
