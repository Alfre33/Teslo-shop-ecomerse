import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import prisma from "./lib/prisma";
import bcryptjs from 'bcryptjs'

const authenticatedRoutes = ["/auth/login", "/auth/new-account"];

const checkoutAddressRoute = ["/checkout/address"];

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/new-account",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      // const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const authRoutes = authenticatedRoutes.some((item) =>
        nextUrl.pathname.includes(item)
      );
      const checkoutRoutes = checkoutAddressRoute.some((item) =>
        nextUrl.pathname.includes(item)
      );
      // console.log({routesMatch})

      if (authRoutes && isLoggedIn) {
        return Response.redirect(new URL("/", nextUrl));
      }

      if (checkoutRoutes) {
        if (isLoggedIn) {
          return true;
        }
        return Response.redirect(
          new URL(`/auth/login?origin=${nextUrl.pathname}`, nextUrl)
        );
      }

      return true;
    },

    jwt({ token, user }) {
      if (user) {
        token.data = user;
      }
      return token;
    },
    session({  session, token }) {
      session.user = token.data as any;

      return session;
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;
        const user = await prisma.user.findUnique({ where: { email: email } });
        if (!user) return null;
        if (!bcryptjs.compareSync(password, user.password)) return null;

        const { password: dbpassword, ...resto } = user;
        console.log({ resto });
        return resto;
      },
    }),
  ],
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
