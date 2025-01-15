"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { isTokenExpired } from "./utils/token";
import { useRouter } from "next/navigation";
import StoreProvider from "@/store/Provider";
import '@/app/globals.css'  

// Create a new QueryClient instance
const queryClient = new QueryClient();

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (isTokenExpired(token) || !token) {
      localStorage.removeItem("token");
      router.push("/auth");
    } else {
      router.push("/dashboard");
    }
  }, [router]);

  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>{children}</StoreProvider>
    </QueryClientProvider>
  );
}
