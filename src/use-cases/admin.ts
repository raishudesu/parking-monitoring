import {
  createAdmin,
  deleteAdminById,
  getAdminByEmail,
  getAdminById,
  getAdmins,
  updateAdminById,
  updateAdminPassword,
} from "@/data-access/admin";
import { AdminLoginError } from "./errors";
import { compare, hash } from "bcrypt";
import { z } from "zod";
import { adminAccountSchema, adminUpdateSchema } from "@/lib/zod";

export const createAdminUseCase = async (
  data: z.infer<typeof adminAccountSchema>
) => {
  const hashedPwd = await hash(data.password, 10);

  data.password = hashedPwd;

  const admin = await createAdmin(data);

  return admin;
};

export const getAdminsUseCase = async () => {
  const admins = await getAdmins();

  return admins;
};

export const adminLoginUseCase = async (email: string, password: string) => {
  const admin = await getAdminByEmail(email);

  if (!admin) throw new AdminLoginError();

  const passwordMatched = await compare(password, admin.password);

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

export const updateAdminByIdUseCase = async (
  adminId: string,
  data: z.infer<typeof adminUpdateSchema>
) => {
  const admin = await updateAdminById(adminId, data);

  const { password: currPassword, ...filteredAdmin } = admin;

  return filteredAdmin;
};

export const deleteAdminByIdUseCase = async (adminId: string) => {
  const admin = await getAdminById(adminId);

  if (!admin) throw Error(`Admin with ID: ${adminId} does not exist.`);

  await deleteAdminById(adminId);

  return "Admin Deleted Successfully.";
};
