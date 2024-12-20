"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

interface paginationOptions {
  page?: number;
  take?: number;
}
export const getPaginetedUsers = async ({
  page = 1,
  take = 10,
}: paginationOptions) => {
  const session = await auth();
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  if (session?.user.role !== "admin") {
    return {
      ok: false,
      message: "Debes ser administrador para ver a los usuarios",
    };
  }

  const users = await prisma.user.findMany({
    take: take,
    skip: (page - 1) * take,
    orderBy: { name: "desc" },
  });

  const totalUsers = await prisma.user.count();
  const totalPages = Math.ceil(totalUsers / take);

  return {
    ok: true,
    message: "Usuarios obtenidos correctamente",
    users: users,
    totalPages:totalPages
  };
};
