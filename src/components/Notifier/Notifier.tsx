import { FC, useEffect } from "react";
import { ToastType, ToastMessage } from "../../types";

interface ToastNotifierProps {
  toasts: ToastMessage[];
  removeToast: (id: number) => void;
}

const bgColorMap: Record<ToastType, string> = {
  success: "bg-[#172b4d]",
  error: "bg-red-900",
  info: "bg-[#172b4d]",
};


export const ToastNotifier: FC<ToastNotifierProps> = ({ toasts, removeToast }) => {
  useEffect(() => {
    const timers: number[] = [];

    toasts.forEach((toast) => {
      if (toast.isVisible) {
        const timer = window.setTimeout(() => removeToast(toast.id), 2000);
        timers.push(timer);
      }
    });

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [toasts, removeToast]);

  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 p-3 space-y-3 z-50">
      {toasts
        .filter((toast) => toast.isVisible)
        .map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center justify-between p-4 rounded-lg shadow-lg text-white ${bgColorMap[toast.type]} transition-transform transform duration-300 ease-in-out`}
          >
            <span>{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-4 text-white hover:text-gray-300"
            >
              ×
            </button>
          </div>
        ))}
    </div>
  );
};