// pages/products/ui/ProductsPage.tsx
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useProducts } from '../../features/products/model/useProducts';
import { ProductsTable } from '../../features/products/ui/ProductsTable/ProductsTable';
import { ProductHeader } from '../../features/products/ui/ProductHeader/ProductHeader';
import { AddProductModal } from '../../features/products/ui/AddProductModal/AddProductModal';
import { Pagination } from '../../shared/ui/Pagination/Pagination';
import { RefreshButton } from '../../shared/ui/Buttons/RefreshButton/RefreshButton';
import { Button } from '../../shared/ui/Buttons/Button';
import { PlusIcon } from '../../shared/ui/Icons/PlusIcon/PlusIcon';

export const ProductsPage: React.FC = () => {
  const {
    products,
    total,
    isLoading,
    isFetching,
    params,
    currentPage,
    totalPages,
    isSearching,

    handleSort,
    handleSearch,
    handlePageChange,
    handleLimitChange,
    addProduct,
    refetch, // 👈 Добавьте refetch из useProducts
  } = useProducts();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    toast.info('Таблица обновлена');
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const handleAddProduct = (data: any) => {
    // Сохраняем локально (без API)
    addProduct(data);

    // Показываем уведомление
    toast.success('Товар успешно добавлен! 🎉', {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
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
            <p className="text-gray-600 font-medium">Все позиции</p>
            <div className="flex items-center gap-3">
              <RefreshButton
                onRefresh={handleRefresh}
              // isLoading={isRefreshing || isFetching}
              />
              <Button
                variant='primary'
                onClick={() => setIsModalOpen(true)}
                leftIcon={
                  <PlusIcon className="w-5 h-5" />
                }
              >
                Добавить
              </Button>
            </div>
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
