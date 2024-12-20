import { tittleFont } from "@/config/fonts";

interface Props{
    tittle: string;
    subtitle?: string;
    className?: string;
}

export const Tittle = ({className,subtitle,tittle}:Props) => {
  return (
    <div className={`${className} mt-3`}>
        <h1 className={`${tittleFont.className} antialiased md:text-4xl font-semibold my-3 text-2xl `}>{tittle}</h1>

        {
            subtitle && <h3 className="text-xl mb-5">{subtitle}</h3>
        }
    </div>
  )
}
