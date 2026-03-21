// entities/product/model/useProducts.ts
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getProducts, searchProducts } from '../api/productsApi';
import { useState, useCallback, useMemo } from 'react';

export const useProducts = () => {
  const [params, setParams] = useState({
    limit: 10,
    skip: 0,
    sortBy: 'title',
    order: 'asc' as 'asc' | 'desc',
    search: '',
  });

  const [localProducts, setLocalProducts] = useState<any[]>([]);

  const isSearching = params.search.length > 0;

  // Единый useQuery с условной логикой
  const { data, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: isSearching 
      ? ['products', 'search', params.search]
      : ['products', params.sortBy, params.order, params.skip, params.limit],
    queryFn: async () => {
      if (isSearching) {
        return searchProducts(params.search);
      }
      return getProducts({
        limit: params.limit,
        skip: params.skip,
        sortBy: params.sortBy,
        order: params.order,
      });
    },
    placeholderData: keepPreviousData,
  });

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

  // Мемоизация данных для предотвращения лишних ререндеров
  const apiProducts = data?.products ?? [];
  const apiTotal = data?.total ?? 0;

  const products = useMemo(() => {
    return [...localProducts, ...apiProducts];
  }, [localProducts, apiProducts]);

  const total = apiTotal + localProducts.length;

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
    console.log('📝 handleSearch called with:', search);
    setParams(prev => ({
      ...prev,
      search,
      skip: 0,
    }));
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setParams(prev => ({
      ...prev,
      skip: (page - 1) * prev.limit,
    }));
  }, []);

  const handleLimitChange = useCallback((limit: number) => {
    setParams(prev => ({
      ...prev,
      limit,
      skip: 0,
    }));
  }, []);

  // Функция ручного обновления
  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

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
    refetch: handleRefresh,
  };
};
