"use client";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import { SessionProvider } from "next-auth/react";

interface Props {
  children: React.ReactNode;
}
// const initialOptions = {
//   clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '',
//   currency: "MXN",
//   intent: "capture",
// };

export const ProviderSession = ({ children }: Props) => {
  return (
    <SessionProvider>
      <PayPalScriptProvider options={{
        clientId:process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '',
        currency: "MXN",
        intent: "capture",
        }}>
        {children}
        </PayPalScriptProvider>
    </SessionProvider>
  );
};
