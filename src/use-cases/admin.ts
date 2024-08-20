import { getAdmin } from "@/data-access/admin";
import { LoginError } from "./errors";
import { compare } from "bcrypt";

export const adminLoginUseCase = async (email: string, password: string) => {
  const admin = await getAdmin(email);

  console.log(admin);

  if (!admin) throw new LoginError();

  //   const passwordMatched = await compare(password, admin.password);
  const passwordMatched = admin.password === password;

  if (!passwordMatched) throw new LoginError();

  const { password: newAdminPassword, ...sanitizedAdmin } = admin; // DTO to exclude the password property upon sending the user details back

  return sanitizedAdmin;
};
