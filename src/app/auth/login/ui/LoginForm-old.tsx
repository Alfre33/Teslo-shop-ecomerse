"use client";

import { authenticate } from "@/app/actions/auth/login-action";
import clsx from "clsx";
// import { useActionState, useEffect } from 'react';
import React,{useEffect, useState } from "react";
// import { useFormState, useFormStatus } from 'react-dom';
import { FaExclamationCircle } from "react-icons/fa";

export const LoginFormOld = () => {
  // const [errorMessage, formAction, isPending] = useActionState(
  //   authenticate,
  //   undefined
  // );
  // const [state, dispatch] = useFormState(authenticate, undefined);
  // const [state, dispatch] = useState(authenticate);


  // const router=useRouter();

  // useEffect(() => {
  //   if(errorMessage ==='success') {
  //     router.replace('/')
  //     // window.location.replace('/');
  //   }
  // }, [errorMessage])
  // useEffect(() => {
  //   if (state === "Success") {
      // redireccionar
      // router.replace('/');
      // window.location.replace("/");
    // }
  // }, [state]);

  return (
    <form
      // action={formAction}
      // action={dispatch}
      className="flex flex-col"
    >
      <label htmlFor="email">Correo electrónico</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="email"
        name="email"
      />

      <label htmlFor="email">Contraseña</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="password"
        name="password"
      />
      {
        // errorMessage
        // state === "CredentialsSignin" && 
        (
          <div className="flex mb-3">
            <FaExclamationCircle className="h-5 w-5 text-red-500" size={25} />
            <p className="text-md text-red-500 ml-3">
              {/* {errorMessage} */}
              Credenciales no son correctas
            </p>
          </div>
        )
      }

      <LoginButton />
      {/* <button className="btn-primary disabled:bg-blue-300" type="submit" disabled={isPending}>
        Ingresar
      </button> */}
    </form>
  );
};

function LoginButton() {
  // const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      // className={clsx({
      //   "btn-primary": !pending,
      //   "btn-disabled": pending,
      // })}
      // disabled={pending}
    >
      Ingresar
    </button>
  );
}

