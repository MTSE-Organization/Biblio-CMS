import { CategoryBodyType, ErrorMaps, GroupBodyType } from '@/types';

export const ErrorCode = {
    // Auth
    AUTH_ERROR_UNAUTHORIZED: 'ERROR-AUTH-0002',

    // Category
    CATEGORY_ERROR_NOT_FOUND: 'ERROR-CATEGORY-0000',
    CATEGORY_ERROR_NAME_EXISTED: 'ERROR-CATEGORY-0001',

    // Permission
    PERMISSION_ERROR_NOT_FOUND: 'ERROR-PERMISSION-0000',
    PERMISSION_ERROR_NAME_EXISTS: 'ERROR-PERMISSION-0001',
    PERMISSION_ERROR_CODE_EXISTS: 'ERROR-PERMISSION-0002',

    // Group
    GROUP_ERROR_NOT_FOUND: 'ERROR-GROUP-0000',
    GROUP_ERROR_NAME_EXISTS: 'ERROR-GROUP-0001',
    GROUP_ERROR_IN_USED: 'ERROR-GROUP-0002',

    // Category
    CATEGORY_ERROR_NAME_EXISTS: 'ERROR-CATEGORY-0001'
} as const;

export const groupErrorMaps: ErrorMaps<GroupBodyType> = {
    [ErrorCode.GROUP_ERROR_NAME_EXISTS]: [
        ['name', { type: 'manual', message: 'Tên nhóm đã tồn tại' }]
    ]
};

export const categoryErrorMaps: ErrorMaps<CategoryBodyType> = {
    [ErrorCode.CATEGORY_ERROR_NAME_EXISTS]: [
        ['name', { type: 'manual', message: 'Tên danh mục tồn tại' }]
    ]
};
