'use client';

import { apiConfig, storageKeys } from '@/constants';
import { logger } from '@/logger';
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
  const { setProfile } = useProfileStore();
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
        const res = await http.get<ApiResponse<ProfileResType>>(
          apiConfig.account.getProfile
        );
        if (res.data) {
          setProfile(res.data);
        }
      } catch (error) {
        logger.error(`Error while getting profile: `, error);
        notify.error('Lấy hồ sơ thất bại');
      }
    };
    handleGetProfile();
  }, []);

  return <div>{children}</div>;
}
