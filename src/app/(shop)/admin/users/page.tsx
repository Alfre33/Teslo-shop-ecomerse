// https://tailwindcomponents.com/component/hoverable-table
import { auth } from "@/auth.config";
import { Pagination, Tittle } from "@/components";

import { redirect } from "next/navigation";
import { UserTable } from "./ui/UserTable";
import { getPaginetedUsers } from "@/app/actions";

interface Props {
  searchParams: Promise<{ page: string }>;
}

export default async function AdminUsersPage({ searchParams }: Props) {
  // Usa await para resolver el Promise
  const resolvedSearchParams = await searchParams;

  // Extrae el parámetro `page` una vez resuelto
  const page = resolvedSearchParams.page
    ? parseInt(resolvedSearchParams.page)
    : 1;

  const session = await auth();
  if (!session?.user && session?.user.role !== "admin") {
    redirect("/auth/login");
  }
  const { users = [], totalPages = 1 } = await getPaginetedUsers({ page });

  return (
    <>
      <Tittle tittle="Todos los usuarios" />
      <div className="mb-10">
        <UserTable users={users} />
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}
