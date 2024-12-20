import { Tittle } from "@/components";
import Link from "next/link";
import { ProductsInCart } from "./ui/ProductsInCart";
import { SummaryOrder } from "./ui/SummaryOrder";

export default function CheckoutPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]  ">
        <Tittle tittle="Verificar orden" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito  */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Editar items</span>
            <Link href={"/cart"} className="underline mb-5 ">
              Editar carrito...
            </Link>

            <ProductsInCart />
          </div>
          {/* Checkout  */}
          <SummaryOrder />
        </div>
      </div>
    </div>
  );
}
