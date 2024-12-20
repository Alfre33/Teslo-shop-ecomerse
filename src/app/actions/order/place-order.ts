"use server";

import { auth } from "@/auth.config";
import { Address, Sizes } from "@/interfaces";
import prisma from "@/lib/prisma";

interface productsCart {
  productId: string;
  quantity: number;
  size: Sizes;
}

export const placeOrder = async (
  productsCart: productsCart[],
  addresOrder: Address
) => {
  //Verificamos si nuestra session existe
  const session = await auth();
  const { country, ...addressRest } = addresOrder;
  const userId = session?.user.id;
  if (!userId) {
    return {
      status: 500,
      ok: false,
      message: "No hay ninguna sesion de usuario activa",
    };
  }

  //Obtener la informacion completa de nuestros productos,ademas se pueden llevar 2 o mas producto del mismo id o tipo solo en diferente talla
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productsCart.map((product) => product.productId), //Forma de obtener los registros que incluyan el id de producto similar include
      },
    },
  });

  const itemsInOrder = productsCart.reduce(
    (count, product) => count + product.quantity,
    0
  );
  const { subtotal, tax, total } = productsCart.reduce(
    (totals, item) => {
      const productQuantity = item.quantity;
      const product = products.find((product) => product.id === item.productId);
      if (!product) throw new Error(`${item.productId} no existe`);

      const subtotal = productQuantity * product.price;
      totals.subtotal += subtotal;
      totals.tax += subtotal * 0.15;
      totals.total += subtotal * 1.15;

      return totals;
    },
    { subtotal: 0, tax: 0, total: 0 }
  );

  //Crear la transacción en la base de datos
  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      //1. Actualizar el stock de los productos
      const updatedProductsPromises = products.map((product) => {
        //Acumular el valor del los items individuales del carrito
        const productQuantity = productsCart
          .filter((p) => p.productId === product.id)
          .reduce((valorActual, item) => item.quantity + valorActual, 0);
        if (productQuantity === 0) {
          throw new Error(
            `${product.title} no tiene una cantidad definida en el carrito`
          );
        }

        return tx.product.update({
          where: { id: product.id },
          data: { inStock: { decrement: productQuantity } },
        });
      });

      const updatedProducts = await Promise.all(updatedProductsPromises);
      updatedProducts.map((product) => {
        if (product.inStock < 0) {
          throw new Error(`el producto ${product.title} se ha agotado`);
        }
      });

      //2. Crear la orden - Encabezado - Detalles
      const order = await tx.order.create({
        data: {
          userId: userId,
          itemsInOrder: itemsInOrder,
          subTotal: subtotal,
          tax: tax,
          total: total,
          isPaid: false,
          OrderItem: {
            createMany: {
              data: productsCart.map((product) => ({
                quantity: product.quantity,
                size: product.size,
                productId: product.productId,
                price:
                  products.find((item) => item.id === product.productId)
                    ?.price ?? 0,
              })),
            },
          },
        },
      });

      //3. Guardar la direccion de la orden
      const orderAddress = await tx.orderAddress.create({
        data: {
          ...addressRest,
          countryId: country,
          orderId: order.id,
        },
      });

      return {
        order: order,
        updatedProduct: updatedProducts,
        orderAddress: orderAddress,
      };
    });

    return {
      ok: true,
      order: prismaTx.order.id,
      prismaTx: prismaTx,
      message:'Orden Realizada correctamente'
    };
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'No se pudo crear la orden'
    };
  }
};
