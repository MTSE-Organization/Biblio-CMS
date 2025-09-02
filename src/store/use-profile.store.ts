import { ProfileStoreType, ProfileResType } from '@/types';
import { create } from 'zustand';
const useProfileStore = create<ProfileStoreType>((set) => ({
  profile: null,
  isAuthenticated: false,
  setProfile: (profile: ProfileResType) => set({ profile }),
  setAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated })
}));

export default useProfileStore;
