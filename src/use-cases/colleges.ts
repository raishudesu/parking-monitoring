import {
  createCollege,
  deleteCollegeById,
  getAllColleges,
  updateCollegeById,
} from "@/data-access/colleges";

export const createCollegeUseCase = async (collegeName: string) => {
  const college = await createCollege(collegeName);

  return college;
};

export const getAllCollegesUseCase = async () => {
  const colleges = await getAllColleges();

  return colleges;
};

export const updateCollegeByIdUseCase = async (
  collegeId: number,
  collegeName: string
) => {
  const college = await updateCollegeById(collegeId, collegeName);

  if (college) return "College Updated Successfully.";

  return "Something went wrong. Try again later.";
};

export const deleteCollegeByIdUseCase = async (collegeId: number) => {
  const college = await deleteCollegeById(collegeId);

  if (college) return "College Deleted Successfully.";

  return "Something went wrong. Try again later.";
};
