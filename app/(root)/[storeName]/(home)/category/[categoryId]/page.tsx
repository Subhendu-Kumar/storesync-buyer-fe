"use client";

import { useParams } from "next/navigation";

const CategoryDetails = () => {
  const params = useParams();
  const categoryId = Array.isArray(params.categoryId)
    ? params.categoryId[0]
    : params.categoryId || "";

  console.log(categoryId);
  return (
    <div className="w-full min-h-screen px-20 py-10">
      <h1 className="text-center text-2xl font-sans font-semibold">
        Category Details
      </h1>
    </div>
  );
};

export default CategoryDetails;
