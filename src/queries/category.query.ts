'use client';

import { categoryApiRequest } from '@/api-requests';
import { logger } from '@/logger';
import { CategoryBodyType, CategorySearchParamType } from '@/types';
import { notify } from '@/utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useCategoryListQuery = (params?: CategorySearchParamType) => {
  return useQuery({
    queryKey: ['category-list', params],
    queryFn: () => categoryApiRequest.getList(params)
  });
};

export const useCategoryAutoQuery = (params?: CategorySearchParamType) => {
  return useQuery({
    queryKey: ['category-list'],
    queryFn: () => categoryApiRequest.autoComplete(params)
  });
};

export const useCategoryQuery = (id: string) => {
  return useQuery({
    queryKey: ['category'],
    queryFn: () => categoryApiRequest.getById(id)
  });
};

export const useCreateCategoryMutation = () => {
  return useMutation({
    mutationKey: ['category-create'],
    mutationFn: async (body: Omit<CategoryBodyType, 'id'>) =>
      await categoryApiRequest.create(body)
  });
};

export const useUpdateCategoryMutation = () => {
  return useMutation({
    mutationKey: ['category-update'],
    mutationFn: async (body: CategoryBodyType) =>
      await categoryApiRequest.update(body)
  });
};

export const useUpdateOrderingCategoryMutation = () => {
  return useMutation({
    mutationKey: ['category-update'],
    mutationFn: async (body: CategoryBodyType) =>
      await categoryApiRequest.update(body)
  });
};

export const useDeleteCategoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['category-delete'],
    mutationFn: async (id: string) => await categoryApiRequest.delete(id),
    onSuccess: (res) => {
      if (res.result) {
        queryClient.invalidateQueries({
          queryKey: ['category-list']
        });
        notify.success('Xóa danh mục thành công');
      } else {
        notify.error('Xóa danh mục thất bại');
      }
    },
    onError: (error) => {
      logger.error(`Error while deleting category: `, error);
      notify.error('Xóa danh mục thất bại');
    }
  });
};
