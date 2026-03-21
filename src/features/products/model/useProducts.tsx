// entities/product/model/useProducts.ts
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getProducts, searchProducts } from '../api/productsApi';
import { useState, useCallback, useEffect } from 'react';

export const useProducts = () => {
  const [params, setParams] = useState({
    limit: 10,
    skip: 0,
    sortBy: 'title',
    order: 'asc' as 'asc' | 'desc',
    search: '',
  });

  // Локальное состояние для добавленных товаров
  const [localProducts, setLocalProducts] = useState<any[]>([]);

  const isSearching = params.search.length > 0;

  // Основной запрос для списка товаров
  const listQuery = useQuery({
    queryKey: ['products', params.sortBy, params.order, params.skip, params.limit],
    queryFn: () => getProducts({
      limit: params.limit,
      skip: params.skip,
      sortBy: params.sortBy,
      order: params.order,
    }),
    placeholderData: keepPreviousData,
    enabled: !isSearching,
  });

  // Отдельный запрос для поиска
  const searchQuery = useQuery({
    queryKey: ['products', 'search', params.search],
    queryFn: () => searchProducts(params.search),
    enabled: isSearching,
  });

  // Функция добавления товара (локально)
  const addProduct = useCallback((product: any) => {
    const newProduct = {
      id: Date.now(),
      ...product,
      category: 'Новый товар',
      rating: 0,
      thumbnail: '',
    };
    setLocalProducts(prev => [newProduct, ...prev]);
  }, []);

  // Безопасное получение данных
  const apiProducts = isSearching 
    ? searchQuery.data?.products ?? [] 
    : listQuery.data?.products ?? [];
  
  const apiTotal = isSearching 
    ? searchQuery.data?.total ?? 0 
    : listQuery.data?.total ?? 0;

  // Объединяем API товары с локально добавленными
  const products = [...localProducts, ...apiProducts];
  const total = apiTotal + localProducts.length;

  const isLoading = isSearching ? searchQuery.isLoading : listQuery.isLoading;
  const isFetching = isSearching ? searchQuery.isFetching : listQuery.isFetching;
  const error = isSearching ? searchQuery.error : listQuery.error;

  const currentPage = Math.floor(params.skip / params.limit) + 1;
  const totalPages = Math.ceil(total / params.limit);

  const handleSort = useCallback((sortBy: string) => {
    setParams(prev => ({
      ...prev,
      sortBy,
      order: prev.sortBy === sortBy && prev.order === 'asc' ? 'desc' : 'asc',
      skip: 0,
      search: '',
    }));
    setLocalProducts([]);
  }, []);

  const handleSearch = useCallback((search: string) => {
    setParams(prev => ({
      ...prev,
      search,
      skip: 0,
    }));
    setLocalProducts([]);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    if (isSearching) return;
    setParams(prev => ({
      ...prev,
      skip: (page - 1) * prev.limit,
    }));
  }, [isSearching]);

  const handleLimitChange = useCallback((limit: number) => {
    if (isSearching) return;
    setParams(prev => ({
      ...prev,
      limit,
      skip: 0,
    }));
  }, [isSearching]);

  // Функция обновления
  const refetch = useCallback(() => {
    if (isSearching) {
      return searchQuery.refetch();
    }
    return listQuery.refetch();
  }, [isSearching, searchQuery.refetch, listQuery.refetch]);

  return {
    products,
    total,
    isLoading,
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
    addProduct,
    refetch
  };
};