export interface AuthContextProps {
  isAuthenticated: boolean;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export interface StoreDetails {
  id: string;
  name: string;
  ownerName: string;
  storeLink: string;
  mobileNo: number;
  storeEmail: string;
  country: string;
  storeAddress: string;
  createdAt: string;
}

export interface Category {
  categoryId: string;
  categoryName: string;
  description: string;
  active: boolean;
}

export type CategoryResponse = Category[];

export interface Inventory {
  warehouseName: string;
  quantity: number;
}

export interface Product {
  id: string;
  productName: string;
  categoryName: string;
  productDesc: string;
  actualPrice: number;
  discountedPrice: number;
  weight: number;
  hsnCode: string;
  storeName: string;
  photoPublicId: [string];
  inventory: Inventory[];
  active: boolean;
}

export type ProductResponse = Product[];

export interface FromData {
  name?: string;
  email: string;
  password: string;
}
