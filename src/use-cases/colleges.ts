import { createAdminLog } from "@/data-access/admin-log";
import {
  createCollege,
  deleteCollegeById,
  getAllColleges,
  updateCollegeById,
} from "@/data-access/colleges";

export const createCollegeUseCase = async (
  auditAdminId: string,
  collegeName: string
) => {
  const college = await createCollege(collegeName);

  await createAdminLog({
    action: "CREATE",
    table: "COLLEGE",
    adminId: auditAdminId,
  });

  return college;
};

export const getAllCollegesUseCase = async () => {
  const colleges = await getAllColleges();

  return colleges;
};

export const updateCollegeByIdUseCase = async (
  auditAdminId: string,
  collegeId: string,
  collegeName: string
) => {
  const college = await updateCollegeById(collegeId, collegeName);

  if (college) {
    await createAdminLog({
      action: "UPDATE",
      table: "COLLEGE",
      adminId: auditAdminId,
    });

    return "College Updated Successfully.";
  }

  return "Something went wrong. Try again later.";
};

export const deleteCollegeByIdUseCase = async (
  auditAdminId: string,
  collegeId: string
) => {
  const college = await deleteCollegeById(collegeId);

  if (college) {
    await createAdminLog({
      action: "DELETE",
      table: "COLLEGE",
      adminId: auditAdminId,
    });

    return "College Deleted Successfully.";
  }

  return "Something went wrong. Try again later.";
};
