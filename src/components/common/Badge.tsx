import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'purple';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'default', 
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-1 font-medium',
    lg: 'text-sm px-3 py-1.5 font-semibold'
  };

  const variantClasses = {
    default: 'bg-[#EBF2F7] text-[#123B63] border border-[#C5D8E8]',
    info: 'bg-[#E8F1F8] text-[#1D5E8C] border border-[#B9D7ED]',
    success: 'bg-[#EAF5EE] text-[#1E6B3E] border border-[#BDE0CB]',
    warning: 'bg-[#FEF5E7] text-[#8C5900] border border-[#FADBAA]',
    danger: 'bg-[#FDF0EE] text-[#A31D14] border border-[#F6C0BB]',
    neutral: 'bg-[#F2F4F7] text-[#475467] border border-[#D0D5DD]',
    purple: 'bg-[#F4F1F9] text-[#5925DC] border border-[#DDD4F4]'
  };

  return (
    <span className={`inline-flex items-center justify-center rounded ${sizeClasses[size]} ${variantClasses[variant]} ${className} tracking-tight whitespace-nowrap`}>
      {children}
    </span>
  );
};
