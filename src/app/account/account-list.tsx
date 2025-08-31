'use client';

import { Button, ToolTip } from '@/components/form';
import { Column } from '@/components/table/base-table';
import { apiConfig } from '@/constants';
import { DEFAULT_TABLE_PAGE_SIZE } from '@/constants/constant';
import { CategoryResType } from '@/types';
import { AccountResType } from '@/types/account.type';
import { SquarePen } from 'lucide-react';

export default function AccountList() {
  const columns: Column<AccountResType>[] = [
    { title: 'Name', dataIndex: 'fullName' },
    { title: 'Status', dataIndex: 'status', width: 100, align: 'center' },
    {
      title: 'Action',
      width: 100,
      align: 'center',
      render: (value) => (
        <ToolTip content='Sửa'>
          <Button variant='ghost' className='hover:bg-transparent'>
            <SquarePen className='text-blue-500' />
          </Button>
        </ToolTip>
      )
    }
  ];
  return (
    <div className='flex h-[90vh] flex-col overflow-auto px-4 py-4'>
      <div className='flex-1'>
        {/* <BaseTable
          columns={columns}
          dataSource={data || []}
          rowKey='id'
          pagination={pagination}
        /> */}
      </div>
    </div>
  );
}
