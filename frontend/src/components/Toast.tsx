import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  text: string;
}

interface ToastProps {
  toast: ToastMessage | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3500);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle size={18} color="#46d369" />;
      case 'error':
        return <AlertCircle size={18} color="var(--netflix-red)" />;
      default:
        return <Info size={18} color="#38bdf8" />;
    }
  };

  return (
    <div className="toast-container animate-fade-in">
      {getIcon()}
      <span className="toast-text">{toast.text}</span>
      <button onClick={onClose} className="toast-close-btn">
        <X size={16} />
      </button>
    </div>
  );
};
