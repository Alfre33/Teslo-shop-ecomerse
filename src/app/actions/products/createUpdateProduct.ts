"use server";

import { Sizes } from "@/interfaces";
import prisma from "@/lib/prisma";
import { Gender, Product } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { v2 as cloudinary } from "cloudinary";

// Configuration
cloudinary.config(process.env.CLOUDINARY_URL ?? "");

const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform((value) => Number(value.toFixed(2))),
  inStock: z.coerce
    .number()
    .min(0)
    .transform((value) => Number(value.toFixed(0))),
  categoryId: z.string().uuid(),
  sizes: z.coerce.string().transform((value) => value.split(",")),
  tags: z.string(),
  gender: z.nativeEnum(Gender),
});

export const createUpdateProduct = async (formData: FormData) => {
  const data = Object.fromEntries(formData);

  const productParsed = productSchema.safeParse(data);

  if (!productParsed.success) {
    console.log(productParsed.error);
    return {
      ok: false,
    };
  }

  const product = productParsed.data;
  product.slug.toLowerCase().replace(/ /g, "_").trim();

  const { id, ...resto } = product;
  try {
    const prismaTx = await prisma.$transaction(async () => {

      let product: Product;
      const tagsArray = resto.tags
        .split(",")
        .map((tag) => tag.trim().toLowerCase());

      if (id) {
        //Actualizar producto
        product = await prisma.product.update({
          where: { id: id },
          data: {
            ...resto,
            sizes: {
              set: resto.sizes as Sizes[],
            },
            tags: {
              set: tagsArray,
            },
          },
        });
      } else {
        //Crear producto
        product = await prisma.product.create({
          data: {
            ...resto,
            sizes: {
              set: resto.sizes as Sizes[],
            },
            tags: {
              set: tagsArray,
            },
          },
        });
      }

      //Proceso de carga y guardado de imagenes
      //Recorrer las imagenes y guardarlas
      if (formData.getAll("images")) {
        //Obtendremos un array con las url de las images ejemplo
        //[http://images.example.com,http://images.example.com]

        const images = await uploadImagesProducts(
          formData.getAll("images") as File[]
        );

        if (!images) {
          throw new Error("No se pudo cargar las imagenes");
        }
        await prisma.productImage.createMany({
          data: images.map((image) => ({
            productId: product.id,
            url: image!,
          })),
        });
      }

      return {
        product: product,
      };
    });
    //Revalidate paths

    revalidatePath(`/admin/products`);
    revalidatePath(`/admin/product/${product.slug}`);
    revalidatePath(`/`);

    return {
      ok: true,
      product: prismaTx.product,
      message: "Producto actualizado correctamente",
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Error al actualizar el producto",
    };
  }
};

const uploadImagesProducts = async (images: File[]) => {
  try {
    const uploadPromises = images.map(async (image) => {
      try {
        //Convertimos nuestra imagen en base64 o un string antes de subirlo como file
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString("base64");

        return cloudinary.uploader
          .upload(`data:image/avif;base64,${base64Image}`)
          .then((r) => r.secure_url);
      } catch (error) {
        console.log(error);
        return null;
      }
    });

    const uploadedImages = await Promise.all(uploadPromises);
    return uploadedImages;
  } catch (error) {
    console.log(error);
    return null;
  }
};
