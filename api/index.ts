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
    const response = await API.post(`/users/${user_id}/cart`, data);
    return response;
  } catch (error) {
    console.log(error);
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
