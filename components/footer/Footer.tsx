import React from "react";
import indianFlag from "../../public/india-flag-icon.svg";
import Image from "next/image";
import { StoreDetails } from "@/types";
import { FaAddressCard, FaPhoneAlt, FaStore } from "react-icons/fa";
import { MdAttachEmail } from "react-icons/md";
import { IoGlobeOutline } from "react-icons/io5";

const Footer = ({ storeDetails }: { storeDetails: StoreDetails }) => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full h-60 bg-black px-20">
      <div className="w-full h-[75%] grid grid-cols-3 p-8 gap-3">
        <div className="w-full h-full flex gap-3 items-start justify-start flex-col text-white">
          <FaStore className="text-4xl" />
          <p className="text-2xl font-medium">{storeDetails?.name}</p>
        </div>
        <div className="w-full h-full text-white">
          <h1 className="text-xl font-medium w-[80%] pb-1 text-left border-b border-gray-500">
            Contacts
          </h1>
          <p className="flex items-center gap-2 mt-2">
            <MdAttachEmail />
            <span>{storeDetails?.storeEmail}</span>
          </p>
          <p className="flex items-center gap-2 mt-2">
            <FaPhoneAlt />
            <span>+91 {storeDetails?.mobileNo}</span>
          </p>
        </div>
        <div className="w-full h-full text-white">
          <h1 className="text-xl font-medium w-[80%] pb-1 text-left border-b border-gray-500">
            Contacts
          </h1>
          <p className="flex items-center gap-2 mt-2 capitalize">
            <FaAddressCard />
            <span>{storeDetails?.storeAddress}</span>
          </p>
          <p className="flex items-center gap-2 mt-2 capitalize">
            <IoGlobeOutline />
            <span>{storeDetails?.country}</span>
          </p>
        </div>
      </div>
      <div className="w-full h-[25%] border-t border-gray-600 flex items-center justify-between text-gray-300">
        <p>
          &copy;{" "}
          <a
            target="_blank"
            rel="noreferrer noopener"
            className="underline"
            href="https://storesync.vercel.app"
          >
            Store Sync
          </a>
          . All rights reserved, {currentYear}.
        </p>
        <p className="flex items-center justify-center gap-2 text-base">
          <span>Made In India</span>{" "}
          <span className="w-4 h-4 mt-2">
            <Image src={indianFlag} alt="indian flag" />
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
