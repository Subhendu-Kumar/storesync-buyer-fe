"use client";

import { StoreDetails } from "@/types";
import { getStoreDetails } from "@/api";
import { useParams } from "next/navigation";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import ErrorScreen from "@/components/ErrorScreen";
import { ReactNode, useEffect, useState } from "react";
import FullScreenLoader from "@/components/skeleton_loaders/FullScreenLoader";
import { saveStoreIdToLocalStorage } from "@/lib/utils";

const RootLayout = ({ children }: { children: ReactNode }) => {
  const params = useParams();
  const storeName = Array.isArray(params.storeName)
    ? params.storeName[0]
    : params.storeName || "";
  const [loading, setLoading] = useState(true);
  const [storeDetails, setStoreDetails] = useState<StoreDetails | null>(null);
  const [storeNotFound, setStoreNotFound] = useState(false);

  const fetchData = async (storeName: string) => {
    try {
      const res = await getStoreDetails(storeName);
      console.log(res?.status);
      console.log(res?.data);
      if (res?.status === 200) {
        setStoreDetails(res?.data);
        saveStoreIdToLocalStorage(res?.data?.id);
      } else {
        setStoreNotFound(true);
      }
    } catch (error) {
      console.error("Failed to fetch store data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (storeName) {
      setLoading(true);
      fetchData(storeName);
    }
  }, [storeName]);

  if (loading) {
    return <FullScreenLoader />;
  }

  if (storeNotFound) {
    return <ErrorScreen />;
  }

  return (
    <main className="w-full min-h-screen relative">
      <Navbar
        storeName={
          storeDetails?.storeLink.split(" ").join("").toLocaleLowerCase() ||
          "default"
        }
      />
      <div className="w-full h-auto mt-[4.5rem]">
        {children}
        <Footer storeDetails={storeDetails!} />
      </div>
    </main>
  );
};

export default RootLayout;
