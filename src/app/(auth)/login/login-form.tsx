'use client';

import { logoWithText } from '@/assets';
import { Button, Col, InputField, Row } from '@/components/form';
import { BaseForm } from '@/components/form/base-form';
import { storageKeys } from '@/constants';
import { logger } from '@/logger';
import { useLoginMutation } from '@/queries';
import route from '@/routes';
import { loginSchema } from '@/schemaValidations';
import { LoginBodyType } from '@/types/auth.type';
import { notify, setData } from '@/utils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import PasswordField from '@/components/form/password-field';
import { useProfileStore } from '@/store';
import { ButtonLoading } from '@/components/loading';

export default function LoginForm() {
  const loginMutation = useLoginMutation();
  const router = useRouter();
  const { setAuthenticated } = useProfileStore();
  const [isFormChanged, setIsFormChanged] = useState(false);
  const defaultValues: LoginBodyType = {
    email: '',
    password: ''
  };

  const onSubmit = async (values: LoginBodyType) => {
    await loginMutation.mutateAsync(values, {
      onSuccess: (res) => {
        if (res.result) {
          notify.success('Đăng nhập thành công');
          setData(storageKeys.ACCESS_TOKEN, res.data?.token!);
          setAuthenticated(true);
          router.push(route.permission);
        } else {
          notify.error('Email hoặc mật khẩu không chính xác');
        }
      },
      onError: (error) => {
        logger.error('Error while logging in: ', error);
        notify.error('Đăng nhập thất bại');
      }
    });
  };

  return (
    <BaseForm
      defaultValues={defaultValues}
      schema={loginSchema}
      onSubmit={onSubmit}
      className='w-100 rounded-lg border border-solid border-gray-200 px-6 py-4 shadow-[0px_0px_10px_1px] shadow-slate-200'
      onChange={() => setIsFormChanged(true)}
    >
      {(form) => (
        <>
          <Row>
            <Col className='items-center'>
              <Image
                src={logoWithText.src}
                width={180}
                height={50}
                alt='Biblio Logo'
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <InputField
                name='email'
                control={form.control}
                label='Email'
                placeholder='Nhập email...'
                className='focus-visible:ring-dodger-blue'
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <PasswordField
                name='password'
                control={form.control}
                label='Mật khẩu'
                placeholder='Nhập mật khẩu...'
                className='focus-visible:ring-dodger-blue'
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                disabled={!isFormChanged}
                className='bg-dodger-blue hover:bg-dodger-blue! hover:opacity-80'
              >
                {loginMutation.isPending ? <ButtonLoading /> : 'Đăng nhập'}
              </Button>
            </Col>
          </Row>
        </>
      )}
    </BaseForm>
  );
}
