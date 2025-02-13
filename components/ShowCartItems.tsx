"use client";

import { CLOUDINARY_BASE_URL, CLOUDINARY_KEY } from "@/config";
import { Cart } from "@/types";
import React from "react";
import { FaCircleNotch } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { MdDeleteForever } from "react-icons/md";
import { RxCheck } from "react-icons/rx";

const ShowCartItems = ({
  cart,
  productId,
  setProductId,
  handleAddToCart,
  fetchingCartData,
  setRemoveCompletely,
  handleRemoveFromCart,
  incrementingCartItemQuantity,
  decrementingCartItemQuantity,
  incrementingCartItemSuccess,
  decrementingCartItemSuccess,
}: {
  cart: Cart;
  productId: string;
  setProductId: (productId: string) => void;
  handleAddToCart: () => void;
  fetchingCartData: boolean;
  setRemoveCompletely: (removeCompletely: boolean) => void;
  handleRemoveFromCart: () => void;
  incrementingCartItemQuantity: boolean;
  decrementingCartItemQuantity: boolean;
  incrementingCartItemSuccess: boolean;
  decrementingCartItemSuccess: boolean;
}) => {
  if (fetchingCartData) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <FaCircleNotch className="animate-spin text-7xl" />
      </div>
    );
  }

  return (
    <div className="w-full h-auto">
      <div className="w-full h-auto flex items-center justify-between">
        <h1 className="text-xl font-sans font-semibold">
          Shopping cart ({cart?.items?.length} items)
        </h1>
        {/* <h1 className="text-xl font-sans font-semibold">
          Total: &#8377;{cart?.subTotal}
        </h1> */}
      </div>
      <div className="w-full h-auto mt-4 grid grid-cols-2 gap-4">
        {cart?.items?.map((item, idx) => {
          return (
            <div
              className="w-full h-40 border border-gray-300 rounded-lg p-2 flex items-start justify-start gap-4 relative"
              key={idx}
            >
              <div className="w-40 h-full rounded-md border border-gray-300 overflow-hidden">
                <img
                  src={`${CLOUDINARY_BASE_URL}/${item?.productPhoto[0]}?_a=${CLOUDINARY_KEY}`}
                  alt="product image"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="w-full h-full flex flex-col items-start justify-between">
                <div className="flex flex-col items-start justify-start gap-1">
                  <h1 className="text-xl font-sans font-normal">
                    {item?.productName}
                  </h1>
                  <h2 className="text-base font-sans font-semibold">
                    &#8377;{item?.discountedPrice}{" "}
                    <span className="text-red-400 line-through font-normal">
                      {" "}
                      &#8377;{item?.actualPrice}
                    </span>{" "}
                    (
                    {(
                      100 -
                      (item?.discountedPrice / item?.actualPrice) * 100
                    ).toFixed(2)}
                    % off)
                  </h2>
                  <h3 className="text-base font-serif font-semibold text-green-500">
                    You saved &#8377;{item?.actualPrice - item?.discountedPrice}
                  </h3>
                </div>
                <div className="flex items-center justify-start border border-gray-500 rounded-md overflow-hidden">
                  <button
                    className="px-4 py-1 flex items-center justify-center text-base"
                    onClick={() => {
                      setProductId(item?.productId);
                      setRemoveCompletely(false);
                      handleRemoveFromCart();
                    }}
                  >
                    {productId === item?.productId &&
                    decrementingCartItemQuantity ? (
                      <FaCircleNotch className="animate-spin" />
                    ) : productId === item?.productId &&
                      decrementingCartItemSuccess ? (
                      <RxCheck className="text-green-500" />
                    ) : (
                      <FiMinus />
                    )}
                  </button>
                  <h1 className="px-4 py-1 border-x border-gray-500 text-base">
                    {item?.quantity}
                  </h1>
                  <button
                    className="px-4 py-1 flex items-center justify-center text-base"
                    onClick={() => {
                      setProductId(item?.productId);
                      handleAddToCart();
                    }}
                  >
                    {productId === item?.productId &&
                    incrementingCartItemQuantity ? (
                      <FaCircleNotch className="animate-spin" />
                    ) : productId === item?.productId &&
                      incrementingCartItemSuccess ? (
                      <RxCheck className="text-green-500" />
                    ) : (
                      <GoPlus />
                    )}
                  </button>
                </div>
              </div>
              <button
                className="absolute top-2 right-2 p-1 rounded-full text-xl hover:bg-gray-200"
                onClick={() => {
                  setProductId(item?.productId);
                  setRemoveCompletely(true);
                  handleRemoveFromCart();
                }}
              >
                {productId === item?.productId &&
                decrementingCartItemQuantity ? (
                  <FaCircleNotch className="animate-spin" />
                ) : productId === item?.productId &&
                  decrementingCartItemSuccess ? (
                  <RxCheck className="text-green-500" />
                ) : (
                  <MdDeleteForever className="text-red-500" />
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShowCartItems;
