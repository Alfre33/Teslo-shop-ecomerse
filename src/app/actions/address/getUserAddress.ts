'use server';

import prisma from "@/lib/prisma";

export const getUserAddressByUserId=async (userId:string)=>{
    try {
        const address=await prisma.userAddress.findUnique({where:{userId:userId}})
        if(!address) return undefined;
        const {countryId,secondAddress,...restAddress}=address;
        return{
            ...restAddress,
            secondAddress: secondAddress ?? undefined,
            country:countryId
        } 
        
    } catch (error) {
        console.log(error);
        return undefined;
    }
}