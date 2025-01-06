"use client";

import { useQuery } from "@tanstack/react-query";
import { getUser } from "../services/user"; // Replace with your actual API call function
import { IGetUserResponse } from "@/interfaces/user";
import { jwtDecode } from "jwt-decode";
// Ensure correct import
import { useEffect, useState } from "react";

export const useGetUserById = (): {
  user: IGetUserResponse | undefined;
  isLoadingUserById: boolean;
  isFetchingUserById: boolean;
} => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decodedToken = jwtDecode<{ id: string }>(token);
          setUserId(decodedToken.id);
        } catch (error) {
          console.error("Invalid token:", error);
        }
      }
    }
  }, []);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => (userId ? getUser(userId) : Promise.reject("No user ID")),
    enabled: !!userId, // Only fetch data if userId is defined
  });

  return {
    user: data, // The data might be undefined if still loading
    isFetchingUserById: isFetching,
    isLoadingUserById: isLoading,
  };
};
