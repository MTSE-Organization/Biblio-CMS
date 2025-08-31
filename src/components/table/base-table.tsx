'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import './base-table.css';

import Pagination from '@/components/pagination';
import { PaginationType } from '@/types';

export interface Column<T> {
  title: string;
  dataIndex?: keyof T;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  width?: string | number;
  align?: 'left' | 'right' | 'center';
}

interface BaseTableProps<T> {
  columns: Column<T>[];
  dataSource: T[];
  rowKey: keyof T;
  pagination: PaginationType;
}

export default function BaseTable<T extends Record<any, any>>({
  columns,
  dataSource,
  rowKey,
  pagination
}: BaseTableProps<T>) {
  const { current, pageSize, total } = pagination;
  return (
    <div className='flex h-full flex-col overflow-hidden rounded-lg border bg-white text-sm'>
      <div className='base-table flex-1'>
        <Table className='w-full border border-gray-100'>
          <TableHeader className='bg-gray-50'>
            <TableRow>
              {columns.map((col, idx) => (
                <TableHead
                  key={idx}
                  className={`border border-gray-100 px-4 py-2 ${
                    col.align ? `text-${col.align}` : 'text-left'
                  }`}
                  style={{ width: col.width }}
                >
                  {col.title}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataSource.map((row, rowIndex) => (
              <TableRow key={String(row[rowKey])} className='hover:bg-gray-50'>
                {columns.map((col, colIndex) => (
                  <TableCell
                    key={colIndex}
                    className={`border border-gray-100 px-4 py-2 ${
                      col.align ? `text-${col.align}` : 'text-left'
                    }`}
                  >
                    {col.render
                      ? col.render(
                          col.dataIndex ? row[col.dataIndex] : undefined,
                          row,
                          rowIndex
                        )
                      : col.dataIndex
                        ? row[col.dataIndex]
                        : null}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Pagination totalPages={total} />
    </div>
  );
}
