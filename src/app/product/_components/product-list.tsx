'use client';
import ProductImageModal from '@/app/product/_components/product-image-modal';
import { Button, ToolTip } from '@/components/form';
import { HasPermission } from '@/components/has-permission';
import { PageWrapper } from '@/components/layout';
import ListPageWrapper from '@/components/layout/list-page-wrapper';
import { BaseTable } from '@/components/table';
import {
  ageRatings,
  apiConfig,
  FieldTypes,
  languageOptions
} from '@/constants';
import {
  useDisclosure,
  useListBase,
  useNavigate,
  useQueryParams
} from '@/hooks';
import route from '@/routes';
import { productSearchParamSchema } from '@/schemaValidations';
import {
  ApiResponseList,
  CategoryAutoResType,
  Column,
  ProductBodyType,
  ProductResType,
  ProductSearchParamType,
  PublisherResType,
  SearchFormProps
} from '@/types';
import {
  formatDate,
  formatMoney,
  generatePath,
  http,
  renderListPageUrl
} from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { FileImage } from 'lucide-react';
import { useState } from 'react';

export default function ProductList({ queryKey }: { queryKey: string }) {
  const navigate = useNavigate();
  const { searchParams, serializeParams } = useQueryParams();
  const categoryRes = useQuery({
    queryKey: ['category-auto-complete'],
    queryFn: () =>
      http.get<ApiResponseList<CategoryAutoResType>>(
        apiConfig.category.autoComplete
      )
  });
  const publisherRes = useQuery({
    queryKey: ['publisher-auto-complete'],
    queryFn: () =>
      http.get<ApiResponseList<PublisherResType>>(
        apiConfig.publisher.autoComplete
      )
  });
  const { opened, open, close } = useDisclosure(false);
  const [selectedRow, setSelectedRow] = useState<ProductResType | null>(null);
  const { data, loading, handlers, pagination } = useListBase<
    ProductResType,
    ProductSearchParamType
  >({
    apiConfig: apiConfig.product,
    options: {
      queryKey,
      objectName: 'sách'
    },
    override: (handlers) => {
      handlers.additionalColumns = () => ({
        viewProductImage: (
          record: ProductResType,
          buttonProps: Record<string, any>
        ) => {
          return (
            <HasPermission
              requiredPermissions={[
                apiConfig.productImage.getList.permissionCode
              ]}
            >
              <ToolTip title={'Xem hình ảnh sách'}>
                <span>
                  <Button
                    onClick={() => handleOpen(record)}
                    className='border-none bg-transparent shadow-none hover:bg-transparent'
                    {...buttonProps}
                  >
                    <FileImage className='stroke-dodger-blue size-3.5' />
                  </Button>
                </span>
              </ToolTip>
            </HasPermission>
          );
        }
      });
    }
  });

  const columns: Column<ProductResType>[] = [
    {
      title: '#',
      render: (_, __, index) =>
        (pagination.current - 1) * pagination.pageSize + index + 1,
      width: 30
    },
    {
      title: 'Tên sách',
      dataIndex: 'name',
      width: 400,
      render: (value, record) => (
        <span
          onClick={() =>
            navigate(
              renderListPageUrl(
                generatePath(route.productVariant.getList.path, {
                  id: record.id
                }),
                serializeParams({ ...searchParams, name: record.name })
              )
            )
          }
          title={value}
          className='text-dodger-blue block w-full cursor-pointer truncate'
        >
          {value}
        </span>
      )
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      render: (value) => `${formatMoney(value)}đ`,
      width: 120
    },
    {
      title: 'Ngày bán',
      dataIndex: 'releaseDate',
      render: (value) => formatDate(value),
      width: 120
    },
    {
      title: 'Độ tuổi',
      dataIndex: 'ageRating',
      width: 150,
      render: (value) =>
        ageRatings.find((age) => age.value === value)?.label ?? '--'
    },
    {
      title: 'Ngôn ngữ',
      dataIndex: 'language',
      width: 150,
      render: (value) =>
        languageOptions.find((age) => age.value === value)?.label ?? '--'
    },
    {
      title: 'Thông số',
      dataIndex: 'metaData',
      width: 220,
      render: (value) => {
        const jsonObj = JSON.parse(value) as ProductBodyType['metaData'];
        if (typeof jsonObj === 'object') {
          return (
            <span
              title={`jsonObj.length}cmx${jsonObj.width}cmx${jsonObj.length}cmx${jsonObj.weight}gx${jsonObj.numPage}tr`}
              className='block w-full truncate'
            >
              {jsonObj.length}cmx{jsonObj.width}cmx{jsonObj.length}cmx
              {jsonObj.weight}gx{jsonObj.numPage}tr
            </span>
          );
        }
        return '--';
      }
    },
    {
      title: 'Giảm giá',
      dataIndex: 'discount',
      render: (value) => `${value}%`,
      width: 100,
      align: 'center'
    },
    { title: 'Danh mục', dataIndex: ['category', 'name'], width: 120 },
    { title: 'Nhà xuất bản', dataIndex: ['publisher', 'name'], width: 200 },
    handlers.renderStatusColumn(),
    handlers.renderActionColumn({
      actions: {
        edit: true,
        viewProductImage: true,
        delete: true
      },
      columnProps: {
        fixed: true,
        width: 150
      }
    })
  ];

  const searchFields: SearchFormProps<ProductSearchParamType>['searchFields'] =
    [
      { key: 'name', placeholder: 'Tên sách' },
      {
        key: 'ageRating',
        placeholder: 'Độ tuổi',
        type: FieldTypes.SELECT,
        options: ageRatings
      },
      {
        key: 'categoryId',
        placeholder: 'Danh mục',
        type: FieldTypes.SELECT,
        options: categoryRes.data?.data.content.map((category) => ({
          label: category.name,
          value: category.id
        }))
      },
      {
        key: 'language',
        placeholder: 'Ngôn ngữ',
        type: FieldTypes.SELECT,
        options: languageOptions
      },
      {
        key: 'publisherId',
        placeholder: 'Nhà xuất bản',
        type: FieldTypes.SELECT,
        options: publisherRes.data?.data.content.map((publisher) => ({
          label: publisher.name,
          value: publisher.id
        }))
      }
    ];

  const handleOpen = (record: ProductResType) => {
    open();
    setSelectedRow(record);
  };

  const handleClose = () => {
    close();
  };

  return (
    <PageWrapper breadcrumbs={[{ label: 'Sách' }]}>
      <ListPageWrapper
        searchForm={handlers.renderSearchForm({
          searchFields,
          schema: productSearchParamSchema
        })}
        reloadButton={handlers.renderReloadButton()}
        addButton={handlers.renderAddButton()}
      >
        <BaseTable
          columns={columns}
          dataSource={data || []}
          pagination={pagination}
          loading={loading}
          changePagination={handlers.changePagination}
        />
      </ListPageWrapper>
      <ProductImageModal
        data={selectedRow}
        open={opened}
        onClose={handleClose}
      />
    </PageWrapper>
  );
}
