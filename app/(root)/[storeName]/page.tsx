import ShowTopCategories from "@/components/ShowTopCategories";

const CustomStore = () => {
  return (
    <div className="w-full min-h-screen px-20 py-10">
      <h1 className="text-center text-2xl font-sans font-semibold">
        Our Top Categories
      </h1>
      <ShowTopCategories />
    </div>
  );
};

export default CustomStore;
