import { z } from "zod";

export const gpoAccountSchema = z.object({
  gatePassNumber: z.string(),
  password: z.string(),
  accountType: z.enum(["FACULTY", "STUDENT", "STAFF"]),
  collegeId: z.number(),
  department: z.string(),
  isVIP: z.boolean(),
  isPWD: z.boolean(),
  imageLink: z.string(),
  creditScore: z.number().optional(),
  isActive: z.boolean(),
});
