// entities/product/model/useProducts.ts
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getProducts, searchProducts } from '../api/productsApi';
import { useState, useCallback } from 'react';

export const useProducts = () => {
  const [params, setParams] = useState({
    limit: 10,
    skip: 0,
    sortBy: 'title',
    order: 'asc' as 'asc' | 'desc',
    search: '',
  });

  // Разделяем queryKey для поиска и обычного списка
  const isSearching = params.search.length > 0;

  const {
    data,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    // Для поиска используем отдельный queryKey
    queryKey: isSearching 
      ? ['products', 'search', params.search]
      : ['products', params.sortBy, params.order, params.skip, params.limit],
    queryFn: async () => {
      if (isSearching) {
        // Поиск - игнорируем пагинацию
        const result = await searchProducts(params.search);
        return result;
      }
      // Обычный список с пагинацией
      return getProducts({
        limit: params.limit,
        skip: params.skip,
        sortBy: params.sortBy,
        order: params.order,
      });
    },
    placeholderData: keepPreviousData,
  });

  const handleSort = useCallback((sortBy: string) => {
    setParams(prev => ({
      ...prev,
      sortBy,
      order: prev.sortBy === sortBy && prev.order === 'asc' ? 'desc' : 'asc',
      skip: 0,
      search: '', // Сбрасываем поиск при сортировке
    }));
  }, []);

  const handleSearch = useCallback((search: string) => {
    setParams(prev => ({
      ...prev,
      search,
      skip: 0, // Сбрасываем страницу
    }));
  }, []);

  const handlePageChange = useCallback((page: number) => {
    if (isSearching) return; // При поиске пагинация не работает
    setParams(prev => ({
      ...prev,
      skip: (page - 1) * prev.limit,
    }));
  }, [isSearching]);

  const handleLimitChange = useCallback((limit: number) => {
    if (isSearching) return; // При поиске пагинация не работает
    setParams(prev => ({
      ...prev,
      limit,
      skip: 0,
    }));
  }, [isSearching]);

  const products = data?.products || [];
  const total = data?.total || 0;
  const currentPage = Math.floor(params.skip / params.limit) + 1;
  const totalPages = Math.ceil(total / params.limit);

  return {
    products,
    total,
    isLoading: isLoading && !isSearching,
    isSearching,
    isFetching,
    error,
    params,
    currentPage,
    totalPages,
    handleSort,
    handleSearch,
    handlePageChange,
    handleLimitChange,
  };
};

