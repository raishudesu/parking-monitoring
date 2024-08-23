import { getAdmin } from "@/data-access/admin";
import { AdminLoginError } from "./errors";

export const adminLoginUseCase = async (email: string, password: string) => {
  const admin = await getAdmin(email);

  if (!admin) throw new AdminLoginError();

  //   const passwordMatched = await compare(password, admin.password);
  const passwordMatched = admin.password === password;

  if (!passwordMatched) throw new AdminLoginError();

  const { password: newAdminPassword, ...sanitizedAdmin } = admin; // DTO to exclude the password property upon sending the user details back

  return sanitizedAdmin;
};
