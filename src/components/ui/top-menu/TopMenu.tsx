"use client";
import { useCartStore, useUIStore } from "@/store";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";

export const TopMenu = () => {
  const onOpenMenu = useUIStore((state) => state.openSideMenu);
  const totalItems = useCartStore((state) => state.getTotalItems());
  const [loaded, setloaded] = useState<boolean>(false);

  useEffect(() => {
    setloaded(true);
  }, []);

  return (
    <div className="flex px-5 justify-between items-center w-full">
      {/* LOGO */}
      <div>
        <Link href="/">
          {" "}
          Ecoomerse
          {/* <span>Teslo</span>
            <span> | Shop</span> */}
        </Link>
      </div>
      {/* CENTER MENU */}
      <div className="hidden sm:block">
        <Link
          href="/gender/men"
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >
          Hombres
        </Link>
        <Link
          href="/gender/women"
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >
          Mujeres
        </Link>
        <Link
          href="/gender/kid"
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >
          Niños
        </Link>
      </div>

      {/* SEARCH,CART,MENU */}
      <div className="flex items-center">
        <Link href="/search" className="mx-2">
          <IoSearchOutline className="w-5 h-5" />
        </Link>
        <Link
          href={totalItems === 0 && loaded ? "/empty" : "/cart"}
          className="mx-2"
        >
          <div className="relative">
            {totalItems > 0 && loaded && (
              <span className="absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white">
                {totalItems}
              </span>
            )}
            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>

        <button
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          onClick={onOpenMenu}
        >
          Menú
        </button>
      </div>
    </div>
  );
};
