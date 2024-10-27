import { STORE_ID_KEY } from "@/config";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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