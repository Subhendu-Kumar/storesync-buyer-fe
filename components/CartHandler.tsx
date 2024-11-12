"use client";

import React, { useEffect, useState } from "react";
import ShowCartItems from "./ShowCartItems";
import { Cart } from "@/types";
import { getBuyerDetails, getStoreIdFromLocalStorage } from "@/lib/utils";
import {
  addToCart,
  applyAddressToCart,
  applyOffer,
  deleteFromCart,
  getCart,
  removeOffer,
} from "@/api";
import CartSidebar from "./CartSidebar";
import CartOfferHandler from "./CartOfferHandler";
import { useToast } from "@/hooks/use-toast";
import CartAddressHandler from "./CartAddressHandler";
import { FaCircleNotch } from "react-icons/fa6";
import emptyCart from "../public/empty-cart.svg";
import Image from "next/image";

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
  const [applyingOffer, setApplyingOffer] = useState<boolean>(false);
  const [applyingAddress, setApplyingAddress] = useState<boolean>(false);
  const [removingOffer, setRemovingOffer] = useState<boolean>(false);
  const [incrementingCartItemQuantity, setIncrementingCartItemQuantity] =
    useState<boolean>(false);
  const [decrementingCartItemQuantity, setDecrementingCartItemQuantity] =
    useState<boolean>(false);
  const [incrementingCartItemSuccess, setIncrementingCartItemSuccess] =
    useState<boolean>(false);
  const [decrementingCartItemSuccess, setDecrementingCartItemSuccess] =
    useState<boolean>(false);
  const [productId, setProductId] = useState<string>("");
  const [removeCompletely, setRemoveCompletely] = useState<boolean>(false);

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
    setApplyingOffer(true);
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
    } finally {
      setApplyingOffer(false);
    }
  };

  const handleRemoveOffer = async () => {
    setRemovingOffer(true);
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
    try {
      const res = await removeOffer(buyerDetails?.id, storeId);
      console.log("res ", res);
      if (res?.status === 200) {
        setCart(res?.data);
      } else {
        toast({
          title: "Error",
          description: "Failed to remove offer",
        });
      }
    } catch (error) {
      console.log("error ", error);
      toast({
        title: "Error",
        description: "Failed to remove offer",
      });
    } finally {
      setRemovingOffer(false);
    }
  };

  const handleApplyAddress = async (address_id: number) => {
    setApplyingAddress(true);
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
    if (!address_id) {
      toast({
        title: "Error",
        description: "Please select offer to apply",
      });
      return;
    }
    try {
      const res = await applyAddressToCart(
        buyerDetails?.id,
        storeId,
        address_id
      );
      console.log(res);
      if (res?.status === 202) {
        setCart(res?.data);
      } else {
        toast({
          title: "Error",
          description: "Failed to apply address",
        });
      }
    } catch (error) {
      console.log("error ", error);
      toast({
        title: "Error",
        description: "Failed to apply address",
      });
    } finally {
      setApplyingAddress(false);
    }
  };

  const handleAddToCart = async () => {
    if (!storeId) {
      toast({
        title: "Error",
        description: "Store Id is undefined",
        variant: "destructive",
      });
      return;
    }
    if (!buyerDetails?.id) {
      toast({
        title: "Error",
        description: "User Id is undefined",
        variant: "destructive",
      });
      return;
    }
    if (!productId) {
      toast({
        title: "Error",
        description: "Product Id is undefined",
        variant: "destructive",
      });
      return;
    }
    const cartData = {
      storeId,
      productId: productId,
    };
    setIncrementingCartItemQuantity(true);
    try {
      const res = await addToCart(buyerDetails?.id, cartData);
      console.log(res);
      if (res?.status === 200) {
        setCart(res?.data);
        setIncrementingCartItemSuccess(true);
        setTimeout(() => setIncrementingCartItemSuccess(false), 3000);
      } else {
        toast({
          title: "Error: Something went wrong",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log("error adding to cart: ", error);
      toast({
        title: "Error: Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIncrementingCartItemQuantity(false);
    }
  };

  const handleRemoveFromCart = async () => {
    if (!storeId) {
      toast({
        title: "Error",
        description: "Store Id is undefined",
        variant: "destructive",
      });
      return;
    }
    if (!buyerDetails?.id) {
      toast({
        title: "Error",
        description: "User Id is undefined",
        variant: "destructive",
      });
      return;
    }
    if (!productId) {
      toast({
        title: "Error",
        description: "Product Id is undefined",
        variant: "destructive",
      });
      return;
    }
    const cartData = {
      storeId,
      productId: productId,
    };
    setDecrementingCartItemQuantity(true);
    try {
      const res = await deleteFromCart(
        buyerDetails?.id,
        cartData,
        removeCompletely
      );
      console.log(res);
      if (res?.status === 200) {
        setCart(res?.data);
        setDecrementingCartItemSuccess(true);
        setTimeout(() => setDecrementingCartItemSuccess(false), 3000);
      } else {
        toast({
          title: "Error: Failed to remove product from cart",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error: Failed to remove product from cart",
        variant: "destructive",
      });
    } finally {
      setDecrementingCartItemQuantity(false);
    }
  };

  if (fetchingCartData) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <FaCircleNotch className="animate-spin text-3xl" />
      </div>
    );
  }

  if (cart?.items?.length === 0) {
    return (
      <div className="w-full h-96 flex flex-col items-center justify-center mt-8 ">
        <Image src={emptyCart} alt="no orders found" className="w-96 h-auto" />
        <p className="text-3xl text-gray-400 font-sans font-semibold">
          No items found
        </p>
      </div>
    );
  }

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
              <ShowCartItems
                cart={cart!}
                productId={productId}
                setProductId={setProductId}
                handleAddToCart={handleAddToCart}
                fetchingCartData={fetchingCartData}
                setRemoveCompletely={setRemoveCompletely}
                handleRemoveFromCart={handleRemoveFromCart}
                incrementingCartItemQuantity={incrementingCartItemQuantity}
                decrementingCartItemQuantity={decrementingCartItemQuantity}
                incrementingCartItemSuccess={incrementingCartItemSuccess}
                decrementingCartItemSuccess={decrementingCartItemSuccess}
              />
            )}
            {currentStep === 2 && (
              <CartOfferHandler
                cart={cart!}
                handleApplyOffer={handleApplyOffer}
                applyingOffer={applyingOffer}
                handleRemoveOffer={handleRemoveOffer}
                removingOffer={removingOffer}
              />
            )}
            {currentStep === 3 && (
              <CartAddressHandler
                cart={cart!}
                handleApplyAddress={handleApplyAddress}
                applyingAddress={applyingAddress}
              />
            )}
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
