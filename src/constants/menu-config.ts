import route from '@/routes';
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
        path: route.account
      },
      {
        key: 'employee-list',
        label: 'Nhân viên',
        path: route.employee
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
        path: route.permission
      }
    ]
  }
];

export default menuConfig;
