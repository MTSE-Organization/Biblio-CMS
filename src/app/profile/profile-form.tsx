'use client';

import {
  Button,
  Col,
  InputField,
  Row,
  UploadImageField
} from '@/components/form';
import { BaseForm } from '@/components/form/base-form';
import ButtonLoading from '@/components/loading/button-loading';
import { AppConstants } from '@/constants';
import { logger } from '@/logger';
import { useUpdateProfileMutation, useUploadImageMutation } from '@/queries';
import { updateProfileSchema } from '@/schemaValidations';
import { useProfileStore } from '@/store';
import { ProfileBodyType } from '@/types';
import { notify } from '@/utils';
import { Save } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

export default function ProfileForm() {
  const { profile } = useProfileStore();
  const fileMutation = useUploadImageMutation();
  const profileMutation = useUpdateProfileMutation();
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [avatarPath, setAvatarPath] = useState('');

  const defaultValues: ProfileBodyType = {
    email: '',
    fullName: '',
    avatarPath: '',
    phone: ''
  };

  const initialValues: ProfileBodyType = useMemo(
    () => ({
      email: profile?.email ?? '',
      fullName: profile?.fullName ?? '',
      avatarPath: profile?.avatarPath ?? '',
      phone: profile?.phone ?? ''
    }),
    [profile]
  );

  useEffect(() => {
    if (profile?.avatarPath) setAvatarPath(profile?.avatarPath);
  }, [profile?.avatarPath]);

  const onSubmit = async (
    values: ProfileBodyType,
    form: UseFormReturn<ProfileBodyType>
  ) => {
    try {
      const res = await profileMutation.mutateAsync({ ...values, avatarPath });
      if (res.result) {
        notify.success('Cập nhật hồ sơ thành công');
        setIsFormChanged(false);
      } else {
        notify.error('Cập nhật hồ sơ thất bại');
      }
    } catch (error) {
      logger.error('Error while updating profile: ', error);
      notify.error('Cập nhật hồ sơ thất bại');
    }
  };

  return (
    <BaseForm
      defaultValues={defaultValues}
      onSubmit={onSubmit}
      schema={updateProfileSchema}
      className='mx-auto w-1/2'
      onChange={() => setIsFormChanged(true)}
      initialValues={initialValues}
    >
      {(form) => (
        <>
          <Row>
            <Col>
              <UploadImageField
                value={
                  avatarPath
                    ? `${AppConstants.contentRootUrl}${avatarPath}`
                    : ''
                }
                loading={fileMutation.isPending}
                onChange={(url) => {
                  setAvatarPath(url);
                  setIsFormChanged(true);
                }}
                size={100}
                uploadImageFn={async (file: Blob) => {
                  const res = await fileMutation.mutateAsync(file);
                  return res.data?.filePath ?? '';
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <InputField
                control={form.control}
                name='email'
                label='Email'
                placeholder='Nhập email'
                className='focus-visible:ring-dodger-blue'
                required
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <InputField
                control={form.control}
                name='fullName'
                label='Họ tên'
                placeholder='Nhập họ tên'
                className='focus-visible:ring-dodger-blue'
                required
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <InputField
                control={form.control}
                name='phone'
                label='Số điện thoại'
                placeholder='Nhập số điện thoại'
                className='focus-visible:ring-dodger-blue'
                required
              />
            </Col>
          </Row>
          <Button
            disabled={!isFormChanged}
            className='bg-dodger-blue hover:bg-dodger-blue/80 ml-auto flex w-40'
          >
            {profileMutation.isPending ? (
              <ButtonLoading />
            ) : (
              <>
                <Save />
                Cập nhật
              </>
            )}
          </Button>
        </>
      )}
    </BaseForm>
  );
}
