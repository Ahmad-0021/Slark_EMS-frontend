import { IGetUserResponse } from "@/interfaces/user";
import axios from "axios";

export const getUser = async (id: string) => {
  const token = localStorage.getItem("token");
  const response = await axios.get<IGetUserResponse>(
    `http://localhost:3001/admin/user?id=${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`, // Include token in Authorization header
      },
    }
  );

  return response.data;
};
