import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./db";
import { gpoLoginUseCase } from "../use-cases/gpo-users";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
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
            error: null,
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
          //   gatePassNumber: user.gatePassNumber,
          //   id: user.id,
          //   firstName: user.firstName,
          //   lastName: user.lastName,
          //   imageLink: user.imageLink,
          //   bio: user.bio,
          //   links: user.links,
          //   isAvailableForWork: user.isAvailableForWork,
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
          //   gatePassNumber: token.gatePassNumber,
          //   lastName: token.lastName,
          //   username: token.username,
          //   id: token.id,
          //   imageLink: token.imageLink,
          //   bio: token.bio,
          //   links: token.links,
          //   isAvailableForWork: token.isAvailableForWork,
        },
      };
    },
  },
};
