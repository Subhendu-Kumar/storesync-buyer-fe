"use client";

import Link from "next/link";
import { navitems } from "@/data";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getBuyerDetails } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { FaCartPlus, FaStore } from "react-icons/fa";

const Navbar = ({ storeName }: { storeName: string }) => {
  const router = useRouter();
  const { logout, isAuthenticated } = useAuth();
  const [buyerDetails, setBuyerDetails] = useState<{
    name: string;
    id: string;
  } | null>(null);

  useEffect(() => {
    const buyerDetails = getBuyerDetails();
    setBuyerDetails(buyerDetails);
  }, [logout, isAuthenticated]);

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
      <div className="flex items-center justify-center gap-4">
        <button
          className="p-2.5 rounded-full border border-gray-400"
          onClick={() => {
            router.push(`/${storeName}/cart`);
          }}
        >
          <FaCartPlus className="text-xl" />
        </button>
        {isAuthenticated ? (
          <>
            <Link href={`/${storeName}/profile`}>
              <Button
                className="text-black text-sm font-medium border-gray-400"
                variant="outline"
              >
                {buyerDetails?.name.split(" ")[0]}
              </Button>
            </Link>
            <Button className="text-sm font-medium" onClick={logout}>
              Sign Out
            </Button>
          </>
        ) : (
          <Button
            className="text-sm font-medium"
            onClick={() => {
              router.push(`/${storeName}/signin`);
            }}
          >
            Sign In
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
