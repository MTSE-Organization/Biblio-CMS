import AppConstants from '@/constants/app';
import { ApiConfigGroup } from '@/types';

const baseHeader = { 'Content-Type': 'application/json' };
const multipartHeader = { 'Content-Type': 'multipart/form-data' };

const defineApiConfig = <T extends ApiConfigGroup>(config: T) => config;

const apiConfig = defineApiConfig({
  account: {
    login: {
      baseUrl: `${AppConstants.apiUrl}api/token`,
      method: 'POST',
      headers: baseHeader
    },
    getList: {
      baseUrl: `${AppConstants.apiUrl}v1/account/list`,
      method: 'GET',
      headers: baseHeader,
      permissionCode: 'ACC_L'
    },
    getProfile: {
      baseUrl: `${AppConstants.apiUrl}v1/account/profile`,
      method: 'GET',
      headers: baseHeader,
      permissionCode: 'ACC_V'
    }
  },
  auth: {
    api: {
      login: {
        baseUrl: '/api/auth/login',
        method: 'POST',
        headers: baseHeader
      },
      logout: {
        baseUrl: '/api/auth/logout',
        method: 'POST',
        headers: baseHeader
      }
    }
  }
});

export default apiConfig;
