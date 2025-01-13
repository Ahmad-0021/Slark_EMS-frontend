"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormik } from "formik";
import { invoiceSchema } from "../../schema/index";
import { useState, useRef, useEffect } from "react";
import { formatIndianNumber } from "../../utils/IndianNumber";
import { copyTextToClipboard } from "../../utils/CopyToClipboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCreateNewInvoice } from "../../../hooks/invoice";
import { calculateInvoice } from "../../utils/CalculateSalary";

import {
  IInvoiceCreate,
  ItotalInvoiceDetail,
} from "../../../interfaces/invoice";
import { getPreviousMonth } from "../../utils/Month";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useGetUserById } from "@/hooks/user";

const CreateInvoice = () => {
  const { iscreatingInvoice, creatingInvoiceStatus, creatingInvoiceError } =
    useCreateNewInvoice();
  const [token, setTokenState] = useState<string | null>(null);
  const { user, isLoadingUserById } = useGetUserById();
  const [intialVal, setIntialVal] = useState<any | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setTokenState(storedToken);
    } else {
      setTokenState(null);
    }

    if (user) {
      setIntialVal(user); // Update state
    }
  }, [user]);
  console.log(intialVal);
  const router = useRouter();

  const tableRef = useRef<HTMLTableElement>(null);
  const [copied, setCopied] = useState(false);
  const handleCopyTextToClipboard = () => {
    copyTextToClipboard(tableRef);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const [totalSalaryDetails, setTotalSalaryDetails] =
    useState<ItotalInvoiceDetail | null>(null);

  const formik = useFormik<IInvoiceCreate>({
    enableReinitialize: true, // Enable reinitialization
    initialValues: {
      basicPayForThisMonth: intialVal?.data?.user?.basicPayForThisMonth || 0,
      committedHoursForThisMonth:
        intialVal?.data?.user?.committedHoursForThisMonth || 0,
      workingHoursForThisMonth: 0,
      publiceLeavesForThisMonth: 0,
      publiceLeaveWorkingHourForThisMonth: 0,
      paidLeavesForThisMonth: 0,
    },
    validationSchema: invoiceSchema,
    onSubmit: async (values) => {
      if (!token) {
        toast.error("Please login first to submit record", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        alert("Please login first to submit record");
        return;
      }

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/invoices`,
          values,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        toast.success("Invoice created successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      
        router.push("/invoices");
      } catch (error: any) {
        toast.error(
          error.response?.data?.message ||
            "Failed to create invoice. Try again.",
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
        console.error("API Error:", error.response || error);
      }
    },
  });

  const handleCalculate = () => {
    const salaryDetails = calculateInvoice(formik.values);
    setTotalSalaryDetails(salaryDetails);
  };
  if (isLoadingUserById || !user) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br text-black from-indigo-50 to-purple-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-2xl overflow-hidden w-full max-w-6xl flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold mb-6 text-purple-800">
            Salary Calculator
          </h2>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {[
              {
                name: "basicPayForThisMonth",
                label: "Basic Pay",
                title: "Enter your Base Salary decided with your company",
              },
              {
                name: "committedHoursForThisMonth",
                label: "Committed Hours",
                title:
                  "Enter your Working hours decided with your company for month",
              },
              {
                name: "workingHoursForThisMonth",
                label: "You Worked this month",
                title: "Enter your Worked hours of this month",
              },
              {
                name: "publiceLeavesForThisMonth",
                label: "Public Leaves",
                title: "Enter how many public leaves have this month",
              },
              {
                name: "publiceLeaveWorkingHourForThisMonth",
                label: "Your working hours in Public Leave",
                title:
                  "If company gives you work for completed in public leaves",
              },
              {
                name: "paidLeavesForThisMonth",
                label: "Paid leaves for this month",
                title: "Enter Your Paid Leaves for this month",
              },
            ].map((field) => (
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
                  style={{ color: "black" }}
                  value={formik.values[field.name as keyof IInvoiceCreate]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`mt-1 block w-full text-black rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
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
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out w-full "
                type="button"
                onClick={handleCalculate}
              >
                Calculate
              </button>
            </div>
          </form>
          {creatingInvoiceStatus === "error" && (
            <p className="mt-4 text-red-500 font-bold">
              Error: {creatingInvoiceError.response.data.message}
            </p>
          )}
          {creatingInvoiceStatus === "success" && (
            <p className="mt-4 text-green-500 font-bold">
              Salary data submitted successfully!
              {(window.location.href = "/invoices")}
            </p>
          )}
        </div>
        <div className="w-full md:w-1/2 bg-gray-100 p-8">
          {totalSalaryDetails !== null ? (
            <div className="relative">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                Salary Details
              </h3>
              <div className="overflow-x-auto">
                <table
                  ref={tableRef}
                  className="w-full bg-white shadow-md rounded-lg overflow-hidden"
                >
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-4 py-2 text-left text-gray-600">
                        Description
                      </th>
                      <th className="px-4 py-2 text-left text-gray-600">
                        Value
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        label: "Month of the Salary",
                        value: getPreviousMonth(),
                      },
                      {
                        label: "Basic Pay",
                        value: formatIndianNumber(
                          formik.values.basicPayForThisMonth
                        ),
                      },
                      {
                        label: "You worked this month",
                        value: formik.values.workingHoursForThisMonth,
                      },
                      {
                        label: "Public Leaves",
                        value: formik.values.publiceLeavesForThisMonth,
                      },
                      {
                        label: "Required hours this month",
                        value: formatIndianNumber(
                          Math.ceil(formik.values.workingHoursForThisMonth || 0)
                        ),
                      },

                      {
                        label: "Worked in public leaves hours",
                        value: formatIndianNumber(
                          Math.ceil(
                            formik.values.publiceLeaveWorkingHourForThisMonth ||
                              0
                          )
                        ),
                      },
                      {
                        label: "Overtime hours",
                        value: formatIndianNumber(
                          Math.ceil(
                            totalSalaryDetails.overTimeHoursForThisMonth || 0
                          )
                        ),
                      },
                      {
                        label: "Basic pay per hour",
                        value: formatIndianNumber(
                          Math.ceil(
                            totalSalaryDetails.basicPayPerHourForThisMonth || 0
                          )
                        ),
                      },
                      {
                        label: "Over time pay per hour (if applicable)",
                        value: formatIndianNumber(
                          Math.ceil(
                            totalSalaryDetails.overTimePayPerHourForThisMonth ||
                              0
                          )
                        ),
                      },
                      {
                        label: "Public leaves pay per hour (if applicable)",
                        value: formatIndianNumber(
                          Math.ceil(
                            totalSalaryDetails.publiceLeavesPayPerHourForThisMonth ||
                              0
                          )
                        ),
                      },
                      {
                        label: "Total basic pay this month",
                        value: formatIndianNumber(
                          Math.ceil(totalSalaryDetails.basicPay || 0)
                        ),
                      },
                      {
                        label: "Total over time pay this month",
                        value: formatIndianNumber(
                          Math.ceil(
                            totalSalaryDetails.overTimePayForThisMonth || 0
                          )
                        ),
                      },
                      {
                        label: "Total public leaves pay this month",
                        value: formatIndianNumber(
                          Math.ceil(
                            totalSalaryDetails.totalPubliceLeavesPayForThisMonth ||
                              0
                          )
                        ),
                      },
                      {
                        label: "Total Salary this month",
                        value: formatIndianNumber(
                          Math.ceil(
                            totalSalaryDetails.totalSalaryForThisMonth || 0
                          )
                        ),
                      },
                    ].map((row, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                      >
                        <td className="border-t px-4 py-2 text-gray-700">
                          {row.label}
                        </td>
                        <td className="border-t px-4 py-2 text-gray-900 font-medium">
                          {row.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold mt-5 py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out w-full"
                  type="submit"
                  disabled={iscreatingInvoice}
                  onClick={(e) => {
                    e.preventDefault();
                    formik.handleSubmit();
                  }}
                >
                  {iscreatingInvoice ? "Submitting..." : "Submit"}
                </button>
              </div>
              <button
                onClick={handleCopyTextToClipboard}
                className="absolute top-0 right-0 mt-2 mr-2 p-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-300 ease-in-out"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                  <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                </svg>
                {copied && (
                  <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs bg-gray-800 text-white px-2 py-1 rounded">
                    Copied
                  </span>
                )}
              </button>
            </div>
          ) : (
            <p className=" text-2xl font-bold text-purple-800 text-center">
              No salary information available.
            </p>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
export default CreateInvoice;
