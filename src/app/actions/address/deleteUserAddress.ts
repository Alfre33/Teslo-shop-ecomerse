'use server'

import prisma from "@/lib/prisma"

export const deleteAddressByUser=async (userId:string)=>{
try {
    await prisma.userAddress.delete({where:{userId:userId}})
    return{
        status: 200,
        ok:true,
        message:'direccion eliminada correctamente'
    }
} catch (error) {
    console.log(error);
    throw new Error("Ocurrio un error al eliminar la direccion");
}
}