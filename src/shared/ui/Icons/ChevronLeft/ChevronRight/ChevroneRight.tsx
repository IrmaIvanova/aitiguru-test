// shared/ui/Icons/ChevronRight.tsx
import React from 'react';

interface ChevronRightProps {
  className?: string;
  stroke?: string;
}

export const ChevronRight: React.FC<ChevronRightProps> = ({ 
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
        d="M9 5l7 7-7 7" 
      />
    </svg>
  );
};