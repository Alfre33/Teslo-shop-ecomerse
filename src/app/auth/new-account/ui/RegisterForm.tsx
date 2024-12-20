"use client";
import { login } from "@/app/actions/auth/login-action";
import { registerUser } from "@/app/actions/auth/register-action";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const [errorMessage, setErrorMessage] = useState("");
const router =useRouter();
  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setErrorMessage('')
    const{name,email,password,} =data;

    const resp=await registerUser(name, email, password);

    if(!resp.ok){
      setErrorMessage(resp.message)
      return;
    }
    const autenticate = await login(email,password)
    if(autenticate.ok){
      router.replace('/')
    }
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">Nombre completo</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-3", {
          "border-red-500": errors.name,
        })}
        type="text"
        {...register("name", { required: true })}
      />
      {errors.name && (
        <span className="text-sm text-red-400 my-1">
          El nombre es requerido
        </span>
      )}
      <label htmlFor="email">Correo electrónico</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-3", {
          "border-red-500": errors.email,
        })}
        type="email"
        {...register("email", { required: true, pattern: emailPattern })}
      />
      {errors.email && (
        <span className="text-sm text-red-400 my-1">
          Debes colocarun correo electronico valido
        </span>
      )}
      <label htmlFor="email">Contraseña</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-3", {
          "border-red-500": errors.name,
        })}
        type="password"
        {...register("password", { required: true, minLength: 6 })}
      />
      {errors.password && (
        <span className="text-sm text-red-400 my-1">
          La contraseña debe tener al menos 6 caracteres
        </span>
      )}
     <span className="text-sm text-red-400 my-1">{errorMessage}</span>
      <button type="submit" className="btn-primary">
        Crear cuenta
      </button>
    </form>
  );
};
