"use client";

import { useRouter } from "next/navigation";
import { use, useEffect } from "react";

const Profile = ({ params }: { params: Promise<{ storeName: string }> }) => {
  const router = useRouter();
  const { storeName } = use(params);

  useEffect(() => {
    router.replace(`/${storeName}/profile/orders`);
  }, [router, storeName]);

  return null;
};

export default Profile;
