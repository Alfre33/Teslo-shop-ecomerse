"use client";
import { QuantitySelector } from "@/components";
import { ProductImageComponent } from "@/components/product/product-image/ProductImage";
import { useCartStore } from "@/store";
import Link from "next/link";
import { useEffect, useState } from "react";



export const ProductsInCart = () => {
  const productsCart = useCartStore((state) => state.cart);
  const updateProductQuantity = useCartStore((state) => state.updateProductQuantity);
  const removeProductCart = useCartStore((state) => state.removeProduct);
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
          <ProductImageComponent
            src={product.image}
            alt={product.title}
            width={120}
            height={120}
            className="mr-5 rounded-md"
          />
          <div>
            <Link
              href={`/product/${product.slug}`}
              className="hover:underline cursor-pointer"
            >
              {`${product.size} - ${product.title}`}
            </Link>
            <p>{product.price}</p>
            <QuantitySelector
              quantity={product.quantity}
              onChangeQuantity={(quantity)=>updateProductQuantity(product,quantity)}
            />
            <button className="underline" onClick={()=>removeProductCart(product)}>Remover</button>
          </div>
        </div>
      ))}
    </>
  );
};
