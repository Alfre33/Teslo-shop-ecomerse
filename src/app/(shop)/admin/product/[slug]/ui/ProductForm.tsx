"use client";

import { createUpdateProduct } from "@/app/actions";
import { deleteProductImage } from "@/app/actions/products/deleteProductImage";
import { ProductImageComponent } from "@/components/product/product-image/ProductImage";
import { Product, ProductImage } from "@/interfaces";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface Props {
  product: Partial<Product> & { productImage?: ProductImage[] };
  categories:
    | {
        id: string;
        name: string;
      }[]
    | undefined;
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

interface FormInput {
  title: string;
  slug: string;
  description: string;
  price: number;
  inStock: number;
  sizes: string[];
  tags: string;
  gender: "kid" | "men" | "women" | "unisex";
  categoryId: string;

  // images: string;
  images?: FileList;
}
export const ProductForm = ({ product, categories }: Props) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
  } = useForm<FormInput>({
    defaultValues: {
      ...product,
      tags: product.tags?.join(", "),
      sizes: product.sizes ?? [],
      images: undefined,
    },
  });

  watch("sizes");

  const onSizeChanged = (size: string) => {
    // Solucion mas optimizada
    const sizes = new Set(getValues("sizes"));
    sizes.has(size) ? sizes.delete(size) : sizes.add(size);
    setValue("sizes", Array.from(sizes));

    // if (sizes.includes(size)) {
    //   const newSizes = sizes.filter((s) => s !== size);
    //   setValue("sizes", newSizes);
    //   console.log(newSizes);
    // } else {
    //   const newSizes = [...sizes, size];
    //   setValue("sizes", newSizes);
    //   console.log(newSizes);
    // }
  };

  const onSubmitForm = async (data: FormInput) => {
    console.log({ data });
    const { images, ...productTosave } = data;
    const formData = new FormData();
    if (product.id) {
      formData.append("id", product.id ?? "");
    }
    formData.append("title", productTosave.title);
    formData.append("slug", productTosave.slug);
    formData.append("description", productTosave.description);
    formData.append("price", productTosave.price.toString());
    formData.append("inStock", productTosave.inStock.toString());
    formData.append("sizes", productTosave.sizes.toString());
    formData.append("tags", productTosave.tags);
    formData.append("categoryId", productTosave.categoryId);
    formData.append("gender", productTosave.gender);

    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
    }

    const { ok, product: UpdateProduct } = await createUpdateProduct(formData);
    if (!ok) {
      alert("Ocurrio un error al actualizar el producto");
      return;
    }
    router.replace(`/admin/product/${UpdateProduct?.slug}`);
  };

  return (
    <form
      className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3"
      onSubmit={handleSubmit(onSubmitForm)}
    >
      {/* Textos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Título</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("title", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Slug</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("slug", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Descripción</span>
          <textarea
            rows={5}
            className="p-2 border rounded-md bg-gray-200"
            {...register("description", { required: true })}
          ></textarea>
        </div>

        <div className="flex flex-col mb-2">
          <span>Price</span>
          <input
            type="number"
            className="p-2 border rounded-md bg-gray-200"
            {...register("price", { required: true, min: 0 })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Tags</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("tags", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Gender</span>
          <select
            className="p-2 border rounded-md bg-gray-200"
            {...register("gender", { required: true })}
          >
            <option value={""}>[Seleccione]</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className="flex flex-col mb-2">
          <span>Categoria</span>
          <select
            className="p-2 border rounded-md bg-gray-200"
            {...register("categoryId", { required: true })}
          >
            <option value="">[Seleccione]</option>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button className="btn-primary w-full" type="submit">
          Guardar
        </button>
      </div>

      {/* Selector de tallas y fotos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Stock</span>
          <input
            type="number"
            className="p-2 border rounded-md bg-gray-200"
            {...register("inStock", { required: true, min: 0 })}
          />
        </div>
        {/* As checkboxes */}
        <div className="flex flex-col">
          <span>Tallas</span>
          <div className="flex flex-wrap">
            {sizes.map((size) => (
              // bg-blue-500 text-white <--- si está seleccionado
              <div
                key={size}
                onClick={() => onSizeChanged(size)}
                className={clsx(
                  "flex  items-center justify-center w-10 h-10 mr-2 border rounded-md font-semibold cursor-pointer",
                  {
                    "bg-blue-500 text-white": getValues("sizes").includes(size),
                  }
                )}
              >
                <span>{size}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col mb-2">
            <span>Fotos</span>
            <input
              type="file"
              multiple
              className="p-2 border rounded-md bg-gray-200"
              accept="image/png, image/jpeg ,image/avif"
              {...register("images")}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
            {product.productImage?.map((image) => (
              <div key={image.id}>
                <ProductImageComponent
                  src={image.url}
                  alt={product.title!}
                  width={300}
                  height={300}
                  className="rounded-t-md shadow-md"
                />
                <button
                  className="btn-error sm:w-full w-[300px] rounded-b-lg"
                  type="button"
                  onClick={() => deleteProductImage(image.id, image.url)}
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
};
