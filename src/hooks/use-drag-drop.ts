'use client';

import { logger } from '@/logger';
import { ApiConfig, ApiResponse } from '@/types';
import { http, notify } from '@/utils';
import { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useMutation } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useState } from 'react';

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
  const [sortedData, setSortedData] = useState<T[]>([]);

  const updateOrderingMutation = useMutation({
    mutationKey: ['updateOrdering', apiConfig.baseUrl],
    mutationFn: (body: any) =>
      http.put<ApiResponse<any>>(apiConfig, {
        body
      })
  });

  const initialSortedData = useMemo(() => {
    if (!data || data.length === 0) return [];

    return [...data].sort((a, b) => {
      const aValue = a[sortField] as number;
      const bValue = b[sortField] as number;
      return aValue - bValue;
    });
  }, [data, sortField]);

  useEffect(() => {
    setSortedData(initialSortedData);
    setIsChanged(false);
  }, [initialSortedData]);

  const onDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (!active || !over || active.id === over.id) return;

    setSortedData((prevData) => {
      const activeIndex = prevData.findIndex((item) => item.id === active.id);
      const overIndex = prevData.findIndex((item) => item.id === over.id);

      if (activeIndex === -1 || overIndex === -1) return prevData;

      const newData = arrayMove(prevData, activeIndex, overIndex);
      return newData;
    });

    setIsChanged(true);
  }, []);

  const handleUpdate = useCallback(async () => {
    if (!isChanged) return;

    const dataUpdate = sortedData.map((item, index) => ({
      id: item.id,
      [sortField]: index
    }));

    try {
      await updateOrderingMutation.mutateAsync(dataUpdate);
      setIsChanged(false);
      notify.success(`Cập nhật thứ tự ${objectName} thành công`);
    } catch (error) {
      logger.error('Error while updating ordering:', error);
      notify.error(`Cập nhật thứ tự ${objectName} thất bại`);

      setSortedData(initialSortedData);
      setIsChanged(false);
    }
  }, [
    isChanged,
    sortedData,
    sortField,
    objectName,
    updateOrderingMutation,
    initialSortedData
  ]);

  return {
    isChanged,
    setIsChanged,
    sortedData,
    onDragEnd,
    handleUpdate,
    loading: updateOrderingMutation.isPending
  };
};

export default useDragDrop;
