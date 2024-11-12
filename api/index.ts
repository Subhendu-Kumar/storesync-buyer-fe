import axios from "axios";
import { BASE_URL } from "@/config";
import { FromData } from "@/types";
import { getToken } from "@/lib/utils";
import { AddressFormValues } from "@/lib/validations";

const API = axios.create({
  baseURL: BASE_URL,
});

API.interceptors.request.use((req) => {
  const token = getToken();
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

/*---------- store services ----------*/
export const getStoreDetails = async (storeName: string) => {
  try {
    const response = await API.get(`/stores/public/${storeName}/metadata`);
    return response;
  } catch (error) {
    console.log("error ", error);
  }
};

/*---------- auth services ----------*/
export const signUp = async (data: FromData) => {
  try {
    const response = await API.post(`/auth/buyer/register`, data);
    return response;
  } catch (error) {
    console.log("error ", error);
  }
};

export const signIn = async (data: FromData) => {
  try {
    const response = await API.post(`/auth/buyer/login`, data);
    return response;
  } catch (error) {
    console.log("error ", error);
  }
};

/*---------- category services ----------*/
export const getCategories = async (store_id: string) => {
  try {
    const response = await API.get(`/stores/public/${store_id}/categories`);
    return response;
  } catch (error) {
    console.log("error ", error);
  }
};

export const getCategoryByCategoryId = async (
  store_id: string,
  category_id: string
) => {
  console.log(store_id, category_id);
  try {
    const response = await API.get(
      `/stores/public/${store_id}/categories/${category_id}`
    );
    return response;
  } catch (error) {
    console.log("error ", error);
  }
};

/*---------- product services ----------*/
export const getProducts = async (store_id: string) => {
  try {
    const response = await API.get(`/stores/public/${store_id}/products`);
    return response;
  } catch (error) {
    console.log("error ", error);
  }
};

export const getProductByCategoryId = async (
  store_id: string,
  category_id: string
) => {
  try {
    const response = await API.get(
      `/stores/public/${store_id}/categories/${category_id}/products`
    );
    return response;
  } catch (error) {
    console.log("error ", error);
  }
};

export const getProductByProductId = async (
  store_id: string,
  product_id: string
) => {
  try {
    const response = await API.get(
      `/stores/public/${store_id}/products/${product_id}`
    );
    return response;
  } catch (error) {
    console.log("error ", error);
  }
};

/*---------- cart services ----------*/
export const addToCart = async (
  user_id: string,
  data: {
    storeId: string;
    productId: string;
  }
) => {
  try {
    const response = await API.post(
      `/users/${user_id}/cart?buyNow=false`,
      data
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteFromCart = async (
  user_id: string,
  data: {
    storeId: string;
    productId: string;
  },
  removeCompletely: boolean
) => {
  try {
    const response = await API.delete(
      `/users/${user_id}/cart?removeCompletely=${removeCompletely}`,
      { data }
    );
    return response;
  } catch (error) {
    console.log("error ", error);
  }
};

export const getCart = async (user_id: string, store_id: string) => {
  try {
    const respopnse = await API.get(
      `/users/${user_id}/cart?storeId=${store_id}&buyNow=false`
    );
    return respopnse;
  } catch (error) {
    console.log("error", error);
  }
};

/*---------- offer services ----------*/
export const getOffers = async (store_id: string) => {
  try {
    const response = await API.get(`/stores/public/${store_id}/offers`);
    return response;
  } catch (error) {
    console.log("error ", error);
  }
};

export const applyOffer = async (
  user_id: string,
  store_id: string,
  offer_id: string
) => {
  try {
    const response = await API.post(
      `/users/${user_id}/cart/apply-offer?storeId=${store_id}&offerId=${offer_id}&buyNow=false`
    );
    return response;
  } catch (error) {
    console.log("error ", error);
  }
};

export const removeOffer = async (user_id: string, store_id: string) => {
  try {
    const response = await API.post(
      `/users/${user_id}/cart/remove-offer?storeId=${store_id}&buyNow=false`
    );
    return response;
  } catch (error) {
    console.log("error ", error);
  }
};

/*---------- address services ----------*/
export const getAddresses = async (user_id: string) => {
  try {
    const response = await API.get(`/users/${user_id}/address`);
    return response;
  } catch (error) {
    console.log("error ", error);
  }
};

export const addAddress = async (user_id: string, data: AddressFormValues) => {
  try {
    const response = await API.put(`/users/${user_id}/address`, data);
    return response;
  } catch (error) {
    console.log("error ", error);
  }
};

export const deleteAddress = async (user_id: string, address_id: string) => {
  try {
    const response = await API.delete(
      `/users/${user_id}/address/${address_id}`
    );
    return response;
  } catch (error) {
    console.log("error ", error);
  }
};

export const applyAddressToCart = async (
  user_id: string,
  store_id: string,
  address_id: number
) => {
  try {
    const response = await API.patch(
      `/users/${user_id}/cart?storeId=${store_id}&addressId=${address_id}&buyNow=false`
    );
    return response;
  } catch (error) {
    console.log("error ", error);
  }
};
