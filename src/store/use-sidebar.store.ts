import { SidebarStateType } from '@/types';
import { create } from 'zustand';

export const useSidebarStore = create<SidebarStateType>((set) => ({
  openMenus: {},
  toggleMenu: (key) =>
    set((state) => ({
      openMenus: {
        ...state.openMenus,
        [key]: !state.openMenus[key]
      }
    })),
  setMenu: (key, open) =>
    set((state) => ({
      openMenus: {
        ...state.openMenus,
        [key]: open
      }
    })),
  reset: () => set({ openMenus: {} })
}));
export default useSidebarStore;
