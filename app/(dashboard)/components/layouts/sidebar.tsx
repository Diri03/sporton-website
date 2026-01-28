"use client";

import { logout } from "@/app/services/auth.service";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FiBox,
  FiCreditCard,
  FiLayers,
  FiLogOut,
  FiShoppingCart,
} from "react-icons/fi";

const menuItems = [
  {
    name: "Products",
    icon: FiBox,
    link: "/admin/products",
  },
  {
    name: "Categories",
    icon: FiLayers,
    link: "/admin/categories",
  },
  {
    name: "Transactions",
    icon: FiShoppingCart,
    link: "/admin/transactions",
  },
  {
    name: "Bank Indormation",
    icon: FiCreditCard,
    link: "/admin/bank-info",
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  const { push } = useRouter();
  const handleLogout = () => {
    logout();
    push("/admin/login");
  };

  return (
    <aside className="w-80 min-h-screen bg-white border-r border-gray-100 flex flex-col fixed left-0 top-0">
      <div className="py-8 px-14 border-b border-gray-200">
        <Image
          src="/images/logo-admin.svg"
          alt="logo admin"
          width={215}
          height={36}
        />
      </div>
      <div className="flex flex-col gap-5 mt-5 p-5">
        {menuItems.map((item, index) => {
          const isActive = item.link === pathname;
          return (
            <Link
              href={item.link}
              key={index}
              className={`flex gap-3 item-center py-2 px-4.5 font-medium rounded-lg duration-300 ${
                isActive ? "bg-primary/15 text-primary" : "hover:bg-gray-100"
              }`}
            >
              <item.icon size={24} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
      <button
        onClick={handleLogout}
        className="flex cursor-pointer gap-3 mx-5 py-2 px-4.5 mt-auto font-medium rounded-lg duration-300 hover:bg-gray-100 mb-10"
      >
        <FiLogOut size={24} />
        LogOut
      </button>
    </aside>
  );
};

export default Sidebar;
