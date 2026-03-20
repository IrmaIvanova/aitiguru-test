// pages/products/ui/ProductsPage.tsx

import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useProducts } from '../../features/products/model/useProducts';
import { ProductsTable } from '../../features/products/ui/ProductsTable/ProductsTable';
import { ProductHeader } from '../../features/products/ui/ProductHeader/ProductHeader';
import { AddProductModal } from '../../features/products/ui/AddProductModal/AddProductModal';
export const ProductsPage: React.FC = () => {
    const {
        products,
        total,
        isLoading,
        isFetching, // Добавьте это в useProducts!
        params,
        handleSort,
        handleSearch,
        // addProduct,
    } = useProducts();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddProduct = (data: any) => {
        // addProduct(data);
        toast.success('Товар успешно добавлен! 🎉');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto">

                <ProductHeader onSearch={handleSearch} title={"Товары"} />

                <div className='bg-[#fff] px-[30px] py-[26px] rounded-[10px]'>
                    <div className="flex justify-between items-center mb-6">
                        <p className="text-gray-600">Все позиции</p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700                             
                            transition-colors flex items-center gap-2"
                        >
                            {/* <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg> */}
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                {/* Круг */}
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={1.5} fill="none" />
                                {/* Плюс */}
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v8M8 12h8" />
                            </svg>
                            Добавить
                        </button>
                    </div>

                    {/* Таблица с защитой от моргания */}
                    <div className="bg-white overflow-hidden">
                        {isFetching ? (
                            // Скелетон таблицы
                            <div className="p-4 space-y-3">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <div key={i} className="h-12 bg-gray-200 animate-pulse rounded" />
                                ))}
                            </div>
                        ) : (
                            <>
                                <ProductsTable
                                    products={products}
                                    onSort={handleSort}
                                    sortBy={params.sortBy || 'title'}
                                    order={params.order || 'asc'}
                                />

                                {/* Пагинация */}
                                <div className="px-4 py-3 text-left">
                                    <p className="text-base text-[#969B9F]">
                                        Показано
                                        <span className="text-[#333333]">{" " + products.length} </span>
                                        из
                                        <span className="text-[#333333]">{" " + total}</span>
                                    </p>
                                </div>
                            </>
                        )}
                    </div>

                    {products.length === 0 && !isFetching && (
                        <div className="text-center py-8 text-gray-500">
                            Товары не найдены
                        </div>
                    )}
                </div>
            </div>

            <AddProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={handleAddProduct}
            />
            <ToastContainer position="bottom-right" autoClose={3000} />
        </div>
    );
};