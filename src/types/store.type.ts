import { ProfileResType } from '@/types/account.type';
import { Socket } from 'socket.io-client';

export type ProfileStoreType = {
  isAuthenticated: boolean;
  profile: ProfileResType | null;
  loading: boolean;
  socket: Socket | null;
  setAuthenticated: (isAuthenticated: boolean) => void;
  setProfile: (profile: ProfileResType | null) => void;
  setLoading: (loading: boolean) => void;
  connectSocket: (token: string) => void;
  disconnectSocket: () => void;
};
