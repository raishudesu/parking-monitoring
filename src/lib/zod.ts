import { z } from "zod";

export const gpoAccountSchema = z.object({
  gatePassNumber: z.string().min(5),
  password: z.string().min(8),
  accountType: z.enum(["FACULTY", "STUDENT", "STAFF"]),
  collegeId: z
    .string()
    .transform((val) => Number(val))
    .or(z.null())
    .or(z.undefined()),
  department: z.string().max(25).optional(),
  isVIP: z.boolean(),
  isPWD: z.boolean(),
  imageLink: z.string().optional(),
  creditScore: z.number().optional(),
  isActive: z.boolean().optional(),
});

const overrideSchema = z.object({
  collegeId: z.string().optional(),
});

export const accountCreationSchema = gpoAccountSchema.merge(overrideSchema);
