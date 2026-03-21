// features/products/ui/AddProductModal/AddProductModal.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../../../../shared/ui/Input/Input';
// import { X } from 'lucide-react'; // или своя иконка

// Схема валидации
const productSchema = z.object({
  title: z.string()
    .min(1, 'Наименование обязательно')
    .min(2, 'Минимум 2 символа')
    .max(100, 'Максимум 100 символов'),
  price: z.number()
    .min(0.01, 'Цена должна быть больше 0')
    .max(9999999, 'Слишком большая цена'),
  brand: z.string()
    .min(1, 'Вендор обязателен')
    .min(2, 'Минимум 2 символа'),
  sku: z.string()
    .min(1, 'Артикул обязателен')
    .min(2, 'Минимум 2 символа'),
});

type ProductFormData = z.infer<typeof productSchema>;

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: ProductFormData) => void;
}

export const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: '',
      price: 0,
      brand: '',
      sku: '',
    },
  });

  const onSubmit = async (data: ProductFormData) => {
    try {
      await onAdd(data);
      reset(); // Очищаем форму
      onClose(); // Закрываем модалку
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleClose = () => {
    reset(); // Очищаем форму при закрытии
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-md mx-4 animate-in zoom-in-95 duration-200">
        {/* Заголовок */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Добавить товар
          </h2>
          <button
            onClick={handleClose}
            className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {/* <X className="w-5 h-5 text-gray-500" /> */}
          </button>
        </div>

        {/* Форма */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
          {/* Наименование */}
          <Input
            label="Наименование"
            register={register('title')}
            error={errors.title?.message}
            placeholder="Введите название товара"
          />

          {/* Цена */}
          <Input
            label="Цена"
            type="number"
            register={register('price', { valueAsNumber: true })}
            error={errors.price?.message}
            placeholder="0.00"
          />

          {/* Вендор */}
          <Input
            label="Вендор"
            register={register('brand')}
            error={errors.brand?.message}
            placeholder="Название бренда"
          />

          {/* Артикул */}
          <Input
            label="Артикул"
            register={register('sku')}
            error={errors.sku?.message}
            placeholder="SKU-код"
          />

          {/* Кнопки действий */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Добавление...
                </>
              ) : (
                'Добавить'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};