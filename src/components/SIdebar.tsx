"use client";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";
const Sidebar = () => {
  const pathName = usePathname();
  const menuItems = [
    { label: "Dashboard", link: "/dashboard" },
    { label: "Invoices", link: "/dashboard/invoices" },
    // Add more menu items as needed
  ];

  return (
    <div className=" w-[15%] bg-gradient-to-r w from-purple-500 p-4 to-indigo-600  border-r border-gray-200">
      {menuItems.map((item) => (
        <Link
          key={item.label}
          href={item.link}
          className={clsx(
            "flex items-center justify-center lg:justify-start rounded-md h-12",
            {
              "bg-purple-950 text-white shadow-lg scale-105":
                pathName === item.link,
              "hover:bg-purple-700 hover:text-white text-gray-200":
                pathName !== item.link,
            }
          )}
        >
          <span className="tracking-wide text-bold text-xl  hover:text-purple-200 mx-2 text-white transition duration-300 truncate capitalize hidden lg:block">
            {item.label}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
