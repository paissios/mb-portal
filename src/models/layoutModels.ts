export interface layoutWrapperModel {
  children: React.ReactNode | React.ReactNode[] | null;
}

export interface menuItemModel {
  id: number;
  title: string;
  link: string;
  icon: React.ReactNode;
}

export interface navbarModel {
  menuItems: menuItemModel[];
  activeMenu: boolean;
  setActiveMenu: (activeMenu: boolean) => void;
}
