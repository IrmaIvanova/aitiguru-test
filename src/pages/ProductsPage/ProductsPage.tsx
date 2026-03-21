// pages/products/ui/ProductsPage.tsx
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useProducts } from '../../features/products/model/useProducts';
import { ProductsTable } from '../../features/products/ui/ProductsTable/ProductsTable';
import { ProductHeader } from '../../features/products/ui/ProductHeader/ProductHeader';
import { AddProductModal } from '../../features/products/ui/AddProductModal/AddProductModal';
import { Pagination } from '../../shared/ui/Pagination/Pagination';

export const ProductsPage: React.FC = () => {
  const {
    products,
    total,
    isLoading,
    isSearching,
    isFetching,
    params,
    currentPage,
    totalPages,
    handleSort,
    handleSearch,
    handlePageChange,
    handleLimitChange,
  } = useProducts();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddProduct = (data: any) => {
    // addProduct(data);
    toast.success('Товар успешно добавлен! 🎉');
  };

  // Состояние загрузки только при первой загрузке
  if (isLoading && products.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка товаров...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto">
        <ProductHeader onSearch={handleSearch} title="Товары" />

        <div className="bg-[#fff] px-[30px] py-[26px] rounded-[10px]">
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">Все позиции</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={1.5} fill="none" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v8M8 12h8" />
              </svg>
              Добавить
            </button>
          </div>

          {/* Таблица */}
          <div className="bg-white overflow-hidden">
            {isFetching && products.length === 0 ? (
              // Скелетон только при первой загрузке
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

                {/* Пагинация - показываем только если не поиск и страниц больше 1 */}
                {!isSearching && totalPages > 1 && (
                  <div className="px-4 py-4 border-t border-gray-100">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                      limit={params.limit}
                      total={total}
                      onLimitChange={handleLimitChange}
                      limitOptions={[10, 20, 30, 50]}
                    />
                  </div>
                )}

                {/* Информация о количестве при поиске */}
                {isSearching && (
                  <div className="px-4 py-4 border-t border-gray-100">
                    <p className="text-sm text-[#969B9F]">
                      Найдено{' '}
                      <span className="text-[#333333]">{products.length}</span>
                      {' товаров'}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>

          {products.length === 0 && !isFetching && (
            <div className="text-center py-8 text-gray-500">
              {isSearching ? 'Товары не найдены' : 'Товары не найдены'}
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
