// shared/ui/Buttons/RefreshButton.tsx
import React, { useState } from 'react';

interface RefreshButtonProps {
  onRefresh: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const RefreshButton: React.FC<RefreshButtonProps> = ({
  onRefresh,
  className = '',
  size = 'md',
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await onRefresh();
    setTimeout(() => setIsRefreshing(false), 500); // Минимальная анимация
  };

  const sizeClasses = {
    sm: 'w-6 h-6 p-1',
    md: 'w-8 h-8 p-1.5',
    lg: 'w-10 h-10 p-2',
  };

  return (
    <button
      onClick={handleRefresh}
      disabled={isRefreshing}
      className={`
        rounded-lg hover:bg-gray-100 transition-all duration-200
        flex items-center justify-center
        ${sizeClasses[size]}
        ${className}
        ${isRefreshing ? 'cursor-not-allowed' : 'cursor-pointer'}
      `}
      title="Обновить"
    >
      <svg
        className={`
          w-full h-full text-gray-500 transition-transform duration-500
          ${isRefreshing ? 'animate-spin' : 'hover:rotate-180'}
        `}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    </button>
  );
};