import ShowAllProducts from "@/components/ShowAllProducts";
import React from "react";

const AllProducts = () => {
  return (
    <div className="w-full min-h-screen px-20 py-10">
      <h1 className="text-center text-2xl font-sans font-semibold">
        All Products
      </h1>
      <ShowAllProducts />
    </div>
  );
};

export default AllProducts;
