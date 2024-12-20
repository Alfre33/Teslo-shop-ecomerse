import { IoCardOutline } from "react-icons/io5";
interface Props{
    isPaid:boolean
}
export const AlertToPay = ({isPaid}:Props) => {
  return (
    <div
      // className={clsx(
      //   "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
      //   {
      //     "bg-green-500": true,
      //   }
      // )}
      className={`flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5 ${
        isPaid ? "bg-green-500" : "bg-red-500"
      }`}
    >
      <IoCardOutline size={30} className="mr-3" />
      {isPaid ? "Orden Pagada" : "La orden aun no a sido pagada"}
    </div>
  );
};
