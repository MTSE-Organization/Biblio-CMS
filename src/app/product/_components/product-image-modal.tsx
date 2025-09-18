'use client';
import {
  AvatarField,
  Button,
  ToolTip,
  UploadImageField
} from '@/components/form';
import { BaseForm } from '@/components/form/base-form';
import { HasPermission } from '@/components/has-permission';
import ListPageWrapper from '@/components/layout/list-page-wrapper';
import { Modal } from '@/components/modal';
import { BaseTable } from '@/components/table';
import { Badge } from '@/components/ui/badge';
import { apiConfig } from '@/constants';
import { useDisclosure, useListBase, useSaveBase } from '@/hooks';
import { logger } from '@/logger';
import { useUploadImageProduct } from '@/queries';
import { productImageSchema } from '@/schemaValidations';
import {
  ApiResponse,
  Column,
  ProductImageBodyType,
  ProductImageResType,
  ProductImageSearchParamType,
  ProductResType
} from '@/types';
import { http, notify, renderImageUrl } from '@/utils';
import { useMutation } from '@tanstack/react-query';
import { Check, Edit2, FileImage, PlusIcon } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

export default function ProductImageModal({
  data,
  open,
  onClose
}: {
  data: ProductResType | null;
  open: boolean;
  onClose: () => void;
}) {
  const { opened, open: openForm, close } = useDisclosure();
  const [url, setUrl] = useState<string>('');
  const uploadImageMutation = useUploadImageProduct();
  const setDefaultMutation = useMutation({
    mutationKey: ['product-image-set-default'],
    mutationFn: (id: string) =>
      http.post<ApiResponse<any>>(apiConfig.productImage.setDefault, {
        body: {
          id
        }
      })
  });
  const {
    data: productImages,
    loading,
    handlers,
    listQuery,
    pagination
  } = useListBase<ProductImageResType, ProductImageSearchParamType>({
    apiConfig: apiConfig.productImage,
    options: {
      queryKey: 'product image',
      objectName: 'ảnh sách',
      enabled: !!data
    },
    override: (handlers) => {
      handlers.additionalParams = () => ({
        productId: data?.id
      });
      handlers.renderAddButton = () => {
        return (
          <HasPermission
            requiredPermissions={[apiConfig.productImage.create.permissionCode]}
          >
            <Button onClick={handleAddClick} variant={'primary'}>
              <PlusIcon />
              Thêm mới
            </Button>
          </HasPermission>
        );
      };
      handlers.additionalColumns = () => ({
        edit: (
          record: ProductImageResType,
          buttonProps?: Record<string, any>
        ) => {
          return (
            <HasPermission
              requiredPermissions={[
                apiConfig.productImage.update.permissionCode as string
              ]}
            >
              <ToolTip title={`Sửa ảnh sách`}>
                <span>
                  <Button
                    onClick={() => handleEditClick(record)}
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
        setDefault: (
          record: ProductImageResType,
          buttonProps?: Record<string, any>
        ) => {
          return (
            <HasPermission
              requiredPermissions={[
                apiConfig.productImage.setDefault.permissionCode as string
              ]}
            >
              <ToolTip title={`Đặt làm ảnh mặc định`}>
                <span>
                  <Button
                    disabled={record.isDefault}
                    onClick={() => handleSetImageDefault(record)}
                    className='border-none bg-transparent shadow-none hover:bg-transparent'
                    {...buttonProps}
                  >
                    <Check className='stroke-dodger-blue size-4' />
                  </Button>
                </span>
              </ToolTip>
            </HasPermission>
          );
        }
      });
    }
  });

  const {
    data: productImage,
    handleSubmit,
    renderActions,
    setDetailId
  } = useSaveBase<ProductImageResType, ProductImageBodyType>({
    apiConfig: apiConfig.productImage,
    options: {
      queryKey: 'product-image',
      objectName: 'ảnh'
    }
  });

  const columns: Column<ProductImageResType>[] = [
    {
      title: '#',
      render: (_, __, index) =>
        (pagination.current - 1) * pagination.pageSize + index + 1,
      width: 50,
      align: 'center'
    },
    {
      title: 'Ảnh',
      dataIndex: 'url',
      render: (value, record) => {
        return (
          <div className='flex items-center gap-2'>
            <AvatarField
              size={50}
              src={renderImageUrl(value)}
              className='rounded'
              previewClassName='object-contain rounded'
              imagePreviewClassName='rounded object-contain'
              disablePreview={!value}
              icon={<FileImage />}
              autosize={true}
              height={600}
              width={600}
            />
            {record.isDefault && (
              <Badge className='pointer-events-none h-8 rounded-full bg-lime-600'>
                Mặc định
              </Badge>
            )}
          </div>
        );
      }
    },
    handlers.renderActionColumn({
      actions: {
        edit: true,
        setDefault: true,
        delete: true
      },
      columnProps: {
        width: 120
      }
    })
  ];

  const handleAddClick = () => {
    openForm();
    setDetailId('');
  };

  const handleClose = () => {
    close();
    setUrl('');
  };

  const handleEditClick = (record: ProductImageResType) => {
    setDetailId(record.id);
    openForm();
  };

  const handleSetImageDefault = async (record: ProductImageResType) => {
    await setDefaultMutation.mutateAsync(record.id.toString(), {
      onSuccess: (res) => {
        if (res.result) {
          notify.success('Đặt làm ảnh mặc định thành công');
          listQuery.refetch();
        } else {
          notify.success('Đặt làm ảnh mặc định thất bại');
        }
      },
      onError: (error) => {
        logger.error('Error while set default product image:', error);
      }
    });
  };

  const defaultValues: ProductImageBodyType = {
    url: '',
    productId: '',
    isDefault: false
  };

  const initialValues: ProductImageBodyType = useMemo(
    () => ({
      url: renderImageUrl(productImage?.url),
      productId: data?.id ?? '',
      isDefault: productImage?.isDefault ?? false
    }),
    [data?.id, productImage?.isDefault, productImage?.url]
  );

  useEffect(() => {
    if (productImage?.url) {
      setUrl(productImage.url);
    }
  }, [productImage?.url]);

  const onSubmit = async (values: ProductImageBodyType) => {
    await handleSubmit({ ...values });
    handleClose();
    listQuery.refetch();
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <ListPageWrapper
          className='min-h-auto w-200 pb-4 max-2xl:w-200'
          actionBar={handlers.renderAddButton()}
        >
          <BaseTable
            dataSource={productImages}
            changePagination={handlers.changePagination}
            columns={columns}
            pagination={pagination}
            loading={loading}
          />
        </ListPageWrapper>
      </Modal>
      <Modal open={opened} onClose={close}>
        <BaseForm
          defaultValues={defaultValues}
          initialValues={initialValues}
          schema={productImageSchema}
          onSubmit={onSubmit}
          className='h-75 w-150'
        >
          {(form) => (
            <>
              <UploadImageField
                size={180}
                label='Tải lên ảnh'
                control={form.control}
                name='url'
                required
                value={renderImageUrl(url)}
                onChange={(url) => setUrl(url)}
                uploadImageFn={async (file: Blob) => {
                  const res = await uploadImageMutation.mutateAsync({ file });
                  return res.data?.filePath ?? '';
                }}
              />
              <div className='mt-4'>
                {renderActions(form, { onCancel: handleClose })}
              </div>
            </>
          )}
        </BaseForm>
      </Modal>
    </>
  );
}
