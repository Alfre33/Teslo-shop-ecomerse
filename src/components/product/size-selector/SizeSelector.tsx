import type { Sizes } from "@/interfaces";
import clsx from "clsx";

interface Props {
  selectedSize?: Sizes;
  availableSizes: Sizes[];
  onChangeSize: (size:Sizes)=>void;
}
export const SizeSelector = ({ availableSizes, selectedSize,onChangeSize }: Props) => {
  
  return (
    <div className="my-5">
      <h3 className="font-bold mb-4">Tallas disponibles</h3>
      <div className="flex">
        {availableSizes.map((size) => (
          <button
            key={size}
            onClick={()=>onChangeSize(size)}
            className={clsx("mx-2 hover:underline text-lg p-2 rounded", {
              'underline bg-gray-300': size === selectedSize,
            })}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};
