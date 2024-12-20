import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/config/fonts";
import { ProviderSession } from "@/components";



export const metadata: Metadata = {
  title:{
    template:'%s - Teslo | Shop',
    default:'Home  - Teslo | Shop'
  },
  description: "Tienda online de ropa de alta calidad",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} font-bold`}>
      <ProviderSession>
        {children}
      </ProviderSession>
      </body>
    </html>
  );
}
