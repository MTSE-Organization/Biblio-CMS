import { UPLOAD_AVATAR, UPLOAD_SYSTEM } from '@/constants/constant';

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
