import NextAuth from "next-auth";
import type {
  Admin as AdminPrisma,
  AdminRole,
  GPOAccount as GpoPrisma,
  UserRole,
} from "@prisma/client";
import { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
declare module "next-auth" {
  // just extend the User's type from Prisma lol xd

  type SystemUsers =
    | Omit<GpoPrisma, "password">
    | Omit<AdminPrisma, "password">;

  interface User extends SystemUsers {
    role: AdminRole | UserRole;
    creditScore: number | null;
    isActive: boolean;
    isPWD: boolean;
    isVIP: boolean;
    error: string | null;
    firstName: string;
    lastName: string;
    corpEmail: string | null;
    gatePassNumber: string;
  }

  interface Session {
    user: User;
    token: User;
    access_token: string & DefaultSession;
  }

  interface JWT {
    access_token: string & DefaultJWT;
  }
}
