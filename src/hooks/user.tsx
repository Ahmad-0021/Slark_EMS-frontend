"use client";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../services/user"; // Replace with your actual API call function
import { IGetUserResponse } from "@/interfaces/user";

export const useGetUserById = (
  userId: string
): {
  user: IGetUserResponse | undefined;
  isLoadingUserById: boolean;
  isFetchingUserById: boolean;
} => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUser(userId),
  });
  return {
    user: data, // The data might be undefined if still loading
    isFetchingUserById: isFetching,
    isLoadingUserById: isLoading,
  };
};
