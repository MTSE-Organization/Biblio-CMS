'use client';

import {
  AvatarField,
  Button,
  Col,
  InputField,
  Row,
  ToolTip
} from '@/components/form';
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
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  AppConstants,
  DEFAULT_TABLE_PAGE_SIZE,
  DEFAULT_TABLE_PAGE_START,
  statusOptions
} from '@/constants';
import { useNavigate, useQueryParams } from '@/hooks';
import { cn } from '@/lib';
import { useCategoryListQuery, useDeleteCategoryMutation } from '@/queries';
import route from '@/routes';
import { categorySearchParamSchema } from '@/schemaValidations';
import {
  CategoryResType,
  CategorySearchParamType,
  Column,
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
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

export default function CategoryPage() {
  const navigate = useNavigate();
  const [queryFilter, setQueryFilter] = useState<CategorySearchParamType>({
    page: DEFAULT_TABLE_PAGE_START,
    size: DEFAULT_TABLE_PAGE_SIZE
  });
  const { searchParams, setQueryParams } =
    useQueryParams<CategorySearchParamType>();
  const [pagination, setPagination] = useState<PaginationType>({
    current: DEFAULT_TABLE_PAGE_START + 1,
    pageSize: DEFAULT_TABLE_PAGE_SIZE,
    total: 0
  });

  const categoryListQuery = useCategoryListQuery(queryFilter);
  const deleteCategoryMutation = useDeleteCategoryMutation();

  const handleEdit = (id: string) => {
    navigate(`${route.category.path}/${id}`);
  };

  const handleDelete = async (record: CategoryResType) => {
    deleteCategoryMutation.mutateAsync(record.id);
  };

  useEffect(() => {
    setPagination((p) => ({
      ...p,
      total: categoryListQuery.data?.data.totalPages!
    }));
  }, [categoryListQuery.data]);

  const columns: Column<CategoryResType>[] = [
    {
      title: '#',
      dataIndex: 'imageUrl',
      width: 100,
      align: 'center',
      render: (value) => (
        <AvatarField
          size={50}
          className={cn('mx-auto', {
            rounded: value
          })}
          previewClassName='rounded'
          disablePreview={!value}
          src={value && `${AppConstants.contentRootUrl}${value}`}
        />
      )
    },
    {
      title: 'Tên',
      dataIndex: 'name'
    },
    {
      title: 'Trạng thái',
      width: 150,
      dataIndex: 'status',
      align: 'center',
      render: (value) => {
        const status = statusOptions.find((st) => st.value === value);
        return (
          <Badge
            className='text-sm font-normal'
            style={{ backgroundColor: status?.color }}
          >
            {status?.label}
          </Badge>
        );
      }
    },
    {
      title: 'Hành động',
      align: 'center',
      width: 120,
      render: (_, record) => {
        return (
          <div className='flex items-center justify-center'>
            <ToolTip title='Sửa danh mục'>
              <Button
                onClick={() => handleEdit(record.id)}
                className='border-none bg-transparent shadow-none hover:bg-transparent'
              >
                <Edit2 className='stroke-dodger-blue size-3.5' />
              </Button>
            </ToolTip>
            <Separator orientation='vertical' className='h-4! bg-gray-200' />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <span>
                  <ToolTip title='Xóa danh mục'>
                    <Button className='border-none bg-transparent shadow-none hover:bg-transparent'>
                      <Trash className='size-3.5 stroke-red-600' />
                    </Button>
                  </ToolTip>
                </span>
              </AlertDialogTrigger>
              <AlertDialogContent className='data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-0! data-[state=closed]:slide-out-to-top-0! data-[state=open]:slide-in-from-left-0! data-[state=open]:slide-in-from-top-0! top-[30%]'>
                <AlertDialogHeader>
                  <AlertDialogTitle className='text-md flex items-center gap-2 font-normal'>
                    <Info className='size-8 fill-orange-500 stroke-white' />
                    Bạn có chắc chắn muốn xóa danh mục này không ?
                  </AlertDialogTitle>
                  <AlertDialogDescription></AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel asChild>
                    <Button
                      variant='outline'
                      className='border-red-500 text-red-500 transition-all duration-200 ease-linear hover:bg-transparent hover:text-red-500/80'
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

  const defaultValues: CategorySearchParamType = {
    name: ''
  };

  const handleChangePagination = (page: number) => {
    setQueryFilter({ ...queryFilter, page: page - 1 });
    setPagination({ ...pagination, current: page });
    setQueryParams({ ...searchParams, page: page });
  };

  const onSubmit = async (values: CategorySearchParamType) => {
    const filtered = Object.entries(values).filter(
      ([, value]) =>
        value !== null && value !== undefined && value.toString().trim() !== ''
    );
    setQueryFilter({ ...queryFilter, ...Object.fromEntries(filtered) });
    setQueryParams({ ...searchParams, ...Object.fromEntries(filtered) });
  };

  const handleReset = (form: UseFormReturn<CategorySearchParamType>) => {
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
      breadcrumbs={[
        { label: 'Trang chủ', href: route.home.path },
        { label: 'Danh mục' }
      ]}
    >
      <ListPageWrapper
        actionBar={
          <Link href={route.category.create.path}>
            <Button className='bg-dodger-blue hover:bg-dodger-blue/80 font-normal'>
              <PlusIcon />
              Thêm mới
            </Button>
          </Link>
        }
        searchForm={
          <BaseForm
            defaultValues={defaultValues}
            onSubmit={onSubmit}
            schema={categorySearchParamSchema}
            initialValues={initialValues}
          >
            {(form) => (
              <>
                <Row className='gap-2'>
                  <Col span={4}>
                    <InputField
                      control={form.control}
                      name='name'
                      placeholder='Tên danh mục'
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
          dataSource={categoryListQuery.data?.data.content || []}
          pagination={pagination}
          loading={categoryListQuery.isLoading || categoryListQuery.isFetching}
          changePagination={handleChangePagination}
        />
      </ListPageWrapper>
    </PageWrapper>
  );
}
