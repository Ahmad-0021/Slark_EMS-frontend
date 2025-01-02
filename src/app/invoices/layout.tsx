"use client";
// import AuthenticatedNavbar from "@/components/AuthNavBar";
import Sidebar from "@/components/SIdebar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {/* <nav className="bg-gradient-to-r from-purple-500 to-indigo-600 p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <Link
            href="/"
            className="text-white text-2xl font-bold hover:text-indigo-500 transition duration-300"
          >
            Slark
          </Link>
          <div className="space-x-4">
            <Link
              href="/invoices/create"
              className="text-white text-bold text-base m-5 hover:text-purple-200 transition duration-300"
            >
              Create Invoice
            </Link>
            <button
              onClick={logoutHandler}
              className="text-white text-bold text-base hover:text-purple-200 transition duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </nav> */}

      <div className="flex w-full h-screen">
        <Sidebar />
        <main className="w-[85%] bg-gray-100">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
