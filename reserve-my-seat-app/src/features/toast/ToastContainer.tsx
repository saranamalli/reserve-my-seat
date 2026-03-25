import { useToastStore } from "../../store/toastStore";
import { ToastItem } from "./ToastItem";

export const ToastContainer = () => {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col items-end">
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          {...toast}
          onRemove={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};
