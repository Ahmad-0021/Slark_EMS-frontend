"use client";

import { isTokenExpired } from "@/app/utils/token";
import { clearToken } from "@/store/authSLice";
import { RootState } from "@/store/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();
  const router = useRouter();
  const expiredToken = isTokenExpired(token);

  const handleLogout = () => {
    dispatch(clearToken());
    localStorage.removeItem("persist:auth");
    router.push("/auth"); // Clear persisted state
  };

  return (
    <nav className="bg-gradient-to-r from-purple-500 to-indigo-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-white text-2xl font-bold hover:text-indigo-500 transition duration-300"
        >
          Slark
        </Link>
        <div className="space-x-4">
          {token && !expiredToken ? (
            <Link
              href="/invoices/create"
              className="text-white text-bold text-base m-5 hover:text-purple-200 transition duration-300"
            >
              Create New Invoice
            </Link>
          ) : (
            <Link
              href="/calculate"
              className="text-white text-bold text-base m-5 hover:text-purple-200 transition duration-300"
            >
              Calculate Invoice
            </Link>
          )}

          {token && !expiredToken ? (
            <button
              onClick={handleLogout}
              className="text-white text-bold text-base hover:text-purple-200 transition duration-300"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/auth"
              className="text-white text-bold text-base  hover:text-purple-200 transition duration-300"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
