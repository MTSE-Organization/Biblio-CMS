import route from '@/routes';
import { MenuItem } from '@/types';
import { BookOpen, Settings, User } from 'lucide-react';

const menuConfig: MenuItem[] = [
  {
    key: 'account-management',
    label: 'Quản lý tài khoản',
    icon: User,
    children: [
      {
        key: 'account-list',
        label: 'Tài khoản',
        path: route.account.path
      },
      {
        key: 'employee-list',
        label: 'Nhân viên',
        path: route.employee.path
      }
    ]
  },
  {
    key: 'product-management',
    label: 'Quản lý sách',
    icon: BookOpen,
    children: [
      {
        key: 'category-list',
        label: 'Danh mục sách',
        path: route.category.path
      },
      { key: 'product-list', label: 'Sách', path: route.product.path }
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
        path: route.group.path
      }
    ]
  }
];

export default menuConfig;
