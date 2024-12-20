"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

interface paginationOptions {
  page?: number;
  take?: number;
}

export const getPaginetedOrders = async ({
  page = 1,
  take = 10,
}: paginationOptions) => {
  const session = await auth();
  if (session?.user.role !== "admin") {
    return {
      ok: false,
      message: "Debes ser administrador para ver todas las ordenes",
    };
  }
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  try {
    const orders = await prisma.order.findMany({
      take: take,
      skip: (page - 1) * take,
      orderBy: { createdAt: "desc" },
      include: { OrderAddress: true },
    });

    const totalOrders = await prisma.order.count();
    const totalPages = Math.ceil(totalOrders / take);

    return {
      ok: true,
      orders: orders,
      message: "ordenes extraidas correctamente",
      currentPage: page,
      totalPage: totalPages,
    };
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: "error al obtener las ordenes del usuario",
    };
  }
};
