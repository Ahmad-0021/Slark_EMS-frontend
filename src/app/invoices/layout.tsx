"use client";
// import AuthenticatedNavbar from "@/components/AuthNavBar";
import Sidebar from "@/components/SIdebar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="flex w-full h-screen">
        <Sidebar />
        <main className="w-[85%] bg-gray-100">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
