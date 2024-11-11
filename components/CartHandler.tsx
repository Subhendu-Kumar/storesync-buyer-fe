"use client";

import React, { useEffect, useState } from "react";
import ShowCartItems from "./ShowCartItems";
import { Cart } from "@/types";
import { getBuyerDetails, getStoreIdFromLocalStorage } from "@/lib/utils";
import { applyOffer, getCart } from "@/api";
import CartSidebar from "./CartSidebar";
import CartOfferHandler from "./CartOfferHandler";
import { useToast } from "@/hooks/use-toast";
import CartAddressHandler from "./CartAddressHandler";

const CartHandler = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [storeId, setStoreId] = useState<string>(
    getStoreIdFromLocalStorage() || ""
  );
  const [buyerDetails, setBuyerDetails] = useState<{
    name: string;
    id: string;
  } | null>(getBuyerDetails());
  const [cart, setCart] = useState<Cart | undefined>(undefined);
  const [fetchingCartData, setFetchingCartData] = useState<boolean>(false);

  useEffect(() => {
    setStoreId(getStoreIdFromLocalStorage() || "");
    const buyerDetails = getBuyerDetails();
    setBuyerDetails(buyerDetails);
  }, []);

  const fetchCart = async () => {
    setFetchingCartData(true);
    try {
      const res = await getCart(buyerDetails?.id || "", storeId);
      console.log(res);
      if (res?.status === 200) {
        setCart(res?.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setFetchingCartData(false);
    }
  };

  console.log("cartdata: ", cart);

  useEffect(() => {
    if (buyerDetails?.id && storeId) {
      fetchCart();
    }
  }, [buyerDetails?.id, storeId]);

  const handleContinue = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    } else if (currentStep === 3) {
      setCurrentStep(4);
    }
  };

  const steps = ["Cart", "Apply offer", "Address", "Payment"];

  const handleStepClick = (stepNumber: number) => {
    if (stepNumber <= currentStep) {
      setCurrentStep(stepNumber);
    }
  };

  const handleApplyOffer = async (offer_id: string) => {
    if (!buyerDetails?.id) {
      toast({
        title: "Error",
        description: "Please login to apply offer",
      });
      return;
    }
    if (!storeId) {
      toast({
        title: "Error",
        description: "Please select store to apply offer",
      });
      return;
    }
    if (!offer_id) {
      toast({
        title: "Error",
        description: "Please select offer to apply",
      });
      return;
    }
    try {
      const res = await applyOffer(buyerDetails?.id, storeId, offer_id);
      console.log("res ", res);
      if (res?.status === 202) {
        setCart(res?.data);
        toast({
          title: "Success",
          description: "Offer applied successfully",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to apply offer",
        });
      }
    } catch (error) {
      console.log("error ", error);
      toast({
        title: "Error",
        description: "Failed to apply offer",
      });
    }
  };

  return (
    <div className="w-full h-auto">
      <div>
        <div className="flex space-x-4 mt-6 w-full justify-center items-center">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            return (
              <div
                key={step}
                className="flex items-center"
                onClick={() => handleStepClick(stepNumber)}
                style={{
                  cursor: stepNumber <= currentStep ? "pointer" : "default",
                }}
              >
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center border border-gray-500 ${
                    currentStep >= stepNumber
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {stepNumber}
                </div>
                <span
                  className={`ml-2 ${
                    currentStep >= stepNumber
                      ? "text-brown-500"
                      : "text-gray-500"
                  }`}
                >
                  {step}
                </span>
                {index < steps.length - 1 && (
                  <hr className="w-10 mx-2 border-black" />
                )}
              </div>
            );
          })}
        </div>
        <div className="w-full h-auto flex items-start justify-center mt-6">
          <div className="w-[70%] h-auto p-6">
            {currentStep === 1 && (
              <ShowCartItems cart={cart!} fetchingCartData={fetchingCartData} />
            )}
            {currentStep === 2 && (
              <CartOfferHandler handleApplyOffer={handleApplyOffer} />
            )}
            {currentStep === 3 && <CartAddressHandler />}
          </div>
          <CartSidebar
            cart={cart!}
            currentStep={currentStep}
            handleContinue={handleContinue}
            fetchingCartData={fetchingCartData}
          />
        </div>
      </div>
    </div>
  );
};

export default CartHandler;
