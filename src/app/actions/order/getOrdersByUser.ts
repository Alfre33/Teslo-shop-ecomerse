"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getOrderByUser = async (userId: string) => {
  const session = await auth();
  if (session?.user.id !== userId || !session.user) {
    throw `Debes estar autenticado`;
  }
  try {
    const orders = await prisma.order.findMany({
      where: { userId: userId },
      include: { OrderAddress: true },
    });
    return {
      ok: true,
      orders: orders,
      message: "ordenes extraidas correctamente",
    };
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: "error al obtener las ordenes del usuario",
    };
  }
};
