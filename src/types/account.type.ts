import { updateProfileSchema } from '@/schemaValidations/account.schema';
import z from 'zod';

export type Group = {
  id: number;
  name: string;
  kind: number;
  subKind: number;
};

type GroupPermission = {
  id: number;
  name: string;
};

type Permission = {
  id: number;
  name: string;
  action: string;
  showMenu: boolean;
  groupPermission: GroupPermission;
  permissionCode?: string;
};

type GroupProfile = {
  id: number;
  status: number;
  modifiedDate: string;
  createdDate: string;
  name: string;
  description: string;
  kind: number;
  subKind: number;
  permissions: Permission[];
  isSystemRole: boolean;
};

export type ProfileResType = {
  id: number;
  kind: number;
  username: string;
  email: string;
  fullName: string;
  group: GroupProfile;
  lastLogin: string;
  isSuperAdmin: boolean;
  avatarPath: string;
  phone: string;
};

export type ProfileBodyType = z.infer<typeof updateProfileSchema>;
