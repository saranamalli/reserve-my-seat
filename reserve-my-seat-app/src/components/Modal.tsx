import { ReactNode } from "react";
import Portal from "./Portal";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children?: ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <Portal>
      <div
        className="fixed inset-0 bg-black/75 z-9998 flex items-center justify-center"
        onClick={onClose}
      >
        <div
          className="fixed top-[50%] left-[50%] bg-auto p-6 rounded-lg shadow-xl w-full max-w-md z-9999 border"
          style={{ transform: "translate(-50%, -50%)" }}
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        >
          <h2 className="text-xl font-bold mb-4">{title}</h2>
          {children}
        </div>
      </div>
    </Portal>
  );
};
