"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AuthenticatedNavbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated (e.g., via local storage)
    const token = localStorage.getItem("token");
    // Assume username is stored here
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    // Clear local storage and update state
    localStorage.removeItem("token");
    router.push("/");

    setIsAuthenticated(false);
  };

  return (
    isAuthenticated && (
      <nav className="bg-gradient-to-r from-purple-500 to-indigo-600 p-4 shadow-lg">
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
              onClick={handleLogout}
              className="text-white text-bold text-base hover:text-purple-200 transition duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    )
  );
};

export default AuthenticatedNavbar;
