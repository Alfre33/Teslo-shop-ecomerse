"use client";
import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { useState, useEffect } from "react";

export const OrderSummary = () => {
  const getSumaryInformation = useCartStore(
    (state) => state.getSummaryInformation
  );
  const cart =useCartStore(state=>state.cart)
  const { countItemsCart, impuestos, subtotal, total } = getSumaryInformation();
  const [loaded, setloaded] = useState<boolean>(false);

  useEffect(() => {
    setloaded(true);
  }, [cart]);

  if (!loaded) {
    return <p>Cargando el resumen de compra...</p>;
  }
  // if (countItemsCart===0 ) redirect('/empty')


  return (
    <>
      <div className="grid grid-cols-2">
        <span>No. Productos</span>
        <span className="text-right">{countItemsCart === 1 ?'1 articulo':`${countItemsCart} articulos`}</span>
        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(subtotal)}</span>
        <span>Inpuestos(15%)</span>
        <span className="text-right">{currencyFormat(impuestos)}</span>
        <span className="text-2xl mt-5">Total</span>
        <span className="text-right text-2xl mt-5">{currencyFormat(total)}</span>
      </div>
    </>
  );
};
