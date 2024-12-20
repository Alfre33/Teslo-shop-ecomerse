export const revalidate = 60;
import { Pagination, ProductGrid, Tittle } from "@/components";
// import { initialData } from "@/seed/seed";
import { getpaginatedProductsWithImages } from "../actions/products/product-pagination";
import { redirect } from "next/navigation";

// const productos = initialData.products; //extraidos ded un json

interface Props {
  searchParams: Promise<{ page: string }>;
}

export default async function Home({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const page = resolvedSearchParams.page
    ? parseInt(resolvedSearchParams.page)
    : 1;

  const { products, totalPage } = await getpaginatedProductsWithImages({
    page,
  }); //extraidos de una base de datos

  if (products.length === 0) {
    redirect("/");
  }

  return (
    <>
      <Tittle tittle="Tienda" className="mb-2" subtitle="Todos los productos" />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPage} />
    </>
  );
}
