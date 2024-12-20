"use server";

import { PaypalStatusOrderResponse } from "@/interfaces/paypal.interface";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const paypalCheckPayment = async (transactionId: string) => {
  const authToken = await getPaypalAuthToken();
  if (!authToken) {
    throw new Error("Error al obtener el token");
  }
  const resp = await getOrderDetails(transactionId, authToken);
  if (!resp) {
    return {
      ok: false,
      message: `No se pudo obtener los detalles de la transacion ${transactionId}`,
    };
  }

  const { status, purchase_units } = resp;
  const { invoice_id: orderId } = purchase_units[0];
  if (status !== "COMPLETED") {
    return {
      ok: false,
      message: `La transaccion ${transactionId} aun no se ha completado`,
    };
  }

  try {
    await prisma.order.update({
      where: { id: orderId },
      data: {
        isPaid: true,
        paidAt: new Date(),
      },
    });

    revalidatePath(`/orders/${orderId}`);
    return {
      ok: true,
    };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "El pago no se pudo realizar" };
  }
};

const getPaypalAuthToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET_KEY = process.env.PAYPAL_SECRET_KEY;
  const PAYPAL_OAUTH_URL = process.env.PAYPAL_OAUTH_URL ?? "";

  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET_KEY}`,
    "utf-8"
  ).toString("base64");

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("Authorization", `Basic ${base64Token}`);

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };

  try {
    const result = await fetch(PAYPAL_OAUTH_URL, {...requestOptions,cache:"no-store"})
      .then((response) => response.json())
      .catch((error) => console.error(error));

    return result.access_token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getOrderDetails = async (
  transactionId: string,
  authToken: string
): Promise<PaypalStatusOrderResponse | null> => {
  const PAYPAL_ORDERS_URL = process.env.PAYPAL_ORDERS_URL ?? "";
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${authToken}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const detailsOrder = await fetch(
      `${PAYPAL_ORDERS_URL}/${transactionId}`,
      {
        ...requestOptions,
        cache:"no-store"
      }
    )
      .then((response) => response.json())
      .catch((error) => console.error(error));

    return detailsOrder;
  } catch (error) {
    console.log(error);
    return null;
  }
};
