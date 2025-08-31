import { apiConfig } from '@/constants';
import { ApiResponse } from '@/types';
import { LoginBodyType, LoginResType } from '@/types/auth.type';
import { http } from '@/utils';

const authApiRequest = {
  login: async (body: LoginBodyType) =>
    await http.post<LoginResType>(apiConfig.auth.api.login, {
      body
    }),
  loginFromNextServerToServer: async (body: LoginBodyType) =>
    await http.post<LoginResType>(apiConfig.account.login, {
      body,
      authorization: `Basic ${Buffer.from('abc_client:abc123').toString('base64')}`
    }),
  logout: async () =>
    await http.post<ApiResponse<any>>(apiConfig.auth.api.logout)
};

export default authApiRequest;
