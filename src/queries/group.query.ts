'use client';

import { groupApiRequest } from '@/api-requests';
import { logger } from '@/logger';
import { GroupBodyType, GroupSearchParamType } from '@/types';
import { notify } from '@/utils';
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query';

export const useGroupListQuery = (params?: GroupSearchParamType) => {
  return useQuery({
    queryKey: ['group-list', params],
    queryFn: async () => await groupApiRequest.getList(params),
    placeholderData: keepPreviousData
  });
};

export const useGroupQuery = (id: number) => {
  return useQuery({
    queryKey: ['group', id],
    queryFn: async () => await groupApiRequest.getById(id),
    enabled: !!id
  });
};

export const useGroupMutation = (body: GroupBodyType) => {
  const queryClient = useQueryClient();
  const isCreate = !body.id;
  return useMutation({
    mutationKey: ['group-create'],
    mutationFn: async () =>
      isCreate
        ? await groupApiRequest.update(body as GroupBodyType)
        : await groupApiRequest.create(body),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['group-list'] }),
    onError: (error) => {
      logger.error(`Error while group: `, error);
      notify.error('Thêm mới nhóm quyền thất bại');
    }
  });
};

export const useGroupDeleteMutation = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['group-delete'],
    mutationFn: async () => await groupApiRequest.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['group-list'] });
      notify.success('Xóa nhóm thành công');
    },
    onError: (error) => {
      logger.error(`Error while deleting group: `, error);
      notify.success('Xóa nhóm thất bại');
    }
  });
};
