import NextAuth from "next-auth";
import type {
  Admin as AdminPrisma,
  AdminRole,
  GPOAccount as UserPrisma,
  UserRole,
} from "@prisma/client";
declare module "next-auth" {
  // just extend the User's type from Prisma lol xd

  type SystemUsers =
    | Omit<UserPrisma, "password">
    | Omit<AdminPrisma, "password">;

  interface User extends SystemUsers {
    role: AdminRole | UserRole;
    error: string | null;
  }

  interface Session {
    user: User;
    token: User;
  }
}
