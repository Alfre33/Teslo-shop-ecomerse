'use server'

import prisma from "@/lib/prisma"

export const getCategories=async ()=>{
try {
    const categories = await prisma.category.findMany()
    return{
        categories: categories,
        ok: true,
        message:'Categorias obtenidas correctamente '
    }
} catch (error) {
    console.log(error)
    return{
        ok:false,
        message:'error al obtener las categorias'
    }
}

}