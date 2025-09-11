'use client';

import { logger } from '@/logger';
import { ApiConfig, ApiResponse } from '@/types';
import { http, notify } from '@/utils';
import { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useMutation } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';

const useDragDrop = <T extends Record<string, any>>({
  objectName,
  data,
  apiConfig,
  sortField = 'ordering'
}: {
  objectName: string;
  data: T[];
  apiConfig: ApiConfig;
  sortField?: keyof T;
}) => {
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [draggedData, setDraggedData] = useState<T[]>([]);

  const updateOrderingMutation = useMutation({
    mutationKey: ['updateOrdering', apiConfig.baseUrl],
    mutationFn: (body: any) =>
      http.put<ApiResponse<any>>(apiConfig, {
        body
      })
  });

  const sortedData = useMemo(() => {
    if (isChanged && draggedData.length > 0) {
      return draggedData;
    }

    if (!data || data.length === 0) return [];

    return [...data].sort((a, b) => {
      const aValue = a[sortField] as number;
      const bValue = b[sortField] as number;
      return aValue - bValue;
    });
  }, [data, sortField, isChanged, draggedData]);

  const onDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (!active || !over || active.id === over.id) return;

      const currentData =
        isChanged && draggedData.length > 0
          ? draggedData
          : data
            ? [...data].sort((a, b) => {
                const aValue = a[sortField] as number;
                const bValue = b[sortField] as number;
                return aValue - bValue;
              })
            : [];

      const activeIndex = currentData.findIndex(
        (item) => item.id === active.id
      );
      const overIndex = currentData.findIndex((item) => item.id === over.id);

      if (activeIndex === -1 || overIndex === -1) return;

      const newData = arrayMove(currentData, activeIndex, overIndex);
      setDraggedData(newData);
      setIsChanged(true);
    },
    [data, sortField, isChanged, draggedData]
  );

  const handleUpdate = useCallback(async () => {
    if (!isChanged || draggedData.length === 0) return;

    const dataUpdate = draggedData.map((item, index) => ({
      id: item.id,
      [sortField]: index
    }));

    try {
      await updateOrderingMutation.mutateAsync(dataUpdate);
      setIsChanged(false);
      setDraggedData([]);
      notify.success(`Cập nhật thứ tự ${objectName} thành công`);
    } catch (error) {
      logger.error('Error while updating ordering:', error);
      notify.error(`Cập nhật thứ tự ${objectName} thất bại`);

      setIsChanged(false);
      setDraggedData([]);
    }
  }, [isChanged, draggedData, sortField, objectName, updateOrderingMutation]);

  const resetChanges = useCallback(() => {
    setIsChanged(false);
    setDraggedData([]);
  }, []);

  return {
    isChanged,
    setIsChanged,
    sortedData,
    onDragEnd,
    handleUpdate,
    resetChanges,
    loading: updateOrderingMutation.isPending
  };
};

export default useDragDrop;
