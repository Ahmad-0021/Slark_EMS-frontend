/* eslint-disable @typescript-eslint/no-explicit-any */
import { Ilogin, IloginResponse } from "@/interfaces/auth";
import axios from "axios";

export const login = async (data: Ilogin) => {
  try {
    const response = await axios.post<IloginResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      data,
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );

    return response.data;
  } catch (error: any) {
    console.error("Login error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};
