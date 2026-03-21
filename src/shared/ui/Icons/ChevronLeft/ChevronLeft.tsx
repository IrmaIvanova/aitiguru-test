// shared/ui/Icons/ChevronLeft.tsx
import React from 'react';

interface ChevronLeftProps {
  className?: string;
  stroke?: string;
}

export const ChevronLeft: React.FC<ChevronLeftProps> = ({ 
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
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M15 19l-7-7 7-7" 
      />
    </svg>
  );
};