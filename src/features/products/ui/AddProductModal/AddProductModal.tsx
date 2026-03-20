import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../../../../shared/ui/Input';

const productSchema = z.object({
  title: z.string().min(1, 'Обязательное поле'),
  price: z.number().min(0, 'Цена должна быть положительной'),
  brand: z.string().min(1, 'Обязательное поле'),
  sku: z.string().min(1, 'Обязательное поле'),
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
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = (data: ProductFormData) => {
    onAdd(data);
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Добавить товар
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Наименование"
            register={register('title')}
            error={errors.title?.message}
            placeholder="Введите название"
          />

          <Input
            label="Цена"
            type="number"
            register={register('price', { valueAsNumber: true })}
            error={errors.price?.message}
            placeholder="0.00"
          />

          <Input
            label="Вендор"
            register={register('brand')}
            error={errors.brand?.message}
            placeholder="Бренд"
          />

          <Input
            label="Артикул"
            register={register('sku')}
            error={errors.sku?.message}
            placeholder="SKU"
          />

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Добавить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};