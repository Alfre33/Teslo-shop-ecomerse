import { tittleFont } from "@/config/fonts";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="flex w-full justify-center text-sm mb-10">
      <Link href="/" className="mx-3">
        <span className={`${tittleFont.className} antialiased font-bold`}>Teslo </span>
        <span>|  Shop</span>
        <span>© {new Date().getFullYear()}</span>
      </Link>
      <Link href="/" className="mx-3">
        <span>Aviso de privacidad</span>
      </Link>
      <Link href="/" className="mx-3">
        <span>Sobre la empresa</span>
      </Link>
    </div>
  );
};
