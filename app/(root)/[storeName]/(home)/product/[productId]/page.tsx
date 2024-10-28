"use client";

import ShowProductDetails from "@/components/ShowProductDetails";
import { useParams } from "next/navigation";

const ProductDetails = () => {
  const params = useParams();
  const productId = Array.isArray(params.productId)
    ? params.productId[0]
    : params.productId || "";

  return (
    <div className="w-full min-h-screen px-20 py-10">
      <h1 className="text-center text-2xl font-sans font-semibold">
        Product Details
      </h1>
      <ShowProductDetails productId={productId} />
    </div>
  );
};

export default ProductDetails;
