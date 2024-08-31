import {
  getAdminByEmail,
  getAdminById,
  updateAdminPassword,
} from "@/data-access/admin";
import { AdminLoginError } from "./errors";
import { compare, hash } from "bcrypt";

export const adminLoginUseCase = async (email: string, password: string) => {
  const admin = await getAdminByEmail(email);

  if (!admin) throw new AdminLoginError();

  //   const passwordMatched = await compare(password, admin.password);
  const passwordMatched = admin.password === password;

  if (!passwordMatched) throw new AdminLoginError();

  const { password: newAdminPassword, ...sanitizedAdmin } = admin; // DTO to exclude the password property upon sending the user details back

  return sanitizedAdmin;
};

export const updateAdminPasswordUseCase = async (
  adminId: string,
  oldPassword: string,
  newPassword: string
) => {
  const currentAdmin = await getAdminById(adminId);

  const passwordMatched = await compare(
    oldPassword,
    currentAdmin?.password as string
  );

  if (!passwordMatched)
    throw Error("Old password does not match current password.");

  const hashedPwd = await hash(newPassword, 10);

  const admin = await updateAdminPassword(adminId, hashedPwd);

  const { password: currPassword, ...filteredAdmin } = admin;

  return filteredAdmin;
};
