import { getAddresses } from "@/api";
import { useToast } from "@/hooks/use-toast";
import { getBuyerDetails } from "@/lib/utils";
import { Address, Cart } from "@/types";
import React, { useEffect, useState } from "react";
import { FaCircleNotch } from "react-icons/fa6";

const CartAddressHandler = ({
  cart,
  handleApplyAddress,
  applyingAddress,
}: {
  cart: Cart;
  handleApplyAddress: (address_id: number) => void;
  applyingAddress: boolean;
}) => {
  const { toast } = useToast();
  const [buyerDetails, setBuyerDetails] = useState<{
    name: string;
    id: string;
  } | null>(getBuyerDetails());
  const [fetching, setFetching] = useState<boolean>(false);
  const [addresses, setAddresses] = useState<Address[]>([]);

  useEffect(() => {
    const buyerDetails = getBuyerDetails();
    setBuyerDetails(buyerDetails);
  }, []);

  const fetchAddresses = async () => {
    setFetching(true);
    try {
      const res = await getAddresses(buyerDetails?.id || "");
      console.log(res);
      if (res?.status === 200) {
        setAddresses(res?.data);
      } else {
        toast({
          title: "Error: failed to fetch addresses",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error: failed to fetch addresses",
        variant: "destructive",
      });
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, [buyerDetails, toast]);

  return (
    <div className="w-full h-auto">
      <h1 className="text-2xl font-sans font-semibold">Apply Address</h1>
      {fetching ? (
        <div className="w-full h-96 flex items-center justify-center">
          <FaCircleNotch className="animate-spin text-3xl" />
        </div>
      ) : addresses.length === 0 ? (
        <div className="w-full h-96 flex flex-col items-center justify-center mt-8 ">
          <p className="text-3xl text-gray-400 font-sans font-semibold">
            No addresses found
          </p>
        </div>
      ) : (
        <div className="w-full h-auto grid grid-cols-2 gap-4 mt-6">
          {addresses.map((data, idx) => {
            return (
              <div
                key={idx}
                className="w-full h-auto border border-gray-500 rounded-lg p-4 flex flex-col items-start justify-start gap-1 relative"
              >
                <p className="text-lg font-medium capitalize">{data.name}</p>
                <p className="text-sm font-medium font-sans text-gray-600">
                  Mobile No. {data.mobileNo}
                </p>
                <p className="text-sm font-medium font-sans text-gray-600">
                  Email: {data.email}
                </p>
                <p className="text-sm font-medium font-sans text-gray-600">
                  Address: {data.address} . {data.area} . {data.landmark} .{" "}
                  {data.pinCode}
                </p>
                <button
                  className={`absolute top-2 right-2 p-1 rounded-md text-base font-serif ${
                    cart?.deliveryAddress?.id === data?.id
                      ? "text-green-500"
                      : "text-red-500 hover:bg-gray-300"
                  }`}
                  onClick={() =>
                    cart?.deliveryAddress?.id !== data?.id &&
                    handleApplyAddress(data?.id)
                  }
                >
                  {cart?.deliveryAddress?.id === data?.id ? (
                    "Selected"
                  ) : applyingAddress ? (
                    <FaCircleNotch className="animate-spin text-base" />
                  ) : (
                    "Select"
                  )}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CartAddressHandler;
