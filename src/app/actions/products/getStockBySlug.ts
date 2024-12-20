'use server'
import prisma from "@/lib/prisma";

export const getStockBySlug = async (slug: string) => {
  try {
    const stock = await prisma.product.findFirst({
      where: {
        slug: slug,
      },
      select:{inStock: true}
    });
    return stock?.inStock ?? 0;

  } catch (error) {
    console.log(error)
    throw new Error('error al extraer el stock');
    return 0;
  }
};
