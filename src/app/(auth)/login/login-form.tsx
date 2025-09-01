'use client';

import { logoWithText } from '@/assets';
import { Button, Col, InputField, Row } from '@/components/form';
import { BaseForm } from '@/components/form/base-form';
import { storageKeys } from '@/constants';
import ButtonLoading from '@/components/loading/button-loading';
import { logger } from '@/logger';
import { useLoginMutation } from '@/queries';
import route from '@/routes';
import { loginSchema } from '@/schemaValidations';
import { LoginBodyType } from '@/types/auth.type';
import { notify, setData } from '@/utils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTopLoader } from 'nextjs-toploader';
import { useState } from 'react';

export default function LoginForm() {
  const loginMutation = useLoginMutation();
  const router = useRouter();
  const loader = useTopLoader();
  const [isFormChanged, setIsFormChanged] = useState(false);
  const defaultValues: LoginBodyType = {
    email: '',
    password: ''
  };

  const onSubmit = async (values: LoginBodyType) => {
    try {
      const res = await loginMutation.mutateAsync(values);
      if (res.result) {
        notify.success('Đăng nhập thành công');
        setData(storageKeys.ACCESS_TOKEN, res.data?.token!);
        router.push(route.account);
        loader.start();
      }
    } catch (error) {
      logger.error('Error while logging in: ', error);
      notify.error('Đăng nhập thất bại');
    }
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
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <InputField
                name='password'
                control={form.control}
                label='Mật khẩu'
                placeholder='Nhập mật khẩu...'
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
