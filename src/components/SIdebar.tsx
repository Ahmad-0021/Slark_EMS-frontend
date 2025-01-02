const Sidebar = () => {
  const menuItems = [
    { label: "App", link: "/" },
    { label: "Dashboard", link: "/app/dashboard" },
    // Add more menu items as needed
  ];

  return (
    <div className=" w-[15%] bg-gradient-to-r w from-purple-500 p-4 to-indigo-600  border-r border-gray-200">
      {menuItems.map((item) => (
        <a
          key={item.label}
          href={item.link}
          className="flex items-center justify-center lg:justify-start rounded-md h-12 "
        >
          <span className="tracking-wide text-bold text-xl  hover:text-purple-200 text-white transition duration-300 truncate capitalize hidden lg:block">
            {item.label}
          </span>
        </a>
      ))}
    </div>
  );
};

export default Sidebar;
