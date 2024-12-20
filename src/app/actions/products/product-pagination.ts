"use server";
import prisma from "@/lib/prisma";
import { Category } from "@/interfaces";

interface paginationOptions {
  page?: number;
  take?: number;
  gender?: Category ;
}

export const getpaginatedProductsWithImages = async ({
  page = 1,
  take = 12,
  gender
}: paginationOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  try {
    const products = await prisma.product.findMany({
      take: take,
      skip: (page - 1) * take,
      include: {
        productImage: {
          take: 2,
          select: {
            url: true,
          },
        },
      },
      where: {
        gender:gender
      },
    });

    const totalProducts = await prisma.product.count({where:{gender:gender}})
    const totalPages = Math.ceil(totalProducts / take);

    return {
      currentPage: page,
      totalPage: totalPages,
      products: products.map((product) => ({
        ...product,
        images: product.productImage.map((image) => image.url),
      })),
    };
  } catch (error) {
    console.log(error)
    throw new Error("Ocurrio un error al obtener los productos");
  }
};
