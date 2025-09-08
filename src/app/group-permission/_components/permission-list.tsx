'use client';
import { emptyData } from '@/assets';
import { Button, Col, Row, ToolTip } from '@/components/form';
import ListPageWrapper from '@/components/layout/list-page-wrapper';
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
import {
    DEFAULT_TABLE_PAGE_SIZE,
    DEFAULT_TABLE_PAGE_START,
    MAX_PAGE_SIZE
} from '@/constants';
import { useNavigate, useQueryParams } from '@/hooks';
import { cn } from '@/lib';
import { useGroupListQuery } from '@/queries';
import {
    useDeletePermissionMutation,
    usePermissionListQuery
} from '@/queries/permission.query';
import route from '@/routes';
import {
    Column,
    GroupSearchParamType,
    PaginationType,
    PermissionBodyType,
    PermissionResType,
    PermissionSearchParamType
} from '@/types';
import { Edit2, Info, Plus, Trash } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function PermissionList() {
    const navigate = useNavigate();
    const [queryFilter, setQueryFilter] = useState<PermissionSearchParamType>({
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
    const groupListQuery = useGroupListQuery({
        page: DEFAULT_TABLE_PAGE_START,
        size: MAX_PAGE_SIZE
    });
    const permissionListQuery = usePermissionListQuery(queryFilter);
    const deletePermissionMutation = useDeletePermissionMutation();
    const handleEdit = (id: string) => {
        navigate(`${route.permission.path}/${id}`);
    };

    const columns: Column<PermissionResType>[] = [
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
                            <Button
                                onClick={() => handleEdit(record.id)}
                                className='border-none bg-transparent shadow-none hover:bg-transparent'
                            >
                                <Edit2 className='stroke-dodger-blue size-3.5' />
                            </Button>
                        </ToolTip>
                        <Separator
                            orientation='vertical'
                            className='h-4! bg-gray-200'
                        />
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <span>
                                    <ToolTip title='Xóa quyền'>
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
                                        Bạn có chắc chắn muốn xóa quyền này
                                        không ?
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

    useEffect(() => {
        setPagination((p) => ({
            ...p,
            total: permissionListQuery.data?.data.totalPages!
        }));
    }, [permissionListQuery.data]);

    const handleDelete = async (record: PermissionResType) => {
        deletePermissionMutation.mutateAsync(record.id);
    };

    const handleChangePagination = (page: number) => {
        setQueryFilter({ ...queryFilter, page: page - 1 });
        setPagination({ ...pagination, current: page });
        setQueryParams({ ...searchParams, page: page });
    };

    const groupPermissions = (
        permissionListQuery.data?.data.content || []
    ).reduce((acc, permission) => {
        const group = permission.nameGroup;
        if (!acc[group]) {
            acc[group] = [];
        }
        acc[group].push(permission);
        return acc;
    }, {} as any);

    (groupListQuery.data?.data.content || [])
        .map((group) => group.name)
        .forEach((groupName) => {
            if (!groupPermissions[groupName]) {
                groupPermissions[groupName] = [];
            }
        });

    const onSubmit = (values: PermissionBodyType) => {};
    const defaultValues: PermissionBodyType = {
        description: '',
        name: '',
        pCode: '',
        nameGroup: ''
    };
    return (
        <ListPageWrapper>
            <div className='flex max-w-200 flex-col gap-y-4 px-4'>
                {Object.keys(groupPermissions).map((group, index) => {
                    const permissions = groupPermissions[group];
                    return (
                        <div
                            className='rounded-lg border border-solid border-gray-200 text-sm'
                            key={group}
                        >
                            <div className='flex items-center justify-between border-b border-solid border-b-gray-200 py-2 pr-2 pl-4'>
                                <div className='font-semibold'>{group}</div>
                                <ToolTip
                                    sideOffset={8}
                                    title={`Chỉnh sửa ${group}`}
                                >
                                    <Plus className='stroke-dodger-blue size-4 cursor-pointer transition-all duration-200 ease-linear hover:opacity-80' />
                                </ToolTip>
                            </div>
                            <div
                                className={cn('grid gap-y-4 p-4', {
                                    'grid-cols-3': permissions?.length > 0
                                })}
                            >
                                {permissions?.length > 0 ? (
                                    permissions.map(
                                        (permission: PermissionResType) => {
                                            return (
                                                <div key={permission.id}>
                                                    {permission.name}
                                                </div>
                                            );
                                        }
                                    )
                                ) : (
                                    <div className='flex w-full flex-col items-center justify-center gap-y-2'>
                                        <Image
                                            src={emptyData.src}
                                            alt='Empty'
                                            width={150}
                                            height={80}
                                        />
                                        <p>Không có dữ liệu</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </ListPageWrapper>
    );
}
