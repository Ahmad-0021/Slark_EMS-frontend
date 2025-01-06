"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useUpdateInvoiceById } from "@/hooks/invoice";
import { IInvoiceCreate } from "@/interfaces/invoice";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { invoiceSchema } from "@/app/schema/index";
import { useGetUserById } from "@/hooks/user";
// import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
// import { IGetUserResponse } from "@/interfaces/user";

const UpdateInvoice = ({ slug }: { slug: string }) => {
  const router = useRouter();
  const token = localStorage.getItem("token");
  if (token === null) {
    throw new Error("Token is null");
  }
  const { user, isLoadingUserById } = useGetUserById();
  console.log(user, 1);
  const {
    updateInvoiceById,
    isupdatingInvoiceById,
    updateInvoiceByIdStatus,
    updateInvoiceByIdError,
  } = useUpdateInvoiceById();

  const [initialValue, setInitialValue] = useState<any | null>(null);

  useEffect(() => {
    console.log(user);
    if (user) {
      setInitialValue(user); // Update state
    }
  }, [user]);

  console.log(initialValue, "init");

  const onSubmit = (values: IInvoiceCreate) => {
    const token = localStorage.getItem("token");

    if (!slug || !user) return;

    if (!token) {
      toast.error("Please login first to submit record", {
        position: "top-right",
        autoClose: 3000,
      });
      alert("Please login first to submit record");
      return;
    }

    const updatedInvoice: IInvoiceCreate = {
      basicPayForThisMonth: values.basicPayForThisMonth,
      committedHoursForThisMonth: values.committedHoursForThisMonth,
      workingHoursForThisMonth: values.workingHoursForThisMonth,
      publiceLeavesForThisMonth: values.publiceLeavesForThisMonth,
      publiceLeaveWorkingHourForThisMonth:
        values.publiceLeaveWorkingHourForThisMonth,
      paidLeavesForThisMonth: values.paidLeavesForThisMonth,
    };

    updateInvoiceById({
      id: slug,
      updatedInvoice,
    });
    router.push("/invoices");
  };

  const formik = useFormik<IInvoiceCreate>({
    initialValues: {
      basicPayForThisMonth: initialValue?.data?.user?.basicPayForThisMonth || 0,
      committedHoursForThisMonth:
        initialValue?.data?.user?.committedHoursForThisMonth || 0,
      workingHoursForThisMonth: 0,
      publiceLeavesForThisMonth: 0,
      publiceLeaveWorkingHourForThisMonth: 0,
      paidLeavesForThisMonth: 0,
    },
    validationSchema: invoiceSchema,
    enableReinitialize: true, // Ensure form reinitializes when initialValues change
    onSubmit: onSubmit,
  });

  const formFieldValues = [
    {
      name: "basicPayForThisMonth",
      label: "Basic Pay",
      title: "Enter your Base Salary decided with your company",
    },
    {
      name: "committedHoursForThisMonth",
      label: "Committed Hours",
      title: "Enter your Working hours decided with your company for the month",
    },
    {
      name: "workingHoursForThisMonth",
      label: "You Worked this month",
      title: "Enter your Worked hours of this month",
    },
    {
      name: "publiceLeavesForThisMonth",
      label: "Public Leaves",
      title: "Enter how many public leaves you have this month",
    },
    {
      name: "publiceLeaveWorkingHourForThisMonth",
      label: "Your working hours in Public Leave",
      title: "If the company gives you work to complete in public leaves",
    },
    {
      name: "paidLeavesForThisMonth",
      label: "Paid leaves for this month",
      title: "Enter Your Paid Leaves for this month",
    },
  ];

  // If still loading or no initialValues yet, show loading message
  if (isLoadingUserById || !initialValue) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  // Check if initialValues are correctly set after fetching invoice data
  // console.log("Initial Values:", initialValues);
  console.log(formik.values.basicPayForThisMonth);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-2xl overflow-hidden w-1/2 max-w-6xl flex flex-col md:flex-row">
        <div className="w-full md:w-full p-8">
          <h2 className="text-3xl font-bold mb-6 text-purple-800">
            Salary Update
          </h2>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {formFieldValues.map((field) => (
              <div key={field.name}>
                <label
                  htmlFor={field.name}
                  className="block text-sm font-medium text-gray-700"
                >
                  <abbr
                    className="no-underline cursor-help"
                    title={field.title}
                  >
                    {field.label}:
                  </abbr>
                </label>
                <input
                  type="number"
                  id={field.name}
                  name={field.name}
                  value={formik.values[field.name as keyof IInvoiceCreate]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                    formik.errors[field.name as keyof IInvoiceCreate]
                      ? "border-red-500"
                      : ""
                  }`}
                />
                {formik.errors[field.name as keyof IInvoiceCreate] &&
                  formik.touched[field.name as keyof IInvoiceCreate] && (
                    <div className="text-red-500 text-xs mt-1">
                      {formik.errors[field.name as keyof IInvoiceCreate]}
                    </div>
                  )}
              </div>
            ))}
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out w-full"
                type="submit"
                disabled={isupdatingInvoiceById}
              >
                {isupdatingInvoiceById ? "Updating..." : "Update Salary"}
              </button>
            </div>
          </form>
          {updateInvoiceByIdStatus === "error" && (
            <p className="mt-4 text-red-500 font-bold">
              Error: {updateInvoiceByIdError?.response?.data?.message}
            </p>
          )}
          {updateInvoiceByIdStatus === "success" && (
            <p className="mt-4 text-green-500 font-bold">
              Salary data submitted successfully!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateInvoice;
