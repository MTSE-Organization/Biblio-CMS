export type GroupResType = {
  id: string;
  name: string;
  description: string;
  kind: number;
  isSystemRole: boolean;
  status: number;
};

export type GroupBodyType = {
  id: number;
  name: string;
  description: string;
  kind: number;
  permissionIds: string[];
};
