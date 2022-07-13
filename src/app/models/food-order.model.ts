export interface MenuItems {
  id: string;
  name: string;
  type: string;
  cuisine: string;
  subType: string;
  availability?: string[];
  price: number;
  bestSeller: boolean;
  quantity?: number;
  isAdded?: boolean;
}

export interface OrderList extends MenuItems {
  orderDate: string;
  orderTime: string;
}

export interface CategorizedMenuItems {
  Soup: MenuItems[];
  'Veg Main Course': MenuItems[];
  'Veg Starters': MenuItems[];
  'Non Veg Main Course': MenuItems[];
  'Fried Rice & Noodles': MenuItems[];
  Breads: MenuItems[];
  'Tandoori Items': MenuItems[];
  Mocktails: MenuItems[];
  Briyani: MenuItems[];
}

export interface SnackBarData {
  message: string;
  icon: string;
  class: string;
}
