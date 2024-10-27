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

interface Category {
  categoryId: string;
  categoryName: string;
  description: string;
  active: boolean;
}

export type CategoryResponse = Category[];
