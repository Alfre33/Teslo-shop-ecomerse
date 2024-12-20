"use client";

import { authenticate, login } from "@/app/actions/auth/login-action";
import clsx from "clsx";
import { useForm, useFormState, SubmitHandler } from "react-hook-form";
import { FaExclamationCircle } from "react-icons/fa";
import { useState } from "react";

type FormInputs = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm<FormInputs>();
  const { isSubmitted } = useFormState({ control });
  const [authError, setAuthError] = useState<string | null>(null); // Maneja errores de autenticación

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setAuthError(null); // Limpia el error anterior
    const authenticateResponse = await login(data.email, data.password);

    if (!authenticateResponse.ok) {
      setAuthError("Credenciales incorrectas. Inténtalo de nuevo.");
    } else {
      window.location.replace("/");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <label htmlFor="email">Correo electrónico</label>
      <input
        id="email"
        className={clsx(
          "px-5 py-2 border bg-gray-200 rounded mb-5",
          { "border-red-500": errors.email }
        )}
        type="email"
        {...register("email", {
          required: "Correo electrónico es requerido",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Debe ser un correo electrónico válido",
          },
        })}
      />
      {errors.email && (
        <div className="flex items-center mb-3">
          <FaExclamationCircle className="h-5 w-5 text-red-500" size={25} />
          <p className="text-md text-red-500 ml-3">{errors.email.message}</p>
        </div>
      )}

      <label htmlFor="password">Contraseña</label>
      <input
        id="password"
        className={clsx(
          "px-5 py-2 border bg-gray-200 rounded mb-5",
          { "border-red-500": errors.password }
        )}
        type="password"
        {...register("password", {
          required: "Contraseña es requerida",
          minLength: {
            value: 6,
            message: "La contraseña debe tener al menos 6 caracteres",
          },
        })}
      />
      {errors.password && (
        <div className="flex items-center mb-3">
          <FaExclamationCircle className="h-5 w-5 text-red-500" size={25} />
          <p className="text-md text-red-500 ml-3">{errors.password.message}</p>
        </div>
      )}

      {/* Mensaje de error de autenticación */}
      {authError && (
        <div className="flex items-center mb-3">
          <FaExclamationCircle className="h-5 w-5 text-red-500" size={25} />
          <p className="text-md text-red-500 ml-3">{authError}</p>
        </div>
      )}

      <LoginButton isSubmitting={isSubmitting} />
    </form>
  );
};

interface Props {
  isSubmitting: boolean;
}

const LoginButton = ({ isSubmitting }: Props) => {
  return (
    <button
      type="submit"
      className={clsx(
        "px-5 py-2 rounded",
        {
          "bg-blue-500 text-white": !isSubmitting,
          "bg-gray-400 text-gray-800 cursor-not-allowed": isSubmitting,
        }
      )}
      disabled={isSubmitting}
    >
      {isSubmitting ? "Cargando..." : "Ingresar"}
    </button>
  );
};
