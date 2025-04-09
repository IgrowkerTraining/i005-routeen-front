import { Toast, ToastContainer } from "react-bootstrap"
import { ToastType } from "../../types"
import { FC } from "react"

interface ToastMessage {
  id: number
  type: ToastType
  message: string
  isVisible: boolean 
}

interface ToastNotifierProps {
  toasts: ToastMessage[];
  removeToast: (id: number) => void;
}

const bgColorMap: Record<ToastType, string> = {
  success: "success",
  error: "danger",
  info: "info",
}

export const ToastNotifier: FC<ToastNotifierProps> = ({ toasts, removeToast }) => {
  return (
    <ToastContainer position="top-center" className="p-3">
      {toasts
        .filter((toast) => toast.isVisible) 
        .map((toast) => (
          <Toast
            key={toast.id}
            bg={bgColorMap[toast.type]}
            onClose={() => removeToast(toast.id)}
            delay={3000}
            autohide
          >
            <Toast.Body className="text-white">{toast.message}</Toast.Body>
          </Toast>
        ))}
    </ToastContainer>
  )
}

