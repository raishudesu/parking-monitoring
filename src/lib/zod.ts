import { z } from "zod";

export const gpoAccountSchema = z.object({
  email: z.string().email(),
  gatePassNumber: z.string().min(4),
  password: z.string(),
  accountType: z.enum(["FACULTY", "STUDENT", "STAFF"]),
  collegeId: z.string().or(z.null()),
  department: z.string().max(25).optional(),
  isVIP: z.boolean(),
  isPWD: z.boolean(),
  imageLink: z.string().optional(),
  creditScore: z.number().optional(),
  isActive: z.boolean().optional(),
});

export const gpoLoginSchema = z.object({
  // gatePassNumber: z.string().min(8),
  email: z.string().email(),
  plainTextPassword: z.string().min(8),
});

export const collegeSchema = z.object({
  id: z.string(),
  collegeName: z.string(),
});

export const gpoUpdateAccountSchema = z.object({
  auditAdminId: z.string().optional(),
  accountId: z.string(),
  data: gpoAccountSchema,
  colleges: z.array(collegeSchema).optional(),
});

const overrideSchema = z.object({
  collegeId: z.string().or(z.null()),
});

export const accountCreationSchema = gpoAccountSchema.merge(overrideSchema);

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const updatePasswordSchema = z.object({
  oldPassword: z.string().min(8),
  newPassword: z.string().min(8),
  accountId: z.string(),
});

export const adminAccountSchema = z.object({
  id: z.string().optional(),
  firstName: z.string(),
  lastName: z.string(),
  corpEmail: z.string(),
  password: z.string().min(8),
  role: z.enum(["ADMIN", "SUPERADMIN", "SECURITY"]),
});

export const parkingSpaceSchema = z.object({
  auditAdminId: z.string().optional(),
  name: z.string(),
  description: z.string(),
  longitude: z.string(),
  latitude: z.string(),
  spaceType: z.enum([
    "MOTORCYCLE",
    "TRICYCLE",
    "FOURWHEEL",
    "MIXED",
    "PWD",
    "VIP",
  ]),
  polygon: z.string().or(z.null()),
  maxCapacity: z.number(),
  reservedCapacity: z.number(),
  images: z.array(
    z.object({
      url: z.string(),
      parkingSpaceId: z.string().optional(),
      path: z.string(),
    })
  ),
});

export const parkingSpaceFormSchema = z.object({
  name: z.string(),
  description: z.string(),
  longitude: z.string(),
  latitude: z.string(),
  polygon: z.string().or(z.null()),
  spaceType: z.enum([
    "MOTORCYCLE",
    "TRICYCLE",
    "FOURWHEEL",
    "MIXED",
    "PWD",
    "VIP",
  ]),
  maxCapacity: z.string(),
  reservedCapacity: z.string(),
  images: z.array(
    z.object({
      id: z.string().optional(),
      url: z.string(),
      parkingSpaceId: z.string().optional(),
      path: z.string(),
    })
  ),
});

export const parkingSpaceUpdateFormSchema = z.object({
  parkingSpaceId: z.string(),
  data: parkingSpaceSchema,
});

export const adminUpdateSchema = z.object({
  auditAdminId: z.string().optional(),
  firstName: z.string(),
  lastName: z.string(),
  corpEmail: z.string(),
  role: z.enum(["ADMIN", "SUPERADMIN", "SECURITY"]),
});

export const adminUpdateFormSchema = z.object({
  adminId: z.string(),
  data: adminUpdateSchema,
});

export const collegeCreationSchema = z.object({
  collegeName: z.string().min(2),
  auditAdminId: z.string().optional(),
});

export const visitorCardCreationSchema = z.object({
  cardNumber: z.string(),
  auditAdminId: z.string().optional(),
});
export const visitorCardUpdateSchema = z.object({
  cardId: z.string(),
  cardNumber: z.string(),
  auditAdminId: z.string().optional(),
});

export const auditLogSchema = z.object({
  action: z.enum([
    "CREATE",
    "INSERT",
    "UPDATE",
    "DELETE",
    "REACTIVATE",
    "DEACTIVATE",
  ]),
  table: z.enum([
    "ADMIN",
    "ACCOUNT",
    "VISITORPASSCARD",
    "PARKINGSPACE",
    "COLLEGE",
    "USERFEEDBACK",
    "REPORTGENERATIONLOG",
  ]),
  adminId: z.string(),
});

export const userFeedBackSchema = z.object({
  name: z.string().min(2, "Name should be at least 2 characters"),
  email: z.string().email(),
  message: z.string().min(6, "Message should be at least 6 characters"),
});

// SURVEY QUESTIONS

export const ratings = z.enum([
  "EXCELLENT",
  "GOOD",
  "NEUTRAL",
  "POOR",
  "VERY POOR",
]);

export const userFeedbackSurveySchema = z.object({
  overallExperience: ratings,
  easeOfUse: ratings,
  realtimeFeatures: ratings,
  qrFunctionality: ratings,
  notifications: ratings,
  suggestions: z.string().min(2).max(1500),
  toRecommend: ratings,
});
