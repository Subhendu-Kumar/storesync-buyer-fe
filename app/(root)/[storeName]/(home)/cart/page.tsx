import CartHandler from "@/components/CartHandler";
import ProtectedRoute from "@/components/ProtectedRoute";

const CartPage = ({ params }: { params: Promise<{ storeName: string }> }) => {
  return (
    <ProtectedRoute params={params}>
      <div className="w-full min-h-screen px-20 pb-10 pt-4">
        <CartHandler params={params} />
      </div>
    </ProtectedRoute>
  );
};

export default CartPage;
