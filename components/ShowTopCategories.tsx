"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import CategoryDemoImage from "@/public/demo-category-img.jpg";
import { useEffect, useState } from "react";
import { getStoreIdFromLocalStorage } from "@/lib/utils";
import { getCategories } from "@/api";
import { CategoryResponse } from "@/types";
import CategoryCardSkeleton from "./skeleton_loaders/CategoryCardSkeleton";
import { Button } from "./ui/button";
import { useParams, useRouter } from "next/navigation";

const ShowTopCategories = () => {
  const params = useParams();
  const storeName = Array.isArray(params.storeName)
    ? params.storeName[0]
    : params.storeName || "";
  const router = useRouter();
  const [storeId, setStoreId] = useState<string>(
    getStoreIdFromLocalStorage() || ""
  );
  const [fetching, setFetching] = useState<boolean>(false);
  const [categories, setCategories] = useState<CategoryResponse>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      setFetching(true);
      try {
        const res = await getCategories(storeId);
        if (res?.status === 200) {
          setCategories(res?.data);
        }
      } catch (error) {
        console.log("error fetching warehouses: ", error);
      } finally {
        setFetching(false);
      }
    };
    setStoreId(getStoreIdFromLocalStorage() || "");
    if (storeId) {
      fetchCategories();
    }
  }, [storeId]);

  return (
    <div className="w-full h-auto grid grid-cols-3 gap-4 mt-6">
      {fetching ? (
        Array.from({ length: 3 }).map((_, idx) => (
          <CategoryCardSkeleton key={idx} />
        ))
      ) : categories.length === 0 ? (
        <div className="w-full h-20 flex items-center justify-center text-xl text-red-500">
          No categories found of this store
        </div>
      ) : (
        categories
          .filter((data) => data.active)
          .slice(0, 3)
          .map((data, idx) => {
            return (
              <Card className="bg-gray-50" key={idx}>
                <CardHeader>
                  <CardTitle>{data?.categoryName}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-60 rounded-lg overflow-hidden bg-purple-100 border">
                    <Image
                      src={CategoryDemoImage}
                      alt="category"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </CardContent>
                <CardFooter className="w-full h-auto flex flex-col items-start justify-start">
                  <CardDescription>
                    {data?.description?.length > 100
                      ? `${data.description.slice(0, 100)}...`
                      : data.description}
                  </CardDescription>
                  <Button
                    variant="outline"
                    onClick={() => {
                      router.push(`/${storeName}/category/${data?.categoryId}`);
                    }}
                    className="w-full mt-4 border-black"
                  >
                    Show details
                  </Button>
                </CardFooter>
              </Card>
            );
          })
      )}
    </div>
  );
};

export default ShowTopCategories;
