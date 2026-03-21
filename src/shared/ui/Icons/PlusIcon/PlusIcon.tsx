import React from 'react';

interface PlusIconProps {
  className?: string;
  stroke?: string;
}

export const PlusIcon: React.FC<PlusIconProps> = ({ 
  className = "w-5 h-5", 
  stroke = "currentColor" 
}) => {
  return (
    <svg 
      className={className} 
      fill="none" 
      stroke={stroke} 
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="10" stroke={stroke} strokeWidth={1.5} fill="none" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v8M8 12h8" />
    </svg>
  );
};