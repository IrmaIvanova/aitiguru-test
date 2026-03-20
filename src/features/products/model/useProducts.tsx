// entities/product/model/useProduct.tsx (или useProducts.ts)
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getProducts, searchProducts } from '../api/productsApi';
import { useState, useCallback, useEffect } from 'react';

export const useProducts = () => {
    const [params, setParams] = useState({
        limit: 30,
        skip: 0,
        sortBy: 'title',
        order: 'asc' as 'asc' | 'desc',
        search: '',
    });

    // Основной запрос
    const {
        data,
        isLoading,
        isFetching,
        error,
    } = useQuery({
        queryKey: ['products', params.sortBy, params.order, params.skip],
        queryFn: () => getProducts({
            limit: params.limit,
            skip: params.skip,
            sortBy: params.sortBy,
            order: params.order,
        }),
        placeholderData: keepPreviousData, // 👈 Это важно!

    });

    // Поиск - отдельный запрос, который выполняется только когда есть search
    const {
        data: searchData,
        isLoading: isSearching,
    } = useQuery({
        queryKey: ['products', 'search', params.search],
        queryFn: () => searchProducts(params.search),
        enabled: params.search.length > 0, // 👈 ВАЖНО: запрос выполняется только если есть поиск
    });

    // Используем useCallback чтобы функция не создавалась заново при каждом рендере
    const handleSort = useCallback((sortBy: string) => {
        setParams(prev => ({
            ...prev,
            sortBy,
            order: prev.sortBy === sortBy && prev.order === 'asc' ? 'desc' : 'asc',
        }));
    }, []);

    // Используем useCallback для поиска
    const handleSearch = useCallback((search: string) => {
        setParams(prev => ({ ...prev, search }));
    }, []);

    // Определяем какие данные показывать
    const products = params.search ? searchData?.products : data?.products;
    const total = params.search ? searchData?.total : data?.total;
    const loading = isLoading || (params.search ? isSearching : false);

    return {
        products: products || [],
        total: total || 0,
        isLoading: loading,
        isFetching: isFetching,
        error,
        params,
        handleSort,
        handleSearch,
    };
};