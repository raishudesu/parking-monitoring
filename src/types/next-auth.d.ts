import NextAuth from "next-auth";
import type {
  Admin as AdminPrisma,
  AdminRole,
  GPOAccount as GpoPrisma,
  UserRole,
} from "@prisma/client";
declare module "next-auth" {
  // just extend the User's type from Prisma lol xd

  type SystemUsers =
    | Omit<GpoPrisma, "password">
    | Omit<AdminPrisma, "password">;

  interface User extends SystemUsers {
    role: AdminRole | UserRole;
    creditScore: number | null;
    isActive: boolean;
    error: string | null;
    firstName: string;
    lastName: string;
    corpEmail: string | null;
  }

  interface Session {
    user: User;
    token: User;
  }
}
