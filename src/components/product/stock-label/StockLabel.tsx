"use client";
import { getStockBySlug } from "@/app/actions/products/getStockBySlug";
import { tittleFont } from "@/config/fonts";
import { useEffect, useState } from "react";

interface Props {
  slug: string;
}
export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState(0);
  const [isLoading, setisLoading] = useState(true);

  // useEffect(() => {
  //   getStock();
  // }, [stock]);

  // const getStock = async () => {
  //   const inStock = await getStockBySlug(slug);
  //   setStock(inStock);
  //   setisLoading(false);
  // };

  useEffect(() => {
    const fetchStock = async () => {
      const inStock = await getStockBySlug(slug);
      setStock(inStock);
      setisLoading(false);
    };
  
    fetchStock(); // Ejecuta la lógica del efecto
  }, [slug]); // Observa cambios en el slug
  
  return (
    <>
      {isLoading ? (
        <h1
          className={`${tittleFont.className} antialiased text-lg font-bold animate-pulse bg-gray-200 rounded-full max-w-40`}
        >
          &nbsp;
        </h1>
      ) : (
        <h1 className={`${tittleFont.className} antialiased text-lg font-bold`}>
          Stock : {stock}
        </h1>
      )}
    </>
  );
};
