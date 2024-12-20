import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (session) {
    redirect("/");
  }
  return (
    <main className="flex justify-center">
      <div className="w-full sm:w-[400px] px-10">{children}</div>
    </main>
  );
}
