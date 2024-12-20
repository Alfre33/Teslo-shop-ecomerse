"use client";
import { SizeSelector, QuantitySelector } from "@/components";
import type { CartProduct, Product, Sizes } from "@/interfaces";
import { useCartStore } from "@/store";
import React, { useState } from "react";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const addProductToCart = useCartStore((state) => state.addProductToCart);
  const [size, setSize] = useState<Sizes | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState<boolean>(false);
  const addToCart = () => {
    setPosted(true);
    if (!size) return;

    const cartProduct: CartProduct = {
      id: product.id,
      size: size,
      quantity: quantity,
      price: product.price,
      slug: product.slug,
      title: product.title,
      image: product.images[0],
    };
    addProductToCart(cartProduct);
    setSize(undefined);
    setQuantity(1);
    setPosted(false);
  };

  return (
    <>
      {posted && !size && (
        <span className="mt-3 text-red-400 fade-in">
          Debes seleccionar una talla*
        </span>
      )}
      {/* Selector tallas  */}
      <SizeSelector
        selectedSize={size}
        availableSizes={product.sizes}
        onChangeSize={(size) => setSize(size)}
      />
      {/* Selector cantidad  */}
      <QuantitySelector quantity={quantity} onChangeQuantity={setQuantity} />
      {/* button agregar al carrito */}
      <button className="btn-primary my-5" onClick={addToCart}>
        Agregar al carrito
      </button>
    </>
  );
};
