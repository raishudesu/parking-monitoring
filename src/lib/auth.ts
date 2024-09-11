import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./db";
import { gpoLoginUseCase } from "../use-cases/gpo-users";
import { adminLoginUseCase } from "@/use-cases/admin";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      id: "gpo",
      name: "gpo",
      credentials: {
        gatePassNumber: { label: "Gate Pass Number", type: "text" },
        plainTextPassword: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        try {
          if (!credentials?.gatePassNumber || !credentials?.plainTextPassword)
            return null;

          const existingUser = await gpoLoginUseCase(
            credentials.gatePassNumber,
            credentials.plainTextPassword
          );

          return {
            ...existingUser,
            firstName: "",
            lastName: "",
            corpEmail: existingUser.email,
            error: null,
          };
        } catch (error) {
          throw error;
        }
      },
    }),
    CredentialsProvider({
      id: "admin",
      name: "admin",
      credentials: {
        email: { label: "Administrator Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) return null;

          const admin = await adminLoginUseCase(
            credentials.email,
            credentials.password
          );

          return {
            ...admin,
            creditScore: null,
            error: null,
            gatePassNumber: "",
          };
        } catch (error) {
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ user, token, trigger, session }) => {
      if (user) {
        return {
          ...token,
          ...user,
        };
      }

      if (trigger === "update") {
        return { ...token, ...session.user };
      }

      return token;
    },
    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          ...token,
        },
      };
    },
  },
};
