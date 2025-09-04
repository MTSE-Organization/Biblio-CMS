export type SidebarStateType = {
  openMenus: Record<string, boolean>;
  toggleMenu: (key: string) => void;
  setMenu: (key: string, open: boolean) => void;
  reset: () => void;
};
