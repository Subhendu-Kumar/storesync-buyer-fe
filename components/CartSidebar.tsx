import { Cart } from "@/types";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { RiVerifiedBadgeFill } from "react-icons/ri";

const CartSidebar = ({
  cart,
  currentStep,
  handleContinue,
  fetchingCartData,
}: {
  cart: Cart;
  currentStep: number;
  handleContinue: () => void;
  fetchingCartData: boolean;
}) => {
  const totalActualPrice = cart?.items.reduce((total, item) => {
    return total + item.actualPrice * item.quantity;
  }, 0);

  return (
    <div className="w-[30%] h-auto border border-gray-300 rounded-lg p-3 flex flex-col items-center justify-end gap-3">
      <div className="w-full h-auto flex flex-col items-center justify-center">
        <h1 className="flex w-full items-center justify-between text-lg font-serif font-normal text-gray-500">
          <span>Item total</span>
          {!fetchingCartData ? (
            <span>
              <span className="line-through text-gray-400">
                &#8377;{totalActualPrice}
              </span>{" "}
              &#8377;{cart?.total || 0.0}
            </span>
          ) : (
            <Skeleton className="w-16 h-5" />
          )}
        </h1>
        <h1 className="flex w-full items-center justify-between text-lg font-serif font-normal text-gray-500">
          <span>Discount</span>
          {!fetchingCartData ? (
            <span className="text-green-500">
              -&#8377;{cart?.discount || 0.0}
            </span>
          ) : (
            <Skeleton className="w-16 h-5" />
          )}
        </h1>
        <h1 className="flex w-full items-center justify-between text-lg font-serif font-normal text-gray-500">
          <span>Delivery fee</span>
          {!fetchingCartData ? (
            <span>
              <span className="text-gray-400 line-through">&#8377;100.00</span>{" "}
              &#8377;{cart?.deliveryCharge || 0.0}
            </span>
          ) : (
            <Skeleton className="w-16 h-5" />
          )}
        </h1>
      </div>
      <div className="w-full border-t border-gray-500 border-dashed" />
      <div className="w-full h-auto flex flex-col items-center justify-center">
        <h1 className="flex w-full items-center justify-between text-lg font-serif font-semibold text-black">
          <span>Grand total</span>
          {!fetchingCartData ? (
            <span>&#8377;{cart?.subTotal || 0.0}</span>
          ) : (
            <Skeleton className="w-16 h-5" />
          )}
        </h1>
        <p className="text-left w-full text-sm font-serif font-normal text-gray-500">
          Inclusive of all taxes
        </p>
      </div>
      <div className="w-full border-t border-gray-500 border-dashed" />
      <div className="w-full h-auto flex flex-col items-start justify-start gap-1">
        <p className="text-base font-serif font-normal text-gray-500">
          Average delivery time:{" "}
          <span className="font-semibold text-black">6-24 hours</span>
        </p>
        {!fetchingCartData ? (
          <h1 className="text-center py-1 rounded-md w-full text-green-500 bg-green-100">
            ({(totalActualPrice || 0) - (cart?.subTotal || 0)}) saved so far on
            this order
          </h1>
        ) : (
          <Skeleton className="w-full h-5" />
        )}
      </div>
      <div className="w-full border-t border-gray-500 border-dashed" />
      <Button
        onClick={handleContinue}
        disabled={fetchingCartData}
        className={`w-full ${currentStep === 4 && "hidden"}`}
      >
        {!fetchingCartData ? "Continue" : <Skeleton className="w-full h-5" />}
      </Button>
      <div className="w-full flex items-center justify-start text-base gap-2 text-gray-500 font-serif">
        <RiVerifiedBadgeFill className="text-orange-500 text-lg" />
        <p>You will earn Buysync Credit on this order</p>
      </div>
    </div>
  );
};

export default CartSidebar;
