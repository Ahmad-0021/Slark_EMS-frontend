"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "../components/Navbar";
import "@/app/globals.css";
import { useEffect } from "react";
import { isTokenExpired } from "./utils/token";
import { useRouter } from "next/navigation";
import StoreProvider from "@/store/Provider";

// Create a new QueryClient instance
const queryClient = new QueryClient();

export default function RootLayout({
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
    }
    if (token || !isTokenExpired(token)) {
      router.push("/invoices");
    }
  }, [router]);
  return (
    // Provide the QueryClient to the entire app
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <html>
          <body>
            <Navbar />
            {children}
          </body>
        </html>
      </StoreProvider>
    </QueryClientProvider>
  );
}
