'use client';

import { productVariantApiRequest } from '@/api-requests';
import { AvatarField, Button, ToolTip } from '@/components/form';
import { HasPermission } from '@/components/has-permission';
import { PageWrapper } from '@/components/layout';
import ListPageWrapper from '@/components/layout/list-page-wrapper';
import { BaseTable } from '@/components/table';
import {
  apiConfig,
  FieldTypes,
  productVariantConditions,
  productVariantFormats,
  productVariantStatuses,
  STATUS_ACTIVE,
  STATUS_DELETED
} from '@/constants';
import { useListBase, useQueryParams } from '@/hooks';
import { cn } from '@/lib';
import route from '@/routes';
import { productVariantSearchParamSchema } from '@/schemaValidations';
import {
  Column,
  ProductVariantResType,
  ProductVariantSearchParamType,
  SearchFormProps
} from '@/types';
import { formatMoney, notify, renderImageUrl } from '@/utils';
import { useMutation } from '@tanstack/react-query';
import { RotateCcw } from 'lucide-react';

export default function ProductVariantList({ queryKey }: { queryKey: string }) {
  const recoverMutation = useMutation({
    mutationKey: [`${queryKey}-recover`],
    mutationFn: (id: string) => productVariantApiRequest.recover(id)
  });
  const { searchParams } = useQueryParams<{ name: string }>();
  const { data, loading, handlers, pagination, listQuery } = useListBase<
    ProductVariantResType,
    ProductVariantSearchParamType
  >({
    apiConfig: apiConfig.productVariant,
    options: {
      queryKey,
      objectName: 'phân loại sách',
      excludeFromQueryFilter: ['name']
    },
    override: (handlers) => {
      handlers.additionalColumns = () => ({
        recover: (
          record: ProductVariantResType,
          buttonProps?: Record<string, any>
        ) => {
          return (
            <HasPermission
              requiredPermissions={[
                apiConfig.productVariant.recover.permissionCode
              ]}
            >
              <ToolTip title={`Khôi phục`}>
                <span>
                  <Button
                    disabled={record.status === STATUS_ACTIVE}
                    onClick={async () => {
                      await recoverMutation.mutateAsync(record.id);
                      notify.success('Khôi phục thành công');
                      listQuery.refetch();
                    }}
                    className='border-none bg-transparent shadow-none hover:bg-transparent'
                    {...buttonProps}
                  >
                    <RotateCcw className='stroke-dodger-blue size-3.5' />
                  </Button>
                </span>
              </ToolTip>
            </HasPermission>
          );
        }
      });
    }
  });
  const columns: Column<ProductVariantResType>[] = [
    {
      title: '#',
      dataIndex: 'imageUrl',
      width: 80,
      align: 'center',
      render: (value) => {
        return (
          <AvatarField
            size={50}
            className={cn('mx-auto', {
              rounded: value
            })}
            previewClassName='rounded'
            disablePreview={!value}
            src={renderImageUrl(value)}
          />
        );
      }
    },
    {
      title: 'Tên sách',
      render: () => searchParams.name
    },
    {
      title: 'Tình trạng',
      dataIndex: 'condition',
      render: (value) =>
        productVariantConditions.find((pvc) => pvc.value === value)?.label ??
        '--',
      align: 'center',
      width: 120
    },
    {
      title: 'Định dạng',
      dataIndex: 'format',
      render: (value) =>
        productVariantFormats.find((pvf) => pvf.value === value)?.label ?? '--',
      width: 120,
      align: 'center'
    },
    {
      title: 'Giá điều chỉnh',
      dataIndex: 'modifiedPrice',
      render: (value) => formatMoney(value),
      width: 180,
      align: 'center'
    },
    handlers.renderStatusColumn(),
    handlers.renderActionColumn({
      actions: {
        edit: (record: ProductVariantResType) =>
          record.status === STATUS_ACTIVE,
        recover: (record: ProductVariantResType) =>
          record.status === STATUS_DELETED,
        delete: (record: ProductVariantResType) =>
          record.status === STATUS_ACTIVE
      }
    })
  ];
  const searchFields: SearchFormProps<ProductVariantSearchParamType>['searchFields'] =
    [
      {
        key: 'condition',
        type: FieldTypes.SELECT,
        options: productVariantConditions,
        placeholder: 'Tình trạng'
      },
      {
        key: 'format',
        type: FieldTypes.SELECT,
        options: productVariantFormats,
        placeholder: 'Định dạng'
      },
      {
        key: 'status',
        type: FieldTypes.SELECT,
        options: productVariantStatuses,
        placeholder: 'Trạng thái'
      }
    ];
  return (
    <PageWrapper
      breadcrumbs={[
        { label: 'Sách', href: route.product.getList.path },
        { label: 'Phân loại sách' }
      ]}
    >
      <ListPageWrapper
        searchForm={handlers.renderSearchForm({
          searchFields,
          schema: productVariantSearchParamSchema
        })}
        addButton={handlers.renderAddButton()}
        reloadButton={handlers.renderReloadButton()}
      >
        <BaseTable
          columns={columns}
          dataSource={data}
          loading={loading}
          pagination={pagination}
          changePagination={handlers.changePagination}
        />
      </ListPageWrapper>
    </PageWrapper>
  );
}
