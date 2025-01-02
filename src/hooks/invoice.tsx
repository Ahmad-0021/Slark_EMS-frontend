/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { InvoiceRecord } from "@/interfaces/invoice";
import {
  createNewInvoice,
  deleteInvoiceById,
  getInvoiceById,
  updateInvoiceById,
} from "../services/invoice";

// for getting the invoice by id
export const  useGetInvoicesById = (
  id?: string
): {
  invoice: InvoiceRecord | undefined;
  isLoadingInvoiceById: boolean;
  isFetchingInvoiceById: boolean;
} => {
  if (!id) {
    return {
      invoice: undefined,
      isLoadingInvoiceById: false,
      isFetchingInvoiceById: false,
    };
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["invoice", id],
    queryFn: () => getInvoiceById(id),
  });

  return {
    invoice: data, // The data might be undefined if still loading
    isLoadingInvoiceById: isLoading,
    isFetchingInvoiceById: isFetching,
  };
};
// for updating the invoice by id
export const useUpdateInvoiceById = () => {
  const onSuccess = (data: any) => {
    console.log("Invoices data Updated:", data);
  };

  const onError = (error: any) => {
    console.error("Error submitting salary data:", error);
  };

  const { mutateAsync, isPending, status, error } = useMutation({
    mutationFn: updateInvoiceById,
    onSuccess,
    onError,
  });

  return {
    updateInvoiceById: mutateAsync,
    isupdatingInvoiceById: isPending,
    updateInvoiceByIdStatus: status,
    updateInvoiceByIdError: error,
  };
};

export const useCreateNewInvoice = () => {
  const onSuccess = (data: any) => {
    console.log("Invoices data Updated:", data);
  };
  const onError = (error: any) => {
    console.error("Error submitting salary data:", error);
  };

  const { mutateAsync, isPending, status, error } = useMutation({
    mutationFn: createNewInvoice,
    onSuccess,
    onError,
  });

  return {
    createNewInvoice: mutateAsync,
    iscreatingInvoice: isPending,
    creatingInvoiceStatus: status,
    creatingInvoiceError: error,
  };
};

export const useDeleteInvoice = () => {
  const onSuccess = (data: any) => {
    console.log("Invoices data Updated:", data);
  };
  const onError = (error: any) => {
    console.error("Error submitting salary data:", error);
  };

  const { mutateAsync, isPending, status, error } = useMutation({
    mutationFn: deleteInvoiceById,
    onSuccess,
    onError,
  });

  return {
    deleteInvoiceById: mutateAsync,
    isdeletingInvoiceById: isPending,
    deletingInvoiceByIdStatus: status,
    deletingInvoiceByIdError: error,
  };
};
