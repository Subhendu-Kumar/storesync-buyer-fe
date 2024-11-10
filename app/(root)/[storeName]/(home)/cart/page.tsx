import ProtectedRoute from "@/components/ProtectedRoute";

const CartPage = ({ params }: { params: Promise<{ storeName: string }> }) => {
  return (
    <ProtectedRoute params={params}>
      <div className="w-full min-h-screen px-20 py-10">
        <h1 className="text-center text-2xl font-sans font-semibold">
          Your cart is empty
        </h1>
      </div>
    </ProtectedRoute>
  );
};

export default CartPage;
