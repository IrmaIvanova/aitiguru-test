import React, { useState, useEffect, useCallback } from 'react';
import Eye from '../../../assets/svg/Eye.svg';
import EyeOff from '../../../assets/svg/EyeOff.svg';
import Search from '../../../assets/svg/Search.svg';
import Close from '../../../assets/svg/Close.svg';
import type { UseFormRegisterReturn } from 'react-hook-form';

export interface IInputProps {
    // Для формы (react-hook-form)
    label?: string;
    type?: 'text' | 'password' | 'email' | 'number' | 'search';
    register?: UseFormRegisterReturn;
    error?: string;

    // Для поиска
    onSearch?: (value: string) => void;
    debounceMs?: number;
    initialValue?: string;

    // Для uncontrolled режима (без react-hook-form)
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

    // Общие пропсы
    placeholder?: string;
    leftIcon?: string;
    rightIcon?: string;
    onRightIconClick?: () => void;
    className?: string;
    showPasswordToggle?: boolean;
}

export const Input: React.FC<IInputProps> = ({
    // Форма
    label,
    type = 'text',
    register,
    error,

    // Поиск
    onSearch,
    debounceMs = 500,
    initialValue = '',

    // Uncontrolled
    value: externalValue,
    onChange: externalOnChange,

    // Общие
    placeholder,
    leftIcon,
    rightIcon,
    onRightIconClick,
    className = '',
    showPasswordToggle = false,
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [searchTerm, setSearchTerm] = useState(initialValue);

    const isSearch = type === 'search' || !!onSearch;
    const isFormField = !!register;

    // Debounce для поиска
    useEffect(() => {
        if (!isSearch || !onSearch) return;

        const timer = setTimeout(() => {
            if (searchTerm !== initialValue) {
                onSearch(searchTerm);
            }
        }, debounceMs);

        return () => clearTimeout(timer);
    }, [searchTerm, onSearch, initialValue, debounceMs, isSearch]);

    // Обработчик изменения значения
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;

        if (isSearch) {
            setSearchTerm(newValue);
        }

        if (externalOnChange) {
            externalOnChange(e);
        }
    };

    // Очистка поля поиска
    const handleClearSearch = () => {
        setSearchTerm('');
        if (onSearch) {
            onSearch('');
        }
    };

    // Определяем тип инпута
    const inputType = showPasswordToggle
        ? (showPassword ? 'text' : 'password')
        : type === 'search' ? 'text' : type;

    // Определяем левую иконку
    const getLeftIcon = () => {
        if (isSearch) return Search;
        return leftIcon;
    };

    // Определяем правую иконку
    const getRightIcon = () => {
        if (type === "text") {
            return Close;
        }
        if (showPasswordToggle) {
            return showPassword ? EyeOff : Eye;
        }
        if (isSearch && searchTerm) {
            return Close;
        }
        return rightIcon;
    };

    // Обработчик клика по правой иконке
    const handleRightClick = () => {
        if (showPasswordToggle) {
            setShowPassword(!showPassword);
        } else if (isSearch && searchTerm) {
            handleClearSearch();
        } else if (onRightIconClick) {
            onRightIconClick();
        }
    };

    // Определяем значение для инпута
    const inputValue = isSearch
        ? searchTerm
        : (externalValue !== undefined ? externalValue : undefined);

    // Показывать ли правую иконку
    const showRightIcon = !!(rightIcon || showPasswordToggle || type === "text" || (isSearch && searchTerm));

    return (
        <div className="space-y-[6px] ">
            {/* Лейбл */}
            {label && (
                <label className="block text-sm text-left font-medium text-[#232323]">
                    {label}
                </label>
            )}

            <div className="relative flex-1">
                {/* Левая иконка */}
                {getLeftIcon() && (
                    <div className={`absolute 
                    inset-y-0 
                    left-0 
                    pl-[${isSearch ? "20px" : "16px"}]

                    flex 
                    items-center 
                    pointer-events-none`}>
                        <img src={getLeftIcon()} alt="" className="w-[24px] h-[19.5px]" />
                    </div>
                )}

                {/* Поле ввода */}

                <input
                    type={inputType}
                    {...(isFormField ? register : {})}
                    value={inputValue}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className={`
            block 
            w-full
            ${getLeftIcon() ? 'pl-12' : 'pl-3'} 
            ${showRightIcon ? 'pr-10' : 'pr-3'} 
            py-3 
            border 
            ${error ? 'border-red-300' : 'border-gray-300'} 
            rounded-[${isSearch ? "8px" : "12px"}]
            ${isSearch && "bg-[#F3F3F3]"}
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                focus:border-transparent
                transition-all
                ${className}
          `}
                />
                

                {/* Правая иконка */}
                {showRightIcon && (
                    <button
                        type="button"
                        className={`
              absolute inset-y-0 right-0 pr-[16px] flex items-center
              ${(showPasswordToggle || onRightIconClick || (isSearch && searchTerm)) ? 'cursor-pointer' : 'pointer-events-none'}
              focus:outline-none
            `}
                        onClick={handleRightClick}
                    >
                        <img
                            src={getRightIcon()}
                            alt="icon"
                            className="w-[24px] h-[24px]"
                        />
                    </button>
                )}
            </div>

            {/* Ошибка (только для формы) */}
            {error && !isSearch && (
                <p className="mt-1 text-left text-sm text-red-600">{error}</p>
            )}
        </div>
    );
};