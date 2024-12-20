import { AlertToPay, PaypalButton, Tittle } from "@/components";
import Image from "next/image";
import { getOrderById } from "@/app/actions/order/getOrderById";
import { currencyFormat } from "../../../../utils/currencyFormat";
import { redirect } from "next/navigation";
interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function OrderPage({ params }: Props) {
  const { id } =await params;
  const getData = await getOrderById(id);

  if (!getData.order) {
    redirect("/");
  }
  const { order } = getData;
  const {
    OrderAddress,
    OrderItem,
    itemsInOrder,
    subTotal,
    total,
    tax,
    isPaid,
  } = order;
  // const productsWithImages = productsDetails?.map((product) => {
  //   const images = imageProduct.filter(
  //     (image) => image.productId === product.id
  //   );
  //   return {
  //     ...product,
  //     images,
  //   };
  // });

  // const dataProducts = itemsOrder?.map((item) => {
  //   const productDetails = productsWithImages?.filter(
  //     (product) => product.id === item.productId
  //   );
  //   return {
  //     ...item,
  //     productDetails,
  //   };
  // });

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]  ">
        <Tittle tittle={`Orden #${id.split("-").at(-1)}`} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito  */}
          <div className="flex flex-col mt-5">
            <AlertToPay isPaid={isPaid} />

            {OrderItem!.map((product) => (
              <div
                className="flex my-3"
                key={`${product.product.slug}-${product.size}`}
              >
                <Image
                  src={`/products/${product.product.productImage[0].url}`}
                  alt={product.product.title}
                  width={120}
                  height={120}
                  className="mr-5 rounded-md"
                />
                <div>
                  <p>{product.product.title}</p>
                  <p>
                    ${product.price} x{product.quantity}
                  </p>
                  <p>Subtotal: ${product.price * product.quantity}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Checkout  */}
          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
            <h2 className="text-2xl mb-2 font-semibold">
              Direccion de entrega
            </h2>
            <div className="mb-5">
              <p>
                {OrderAddress?.firstName} {OrderAddress?.lastName}
              </p>
              <p>{OrderAddress?.address}</p>
              <p>{OrderAddress?.secondAddress}</p>
              <p>
                {OrderAddress?.countryId} - {OrderAddress?.city}
              </p>
              <p>C.P. {OrderAddress?.postalCode}</p>
              <p>{OrderAddress?.phone}</p>
            </div>

            <h2 className="text-2xl mb-2 font-semibold">Resumen de orden</h2>
            <div className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">
                {itemsInOrder === 1
                  ? "1 articulo"
                  : `${itemsInOrder} articulos`}
              </span>
              <span>Subtotal</span>
              <span className="text-right">
                {currencyFormat(subTotal ?? 0)}
              </span>
              <span>Inpuestos(15%)</span>
              <span className="text-right">{currencyFormat(tax ?? 0)}</span>
              <span className="text-2xl mt-5">Total</span>
              <span className="text-right text-2xl my-5">
                {currencyFormat(total ?? 0)}
              </span>
            </div>
            {isPaid ? (
              <AlertToPay isPaid={isPaid} />
            ) : (
              <PaypalButton orderId={order.id} amount={total} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
