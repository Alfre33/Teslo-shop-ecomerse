"use client";
import { ProductImageComponent } from "@/components/product/product-image/ProductImage";
import { Product } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface Props {
  product: Product;
}

export const ProductGridItem = ({ product }: Props) => {
  const [displayImage, setdisplayImage] = useState(product.images[0]);
  return (
    <div className="rounded-md overflow-hidden fade-in">
      <Link href={`/product/${product.slug}`}>
        {product.images.length >= 1 ? (
          <Image
            alt={product.title}
            src={`/products/${displayImage}`}
            width={550}
            height={550}
            className="w-full object-cover rounded"
            onMouseEnter={() => setdisplayImage(product.images[1])}
            onMouseLeave={() => setdisplayImage(product.images[0])}
          />
        ) : (
          <ProductImageComponent
            alt={product.title}
            src={displayImage}
            width={550}
            height={550}
            className="w-full object-cover rounded"
          />
        )}
      </Link>
      <div className="p-4 flex flex-col">
        <Link className="hover:text-blue-700" href={`/product/${product.slug}`}>
          {product.title}
        </Link>
        <span className="font-bold">$ {product.price}</span>
      </div>
    </div>
  );
};
