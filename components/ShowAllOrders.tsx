"use client";

import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import ordersImg from "../public/orders.svg";
import Image from "next/image";
import { FaArrowRight, FaCircleNotch } from "react-icons/fa";
import { getBuyerDetails, getStoreIdFromLocalStorage } from "@/lib/utils";
import { Order } from "@/types";
import { getOrders } from "@/api";
import { useToast } from "@/hooks/use-toast";

const ShowAllOrders = () => {
  const { toast } = useToast();
  const [storeId, setStoreId] = useState<string>(
    getStoreIdFromLocalStorage() || ""
  );
  const [buyerDetails, setBuyerDetails] = useState<{
    name: string;
    id: string;
  } | null>(getBuyerDetails());
  const [fetchingOrders, setFetchingOrders] = useState<boolean>(false);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setStoreId(getStoreIdFromLocalStorage() || "");
    const buyerDetails = getBuyerDetails();
    setBuyerDetails(buyerDetails);
  }, []);

  const fetchOrders = async () => {
    setFetchingOrders(true);
    try {
      const res = await getOrders(buyerDetails?.id || "", storeId);
      if (res?.status === 200) {
        setOrders(res?.data);
      } else {
        toast({
          title: "Error: fetching orders data",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error: fetching orders data",
        variant: "destructive",
      });
    } finally {
      setFetchingOrders(false);
    }
  };

  useEffect(() => {
    if (storeId) {
      fetchOrders();
    }
  }, []);

  console.log(orders);

  return (
    <div className="w-full h-auto">
      <div className="w-full h-auto flex items-center justify-between">
        <h1 className="text-2xl font-sans font-semibold">All my Orders</h1>
        <Input
          type="text"
          placeholder="Search my orders"
          className="w-60 border-gray-500"
        />
      </div>
      {fetchingOrders ? (
        <div className="w-full h-96 flex items-center justify-center mt-8">
          <FaCircleNotch className="animate-spin text-3xl" />
        </div>
      ) : orders.length === 0 ? (
        <div className="w-full h-96 flex flex-col items-center justify-center mt-8">
          <Image
            src={ordersImg}
            alt="no orders found"
            className="w-96 h-auto"
          />
          <p className="text-3xl text-gray-400 font-sans font-semibold">
            No orders found
          </p>
        </div>
      ) : (
        <div className="w-full h-auto mt-6 grid grid-cols-2 gap-4">
          {orders.map((order, idx) => (
            <div
              className="w-full h-auto border border-gray-300 rounded-md p-4 flex flex-col items-start justify-start gap-2"
              key={idx}
            >
              <div className="w-full h-auto flex items-center justify-between font-serif font-medium text-base">
                <p>{order?.items?.length} items</p>
                <p>&#8377; {order?.orderAmt}</p>
              </div>
              <div className="w-full flex flex-col items-start justify-start">
                <p className="text-lg font-sans font-semibold">
                  OrderId: #{order?.id}
                </p>
                <p className="text-lg font-sans font-semibold">
                  Order placed:{" "}
                  {new Date(order?.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="w-full h-auto flex items-center justify-between mt-2">
                <p className="text-xl font-sans font-semibold text-blue-500">
                  Order {order?.status}
                </p>
                <button className="p-1 rounded-full hover:bg-gray-200 text-xl">
                  <FaArrowRight />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowAllOrders;
