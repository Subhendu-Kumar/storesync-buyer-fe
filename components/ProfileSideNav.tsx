"use client";

import { profileNavItems } from "@/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { use } from "react";

const ProfileSideNav = ({
  params,
}: {
  params: Promise<{ storeName: string }>;
}) => {
  const pathname = usePathname();
  const { storeName } = use(params);

  return (
    <div className="w-[20%] min-h-screen py-10 flex flex-col gap-4 border-r border-gray-500 pr-2">
      {profileNavItems.map((item, idx) => {
        const fullPath = `/${storeName}/${item.path}`;
        const isActive =
          pathname === fullPath || pathname.startsWith(`${fullPath}/`);
        return (
          <Link
            key={idx}
            href={fullPath}
            className={`w-full h-auto py-2 px-3 flex items-center gap-2 text-xl font-sans font-semibold rounded-md cursor-pointer ${
              isActive ? "bg-primary text-white" : "hover:bg-gray-100"
            }`}
          >
            <item.icon />
            <p>{item.name}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default ProfileSideNav;
