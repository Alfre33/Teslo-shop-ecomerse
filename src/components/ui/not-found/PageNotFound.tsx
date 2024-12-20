import { tittleFont } from "@/config/fonts";
import Image from "next/image";
import Link from "next/link";

export const PageNotFound = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row h-[800px] w-full justify-center items-center align-middle ">
      <div className="text-center px-5 mx-5">
        <h2 className={`${tittleFont.className} antialiased text-9xl`}>404</h2>
        <p className="font-semibold text-xl ">Whoops! Lo sentimos mucho.</p>
        <p>
          <span className="font-light">Puedes regresar al </span>
          <Link href='/' className="font-normal hover:underline transition-all">inicio</Link>
        </p>
      </div>

      <div className="px-5 mx-5">
        <Image
         alt="Starman"
         src="/imgs/starman_750x750.png"
         className="p-5 sm:p-0"
         width={550}
         height={550}
         />
      </div>
    </div>
  );
};
