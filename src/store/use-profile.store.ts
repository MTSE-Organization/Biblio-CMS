import { ProfileStoreType, ProfileResType } from '@/types';
import { create } from 'zustand';
const useProfileStore = create<ProfileStoreType>((set) => ({
  profile: null,
  setProfile: (profile: ProfileResType) => set({ profile })
}));

export default useProfileStore;
