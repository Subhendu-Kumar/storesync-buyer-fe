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

export interface Offer {
  id: string;
  offerType: string;
  offerName: string;
  offerCode: string;
  active: boolean;
  percentageValue: number;
  flatAmountValue: number;
  minimumPurchaseAmount: number;
  maximumDiscountAmount: number;
}

export interface Address {
  id: number;
  name: string;
  mobileNo: number;
  email: string;
  address: string;
  area: string;
  landmark: string;
  pinCode: number;
  city: string;
  state: string;
}

export interface Cart {
  cartId: string;
  items: CartItem[];
  deliveryCharge: number;
  subTotal: number;
  discount: number;
  total: number;
  appliedOfferId?: AppliedOffer;
  deliveryAddress?: DeliveryAddress;
}

export interface CartItem {
  productId: string;
  productName: string;
  quantity: number;
  discountedPrice: number;
  actualPrice: number;
  productPhoto: string[];
}

export interface AppliedOffer {
  id: string;
  offerType: string;
  offerName: string;
  offerCode: string;
  active: boolean;
  percentageValue: number;
  flatAmountValue: number;
  minimumPurchaseAmount: number;
  maximumDiscountAmount: number;
}

export interface DeliveryAddress {
  id: number;
  name: string;
  mobileNo: number;
  email: string;
  address: string;
  area: string;
  landmark: string;
  pinCode: number;
  city: string;
  state: string;
}

export interface Order {
  id: string;
  orderAmt: number;
  items: OrderItem[];
  offer: Offer;
  buyerAddress: Address;
  status: "PENDING" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELLED"; // Add any other possible statuses
  paymentMethod: "COD" | "ONLINE"; // Add any other possible payment methods
  orderType: "DELIVERY" | "PICKUP"; // Add any other possible order types
  customerName: string;
  storeName: string;
  createdAt: string; // Date in ISO string format
}

export interface OrderItem {
  id: number;
  productId: string;
  qty: number;
  price: number;
  version: number;
  productName: string;
  productDescription: string;
  productImage: string[];
}

export interface Offer {
  id: string;
  offerType: string;
  offerName: string;
  offerCode: string;
  active: boolean;
  percentageValue: number;
  flatAmountValue: number;
  minimumPurchaseAmount: number;
  maximumDiscountAmount: number;
}

export interface Address {
  id: number;
  name: string;
  mobileNo: number;
  email: string;
  address: string;
  area: string;
  landmark: string;
  pinCode: number;
  city: string;
  state: string;
}
