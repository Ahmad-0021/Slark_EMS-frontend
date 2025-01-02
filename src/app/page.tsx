"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const App = () => {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/invoices");
    }
  }, [router]);
  return <></>;
};

export default App;
