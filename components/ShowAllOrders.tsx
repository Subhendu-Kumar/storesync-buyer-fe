import React from "react";
import { Input } from "./ui/input";
import ordersImg from "../public/orders.svg";
import Image from "next/image";

const ShowAllOrders = () => {
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
      <div className="w-full h-96 flex flex-col items-center justify-center mt-8 ">
        <Image src={ordersImg} alt="no orders found" className="w-96 h-auto" />
        <p className="text-3xl text-gray-400 font-sans font-semibold">
          No orders found
        </p>
      </div>
    </div>
  );
};

export default ShowAllOrders;
