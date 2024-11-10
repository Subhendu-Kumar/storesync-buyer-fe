import { jwtDecode } from "jwt-decode";
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";
import { BUYER_DETAILS_KEY, STORE_ID_KEY, TOKEN_KEY } from "@/config";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const saveStoreIdToLocalStorage = (storeId: string): void => {
  localStorage.setItem(STORE_ID_KEY, storeId);
};

export const getStoreIdFromLocalStorage = (): string | null => {
  try {
    const storeId = localStorage.getItem(STORE_ID_KEY);
    return storeId ? storeId : null;
  } catch (error) {
    console.error("Error retrieving Store ID from localStorage:", error);
    return null;
  }
};

export const setBuyerDetails = (buyer_name: string, buyer_Id: string) => {
  const buyer_details = {
    name: buyer_name,
    id: buyer_Id,
  };
  localStorage.setItem(BUYER_DETAILS_KEY, JSON.stringify(buyer_details));
};

export const getBuyerDetails = () => {
  const buyerDetails = localStorage.getItem(BUYER_DETAILS_KEY);
  if (buyerDetails) {
    return JSON.parse(buyerDetails);
  }
  return null;
};

export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp && decodedToken.exp < currentTime) {
        clearUserData();
        return null;
      }
      return token;
    } catch (error) {
      console.log(error);
      clearUserData();
      return null;
    }
  }
  return null;
};

export const clearUserData = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(BUYER_DETAILS_KEY);
};
