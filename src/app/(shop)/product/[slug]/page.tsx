export const revalidate = 604800;

import { getProductBySlug } from "@/app/actions/products/getProductBySlug";
import {
  ProductMobileSlideshow,
  ProductSlideshow,
  StockLabel,
} from "@/components";
import { tittleFont } from "@/config/fonts";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { AddToCart } from "./ui/AddToCart";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata(
  { params }: Props,
  // parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = (await params).slug;

  // fetch data
  const product = await getProductBySlug(slug);

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: product?.title,
    description: product?.description,
    openGraph: {
      title: product?.title,
      description: product?.description,
      images: [`/products/${product?.images[1]}`],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const product = await getProductBySlug(slug);
  if (!product) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* SlideShow  */}
      <div className="col-span-1 md:col-span-2">
        <ProductMobileSlideshow
          images={product.images}
          title={product.title}
          className="block md:hidden"
        />
        <ProductSlideshow
          title={product.title}
          images={product.images}
          className="hidden md:block"
        />
      </div>
      {/* Detalles  */}
      <div className=" col-span-1 mx-5">
        <h1 className={`${tittleFont.className} antialiased text-xl font-bold`}>
          {product.title}
        </h1>
        <StockLabel slug={product.slug} />
        <p className="text-2xl my-4">$ {product.price}</p>

        <AddToCart product={product}/>

        {/* Description  */}
        <h3 className=" font-bold text-sm">Descripcion del producto</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
