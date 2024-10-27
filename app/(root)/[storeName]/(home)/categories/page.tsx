import ShowAllCategories from "@/components/ShowAllCategories";
import React from "react";

const AllCategories = () => {
  return (
    <div className="w-full min-h-screen px-20 py-10">
      <h1 className="text-center text-2xl font-sans font-semibold">
        All Categories
      </h1>
      <ShowAllCategories />
    </div>
  );
};

export default AllCategories;
