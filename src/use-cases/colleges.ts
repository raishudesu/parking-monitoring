import { createCollege, getAllColleges } from "@/data-access/colleges";

export const createCollegeUseCase = async (collegeName: string) => {
  const college = await createCollege(collegeName);

  return college;
};

export const getAllCollegesUseCase = async () => {
  const colleges = await getAllColleges();

  return colleges;
};
