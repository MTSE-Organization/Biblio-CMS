'use client';

import { storageKeys } from '@/constants';
import { useProfileQuery } from '@/queries';
import { useAuthStore } from '@/store';
import { getData } from '@/utils';
import { useEffect } from 'react';

export default function AppProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const accessToken = getData(storageKeys.ACCESS_TOKEN);
  const profileQuery = useProfileQuery();
  const { setProfile, setLoading, connectSocket, socket, disconnectSocket } =
    useAuthStore();

  useEffect(() => {
    setLoading(profileQuery.isLoading || profileQuery.isFetching);
  }, [profileQuery.isFetching, profileQuery.isLoading, setLoading]);

  useEffect(() => {
    if (!accessToken) return;
    profileQuery.refetch().then((res) => {
      if (res.data?.data) setProfile(res.data.data);
    });
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return;

    const s = connectSocket(accessToken);

    const pingInterval = setInterval(() => {
      if (s.connected) {
        s.emit('ping', { message: 'ping from client' });
      }
    }, 30 * 1000);

    const handleUnload = () => {
      console.log('Disconnect socket before unload');
      s.disconnect();
    };

    window.addEventListener('beforeunload', handleUnload);

    return () => {
      clearInterval(pingInterval);
      window.removeEventListener('beforeunload', handleUnload);
      s.disconnect();
    };
  }, [accessToken]);

  return <>{children}</>;
}
