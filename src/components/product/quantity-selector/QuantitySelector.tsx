"use client";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
  quantity: number;
  onChangeQuantity:(quantity:number)=>void;
}

export const QuantitySelector = ({ quantity,onChangeQuantity }: Props) => {
  // const [count, setcount] = useState(quantity);

//   const addProduct = () => {
//     if (count < 5) {
//       setcount(count + 1);
//     }
//   };
//   const removeProduct = () => {
//     if (count > 1) {
//       setcount(count - 1);
//     }
//   };

  const onQuantityCount = (value: number) => {
    if (quantity + value < 1) return;
      onChangeQuantity(quantity + value)
    // setcount(count + value);
  };

  return (
    <div className="flex items-center">
      <button onClick={() => onQuantityCount(-1)}>
        <IoRemoveCircleOutline size={30} />
      </button>
      <span className="w-20 mx-3 px-5 bg-gray-300 text-center rounded-md">
        {quantity}
      </span>
      <button onClick={() => onQuantityCount(1)}>
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  );
};
