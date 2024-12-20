import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  address: {
    firstName: string;
    lastName: string;
    address: string;
    secondAddress?: string;
    postalCode: string;
    city: string;
    country: string;
    phone: string;
  };
  //METHODS
  setAddress: (address: State["address"]) => void;
}

export const useAddressStore = create<State>()(
  persist(
    (set) => ({
      address: {
        firstName: "",
        lastName: "",
        address: "",
        secondAddress: "",
        postalCode: "",
        city: "",
        country: "",
        phone: "",
      },
      setAddress: (address) => set({ address }),
    }),
    { name: "address-user" }
  )
);
