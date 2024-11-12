import { fulfillmentTypes, paymentMethods } from "@/data";
import React from "react";
import { FaCheck } from "react-icons/fa6";
import { Button } from "./ui/button";

const CartPlaceOrderHandler = ({
  fulfillmentType,
  setFulfillmentType,
  paymentMethod,
  setPaymentMethod,
  handlePlaceOrder,
}: {
  fulfillmentType: "PICKUP" | "DELIVERY";
  setFulfillmentType: (value: "PICKUP" | "DELIVERY") => void;
  paymentMethod: "COD" | "ONLINE";
  setPaymentMethod: (value: "COD" | "ONLINE") => void;
  handlePlaceOrder: () => void;
}) => {
  return (
    <div className="w-full h-auto">
      <h1 className="text-2xl font-sans font-semibold">
        Choose payment mode & place order
      </h1>
      <div className="w-full h-auto border border-gray-300 rounded-md p-4 mt-4">
        <div className="w-full h-auto flex flex-col items-start justify-start gap-2">
          <p className="text-base font-sans font-semibold">
            Choose Payment Method
          </p>
          <div className="w-full h-auto flex items-center justify-start gap-3">
            {paymentMethods.map((data, idx) => {
              return (
                <button
                  key={idx}
                  className={`w-1/2 h-auto border rounded-md p-3 flex items-center justify-between ${
                    paymentMethod === data.type
                      ? "border-green-500"
                      : "border-gray-200"
                  }`}
                  disabled={data?.type === "ONLINE"}
                  onClick={() =>
                    setPaymentMethod(data.type as "COD" | "ONLINE")
                  }
                >
                  <div className="flex items-center justify-center gap-3 text-lg font-serif font-medium">
                    <data.icon className="text-xl" />
                    <p>
                      {data.type === "COD"
                        ? "Cash on delivery"
                        : "Online payment"}
                    </p>
                  </div>
                  <div
                    className={`p-2 text-lg rounded-full ${
                      paymentMethod === data?.type
                        ? "bg-green-100 text-green-500"
                        : "bg-gray-200"
                    }`}
                  >
                    <FaCheck />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        <div className="w-full h-auto flex flex-col items-start justify-start gap-2 mt-4">
          <p className="text-base font-sans font-semibold">
            Choose Fulfillment Type
          </p>
          <div className="w-full h-auto flex items-center justify-start gap-3">
            {fulfillmentTypes.map((data, idx) => {
              return (
                <button
                  key={idx}
                  className={`w-1/2 h-auto border rounded-md p-3 flex items-center justify-between ${
                    fulfillmentType === data.type
                      ? "border-blue-500"
                      : "border-gray-200"
                  }`}
                  onClick={() =>
                    setFulfillmentType(data?.type as "DELIVERY" | "PICKUP")
                  }
                >
                  <div className="flex items-center justify-center gap-3 text-lg font-serif font-medium">
                    <data.icon className="text-xl" />
                    <p>{data.type === "DELIVERY" ? "Delivery" : "Pickup"}</p>
                  </div>
                  <div
                    className={`p-2 text-lg rounded-full ${
                      fulfillmentType === data?.type
                        ? "bg-blue-100 text-blue-500"
                        : "bg-gray-200"
                    }`}
                  >
                    <FaCheck />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        <Button className="w-full mt-4" onClick={handlePlaceOrder}>
          Place order
        </Button>
      </div>
    </div>
  );
};

export default CartPlaceOrderHandler;
