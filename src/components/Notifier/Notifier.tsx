import { ToastType } from "../../types"
import { FC } from "react"
import { useEffect } from "react";


interface ToastMessage {
  id: number;
  type: ToastType;
  message: string;
  isVisible: boolean;
}

interface ToastNotifierProps {
  toasts: ToastMessage[];
  removeToast: (id: number) => void;
}

const bgColorMap: Record<goatToastType, string> = {
  success: "bg-green-500",
  error: "bg-red-500",
  info: "bg-blue-500",
};

export const ToastNotifier: FC<ToastNotifierProps> = ({ toasts, removeToast }) => {
  useEffect(() => {
    const timers: number[] = [];

    toasts.forEach((toast) => {
      if (toast.isVisible) {
        const timer = setTimeout(() => removeToast(toast.id), 3000);
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
            </button>
          </div>
        ))}
    </div>
  );
};
