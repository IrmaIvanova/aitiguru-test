// shared/ui/Buttons/IconButton.tsx
import React from 'react';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'primary' | 'ghost';
  loading?: boolean;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  size = 'md',
  variant = 'default',
  loading = false,
  className = '',
  ...props
}) => {
  const variants = {
    default: 'text-gray-500 hover:bg-gray-100',
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    ghost: 'text-gray-400 hover:text-gray-600 hover:bg-gray-100',
  };

  const sizes = {
    sm: 'p-1 rounded-lg',
    md: 'p-1.5 rounded-lg',
    lg: 'p-2 rounded-xl',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  // Функция для добавления класса размера к иконке
  const renderIcon = () => {
    if (loading) {
      return (
        <div className={`${iconSizes[size]} border-2 border-current border-t-transparent rounded-full animate-spin`} />
      );
    }

    if (React.isValidElement(icon)) {
      // Клонируем элемент и добавляем класс размера
      return React.cloneElement(icon as React.ReactElement<any>, {
        className: `${iconSizes[size]} ${(icon.props as any)?.className || ''}`,
      });
    }

    return icon;
  };

  return (
    <button
      className={`
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center justify-center
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      disabled={loading || props.disabled}
      {...props}
    >
      {renderIcon()}
    </button>
  );
};