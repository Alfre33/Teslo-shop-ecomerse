// https://tailwindcomponents.com/component/hoverable-table
import { getpaginatedProductsWithImages } from "@/app/actions";
import { auth } from "@/auth.config";
import { Pagination, Tittle } from "@/components";
import { ProductImageComponent } from "@/components/product/product-image/ProductImage";
import { currencyFormat } from "@/utils";
import Link from "next/link";

import { redirect } from "next/navigation";

interface Props {
  searchParams: Promise<{ page: string }>;
}
export default async function AdminProductsPage({ searchParams }: Props) {
  // Usa await para resolver el Promise
  const resolvedSearchParams = await searchParams;

  // Extrae el parámetro `page` una vez resuelto
  const page = resolvedSearchParams.page
    ? parseInt(resolvedSearchParams.page)
    : 1;

  const session = await auth();
  if (!session?.user && session?.user.role !== "admin") {
    redirect("/auth/login");
  }
  const { products, totalPage } = await getpaginatedProductsWithImages({
    page,
  });

  return (
    <>
      <Tittle tittle="Todas los productos" />
      <div className="flex justify-end mb-5">
        <Link href="/admin/product/new" className="btn-primary">
          Agregar nuevo producto
        </Link>
      </div>
      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Imagen
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Titulo
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Precio
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Genero
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Stock
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Tallas
              </th>
            </tr>
          </thead>

          <tbody>
            {products?.map((product) => (
              <tr
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                key={product.id}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <Link href={`/product/${product.slug}`}>
                    {/* <Image
                      src={`/products/${product.productImage[0].url}`}
                      alt={product.title}
                      width={80}
                      height={80}
                      className="w-20 h-20 object-cover rounded hover:opacity-85"
                    /> */}
                    <ProductImageComponent
                      src={product.productImage[0]?.url}
                      alt={product.title}
                      width={80}
                      height={80}
                      className="w-20 h-20 object-cover rounded hover:opacity-85"
                    />
                  </Link>
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <Link
                    href={`/admin/product/${product.slug}`}
                    className="hover:underline"
                  >
                    {product.title}
                  </Link>
                </td>
                <td className="text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {currencyFormat(product.price)}
                </td>
                <td className="text-sm  text-gray-900 font-bold px-6 py-4 whitespace-nowrap capitalize ">
                  {product.gender}
                </td>
                <td className="text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {product.inStock}
                </td>
                <td className="text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {product.sizes.join(", ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination totalPages={totalPage} />
      </div>
    </>
  );
}
