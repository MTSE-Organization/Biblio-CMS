'use client';

import { Button, Col, InputField, Row, ToolTip } from '@/components/form';
import { BaseForm } from '@/components/form/base-form';
import { PageWrapper } from '@/components/layout';
import ListPageWrapper from '@/components/layout/list-page-wrapper';
import { BaseTable } from '@/components/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Separator } from '@/components/ui/separator';
import { DEFAULT_TABLE_PAGE_SIZE, DEFAULT_TABLE_PAGE_START } from '@/constants';
import { useQueryParams } from '@/hooks';
import { useGroupDeleteMutation, useGroupListQuery } from '@/queries';
import { groupSearchParamSchema } from '@/schemaValidations';
import {
  Column,
  GroupResType,
  GroupSearchParamType,
  PaginationType
} from '@/types';
import {
  BrushCleaning,
  Edit2,
  Info,
  PlusIcon,
  Search,
  Trash
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

export default function PermissionPage() {
  const [queryFilter, setQueryFilter] = useState<GroupSearchParamType>({
    page: DEFAULT_TABLE_PAGE_START,
    size: DEFAULT_TABLE_PAGE_SIZE
  });
  const { searchParams, setQueryParams } =
    useQueryParams<GroupSearchParamType>();
  const [pagination, setPagination] = useState<PaginationType>({
    current: DEFAULT_TABLE_PAGE_START + 1,
    pageSize: DEFAULT_TABLE_PAGE_SIZE,
    total: 0
  });
  const groupListQuery = useGroupListQuery(queryFilter);
  const deleteGroupMutation = useGroupDeleteMutation();

  const columns: Column<GroupResType>[] = [
    {
      title: 'Tên',
      dataIndex: 'name'
    },
    {
      title: 'Hành động',
      align: 'center',
      width: 120,
      render: (_, record) => {
        return (
          <div className='flex items-center justify-center'>
            <ToolTip title='Sửa quyền'>
              <Button className='border-none bg-transparent shadow-none hover:bg-transparent'>
                <Edit2 className='stroke-dodger-blue size-3.5' />
              </Button>
            </ToolTip>
            <Separator orientation='vertical' className='h-4! bg-gray-200' />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className='border-none bg-transparent shadow-none hover:bg-transparent'>
                  <ToolTip title='Xóa quyền'>
                    <Trash className='size-3.5 stroke-red-600' />
                  </ToolTip>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className='data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-0! data-[state=closed]:slide-out-to-top-0! data-[state=open]:slide-in-from-left-0! data-[state=open]:slide-in-from-top-0! top-[30%]'>
                <AlertDialogHeader>
                  <AlertDialogTitle className='text-md flex items-center gap-2 font-normal'>
                    <Info className='size-8 fill-orange-500 stroke-white' />
                    Bạn có chắc chắn muốn xóa quyền này không ?
                  </AlertDialogTitle>
                  <AlertDialogDescription></AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel asChild>
                    <Button
                      variant='outline'
                      className='border-red-500 text-red-500 transition-all duration-200 ease-linear hover:text-red-500/80'
                    >
                      Không
                    </Button>
                  </AlertDialogCancel>
                  <AlertDialogAction asChild>
                    <Button
                      onClick={() => handleDelete(record)}
                      className='bg-dodger-blue hover:bg-dodger-blue/80 cursor-pointer transition-all duration-200 ease-linear'
                    >
                      Có
                    </Button>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        );
      }
    }
  ];

  useEffect(() => {
    setPagination((p) => ({
      ...p,
      total: groupListQuery.data?.data.totalPages!
    }));
  }, [groupListQuery.data]);

  const defaultValues: GroupSearchParamType = {
    name: '',
    kind: ''
    // isSystemRole: false
  };

  const handleDelete = async (record: GroupResType) => {
    deleteGroupMutation.mutateAsync(record.id);
  };

  const handleChangePagination = (page: number) => {
    setQueryFilter({ ...queryFilter, page: page - 1 });
    setPagination({ ...pagination, current: page });
    setQueryParams({ ...searchParams, page: page });
  };

  const onSubmit = async (values: GroupSearchParamType) => {
    const filtered = Object.entries(values).filter(
      ([, value]) =>
        value !== null && value !== undefined && value.toString().trim() !== ''
    );
    setQueryFilter({ ...queryFilter, ...Object.fromEntries(filtered) });
    setQueryParams({ ...searchParams, ...Object.fromEntries(filtered) });
  };

  const handleReset = (form: UseFormReturn<GroupSearchParamType>) => {
    form.reset();
    setQueryFilter({
      page: DEFAULT_TABLE_PAGE_START,
      size: DEFAULT_TABLE_PAGE_SIZE
    });
    setPagination({
      current: DEFAULT_TABLE_PAGE_START + 1,
      pageSize: DEFAULT_TABLE_PAGE_SIZE,
      total: 0
    });
    setQueryParams({});
  };

  const initialValues = useMemo(() => Object.fromEntries(searchParams), []);

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
            initialValues={initialValues}
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
                      onClick={() => handleReset(form)}
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
          dataSource={groupListQuery.data?.data.content || []}
          pagination={pagination}
          loading={groupListQuery.isLoading || groupListQuery.isFetching}
          changePagination={handleChangePagination}
        />
      </ListPageWrapper>
    </PageWrapper>
  );
}
