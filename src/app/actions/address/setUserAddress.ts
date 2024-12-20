'use server'
import { Address } from "@/interfaces";
import prisma from "@/lib/prisma";

export const setUserAddress = async (address: Address, userId: string) => {
  try {
    const responseAddress = await createOrReplaceAddress(address, userId);
    return {
      ok: true,
      message: "La direccion del usuario se guardo correctamente",
      data: responseAddress,
    };
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: "No se pudo guardar la direccion de este usuario",
    };
  }
};

const createOrReplaceAddress = async (address: Address, userId: string) => {
  try {
    console.log({userId})
    const storeAddress = await prisma.userAddress.findUnique({
      where: { userId: userId },
    });
    const addressToSave = {
      userId: userId,
      firstName: address.firstName,
      lastName: address.lastName,
      address: address.address,
      secondAddress: address.secondAddress,
      postalCode: address.postalCode,
      city: address.city,
      countryId: address.country,
      phone: address.phone,
    };

    if (!storeAddress) {
      const newAddress = await prisma.userAddress.create({
        data: addressToSave,
      });
      return newAddress;
    }
    const updateAddress = await prisma.userAddress.update({
      where: { userId: userId },
      data: addressToSave,
    });
    return updateAddress;
  } catch (error) {
    console.log(error);
    throw new Error("No se pudo grabar la direccion");
  }
};
