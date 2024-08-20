import NextAuth from "next-auth";
import type {
  Admin as AdminPrisma,
  GPOAccount as UserPrisma,
} from "@prisma/client";
declare module "next-auth" {
  // just extend the User's type from Prisma lol xd

  type SystemUsers =
    | Omit<UserPrisma, "password">
    | Omit<AdminPrisma, "password">;

  interface User extends SystemUsers {
    error: string | null;
  }

  interface Session {
    user: User;
    token: User;
  }
}
