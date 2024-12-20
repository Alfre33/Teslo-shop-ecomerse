import { Tittle } from "@/components";
import { AddressForm } from './ui/AdreesForm';
import { getCountries } from "@/app/actions/countries/getCountries";
import { auth } from "@/auth.config";
import { getUserAddressByUserId } from "@/app/actions/address/getUserAddress";

export default async function NamePage() {
  const countriesDB= await getCountries();
  const session= await auth()
  if (!session?.user){
    return (
      <h3>NO existe la session del usuario</h3>
    )
  }
  const userId=session?.user.id;
  const userAddress=await getUserAddressByUserId(userId)

  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
        <Tittle tittle="Dirección" subtitle="Dirección de entrega" />

        <AddressForm countries={countriesDB} userAddress={userAddress}/>
      </div>
    </div>
  );
}
