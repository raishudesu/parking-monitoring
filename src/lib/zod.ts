import { z } from "zod";

export const gpoAccountSchema = z.object({
  email: z.string().email(),
  gatePassNumber: z.string().min(5),
  password: z.string(),
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

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
