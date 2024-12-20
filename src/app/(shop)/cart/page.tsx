import { Tittle } from "@/components";
import Link from "next/link";
import { ProductsInCart } from "./ui/ProductsInCart";
import { OrderSummary } from "./ui/OrderSummary";

export default function CartPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]  ">
        <Tittle tittle="Carrito" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito  */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Agregar items</span>
            <Link href={"/"} className="underline mb-5 ">
              Seguir comprando...
            </Link>

            <ProductsInCart />
          </div>
          {/* Checkout  */}
          <div className="bg-white rounded-xl shadow-xl p-7  h-fit">
            <h2 className="text-2xl mb-2">Resumen de orden</h2>
            <OrderSummary />
            <Link
              href="/checkout/address"
              className="btn-primary w-full flex justify-center mt-5"
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
