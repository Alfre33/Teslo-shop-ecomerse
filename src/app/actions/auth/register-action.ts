"use server";

import { object, string } from "yup";
import prisma from "@/lib/prisma";
import bcryptjs from 'bcryptjs'

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const userSchema = object({
      name: string().required(),
      email: string().email().lowercase(),
      password: string().required(),
    });
    await userSchema.validate({ name, email, password });

    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        name: name,
        password: bcryptjs.hashSync(password),
      },
      select:{ //Para solo regresar estos campos en mi user
        id:true,
        email:true,
        name:true
      }
    });

    return {
      ok: true,
      status: 200,
      message: "Usuario registrado exitosamente",
      user:user,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      status: 500,
      message:'error al registrar el usuario',
      error,
    };
  }
};
