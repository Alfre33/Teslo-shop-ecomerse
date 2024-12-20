"use server ";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getOrderById = async (id: string) => {
  const session = await auth();
  if (!session?.user) {
    return {
      ok: false,
      message: "Debes estar autenticado",
    };
  }
  try {
    const order = await prisma.order.findUnique({
      where: { id: id },
      include: {
        OrderAddress: true,
        OrderItem: {
          select: {
            price: true,
            quantity: true,
            size: true,

            product: {
              select: {
                title: true,
                slug: true,
                productImage: {
                  select: {
                    url: true,
                  },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });
    // const order = await prisma.order.findFirst({ where: { id: id } });
    // const orderAddress = await prisma.orderAddress.findFirst({
    //   where: { orderId: id },
    // });
    // const itemsOrder = await prisma.orderItem.findMany({
    //   where: { orderId: id },
    // });

    // const productsDetails = await prisma.product.findMany({
    //   where: { id: { in: itemsOrder.map((p) => p.productId) } },
    // });

    // const imageProduct = await prisma.productImage.findMany({
    //   where: { productId: { in: productsDetails.map((p) => p.id) } },
    // });

    if (!order) throw `La orden con ${id} no existe`;

    if (session.user.role === "user") {
      if (session.user.id !== order.userId) {
        throw `La orden con ${id} no es de este usuario`;
      }
    }

    return {
      ok: true,
      order: order,
      // orderAddress: orderAddress,
      // itemsOrder:itemsOrder,
      // productsDetails:productsDetails,
      // imageProduct:imageProduct
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Ocurrio un error al extraer informacion de la orden",
    };
  }
};
