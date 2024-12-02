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
import { createAuditLog } from "@/data-access/admin-log";

export const createAdminUseCase = async (
  data: z.infer<typeof adminAccountSchema>
) => {
  await isSuperAdminUseCase(data.id as string);

  const hashedPwd = await hash(data.password, 10);

  data.password = hashedPwd;

  const newAdminData = {
    password: data.password,
    firstName: data.firstName,
    lastName: data.lastName,
    corpEmail: data.corpEmail,
    role: data.role,
  };

  const admin = await createAdmin(newAdminData);

  await createAuditLog({
    action: "CREATE",
    table: "ADMIN",
    adminId: data.id as string,
  });

  return admin;
};

export const isSuperAdminUseCase = async (adminId: string) => {
  const currentAdmin = await getAdminById(adminId);

  if (!currentAdmin) throw Error("Admin doesn't exist.");

  if (!(currentAdmin.role === "SUPERADMIN"))
    throw Error("You are unauthorized to do this action.");

  return;
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

  await createAuditLog({
    action: "UPDATE",
    table: "ADMIN",
    adminId,
  });

  return filteredAdmin;
};

export const updateAdminByIdUseCase = async (
  adminId: string,
  data: z.infer<typeof adminUpdateSchema>
) => {
  await isSuperAdminUseCase(data.auditAdminId as string);

  const updatedAdminData = {
    firstName: data.firstName,
    lastName: data.lastName,
    corpEmail: data.corpEmail,
    role: data.role,
  };

  const admin = await updateAdminById(adminId, updatedAdminData);

  const { password: currPassword, ...filteredAdmin } = admin;

  await createAuditLog({
    action: "UPDATE",
    table: "ADMIN",
    adminId: data.auditAdminId as string,
  });

  return filteredAdmin;
};

export const deleteAdminByIdUseCase = async (
  auditAdminId: string,
  adminId: string
) => {
  await isSuperAdminUseCase(auditAdminId as string);

  const admin = await getAdminById(adminId);

  if (!admin) throw Error(`Admin with ID: ${adminId} does not exist.`);

  await deleteAdminById(adminId);

  await createAuditLog({
    action: "DELETE",
    table: "ADMIN",
    adminId: auditAdminId,
  });

  return "Admin Deleted Successfully.";
};
