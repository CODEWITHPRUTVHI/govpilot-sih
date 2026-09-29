import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | 'full';
  footer?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = '2xl',
  footer
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
    full: 'max-w-6xl'
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-[#17212B]/60">
      <div 
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />
      <div 
        className={`relative bg-white border border-[#D9E0E7] rounded-md shadow-xl w-full ${maxWidthClasses[maxWidth]} overflow-hidden z-10 my-8`}
        role="dialog"
        aria-modal="true"
      >
        <div className="bg-[#FAFCFE] px-6 py-4 border-b border-[#D9E0E7] flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-[#123B63]">{title}</h3>
            {subtitle && (
              <p className="text-xs text-[#66727E] mt-0.5">{subtitle}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#66727E] hover:text-[#17212B] p-1 rounded hover:bg-[#E8EDF2] focus:outline-none focus:ring-2 focus:ring-[#123B63]"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 max-h-[calc(85vh-130px)] overflow-y-auto">
          {children}
        </div>

        {footer && (
          <div className="bg-[#F7F9FB] px-6 py-3 border-t border-[#D9E0E7] flex items-center justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
