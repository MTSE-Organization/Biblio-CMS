'use client';

import { LoadingWrapper } from '@/components/loading';
import { Redirect } from '@/components/redirect';
import { storageKeys } from '@/constants';
import { logger } from '@/logger';
import { useProfileQuery } from '@/queries';
import route from '@/routes';
import useProfileStore from '@/store/use-profile.store';
import { getData, notify } from '@/utils';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AppProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const accessToken = getData(storageKeys.ACCESS_TOKEN);
  const profileQuery = useProfileQuery();
  const { setProfile, isAuthenticated } = useProfileStore();
  useEffect(() => {
    if (!accessToken) {
      router.push(route.login.path);
    }
  }, [router, accessToken]);

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
  }, [accessToken, isAuthenticated]);

  return (
    <>
      <Redirect />
      {children}
      <AnimatePresence>
        {(profileQuery.isLoading || profileQuery.isFetching) && (
          <LoadingWrapper key='loading' />
        )}
      </AnimatePresence>
    </>
  );
}
