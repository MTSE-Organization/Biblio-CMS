'use client';

import { Button, Col, InputField, Row, ToolTip } from '@/components/form';
import { BaseForm } from '@/components/form/base-form';
import { PageWrapper } from '@/components/layout';
import ListPageWrapper from '@/components/layout/list-page-wrapper';
import { BaseTable } from '@/components/table';
import { Separator } from '@/components/ui/separator';
import { DEFAULT_TABLE_PAGE_SIZE, DEFAULT_TABLE_PAGE_START } from '@/constants';
import { useGroupListQuery } from '@/queries';
import { groupSearchParamSchema } from '@/schemaValidations';
import {
  Column,
  GroupResType,
  GroupSearchParamType,
  PaginationType
} from '@/types';
import { BrushCleaning, Edit2, PlusIcon, Search, Trash, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function PermissionPage() {
  const [params, setParams] = useState<GroupSearchParamType>({
    page: DEFAULT_TABLE_PAGE_START,
    size: DEFAULT_TABLE_PAGE_SIZE
  });
  const { data, isLoading, error } = useGroupListQuery({ ...params });
  const [pagination, setPagination] = useState<PaginationType>({
    current: DEFAULT_TABLE_PAGE_START,
    pageSize: DEFAULT_TABLE_PAGE_SIZE,
    total: 0
  });

  const columns: Column<GroupResType>[] = [
    {
      title: 'Tên',
      dataIndex: 'name'
    },
    {
      title: 'Hành động',
      align: 'center',
      width: 120,
      render: () => {
        return (
          <div className='flex items-center justify-center'>
            <ToolTip title='Sửa quyền'>
              <Button className='border-none bg-transparent shadow-none hover:bg-transparent'>
                <Edit2 className='stroke-dodger-blue size-3.5' />
              </Button>
            </ToolTip>
            <Separator
              orientation='vertical'
              className='h-4 w-[1px] bg-gray-200'
            />
            <ToolTip title='Xóa quyền'>
              <Button className='border-none bg-transparent shadow-none hover:bg-transparent'>
                <Trash className='size-3.5 stroke-red-600' />
              </Button>
            </ToolTip>
          </div>
        );
      }
    }
  ];

  useEffect(() => {
    setPagination((p) => ({ ...p, total: data?.data.totalPages! }));
  }, [data]);

  const onSubmit = async (values: GroupSearchParamType) => {
    console.log('🚀 ~ onSubmit ~ values:', values);
  };

  const defaultValues: GroupSearchParamType = {
    name: '',
    kind: '',
    isSystemRole: false
  };

  return (
    <PageWrapper
      breadcrumbs={[{ label: 'Trang chủ', href: '/' }, { label: 'Quyền' }]}
    >
      <ListPageWrapper
        actionBar={
          <Button className='bg-dodger-blue hover:bg-dodger-blue/80'>
            <PlusIcon />
            Thêm mới
          </Button>
        }
        searchForm={
          <BaseForm
            defaultValues={defaultValues}
            onSubmit={onSubmit}
            schema={groupSearchParamSchema}
          >
            {(form) => (
              <>
                <Row className='gap-2'>
                  <Col span={3}>
                    <InputField
                      control={form.control}
                      name='name'
                      placeholder='Tên quyền'
                      className='focus-visible:ring-dodger-blue'
                    />
                  </Col>
                  <Col span={3}>
                    <InputField
                      control={form.control}
                      name='kind'
                      placeholder='Quyền'
                      className='focus-visible:ring-dodger-blue'
                    />
                  </Col>
                  <Col className='w-9'>
                    <Button
                      type='submit'
                      className='bg-dodger-blue hover:bg-dodger-blue/80'
                    >
                      <Search />
                    </Button>
                  </Col>
                  <Col className='w-9'>
                    <Button
                      type='button'
                      className='hover:[&>svg]:stroke-dodger-blue hover:border-dodger-blue border border-gray-300 bg-white hover:bg-transparent [&>svg]:stroke-black'
                    >
                      <BrushCleaning className='transition-all duration-200 ease-linear' />
                    </Button>
                  </Col>
                </Row>
              </>
            )}
          </BaseForm>
        }
      >
        <BaseTable
          columns={columns}
          dataSource={data?.data.content || []}
          pagination={pagination}
          loading={isLoading}
        />
      </ListPageWrapper>
    </PageWrapper>
  );
}
