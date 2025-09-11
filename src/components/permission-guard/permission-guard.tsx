'use client';

import { Unauthorized } from '@/components/unauthorized';
import route from '@/routes';
import { useAuth, useIsMounted } from '@/hooks';
import { usePathname } from 'next/navigation';
import { validatePermission } from '@/utils';

export default function PermissionGuard({
  children
}: {
  children: React.ReactNode;
}) {
  const { permissionCode: userPermissions } = useAuth();
  const pathname = usePathname();
  const isMounted = useIsMounted();

  function pathToRegex(path: string): RegExp {
    const regexString = path.replace(/:[^/]+/g, '[^/]+').replace(/\//g, '\\/');

    return new RegExp(`^${regexString}$`);
  }

  function findPermissionByPath(
    obj: Record<string, any>,
    pathname: string
  ): string[] {
    for (const key in obj) {
      const item = obj[key];

      if (item?.path) {
        const regex = pathToRegex(item.path);
        if (regex.test(pathname) && item.permissionCode) {
          return item.permissionCode;
        }
      }

      if (item?.children) {
        const result = findPermissionByPath(item.children, pathname);
        if (result.length > 0) return result;
      }

      if (typeof item === 'object') {
        const result = findPermissionByPath(item, pathname);
        if (result.length > 0) return result;
      }
    }
    return [];
  }

  const requiredPermissions = findPermissionByPath(route, pathname);

  const hasPermission = validatePermission({
    requiredPermissions,
    userPermissions
  });

  if (!hasPermission && isMounted) {
    return <Unauthorized />;
  }

  return <>{children}</>;
}
