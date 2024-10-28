"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { getProducts } from "@/api";
import { Button } from "./ui/button";
import { ProductResponse } from "@/types";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getStoreIdFromLocalStorage } from "@/lib/utils";
import { CLOUDINARY_BASE_URL, CLOUDINARY_KEY } from "@/config";
import CategoryCardSkeleton from "./skeleton_loaders/CategoryCardSkeleton";

const ShowAllProducts = () => {
  const router = useRouter();
  const params = useParams();
  const storeName = Array.isArray(params.storeName)
    ? params.storeName[0]
    : params.storeName || "";
  const [storeId, setStoreId] = useState<string>(
    getStoreIdFromLocalStorage() || ""
  );
  const [fetching, setFetching] = useState<boolean>(false);
  const [products, setProducts] = useState<ProductResponse>([]);

  useEffect(() => {
    const fetchproducts = async () => {
      setFetching(true);
      try {
        const res = await getProducts(storeId);
        if (res?.status === 200) {
          setProducts(res?.data);
        }
      } catch (error) {
        console.log("error fetching warehouses: ", error);
      } finally {
        setFetching(false);
      }
    };
    setStoreId(getStoreIdFromLocalStorage() || "");
    if (storeId) {
      fetchproducts();
    }
  }, [storeId]);

  return (
    <div className="w-full h-auto grid grid-cols-3 gap-4 mt-6">
      {fetching ? (
        Array.from({ length: 6 }).map((_, idx) => (
          <CategoryCardSkeleton key={idx} />
        ))
      ) : products.length === 0 ? (
        <div className="w-full h-20 flex items-center justify-center text-xl text-red-500">
          No products found of this store
        </div>
      ) : (
        products
          .filter((data) => data.active)
          .map((data, idx) => {
            console.log(data);
            return (
              <Card className="bg-gray-50" key={idx}>
                <CardHeader>
                  <CardTitle>{data?.productName}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-60 rounded-lg overflow-hidden bg-purple-100 border">
                    <Image
                      src={`${CLOUDINARY_BASE_URL}/${data?.photoPublicId[0]}?_a=${CLOUDINARY_KEY}`}
                      alt="category"
                      width={100}
                      height={100}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="w-full h-auto mt-3">
                    <p>Category: {data?.categoryName}</p>
                  </div>
                  <div className="flex flex-col items-start justify-start">
                    <div className="w-full h-auto mt-4 flex flex-col items-start justify-start gap-2">
                      <p>
                        Price:{" "}
                        <span className="text-green-500">
                          {data?.discountedPrice}
                        </span>{" "}
                        <span className="line-through text-red-500">
                          {data?.actualPrice}
                        </span>
                      </p>
                      <p>Weight: {data?.weight} kg</p>
                      <p>Quantity available: {data?.inventory[0]?.quantity}</p>
                    </div>
                    <CardDescription className="mt-2">
                      {data?.productDesc?.length > 100
                        ? `${data.productDesc.slice(0, 100)}...`
                        : data.productDesc}
                    </CardDescription>
                    <div className="w-full h-auto flex items-center justify-start gap-4 mt-4">
                      <Button
                        variant="outline"
                        className="w-[50%] border-black"
                      >
                        Add to cart
                      </Button>
                      <Button className="w-[50%]">Buy now</Button>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full mt-4 border-black"
                      onClick={() => {
                        router.push(`/${storeName}/product/${data?.id}`);
                      }}
                    >
                      Show details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })
      )}
    </div>
  );
};

export default ShowAllProducts;
