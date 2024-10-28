import ShowTopCategories from "@/components/ShowTopCategories";
import ShowTopProducts from "@/components/ShowTopProducts";

const CustomStore = () => {
  return (
    <div className="w-full min-h-screen px-20 py-10">
      <h1 className="text-center text-2xl font-sans font-semibold">
        Our Top Categories
      </h1>
      <ShowTopCategories />
      <h1 className="mt-8 text-center text-2xl font-sans font-semibold">
        Our Top Products
      </h1>
      <ShowTopProducts />
    </div>
  );
};

export default CustomStore;
