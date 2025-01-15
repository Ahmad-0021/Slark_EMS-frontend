"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMemo } from "react";
import { useGetUserById } from "@/hooks/user";

const Dashboard = () => {
  const { user, isLoadingUserById } = useGetUserById();
  console.log(user);
  // Use memoization to calculate stats
  const stats = useMemo(() => {
    return [
      { label: "Basic Pay", value: user?.data.user.basicPayForThisMonth },
      {
        label: "Committed Hours",
        value: user?.data.user.committedHoursForThisMonth,
      },
      { label: "Job Type", value: user?.data.user.type },
      { label: "Joining Date", value: user?.data.user.joiningDate },
    ];
  }, [user]);

  if (isLoadingUserById) {
    return <p>loading...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-lg shadow-lg text-center"
          >
            <h2 className="text-lg font-semibold text-gray-700">
              {stat.label}
            </h2>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
