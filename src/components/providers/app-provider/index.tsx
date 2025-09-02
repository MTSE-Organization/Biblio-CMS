'use client';

import { apiConfig, storageKeys } from '@/constants';
import { logger } from '@/logger';
import { useProfileQuery } from '@/queries';
import route from '@/routes';
import useProfileStore from '@/store/use-profile.store';
import { ApiResponse, ProfileResType } from '@/types';
import { getData, http, notify } from '@/utils';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AppProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const { setTheme } = useTheme();
  const router = useRouter();
  const accessToken = getData(storageKeys.ACCESS_TOKEN);
  const profileQuery = useProfileQuery();
  const { setProfile, isAuthenticated } = useProfileStore();
  useEffect(() => {
    if (!accessToken) {
      router.push(route.login);
    }
  }, [router, accessToken]);

  useEffect(() => setTheme('light'), [setTheme]);

  useEffect(() => {
    if (!accessToken) return;

    const handleGetProfile = async () => {
      try {
        const res = await profileQuery.refetch();
        if (res.data?.data) {
          setProfile(res.data.data);
        }
      } catch (error) {
        logger.error(`Error while getting profile: `, error);
        notify.error('Lấy hồ sơ thất bại');
      }
    };
    handleGetProfile();
  }, [accessToken, setProfile, profileQuery, isAuthenticated]);

  return <>{children}</>;
}
