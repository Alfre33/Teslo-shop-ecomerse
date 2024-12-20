import { auth } from "@/auth.config";
import { Footer, Sidebar, TopMenu } from "@/components";
import React from "react";

const getRoles = async () => {
  const session = await auth();
  return {
    isAdmin: session?.user.role === "admin",
    isAuthenticated: Boolean(session?.user),
  };
};

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarProps = await getRoles();

  return (
    <main className="min-h-screen">
      <TopMenu />
      <Sidebar {...sidebarProps} />
      <div className="mx-0 sm:mx-10">{children}</div>
      <Footer />
    </main>
  );
}
