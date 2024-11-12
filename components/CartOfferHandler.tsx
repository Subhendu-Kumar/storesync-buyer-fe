"use client";

import { getOffers } from "@/api";
import { useToast } from "@/hooks/use-toast";
import { getStoreIdFromLocalStorage } from "@/lib/utils";
import { Cart, Offer } from "@/types";
import React, { useEffect, useState } from "react";
import { BiSolidOffer } from "react-icons/bi";
import { FaCircleNotch } from "react-icons/fa6";

const CartOfferHandler = ({
  cart,
  handleApplyOffer,
  applyingOffer,
  handleRemoveOffer,
  removingOffer,
}: {
  cart: Cart;
  handleApplyOffer: (offer_id: string) => void;
  applyingOffer: boolean;
  handleRemoveOffer: () => void;
  removingOffer: boolean;
}) => {
  const { toast } = useToast();
  const [storeId, setStoreId] = useState<string>(
    getStoreIdFromLocalStorage() || ""
  );
  const [loading, setLoading] = useState(false);
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    const fetchOffers = async () => {
      setLoading(true);
      try {
        const res = await getOffers(storeId);
        if (res?.status === 200) {
          setOffers(res?.data);
        } else {
          toast({
            title: "Error",
            description: "Error fetching offers",
          });
        }
      } catch (error) {
        console.log("error fetching warehouses: ", error);
        toast({
          title: "Error",
          description: "Error fetching offers",
        });
      } finally {
        setLoading(false);
      }
    };
    setStoreId(getStoreIdFromLocalStorage() || "");
    if (storeId) {
      fetchOffers();
    }
  }, [storeId, toast]);

  return (
    <div className="w-full h-auto">
      <h1 className="text-2xl font-sans font-semibold">
        Apply Coupons and offers
      </h1>
      {cart?.appliedOfferId && !loading && (
        <div className="w-full h-auto mt-5 rounded-md py-2 bg-green-100 text-green-500 border border-green-500 flex items-center justify-center">
          <p className="text-base font-sans font-semibold">
            &quot;{cart?.appliedOfferId?.offerCode.toUpperCase()}&quot; Applied
            You got discount of &#8377;{cart?.appliedOfferId?.flatAmountValue}
          </p>
        </div>
      )}
      {loading ? (
        <div className="w-full h-96 flex items-center justify-center mt-6">
          <FaCircleNotch className="animate-spin text-3xl text-gray-400" />
        </div>
      ) : offers.length === 0 ? (
        <div className="w-full h-96 flex items-center justify-center mt-6">
          <h1 className="text-xl font-sans font-semibold text-red-400">
            No offers found
          </h1>
        </div>
      ) : (
        <div className="w-full h-auto grid grid-cols-2 gap-3 mt-6">
          {offers.map((data, idx) => {
            return (
              <div
                key={idx}
                className="w-full h-auto flex items-center justify-center flex-col gap-2 bg-gray-100 p-2 rounded-lg"
              >
                <div className="w-full flex items-center justify-between">
                  <h1 className="text-xl font-sans font-semibold uppercase flex items-center justify-center gap-1">
                    <BiSolidOffer className="text-3xl text-orange-500" />
                    <p className="font-semibold">{data?.offerCode}</p>
                  </h1>
                  {cart?.appliedOfferId?.id === data?.id ? (
                    <button
                      className="text-base text-red-500 p-2 rounded-full hover:bg-gray-200 font-serif"
                      onClick={handleRemoveOffer}
                    >
                      {removingOffer ? (
                        <FaCircleNotch className="animate-spin text-base text-red-500" />
                      ) : (
                        "Remove"
                      )}
                    </button>
                  ) : (
                    <button
                      className="text-base text-black p-2 rounded-full hover:bg-gray-200 font-serif"
                      onClick={() => handleApplyOffer(data?.id)}
                    >
                      {applyingOffer ? (
                        <FaCircleNotch className="animate-spin text-base text-black" />
                      ) : (
                        "Apply"
                      )}
                    </button>
                  )}
                </div>
                <p className="w-full h-auto text-sm font-sans font-medium">
                  {data?.offerType === "PERCENTAGE_DISCOUNT" && (
                    <span>
                      {data?.percentageValue}% off (upto &#8377;
                      {data?.maximumDiscountAmount}) on orders above &#8377;
                      {data?.minimumPurchaseAmount}
                    </span>
                  )}
                  {data?.offerType === "FLAT_AMOUNT_DISCOUNT" && (
                    <span>
                      flat &#8377;{data?.flatAmountValue} discount on oders
                      above &#8377;{data?.minimumPurchaseAmount}
                    </span>
                  )}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CartOfferHandler;
