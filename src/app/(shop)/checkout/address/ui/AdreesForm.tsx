"use client";
import { deleteAddressByUser } from "@/app/actions/address/deleteUserAddress";
import { setUserAddress } from "@/app/actions/address/setUserAddress";
import { Address } from "@/interfaces";
import { SeedCountry } from "@/seed/seed-countries";
import { useAddressStore } from "@/store/address/address-store";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface FormInputs {
  firstName: string;
  lastName: string;
  address: string;
  secondAddress?: string;
  postalCode: string;
  city: string;
  country: string;
  phone: string;
  saveAddrees: boolean;
}
interface Props {
  countries: SeedCountry[];
  userAddress?: Partial<Address>;
}

export const AddressForm = ({ countries, userAddress = {} }: Props) => {
  const onSaveAddressStore = useAddressStore((state) => state.setAddress);
  const { data: session } = useSession({ required: true });
  const addressStore = useAddressStore((state) => state.address);
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { isValid },
    reset,
  } = useForm<FormInputs>({
    defaultValues: {
      ...userAddress,
      saveAddrees: false,
    },
  });

  useEffect(() => {
    if (addressStore.firstName.length > 1) {
      reset(addressStore);
    }
  }, [addressStore,reset]);

  const onSubmit = async (data: FormInputs) => {
    const { saveAddrees, ...DbData } = data;
    onSaveAddressStore(DbData);
    if (saveAddrees) {
      await setUserAddress(DbData, session!.user.id);
    } else {
      await deleteAddressByUser(session!.user.id);
    }
    router.push('/checkout')
  };

  return (
    <form
      className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col mb-2">
        <span>Nombres</span>
        <input
          type="text"
          className="p-2 border rounded-md bg-gray-200"
          {...register("firstName", { required: true })}
        />
      </div>

      <div className="flex flex-col mb-2">
        <span>Apellidos</span>
        <input
          type="text"
          className="p-2 border rounded-md bg-gray-200"
          {...register("lastName", { required: true })}
        />
      </div>

      <div className="flex flex-col mb-2">
        <span>Dirección</span>
        <input
          type="text"
          className="p-2 border rounded-md bg-gray-200"
          {...register("address", { required: true })}
        />
      </div>

      <div className="flex flex-col mb-2">
        <span>Dirección 2 (opcional)</span>
        <input
          type="text"
          className="p-2 border rounded-md bg-gray-200"
          {...register("secondAddress")}
        />
      </div>

      <div className="flex flex-col mb-2">
        <span>Código postal</span>
        <input
          type="text"
          className="p-2 border rounded-md bg-gray-200"
          {...register("postalCode", { required: true })}
        />
      </div>

      <div className="flex flex-col mb-2">
        <span>Ciudad</span>
        <input
          type="text"
          className="p-2 border rounded-md bg-gray-200"
          {...register("city", { required: true })}
        />
      </div>

      <div className="flex flex-col mb-2">
        <span>País</span>
        <select
          className="p-2 border rounded-md bg-gray-200"
          {...register("country", { required: true })}
        >
          <option value="">[ Seleccione ]</option>
          {countries.map((country) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col mb-2">
        <span>Teléfono</span>
        <input
          type="text"
          className="p-2 border rounded-md bg-gray-200"
          {...register("phone", { required: true })}
        />
      </div>

      <div className="flex flex-col mb-5 sm:mt-10">
        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input
              id="remember"
              aria-describedby="remember"
              type="checkbox"
              className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-6 w-6 rounded"
              {...register("saveAddrees")}
            />
          </div>
          <div className="text-sm ml-3">
            <label
              htmlFor="remember"
              className="font-medium text-gray-900 text-lg"
            >
              ¿Recordar dirección?
            </label>
          </div>
        </div>
        <button
          disabled={!isValid}
          //   href="/checkout"
          className={clsx({
            "disabled:bg-blue-400 flex w-full sm:w-1/2 justify-center py-2 px-4 rounded transition-all text-white opacity-90":
              !isValid,
            "btn-primary flex w-full sm:w-1/2 justify-center": isValid,
          })}
        >
          Siguiente
        </button>
      </div>
    </form>
  );
};
