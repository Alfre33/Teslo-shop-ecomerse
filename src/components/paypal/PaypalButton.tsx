"use client";

import { paypalCheckPayment } from "@/app/actions/payments/paypalCheckPayments";
import { setTransactionId } from "@/app/actions/payments/setTransactionId";
import {
  CreateOrderActions,
  CreateOrderData,
  OnApproveActions,
  OnApproveData,
} from "@paypal/paypal-js";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

interface Props {
  orderId: string;
  amount: number;
}

export const PaypalButton = ({ orderId, amount }: Props) => {
  const [{ isPending }] = usePayPalScriptReducer();
  if (isPending) {
    return (
      <div className="animate-pulse">
        <div className="h-11 bg-gray-300 rounded-md mb-3" />
        <div className="h-11 bg-gray-300 rounded-md" />
      </div>
    );
  }

  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ): Promise<string> => {
    const rountedAmount = Math.round(amount * 100) / 100;
    console.log(rountedAmount);
    const transactionId = await actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          invoice_id: orderId,
          amount: {
            currency_code: "MXN",
            value: `${rountedAmount}`,
          },
        },
      ],
    });
    // console.log({ transactionId });
    const resp = await setTransactionId(transactionId, orderId);
    console.log({ resp });

    if (!resp.ok) {
      throw new Error("No se pudo actualizar la orden");
    }

    return transactionId;
  };

  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    const details = await actions.order?.capture();
    if (!details) return;

    const result = await paypalCheckPayment(details.id ?? "");
    console.log({ result });
  };

  return (
    <div className="relative z-0">
      <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
    </div>
  );
};
