'use client';

import { useProfileStore } from '@/store';
import { decodeJwt, getAccessTokenFromLocalStorage } from '@/utils';

const useAuth = () => {
  const { profile } = useProfileStore();
  const accessToken = getAccessTokenFromLocalStorage();
  let permissionCode: string[] = [];
  if (accessToken) {
    const decodedToken = decodeJwt(accessToken);
    if (decodedToken?.authorities) {
      permissionCode =
        decodedToken?.authorities?.length > 0
          ? decodedToken?.authorities?.map((role) => role.replace(/^ROLE_/, ''))
          : [];
    }
  }

  return {
    isAuthenticate: !!profile,
    profile,
    kind: profile?.kind,
    permissionCode: permissionCode,
    accessToken
  };
};

export default useAuth;
