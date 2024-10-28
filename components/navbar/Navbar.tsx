import React from "react";
import Link from "next/link";
import { navitems } from "@/data";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { FaCartPlus, FaStore } from "react-icons/fa";

const Navbar = ({ storeName }: { storeName: string }) => {
  const router = useRouter();

  return (
    <nav className="w-full h-[4.5rem] bg-white border-b border-gray-500 flex items-center justify-between px-20 fixed z-10 top-0 left-0">
      <Link
        href={`/${storeName}`}
        className="flex items-center justify-center gap-2"
      >
        <FaStore className="text-3xl" />
        <p className="text-2xl font-semibold font-sans capitalize">
          {storeName}
        </p>
      </Link>
      <div className="flex items-center justify-center gap-6 text-base font-normal">
        {navitems.map((data, idx) => {
          return (
            <Link
              key={idx}
              href={`/${storeName}/${data.path}`}
              className="cursor-pointer capitalize hover:text-blue-500 hover:scale-105 transition-all duration-200 ease-in-out"
            >
              {data.name}
            </Link>
          );
        })}
      </div>
      <div className="flex items-center justify-center gap-6">
        <button
          className="p-2 rounded-full bg-gray-200"
          onClick={() => {
            router.push(`/${storeName}/cart`);
          }}
        >
          <FaCartPlus className="text-2xl" />
        </button>
        <Button className="text-lg font-medium">Sign In</Button>
      </div>
    </nav>
  );
};

export default Navbar;
