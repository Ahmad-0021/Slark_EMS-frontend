import { Ilogin, IloginResponse } from "@/interfaces/auth";
import axios from "axios";

export const login = async (data: Ilogin) => {
  const response = await axios.post<IloginResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
    data
  );

  return response.data;
};
