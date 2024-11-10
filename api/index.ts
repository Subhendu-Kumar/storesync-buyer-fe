import axios from "axios";
import { BASE_URL } from "@/config";
import { FromData } from "@/types";

const API = axios.create({
  baseURL: BASE_URL,
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
