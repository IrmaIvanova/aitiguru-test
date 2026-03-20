import { apiClient } from '../../../shared/api/apiClient';

export interface IProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  brand: string;
  sku: string;
  thumbnail?: string;
}

export interface IProductsResponse {
  products: IProduct[];
  total: number;
  skip: number;
  limit: number;
}

export interface IGetProductsParams {
  limit?: number;
  skip?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
  q?: string; // поиск
}

export const getProducts = async (params?: IGetProductsParams) => {
  const response = await apiClient.get<IProductsResponse>('/products', {
    params: {
      limit: params?.limit || 30,
      skip: params?.skip || 0,
      sortBy: params?.sortBy,
      order: params?.order,
      q: params?.q,
    },
  });
  return response.data;
};

export const searchProducts = async (query: string) => {
  const response = await apiClient.get<IProductsResponse>('/products/search', {
    params: { q: query },
  });
  return response.data;
};

// Добавление товара (имитация)
export const addProduct = async (product: Omit<IProduct, 'id'>) => {
  const response = await apiClient.post('/products/add', product);
  return response.data;
};