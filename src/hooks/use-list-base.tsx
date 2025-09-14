'use client';

import { Button, ToolTip } from '@/components/form';
import { HasPermission } from '@/components/has-permission';
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
import { DEFAULT_TABLE_PAGE_SIZE, DEFAULT_TABLE_PAGE_START } from '@/constants';
import useNavigate from '@/hooks/use-navigate';
import useQueryParams from '@/hooks/use-query-params';
import { logger } from '@/logger';
import {
  ApiConfig,
  ApiResponse,
  ApiResponseList,
  BaseSearchParamType,
  Column,
  PaginationType
} from '@/types';
import { http, notify } from '@/utils';
import { Separator } from '@radix-ui/react-separator';
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { Edit2, Info, PlusIcon, Trash } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

type HandlerType<T extends { id: string }, S extends BaseSearchParamType> = {
  changePagination: (page: number) => void;
  renderActionColumn: (options?: {
    actions?: Record<string, boolean>;
    buttonProps?: Record<string, any>;
    columnProps?: Record<string, any>;
  }) => Column<T>;
  additionalParams: () => Partial<S> | Record<string, any>;
  additionalPathParams: () => Record<string, any>;
  additionalColumns: () => React.ReactNode | any;
  renderAddButton: () => React.ReactNode | any;
};

type UseListBaseProps<
  T extends { id: string },
  S extends BaseSearchParamType
> = {
  apiConfig: {
    getList: ApiConfig;
    getById: ApiConfig;
    create: ApiConfig;
    update: ApiConfig;
    delete: ApiConfig;
  };
  options: {
    objectName: string;
    pageSize?: number;
  };
  override?: (handlers: HandlerType<T, S>) => HandlerType<T, S> | void;
};

export default function useListBase<
  T extends { id: string },
  S extends BaseSearchParamType
>({
  apiConfig,
  options: { objectName = '', pageSize = DEFAULT_TABLE_PAGE_SIZE },
  override
}: UseListBaseProps<T, S>) {
  const navigate = useNavigate();
  const pathname = usePathname();

  const [pagination, setPagination] = useState<PaginationType>({
    current: DEFAULT_TABLE_PAGE_START,
    pageSize: DEFAULT_TABLE_PAGE_SIZE,
    total: 0
  });
  const { searchParams, setQueryParams } = useQueryParams<S>();
  const queryFilter = useMemo(() => {
    return {
      ...searchParams,
      page: searchParams.page
        ? Number(searchParams.page) - 1
        : DEFAULT_TABLE_PAGE_START,
      size: pageSize
    } as S;
  }, [searchParams, pageSize]);

  const additionalPathParams = () => ({});

  const additionalParams = () => ({});

  // query
  const listQuery = useQuery({
    queryKey: [`${objectName}-list`, queryFilter],
    queryFn: () =>
      http.get<ApiResponseList<T>>(apiConfig.getList, {
        params: { ...queryFilter, ...handlers.additionalParams() },
        pathParams: { ...handlers.additionalPathParams() }
      }),
    placeholderData: keepPreviousData
  });
  const deleteMutation = useMutation({
    mutationKey: [`delete-${objectName}`],
    mutationFn: (id: string) =>
      http.delete<ApiResponse<any>>(apiConfig.delete, {
        pathParams: {
          id
        }
      })
  });

  const current = searchParams['page'];
  useEffect(() => {
    setPagination((p) => ({
      ...p,
      current: current ? Number(current) : DEFAULT_TABLE_PAGE_START + 1,
      total: listQuery.data?.data.totalPages ?? 0
    }));
  }, [current, listQuery.data]);

  const changePagination = (page: number) => {
    setPagination({ ...pagination, current: page });

    if (page === DEFAULT_TABLE_PAGE_START + 1) {
      const { page: _, ...rest } = searchParams;
      setQueryParams(rest as Partial<S>);
    } else {
      setQueryParams({ ...searchParams, page: page });
    }
  };

  const handleEditClick = (id: string) => {
    navigate(`${pathname}/${id}`);
  };

  const handleDelete = async (record: T) => {
    await deleteMutation.mutateAsync(record.id, {
      onSuccess: (res) => {
        if (res.result) {
          notify.success(`Xoá ${objectName} thành công`);
        } else {
          notify.error(`Xoá ${objectName} thất bại`);
        }
      },
      onError: (error: Error) => {
        logger.error(`Error while deleting ${objectName}: `, error);
        notify.error('Có lỗi xảy ra khi xóa');
      }
    });
  };

  const additionalColumns = () => ({});

  const actionColumn = () => ({
    edit: (record: T, buttonProps?: Record<string, any>) => {
      if (!apiConfig.update)
        throw new Error('apiConfig.update is not defined !');
      if (!apiConfig.update.permissionCode) return null;
      return (
        <HasPermission
          requiredPermissions={[apiConfig.update.permissionCode as string]}
        >
          <ToolTip title={`Sửa ${objectName}`}>
            <span>
              <Button
                onClick={() => handleEditClick(record.id)}
                className='border-none bg-transparent shadow-none hover:bg-transparent'
                {...buttonProps}
              >
                <Edit2 className='stroke-dodger-blue size-3.5' />
              </Button>
            </span>
          </ToolTip>
        </HasPermission>
      );
    },
    delete: (record: T, buttonProps?: Record<string, any>) => {
      if (!apiConfig.delete)
        throw new Error('apiConfig.delete is not defined !');
      if (!apiConfig.delete.permissionCode) return null;
      return (
        <HasPermission requiredPermissions={[apiConfig.delete.permissionCode]}>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <span>
                <ToolTip title={`Xóa ${objectName}`}>
                  <Button
                    className='border-none bg-transparent shadow-none hover:bg-transparent'
                    {...buttonProps}
                  >
                    <Trash className='size-3.5 stroke-red-600' />
                  </Button>
                </ToolTip>
              </span>
            </AlertDialogTrigger>
            <AlertDialogContent className='data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-0! data-[state=closed]:slide-out-to-top-0! data-[state=open]:slide-in-from-left-0! data-[state=open]:slide-in-from-top-0! top-[30%]'>
              <AlertDialogHeader>
                <AlertDialogTitle className='text-md flex items-center gap-2 font-normal'>
                  <Info className='size-8 fill-orange-500 stroke-white' />
                  Bạn có chắc chắn muốn xóa {objectName} này không ?
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
        </HasPermission>
      );
    }
  });

  const renderActionColumn = (options?: {
    actions?: Record<string, boolean>;
    buttonProps?: Record<string, any>;
    columnProps?: Record<string, any>;
  }): Column<T> => {
    const extraColumns = handlers.additionalColumns?.() || {};
    const actionsObj = { ...actionColumn(), ...extraColumns };

    const actionsOrder = options?.actions
      ? Object.keys(options.actions).filter(
          (key) => options.actions![key] && actionsObj[key]
        )
      : Object.keys(actionsObj);

    return {
      title: 'Hành động',
      align: 'center' as const,
      width: 120,
      ...options?.columnProps,
      render: (_: any, record: T) => {
        const actions = actionsOrder
          .map((key) => actionsObj[key](record, options?.buttonProps))
          .filter(Boolean);

        return (
          <div className='flex items-center justify-center gap-2'>
            {actions.map((action, idx) => (
              <div key={idx} className='flex items-center'>
                {action}
                {idx < actions.length - 1 && (
                  <Separator
                    orientation='vertical'
                    className='-mr-2 !h-4 w-px bg-gray-200'
                  />
                )}
              </div>
            ))}
          </div>
        );
      }
    };
  };

  const renderAddButton = () => {
    if (!apiConfig.create) throw new Error('apiConfig.create is not defined !');
    if (!apiConfig.create.permissionCode) return null;
    return (
      <HasPermission requiredPermissions={[apiConfig.create.permissionCode]}>
        <Link href={`${pathname}/create`}>
          <Button className='bg-dodger-blue hover:bg-dodger-blue/80 font-normal'>
            <PlusIcon />
            Thêm mới
          </Button>
        </Link>
      </HasPermission>
    );
  };

  const extendableHandlers = (): HandlerType<T, S> => {
    const handlers: HandlerType<T, S> = {
      changePagination,
      renderActionColumn,
      additionalParams,
      additionalPathParams,
      additionalColumns,
      renderAddButton
    };

    override?.(handlers);
    return handlers;
  };

  const handlers = extendableHandlers();

  return {
    data: listQuery.data?.data.content || [],
    pagination,
    loading:
      listQuery.isLoading || listQuery.isFetching || deleteMutation.isPending,
    handlers
  };
}
