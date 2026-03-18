import React, { useState } from 'react';
import Lock from '../../../assets/svg/Lock.svg'
import Eye from '../../../assets/svg/Eye.svg'

import type { UseFormRegisterReturn } from 'react-hook-form';


export interface InputProps {
  label: string;
  type?: 'text' | 'password' | 'email';
  register: UseFormRegisterReturn;
  error?: string;
  placeholder?: string;
  leftIcon?: string;
  rightIcon?: string;
  onRightIconClick?: () => void;
  className?: string;
  showPasswordToggle?: boolean; // новая опция
}

export const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  register,
  error,
  placeholder,
  leftIcon,
  rightIcon,
  onRightIconClick,
  className = '',
  showPasswordToggle = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  
  const inputType = showPasswordToggle 
    ? (showPassword ? 'text' : 'password')
    : type;

  const handleRightIconClick = () => {
    if (showPasswordToggle) {
      setShowPassword(!showPassword);
    } else if (onRightIconClick) {
      onRightIconClick();
    }
  };

  return (
    <div className="space-y-[6px]">
      <label className="block text-sm text-left font-medium text-[#232323]">
        {label}
      </label>
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <img src={leftIcon} alt="" className="w-[24px] h-[19.5px]" />
          </div>
        )}
        
        <input
          type={inputType}
          {...register}
          placeholder={placeholder}
          className={`
            block w-full 
            ${leftIcon ? 'pl-10' : 'pl-3'} 
            ${(rightIcon || showPasswordToggle) ? 'pr-10' : 'pr-3'} 
            py-3 
            border 
            ${error ? 'border-red-300' : 'border-gray-300'} 
            rounded-[12px] 
            focus:outline-none 
            focus:ring-2 
            focus:ring-blue-500 
            focus:border-transparent
            transition-all
            ${className}
          `}
        />
        
        {(rightIcon || showPasswordToggle) && (
          <div 
            className={`
              absolute inset-y-0 right-0 pr-[16px] flex items-center
              ${(showPasswordToggle || onRightIconClick) ? 'cursor-pointer' : 'pointer-events-none'}
            `}
            onClick={handleRightIconClick}
          >
            <img 
              src={showPasswordToggle ? (showPassword ? Eye : Lock) : rightIcon} 
              alt="icon" 
              className="w-[24px] h-[24px]" 
            />
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-left text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};