"use client";

import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const ProtectedRoute = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ storeName: string }>;
}) => {
  const { storeName } = use(params);
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push(`/${storeName}/signin`);
    }
  }, [isAuthenticated, loading, router, storeName]);

  if (loading) return <p>Loading...</p>;

  return <>{isAuthenticated ? children : null}</>;
};

export default ProtectedRoute;
