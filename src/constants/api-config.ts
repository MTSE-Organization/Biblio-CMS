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
            headers: baseHeader
        },
        getList: {
            baseUrl: `${AppConstants.apiUrl}v1/group/list`,
            method: 'GET',
            headers: baseHeader
        },
        getById: {
            baseUrl: `${AppConstants.apiUrl}v1/group/get/:id`,
            method: 'GET',
            headers: baseHeader
        },
        delete: {
            baseUrl: `${AppConstants.apiUrl}v1/group/delete/:id`,
            method: 'DELETE',
            headers: baseHeader
        },
        update: {
            baseUrl: `${AppConstants.apiUrl}v1/group/update`,
            method: 'PUT',
            headers: baseHeader
        }
    },
    file: {
        upload: {
            baseUrl: `${AppConstants.apiUrl}v1/file/upload`,
            method: 'POST',
            headers: multipartHeader,
            isUpload: true
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
    }
});

export default apiConfig;
