import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { useEffect, useState } from "react";
import { Category, ProductResponse } from "@/types";
import { useParams, useRouter } from "next/navigation";
import { getBuyerDetails, getStoreIdFromLocalStorage } from "@/lib/utils";
import { CLOUDINARY_BASE_URL, CLOUDINARY_KEY } from "@/config";
import {
  addToCart,
  getCategoryByCategoryId,
  getProductByCategoryId,
} from "@/api";
import CategoryCardSkeleton from "./skeleton_loaders/CategoryCardSkeleton";
import { useToast } from "@/hooks/use-toast";
import { FaCircleNotch } from "react-icons/fa6";

const ShowCategoryDetails = ({ categoryId }: { categoryId: string }) => {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const storeName = Array.isArray(params.storeName)
    ? params.storeName[0]
    : params.storeName || "";
  const [storeId, setStoreId] = useState<string>(
    getStoreIdFromLocalStorage() || ""
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState(false);
  const [fetching, setFetching] = useState<boolean>(false);
  const [category_id, setCategory_id] = useState<string>("");
  const [products, setProducts] = useState<ProductResponse>([]);
  const [category, setCategory] = useState<Category>({} as Category);
  const [categoryFetchComplete, setCategoryFetchComplete] =
    useState<boolean>(false);
  const [productIdToAddToCart, setProductIdToAddToCart] = useState<string>("");
  const [buyerDetails, setBuyerDetails] = useState<{
    name: string;
    id: string;
  } | null>(getBuyerDetails());

  useEffect(() => {
    if (category) {
      setCategory_id(category?.categoryId || "");
    }
  }, [category]);

  useEffect(() => {
    const buyerDetails = getBuyerDetails();
    setBuyerDetails(buyerDetails);
  }, []);

  useEffect(() => {
    const fetchproducts = async () => {
      setLoading(true);
      try {
        const res = await getProductByCategoryId(storeId, category_id);
        if (res?.status === 200) {
          setProducts(res?.data);
        }
      } catch (error) {
        console.log("error fetching warehouses: ", error);
      } finally {
        setLoading(false);
      }
    };
    setStoreId(getStoreIdFromLocalStorage() || "");
    if (categoryFetchComplete && storeId && category_id) {
      fetchproducts();
    }
  }, [storeId, category_id, categoryFetchComplete]);

  useEffect(() => {
    const fetchCategory = async () => {
      setFetching(true);
      try {
        const res = await getCategoryByCategoryId(storeId, categoryId);
        if (res?.status === 200) {
          if (res?.data?.active) {
            setCategory(res?.data);
            setCategoryFetchComplete(true);
          } else {
            setCategory({} as Category);
          }
        }
      } catch (error) {
        console.log("error fetching warehouses: ", error);
      } finally {
        setFetching(false);
      }
    };
    setStoreId(getStoreIdFromLocalStorage() || "");
    if (storeId) {
      fetchCategory();
    }
  }, [storeId, categoryId]);

  const handleAddToCart = async () => {
    const cartData = {
      storeId,
      productId: productIdToAddToCart,
    };
    console.log(cartData);
    setIsLoading(true);
    try {
      const res = await addToCart(buyerDetails?.id || "", cartData);
      console.log(res);
      if (res?.status === 200) {
        toast({
          title: "Success",
          description: "Product added to cart successfully",
        });
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        toast({
          title: "Error: Something went wrong",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log("error adding to cart: ", error);
      toast({
        title: "Error: Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-auto py-10">
      {fetching ? (
        <div className="w-full h-auto px-6 py-3 border border-gray-300 shadow-md flex flex-col items-start rounded-lg justify-start gap-1">
          <Skeleton className="w-1/3 h-8 rounded-lg bg-gray-200" />
          <Skeleton className="w-full h-12 mt-2 bg-gray-200" />
        </div>
      ) : !categoryFetchComplete || !category.active ? (
        <div className="w-full h-20 flex items-center justify-center text-xl text-red-500">
          This category is not currently active. Explore other categories.
        </div>
      ) : (
        <div className="w-full h-auto px-6 py-3 border border-gray-300 shadow-md flex flex-col items-start rounded-lg justify-start gap-1">
          <h1 className="text-2xl font-sans font-semibold">
            <span className="text-blue-800 bg-blue-100 px-2 rounded-lg py-0.5">
              {category?.categoryName}
            </span>
          </h1>
          <p className="text-lg font-medium text-gray-500 mt-1 font-sans">
            {category?.description}
          </p>
        </div>
      )}
      {categoryFetchComplete && category.active && (
        <div className=" w-full h-auto mt-6">
          <div className="w-full h-auto grid grid-cols-3 gap-4 mt-6">
            {loading ? (
              Array.from({ length: 6 }).map((_, idx) => (
                <CategoryCardSkeleton key={idx} />
              ))
            ) : products.length === 0 ? (
              <div className="w-full h-20 flex items-center justify-center text-xl text-red-500">
                {!categoryFetchComplete
                  ? "wait catergory is fetching"
                  : "No products found of this store"}
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
                            <p>
                              Quantity available: {data?.inventory[0]?.quantity}
                            </p>
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
                              onClick={() => {
                                setProductIdToAddToCart(data?.id);
                                handleAddToCart();
                              }}
                            >
                              {isLoading ? (
                                <FaCircleNotch className="animate-spin text-xl" />
                              ) : success ? (
                                "Added 1 item"
                              ) : (
                                "Add to cart"
                              )}
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
        </div>
      )}
    </div>
  );
};

export default ShowCategoryDetails;
