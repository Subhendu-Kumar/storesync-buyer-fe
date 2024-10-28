import axios from "axios";
import { BASE_URL } from "@/config";

const API = axios.create({
  baseURL: BASE_URL,
});

export const getStoreDetails = async (storeName: string) => {
  try {
    const response = await API.get(`/stores/public/${storeName}/metadata`);
    return response;
  } catch (error) {
    console.log("error ", error);
  }
};

export const getCategories = async (store_id: string) => {
  try {
    const response = await API.get(`/stores/public/${store_id}/categories`);
    return response;
  } catch (error) {
    console.log("error ", error);
  }
};

export const getProducts = async (store_id: string) => {
  try {
    const response = await API.get(`/stores/public/${store_id}/products`);
    return response;
  } catch (error) {
    console.log("error ", error);
  }
};
