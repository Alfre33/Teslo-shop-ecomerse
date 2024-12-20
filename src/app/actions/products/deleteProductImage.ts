"use server";
import prisma from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";

// Configuration
cloudinary.config(process.env.CLOUDINARY_URL ?? "");

export const deleteProductImage = async (
  productId: number,
  imageUrl: string
) => {
  if (!imageUrl.startsWith("http")) {
    return {
      ok: false,
      message: "No se pueden borrar imagenes del file-sistem",
    };
  }

  const imageName = imageUrl.split("/").pop()?.split(".")[0] ?? "";

  try {
    await cloudinary.uploader.destroy(imageName);
    const deletedImage = await prisma.productImage.delete({
      where: { id: productId },
      select: { product: { select: { slug: true } } },
    });

    //Revalidar paths
    revalidatePath(`/admin/products`);
    revalidatePath(`/admin/product/${deletedImage.product.slug}`);
    revalidatePath(`/product/${deletedImage.product.slug}`);
    
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No se pudo eliminar la imagen",
    };
  }
};
