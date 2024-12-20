"use client";
import { placeOrder } from "@/app/actions/order/place-order";
import { useCartStore } from "@/store";
import { useAddressStore } from "@/store/address/address-store";
import { currencyFormat } from "@/utils";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const SummaryOrder = () => {
  const [loaded, setLoaded] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const router = useRouter();

  const addressStore = useAddressStore((state) => state.address);
  const { firstName, lastName, address, city, country, postalCode, phone } =
    addressStore;
  const getSumaryInformation = useCartStore(
    (state) => state.getSummaryInformation
  );
  const cart = useCartStore((state) => state.cart);
  const clearCartStore = useCartStore((state) => state.clearCart);
  const { countItemsCart, impuestos, subtotal, total } = getSumaryInformation();

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);
    const ProductsOrder = cart.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
    }));
    // console.log({addressStore,ProductsOrder});
    const resp = await placeOrder(ProductsOrder, addressStore);
    if (!resp.ok) {
      setIsPlacingOrder(false);
      seterrorMessage(resp.message);
      return;
    }

    //Si todo salio correctamente
    clearCartStore();
    router.replace(`/orders/${resp.order}`);
  };

  useEffect(() => {
    setLoaded(true);
  }, [loaded]);

  return (
    <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
      <h2 className="text-2xl mb-2 font-semibold">Direccion de entrega</h2>
      <div className="mb-5">
        <p>
          {firstName} {lastName}
        </p>
        <p>{address}</p>
        <p>
          {country} - {city}
        </p>
        <p>C.P. {postalCode}</p>
        <p>{phone}</p>
      </div>

      <h2 className="text-2xl mb-2 font-semibold">Resumen de orden</h2>
      <div className="grid grid-cols-2">
        <span>No. Productos</span>
        <span className="text-right">
          {countItemsCart === 1 ? "1 articulo" : `${countItemsCart} articulos`}
        </span>
        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(subtotal)}</span>
        <span>Inpuestos(15%)</span>
        <span className="text-right">{currencyFormat(impuestos)}</span>
        <span className="text-2xl mt-5">Total</span>
        <span className="text-right text-2xl mt-5">
          {currencyFormat(total)}
        </span>
      </div>
      <div className="w-full mt-5">
        <p className="mb-3">
          <span className="text-xs">
            Al hacer click en &ldquo;Crear orden&rdquo; aceptas nuestros
            <Link href="#" className="underline">
              términos y condiciones
            </Link>
            y
            <Link href="#" className="underline">
              política de privacidad
            </Link>
          </span>
        </p>

        <p className="text-red-500 mb-3">{errorMessage}</p>
        <button
          // href="/orders/123"
          onClick={onPlaceOrder}
          disabled={isPlacingOrder}
          className={clsx({
            "btn-primary flex w-full sm:w-1/2 justify-center": !isPlacingOrder,
            "disabled:bg-blue-400 flex w-full sm:w-1/2 justify-center py-2 px-4 rounded transition-all text-white opacity-90":
              isPlacingOrder,
          })}
        >
          Crear orden
        </button>
      </div>
    </div>
  );
};
