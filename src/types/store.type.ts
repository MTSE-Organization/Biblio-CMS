import { ProfileResType } from '@/types/account.type';

export type ProfileStoreType = {
  profile: ProfileResType | null;
  setProfile: (profile: ProfileResType) => void;
};
