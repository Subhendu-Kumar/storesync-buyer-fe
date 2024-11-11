import ProfileSideNav from "@/components/ProfileSideNav";
import ProtectedRoute from "@/components/ProtectedRoute";
import React from "react";

const ProfileLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ storeName: string }>;
}) => {
  return (
    <ProtectedRoute params={params}>
      <section className="w-full min-h-screen px-20">
        <h1 className="w-full py-2 border-b border-gray-500 text-3xl font-sans font-semibold">
          welcome subhendu
        </h1>
        <div className="w-full h-auto flex">
          <ProfileSideNav params={params} />
          {children}
        </div>
      </section>
    </ProtectedRoute>
  );
};

export default ProfileLayout;
