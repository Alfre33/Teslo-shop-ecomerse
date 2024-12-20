"use client";
import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import Image from "next/image";
import { useEffect, useState } from "react";



export const ProductsInCart = () => {
  const productsCart = useCartStore((state) => state.cart);
  const [loaded, setloaded] = useState<boolean>(false);

  useEffect(() => {
    setloaded(true);
  }, []);

  if (!loaded) {
    return <p>Cargando el carrito...</p>;
  }
  return (
    <>
      {productsCart.map((product) => (
        <div className="flex my-3" key={`${product.slug}-${product.size}`}>
          <Image
            src={`/products/${product.image}`}
            alt={product.title}
            width={120}
            height={120}
            className="mr-5 rounded-md"
          />
          <div>
            <h4
              className="font-semibold"
            >
              {`${product.size} - ${product.title} `}
              <span className="text-lg font-semibold"> x{product.quantity}</span>
            </h4>
            <p className="text-lg font-bold">{currencyFormat(product.price)}</p>
          </div>
        </div>
      ))}
    </>
  );
};
