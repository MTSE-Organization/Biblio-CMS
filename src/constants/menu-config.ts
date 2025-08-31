import { MenuItem } from '@/types';
import { Settings, User } from 'lucide-react';

const menuConfig: MenuItem[] = [
  {
    key: 'account-management',
    label: 'Quản lý tài khoản',
    icon: User,
    children: [
      {
        key: 'account-list',
        label: 'Tài khoản',
        path: '/account'
      },
      {
        key: 'employee-list',
        label: 'Nhân viên',
        path: '/employee'
      }
    ]
  },
  {
    key: 'system-management',
    label: 'Quản lý hệ thống',
    icon: Settings,
    children: [
      {
        key: 'permission',
        label: 'Quyền',
        path: '/permission'
      }
    ]
  }
];

export default menuConfig;
