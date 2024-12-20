"use client";
import { useUIStore } from "@/store";
import Link from "next/link";
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from "react-icons/io5";
import clsx from "clsx";
import { signOutButton } from "@/app/actions/auth/logout-action";

interface Props {
  isAdmin: boolean;
  isAuthenticated: boolean;
}

const menuItems = [
  {
    icon: <IoPersonOutline size={30} />,
    title: "Perfil",
    href: "/profile",
  },
  {
    icon: <IoTicketOutline size={30} />,
    title: "Ordenes",
    href: "/orders",
  },
];

const menuAdmin = [
  {
    icon: <IoShirtOutline size={30} />,
    title: "Productos",
    href: "/admin/products",
  },
  {
    icon: <IoTicketOutline size={30} />,
    title: "Ordenes",
    href: "/admin/orders",
  },
  {
    icon: <IoPeopleOutline size={30} />,
    title: "Usuarios",
    href: "/admin/users",
  },
];

export const SidebarItems = ({
  isAuthenticated = false,
  isAdmin = false,
}: Props) => {
  const onMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const onMenuClose = useUIStore((state) => state.closeSideMenu);

  return (
    <div>
      {/* Background black */}
      {onMenuOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />
      )}

      {/* Blur */}
      {onMenuOpen && (
        <div
          className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
          onClick={onMenuClose}
        />
      )}

      {/* SideBar */}
      <nav
        className={clsx(
          "fixed p-5 right-0 top-0 w-[400px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300 overflow-y-auto",
          {
            "translate-x-full": !onMenuOpen,
            // Clases condicionales con clsx
          }
        )}
      >
        <IoCloseOutline
          size={50}
          className="absolute right-5 top-5 cursor-pointer"
          onClick={onMenuClose}
        />

        {/* Input */}
        <div className="relative mt-14">
          <IoSearchOutline size={20} className="absolute top-2 left-2" />
          <input
            type="text"
            className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div>
        {!isAuthenticated && (
          <Link
            onClick={onMenuClose}
            href="/auth/login"
            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
          >
            <IoLogInOutline size={30} />
            <span className="ml-3 text-xl ">Ingresar</span>
          </Link>
        )}
        {isAuthenticated &&
          menuItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              onClick={onMenuClose}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              {item.icon}
              <span className="ml-3 text-xl ">{item.title}</span>
            </Link>
          ))}
        {isAuthenticated && (
          <Link
            href="/auth/login"
            onClick={() => signOutButton()}
            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
          >
            <IoLogOutOutline size={30} onClick={onMenuClose} />
            <span className="ml-3 text-xl ">Salir</span>
          </Link>
        )}
        {isAdmin && <div className="w-full h-px bg-gray-200 my-10" />}
        {isAdmin &&
          isAuthenticated &&
          menuAdmin.map((item) => (
              <Link
                href={item.href}
                key={`${item.title}-admin`}
                onClick={onMenuClose}
                className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
              >
                {item.icon}
                <span className="ml-3 text-xl ">{item.title}</span>
              </Link>
          ))}
      </nav>
    </div>
  );
};
