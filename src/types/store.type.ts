import { ProfileResType } from '@/types/account.type';

export type ProfileStoreType = {
  profile: ProfileResType | null;
  isAuthenticated: boolean;
  setProfile: (profile: ProfileResType) => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
};
