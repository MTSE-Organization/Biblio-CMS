import { PaginationType } from '@/types/table.type';
import { DragEndEvent } from '@dnd-kit/core';

export type Column<T> = {
  title: string;
  dataIndex?: keyof T;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  width?: string | number;
  align?: 'left' | 'right' | 'center';
};

export type BaseTableProps<T> = {
  columns: Column<T>[];
  dataSource: T[];
  rowKey?: string;
  pagination: PaginationType;
  loading: boolean;
  changePagination: (page: number) => void;
};

export type DragDropTableProps<T extends Record<any, any>> = {
  columns: Column<T>[];
  dataSource: T[];
  rowKey?: string;
  loading: boolean;
  onDragEnd?: (event: DragEndEvent) => void;
};
