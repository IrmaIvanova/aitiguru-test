import React from 'react';
import { ChevronRight } from '../Icons/ChevronRight/ChevroneRight';
import { ChevronLeft } from '../Icons/ChevronLeft/ChevronLeft';
import { IconButton } from '../Buttons/IconButton.tsx/IconButton';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    limit: number;
    total: number;
    onLimitChange?: (limit: number) => void;
    limitOptions?: number[];
}

export const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
    limit,
    total,
    onLimitChange,
    limitOptions = [10, 20, 30, 50],
}) => {
    const getPageNumbers = () => {
        const pages: number[] = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else if (currentPage <= 3) {
            for (let i = 1; i <= maxVisible; i++) pages.push(i);
        } else if (currentPage >= totalPages - 2) {
            for (let i = totalPages - maxVisible + 1; i <= totalPages; i++) pages.push(i);
        } else {
            for (let i = currentPage - 2; i <= currentPage + 2; i++) pages.push(i);
        }

        return pages;
    };

    return (
        <div className="flex items-center justify-between">
            <p className="text-sm text-[#969B9F]">
                Показано{' '}
                <span className="text-[#333333]">{Math.min(limit, total)}</span>
                {' из '}
                <span className="text-[#333333]">{total}</span>
            </p>

            <div className="flex items-center gap-4">
                {/* {onLimitChange && (
          <select
            value={limit}
            onChange={(e) => onLimitChange(Number(e.target.value))}
            className="px-2 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {limitOptions.map(opt => (
              <option key={opt} value={opt}>{opt} на стр.</option>
            ))}
          </select>
        )} */}

                <div className="flex items-center gap-2">
                    <IconButton
                        icon={<ChevronLeft className="w-4 h-4" />}
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        variant="ghost"
                        size="sm"
                    />

                    {getPageNumbers().map(page => (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`px-3 py-1 rounded-lg transition-colors text-[#B2B3B9] ${currentPage === page
                                ? 'bg-[#797FEA] text-white'
                                : 'border border-gray-300 hover:bg-gray-50'
                                }`}
                        >
                            {page}
                        </button>
                    ))}
                    <IconButton
                        icon={<ChevronRight className="w-4 h-4" />}
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        variant="ghost"
                        size="sm"
                    />

                </div>
            </div>
        </div>
    );
};