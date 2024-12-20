'use server'
import { signOut } from "@/auth.config";

export const signOutButton = async () => {
  await signOut();
};
