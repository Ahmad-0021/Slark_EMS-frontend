import { Ilogin, IloginResponse } from "@/interfaces/auth";
import axios from "axios";

export const login = async (data: Ilogin) => {
  const response = await axios.post<IloginResponse>(`http://localhost:3001/auth/login`, data);
 
  return response.data;
};

