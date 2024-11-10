"use client";

import {
  Sheet,
  SheetTitle,
  SheetHeader,
  SheetTrigger,
  SheetContent,
  SheetDescription,
} from "@/components/ui/sheet";
import { Offer } from "@/types";
import { getOffers } from "@/api";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { BiSolidOffer } from "react-icons/bi";
import { getStoreIdFromLocalStorage } from "@/lib/utils";
import { FaCircleNotch, FaRegCopy } from "react-icons/fa";

const OfferSidebar = () => {
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
        }
      } catch (error) {
        console.log("error fetching warehouses: ", error);
      } finally {
        setLoading(false);
      }
    };
    setStoreId(getStoreIdFromLocalStorage() || "");
    if (storeId) {
      fetchOffers();
    }
  }, [storeId]);

  const handleCopyOfferCode = (offer_code: string) => {
    const upperCaseOfferCode = offer_code.toUpperCase();
    navigator.clipboard
      .writeText(upperCaseOfferCode)
      .then(() => {
        console.log("Offer code copied to clipboard!");
        toast({
          title: "Success",
          description: "offer code successfully copied to clipboard",
        });
      })
      .catch((error) => {
        console.error("Failed to copy offer code: ", error);
        toast({
          title: "Error copying offer code",
          variant: "destructive",
        });
      });
  };

  return (
    <Sheet>
      <SheetTrigger className="fixed top-72 right-0 bg-black w-10 h-40 rounded-l-lg flex items-center justify-center">
        <div className="transform -rotate-90 text-white flex items-center justify-center gap-2 flex-row-reverse text-xl uppercase">
          <p>offers</p>
          <BiSolidOffer className="text-2xl" />
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Coupons and offers</SheetTitle>
          <SheetDescription>
            Unlock exclusive deals! Use our offers and coupons to save on your
            next purchase. Don&apos;t miss out on these limited-time discounts.
          </SheetDescription>
        </SheetHeader>
        {loading ? (
          <div className="w-full h-64 flex items-center justify-center">
            <FaCircleNotch className="animate-spin text-3xl" />
          </div>
        ) : (
          <div className="w-full h-full overflow-y-scroll py-4 flex flex-col gap-4">
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
                    <button
                      onClick={() => handleCopyOfferCode(data?.offerCode)}
                      className="text-xl text-black p-2 rounded-full hover:bg-gray-200"
                    >
                      <FaRegCopy />
                    </button>
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
      </SheetContent>
    </Sheet>
  );
};

export default OfferSidebar;
