export const revalidate = 60;

import { getpaginatedProductsWithImages } from "@/app/actions/products/product-pagination";
import { Pagination, ProductGrid, Tittle } from "@/components";
import { Gender } from "@prisma/client";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{
    gender: string;
  }>;
  searchParams: Promise<{ page: string }>;
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const resolvedParams = await params;
  const { gender } = resolvedParams;
  const resolvedSearchParams = await searchParams;
  const page = resolvedSearchParams.page
    ? parseInt(resolvedSearchParams.page)
    : 1;

  const { products, totalPage } = await getpaginatedProductsWithImages({
    page,
    gender: gender as Gender,
  });

  // const productscategory = products.filter((product) => product.gender === gender);
  if (products.length === 0) {
    redirect(`/gender/${gender}`);
  }

  const labels: Record<string, string> = {
    men: "para hombres",
    women: "para mujeres",
    kid: "para niños",
    unisex: "para todos",
  };
  // const categories=["men","women","kid"];

  // if(!categories.some(category => category === id)){
  //   notFound()
  // }

  return (
    <>
      <Tittle
        tittle={`Articulos ${labels[gender]}`}
        className="mb-2 "
        subtitle={`Todos los productos`}
      />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPage} />
    </>
  );
}
