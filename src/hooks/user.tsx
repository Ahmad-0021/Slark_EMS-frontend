"use client";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../services/user"; // Replace with your actual API call function
import { IGetUserResponse } from "@/interfaces/user";
import { jwtDecode } from "jwt-decode";

export const useGetUserById = (
  userId: string
): {
  user: IGetUserResponse | undefined;
  isLoadingUserById: boolean;
  isFetchingUserById: boolean;
} => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token === null) {
    throw new Error("Token is null");
  }
  const decodedToken = jwtDecode<{ id: string }>(token);
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUser(decodedToken.id),
  });
  return {
    user: data, // The data might be undefined if still loading
    isFetchingUserById: isFetching,
    isLoadingUserById: isLoading,
  };
};
