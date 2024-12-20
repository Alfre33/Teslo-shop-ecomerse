import { getCategories, getProductBySlug } from "@/app/actions";
import { Tittle } from "@/components";
import { redirect } from "next/navigation";
import { ProductForm } from "./ui/ProductForm";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: Props) {
  const resolvedParams = await params;
  // Extraer el slug del objeto resuelto
  const { slug } = resolvedParams;
  const product = await getProductBySlug(slug);
  const { categories } = await getCategories();

  if (!product && slug !== "new") {
    redirect("/admin/products");
  }

  const title =
    slug === "new" ? "Agregar un nuevo producto " : "Editar Producto";

  return (
    <>
      <Tittle tittle={title} />
      <ProductForm product={product ?? {}} categories={categories} />
    </>
  );
}
