/* eslint-disable no-useless-catch */
import axios from "axios";
import { IInvoiceCreate, InvoiceRecord } from "../interfaces/invoice";
import { jwtDecode } from "jwt-decode";

export const getInvoiceById: (
  invoiceSlug: string
) => Promise<InvoiceRecord> = async (invoiceSlug) => {
  const token = localStorage.getItem("token"); // Retrieve token from localStorage
  const { data } = await axios.get(
    `http://localhost:3001/invoices/?slug=${invoiceSlug}`,
    {
      headers: {
        Authorization: `Bearer ${token}`, // Include token in Authorization header
      },
    }
  );
  if (!data) {
    return null;
  }
  return data.invoice; // Return salary from the response data
};
// Change the signature to accept an object instead of separate arguments
export const updateInvoiceById: ({
  id,
  updatedInvoice,
}: {
  id: string;
  updatedInvoice: IInvoiceCreate;
}) => Promise<IInvoiceCreate> = async ({ id, updatedInvoice }) => {
  try {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    const response = await axios.put(
      `http://localhost:3001/invoices?slug=${id}`,
      updatedInvoice,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in Authorization header
        },
      }
    );

    return response.data; // Return the updated salary from the response data
  } catch (err) {
    console.log(err);
    return null; // Rethrow the error for React Query to catch
  }
};

export const createNewInvoice = async (invoiceData: IInvoiceCreate) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `http://localhost:3001/invoices`,
    invoiceData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const fetchSalaries = async (page: number) => {
  const token = localStorage.getItem("token");
  console.log(token);
  if (!token) {
    window.location.href = "/";
    return;
  }
  const decodedToken = jwtDecode<{ username: string }>(token);
  console.log(decodedToken);
  const username = decodedToken.username;
  console.log(username);

  const { data } = await axios.get(
    `http://localhost:3001/invoices/?page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return { ...data, username };
};

export const deleteInvoiceById: (
  invoiceSlug: string
) => Promise<InvoiceRecord> = async (invoiceSlug) => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/";
    return;
  }
  const response = await axios.delete(
    `http://localhost:3001/invoices/?slug=${invoiceSlug}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
