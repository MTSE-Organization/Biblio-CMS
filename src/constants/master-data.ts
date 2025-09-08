import {
    STATUS_ACTIVE,
    STATUS_DELETED,
    STATUS_LOCK,
    STATUS_PENDING,
    UPLOAD_AVATAR,
    UPLOAD_SYSTEM
} from '@/constants/constant';

export const uploadOptions = {
    SYSTEM: UPLOAD_SYSTEM,
    AVATAR: UPLOAD_AVATAR
};

export const groupKinds = [
    {
        label: 'ADMIN',
        value: 1,
        color: '#EF4444'
    },
    {
        label: 'EMPLOYEE',
        value: 2,
        color: '#3B82F6'
    },
    {
        label: 'USER',
        value: 3,
        color: '#10B981'
    }
];

export const statusOptions = [
    {
        value: STATUS_ACTIVE,
        label: 'Hoạt động',
        color: '#28a745'
    },
    {
        value: STATUS_PENDING,
        label: 'Đang chờ',
        color: '#ffc107'
    },
    {
        value: STATUS_LOCK,
        label: 'Khóa',
        color: '#fd7e14'
    },
    {
        value: STATUS_DELETED,
        label: 'Đã xóa',
        color: '#dc3545'
    }
];
