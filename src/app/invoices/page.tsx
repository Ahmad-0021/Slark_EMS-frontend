"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import TableHeading from "@/components/TableHeading";
import TableCell from "@/components/TableData";
import { FaEdit, FaTrash } from "react-icons/fa";
import { fetchSalaries } from "@/services/invoice";
import { InvoiceRecord } from "@/interfaces/invoice";
import { useRouter } from "next/navigation";
import { useDeleteInvoice } from "@/hooks/invoice";

const InvoiceList: React.FC = () => {
  const router = useRouter();

  const { deleteInvoiceById, isdeletingInvoiceById, deletingInvoiceByIdError } =
    useDeleteInvoice();

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedInvoiceSlug, setSelectedInvoiceSlug] = useState<
    string | undefined
  >(undefined);

  const handleUpdate = (slug: string | undefined) => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push(`invoices/update/${slug}`);
    } else {
      router.push("/");
    }
  };

  const handleDelete = async (slug: string | undefined) => {
    const token = localStorage.getItem("token");
    if (token && slug) {
      await deleteInvoiceById(slug);
    } else {
      router.push("/auth");
    }
  };

  const openModal = (slug: string | undefined) => {
    setSelectedInvoiceSlug(slug);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedInvoiceSlug(undefined);
  };

  const confirmDelete = async () => {
    if (selectedInvoiceSlug) {
      try {
        await handleDelete(selectedInvoiceSlug);
        closeModal();
        router.push("/"); // Close modal after successful deletion
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        console.error("Error deleting invoice:", deletingInvoiceByIdError);
      }
    }
  };

  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["salaries", currentPage],
    queryFn: () => fetchSalaries(currentPage),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-semibold text-indigo-600">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-semibold text-red-600">
        Error: {error instanceof Error ? error.message : "Error occurred"}
      </div>
    );
  }

  const { invoice, pagination, username } = data || {
    invoice: [],
    pagination: {},
    username: "",
  };

  const handlePrevious = () => {
    if (pagination.hasPrevPage) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNext = () => {
    if (pagination.hasNextPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-full mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-indigo-800 shadow-text">
          Welcome, {username}!
        </h1>
        <h1 className="text-3xl font-semibold mb-10 text-center text-indigo-800 shadow-text">
          Salary Invoices
        </h1>
        <div className="overflow-x-auto shadow-xl rounded-xl bg-white">
          <table className="w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-600 to-purple-600">
                <TableHeading title="ID" />
                <TableHeading title="Basic Pay" />
                <TableHeading title="Commited Hours" />
                <TableHeading title="Worked Hours" />
                <TableHeading title="Public Leaves" />
                <TableHeading title="Public Leaves Working Hours" />
                <TableHeading title="Paid Leaves for Month" />
                <TableHeading title="Required Hours This Month" />
                <TableHeading title="Overtime Hours" />
                <TableHeading title="Basic Pay per Hour" />
                <TableHeading title="Overtime Pay per Hour" />
                <TableHeading title="Public Hours Pay per Hour" />
                <TableHeading title="Total Basic Salary" />
                <TableHeading title="Overtime Pay" />
                <TableHeading title="Total Public Leaves Pay" />
                <TableHeading title="Total Salary" />
                <TableHeading title="Month" />
                <TableHeading title="Actions" />
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {invoice?.map((invoice: InvoiceRecord, index: number) => (
                <tr
                  key={`${invoice.id}`}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-indigo-600">
                    {(pagination.currentPage - 1) * 10 + index + 1}
                  </td>
                  <TableCell
                    value={invoice.basicPayForThisMonth}
                    prefix="Rs"
                    isCurrency={true}
                  />
                  <TableCell value={invoice.committedHoursForThisMonth} />
                  <TableCell value={invoice.workingHoursForThisMonth} />
                  <TableCell value={invoice.publiceLeavesForThisMonth} />
                  <TableCell
                    value={invoice.publiceLeaveWorkingHourForThisMonth}
                  />
                  <TableCell
                    value={invoice.paidLeavesForThisMonth}
                    prefix=""
                    isCurrency={true}
                  />
                  <TableCell
                    value={invoice.requiredTotalHoursForThisMonth}
                    prefix=""
                    isCurrency={true}
                  />
                  <TableCell
                    value={invoice.overTimeHoursForThisMonth}
                    prefix=""
                    isCurrency={true}
                  />
                  <TableCell
                    value={invoice.basicPayPerHourForThisMonth}
                    prefix="Rs"
                    isCurrency={true}
                  />
                  <TableCell
                    value={invoice.overTimePayPerHourForThisMonth}
                    prefix="Rs"
                    isCurrency={true}
                  />
                  <TableCell
                    value={invoice.publiceLeavesPayPerHourForThisMonth}
                    prefix="Rs"
                    isCurrency={true}
                  />
                  <TableCell
                    value={invoice.basicPayForThisMonth}
                    prefix="Rs"
                    isCurrency={true}
                  />
                  <TableCell
                    value={invoice.overTimePayForThisMonth}
                    prefix="Rs"
                    isCurrency={true}
                  />
                  <TableCell
                    value={invoice.totalPubliceLeavesPayForThisMonth}
                    prefix="Rs"
                    isCurrency={true}
                  />
                  <TableCell
                    value={invoice.totalSalaryForThisMonth}
                    prefix="Rs"
                    isCurrency={true}
                  />
                  <TableCell value={invoice.month} />
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      className="text-indigo-800 hover:text-blue-500 mr-2"
                      onClick={() => handleUpdate(invoice.slug)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-300"
                      onClick={() => openModal(invoice.slug)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={handlePrevious}
            className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md hover:from-indigo-700 hover:to-purple-700 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed shadow-md transform hover:-translate-y-1"
            disabled={!pagination?.hasPrevPage}
          >
            Previous
          </button>
          <span className="text-indigo-800 font-medium">
            Page {pagination?.currentPage || 1} of {pagination?.totalPages || 1}
          </span>
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md hover:from-indigo-700 hover:to-purple-700 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed shadow-md transform hover:-translate-y-1"
            disabled={!pagination?.hasNextPage}
          >
            Next
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4 text-indigo-800">
              Confirm Deletion
            </h2>
            <p>Are you sure you want to delete this invoice?</p>
            <div className="mt-6 flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className={`px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 ${
                  isdeletingInvoiceById ? "cursor-not-allowed" : ""
                }`}
                onClick={confirmDelete}
                disabled={isdeletingInvoiceById}
              >
                {isdeletingInvoiceById ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceList;
