import apiConfig from '@/constants/api-config';
import route from '@/routes';
import { MenuItem } from '@/types';
import { BookOpen, Settings, User } from 'lucide-react';

const menuConfig: MenuItem[] = [
  {
    key: 'account-management',
    label: 'Quản lý tài khoản',
    icon: User,
    permissionCode: [apiConfig.account.getList.permissionCode],
    children: [
      {
        key: 'account-list',
        label: 'Tài khoản',
        path: route.account.path,
        permissionCode: [apiConfig.account.getList.permissionCode]
      }
      // {
      //   key: 'employee-list',
      //   label: 'Nhân viên',
      //   path: route.employee.path
      // }
    ]
  },
  {
    key: 'product-management',
    label: 'Quản lý sách',
    icon: BookOpen,
    permissionCode: [apiConfig.category.getList.permissionCode],
    children: [
      {
        key: 'category-list',
        label: 'Danh mục sách',
        path: route.category.path,
        permissionCode: [apiConfig.category.getList.permissionCode]
      },
      { key: 'product-list', label: 'Sách', path: route.product.path }
    ]
  },
  {
    key: 'system-management',
    label: 'Quản lý hệ thống',
    icon: Settings,
    permissionCode: [
      apiConfig.group.getList.permissionCode,
      apiConfig.groupPermission.getList.permissionCode,
      apiConfig.permission.getList.permissionCode
    ],
    children: [
      {
        key: 'permission',
        label: 'Quyền',
        path: route.group.path,
        permissionCode: [apiConfig.group.getList.permissionCode]
      }
    ]
  }
];

export default menuConfig;
