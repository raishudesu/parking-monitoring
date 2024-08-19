import { GPOAccount } from "@prisma/client";

export type GPOAccountDTO = Omit<GPOAccount, "password">;
