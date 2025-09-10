import AppConstants from '@/constants/app';
import { ApiConfigGroup } from '@/types';

const baseHeader = { 'Content-Type': 'application/json' };
const multipartHeader = { 'Content-Type': 'multipart/form-data' };

const defineApiConfig = <T extends ApiConfigGroup>(config: T) => config;

const apiConfig = defineApiConfig({
  account: {
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
    },
    updateProfile: {
      baseUrl: `${AppConstants.apiUrl}v1/account/update-profile`,
      method: 'PUT',
      headers: baseHeader,
      permissionCode: 'ACC_U'
    },
    delete: {
      baseUrl: `${AppConstants.apiUrl}v1/account/delete/:id`,
      method: 'DELETE',
      headers: baseHeader,
      permissionCode: 'ACC_D'
    }
  },
  auth: {
    login: {
      baseUrl: `${AppConstants.apiUrl}v1/auth/login`,
      method: 'POST',
      headers: baseHeader
    },
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
  },
  group: {
    create: {
      baseUrl: `${AppConstants.apiUrl}v1/group/create`,
      method: 'POST',
      headers: baseHeader,
      permissionCode: 'GR_C'
    },
    getList: {
      baseUrl: `${AppConstants.apiUrl}v1/group/list`,
      method: 'GET',
      headers: baseHeader,
      permissionCode: 'GR_L'
    },
    getById: {
      baseUrl: `${AppConstants.apiUrl}v1/group/get/:id`,
      method: 'GET',
      headers: baseHeader,
      permissionCode: 'GR_V'
    },
    delete: {
      baseUrl: `${AppConstants.apiUrl}v1/group/delete/:id`,
      method: 'DELETE',
      headers: baseHeader,
      permissionCode: 'GR_D'
    },
    update: {
      baseUrl: `${AppConstants.apiUrl}v1/group/update`,
      method: 'PUT',
      headers: baseHeader,
      permissionCode: 'GR_U'
    }
  },
  file: {
    upload: {
      baseUrl: `${AppConstants.apiUrl}v1/file/upload`,
      method: 'POST',
      headers: multipartHeader,
      isUpload: true,
      permissionCode: 'FILE_U'
    }
  },
  permission: {
    getList: {
      baseUrl: `${AppConstants.apiUrl}v1/permission/list`,
      method: 'GET',
      headers: baseHeader,
      permissionCode: 'PER_L'
    },
    create: {
      baseUrl: `${AppConstants.apiUrl}v1/permission/create`,
      method: 'POST',
      headers: baseHeader,
      permissionCode: 'PER_C'
    },
    update: {
      baseUrl: `${AppConstants.apiUrl}v1/permission/update`,
      method: 'PUT',
      headers: baseHeader,
      permissionCode: 'PER_U'
    },
    getById: {
      baseUrl: `${AppConstants.apiUrl}v1/permission/get/:id`,
      method: 'GET',
      headers: baseHeader,
      permissionCode: 'PER_V'
    },
    delete: {
      baseUrl: `${AppConstants.apiUrl}v1/permission/delete/:id`,
      method: 'DELETE',
      headers: baseHeader,
      permissionCode: 'PER_D'
    }
  },
  category: {
    getList: {
      baseUrl: `${AppConstants.apiUrl}v1/category/list`,
      method: 'GET',
      headers: baseHeader,
      permissionCode: 'CAT_L'
    },
    create: {
      baseUrl: `${AppConstants.apiUrl}v1/category/create`,
      method: 'POST',
      headers: baseHeader,
      permissionCode: 'CAT_C'
    },
    update: {
      baseUrl: `${AppConstants.apiUrl}v1/category/update`,
      method: 'PUT',
      headers: baseHeader,
      permissionCode: 'CAT_U'
    },
    getById: {
      baseUrl: `${AppConstants.apiUrl}v1/category/get/:id`,
      method: 'GET',
      headers: baseHeader,
      permissionCode: 'CAT_V'
    },
    delete: {
      baseUrl: `${AppConstants.apiUrl}v1/category/delete/:id`,
      method: 'DELETE',
      headers: baseHeader,
      permissionCode: 'CAT_D'
    },
    autoComplete: {
      baseUrl: `${AppConstants.apiUrl}v1/category/auto-complete`,
      method: 'GET',
      headers: baseHeader
    },
    updateOrdering: {
      baseUrl: `${AppConstants.apiUrl}v1/category/update-ordering`,
      method: 'PUT',
      headers: baseHeader,
      permissionCode: 'CAT_U'
    }
  },
  groupPermission: {
    getList: {
      baseUrl: `${AppConstants.apiUrl}v1/permission-group/list`,
      method: 'GET',
      headers: baseHeader,
      permissionCode: 'PER_GR_L'
    },
    create: {
      baseUrl: `${AppConstants.apiUrl}v1/permission-group/create`,
      method: 'POST',
      headers: baseHeader,
      permissionCode: 'PER_GR_C'
    },
    update: {
      baseUrl: `${AppConstants.apiUrl}v1/permission-group/update`,
      method: 'PUT',
      headers: baseHeader,
      permissionCode: 'PER_GR_U'
    },
    getById: {
      baseUrl: `${AppConstants.apiUrl}v1/permission-group/get/:id`,
      method: 'GET',
      headers: baseHeader,
      permissionCode: 'PER_GR_V'
    },
    delete: {
      baseUrl: `${AppConstants.apiUrl}v1/permission-group/delete/:id`,
      method: 'DELETE',
      headers: baseHeader,
      permissionCode: 'PER_GR_D'
    }
  }
});

export default apiConfig;
