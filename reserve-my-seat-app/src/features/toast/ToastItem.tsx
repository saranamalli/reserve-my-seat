const toastStyles = {
  success: "bg-green-100 border-green-500 text-green-800",
  error: "bg-red-100 border-red-500 text-red-800",
};

export const ToastItem = ({
  message,
  type,
  onRemove,
}: {
  message: string;
  type: "success" | "error";
  onRemove: () => void;
}) => (
  <div
    className={`flex items-center justify-between p-1 mb-2 border-l-4 rounded shadow-md w-60 animate-slide-in ${toastStyles[type]}`}
  >
    <p className="text-sm font-medium">{message}</p>
    <button onClick={onRemove} className="ml-4 text-xl font-bold">
      &times;
    </button>
  </div>
);
