import { z } from "zod";

export const gpoAccountSchema = z.object({
  email: z.string().email(),
  gatePassNumber: z.string().min(4),
  password: z.string().optional(),
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
  colleges: z.array(collegeSchema).or(z.null()),
});

const overrideSchema = z.object({
  collegeId: z.string().or(z.null()),
  password: z.string().optional(),
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
  longitude: z.string().or(z.null()),
  latitude: z.string().or(z.null()),
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
  longitude: z.string().or(z.null()),
  latitude: z.string().or(z.null()),
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
    "USERSURVEY",
    "DRIVERBEHAVIORREPORT",
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

export const parkingFeedbackSchema = z.object({
  userId: z.string().optional(),
  overallExperience: z.number(),
  easeOfUse: z.enum([
    "Very Easy",
    "Easy",
    "Neutral",
    "Difficult",
    "Very Difficult",
  ]),
  realtimeFeatures: z.enum([
    "Very Helpful",
    "Helpful",
    "Neutral",
    "Not Helpful",
    "Not At All Helpful",
  ]),
  qrFunctionality: z.enum([
    "Yes, it worked perfectly.",
    "It was okay, but could be improved.",
    "No, I faced issues.",
  ]),
  notificationFeedback: z.enum([
    "Yes, they were timely and clear.",
    "Somewhat, but improvements are needed.",
    "No, I missed or didn't understand the notifications.",
  ]),
  suggestions: z
    .string()
    .min(1, "Please provide your suggestions")
    .max(500, "Suggestion is too long"),
  likelyToRecommend: z.enum([
    "Very Likely",
    "Likely",
    "Neutral",
    "Unlikely",
    "Very Unlikely",
  ]),
});

export const driverBehaviorReportSchema = z.object({
  reportedByAccountId: z.string(),
  parkingSpaceId: z.string(),
  reportType: z.enum([
    "UNAUTHORIZED_PARKING",
    "BLOCKING_OTHER_VEHICLES",
    "PROLONGED_PARKING",
    "RECKLESS_DRIVING",
    "OTHER",
  ]),
  otherDescription: z
    .string()
    .min(6, "Description must be at least 6 characters"),
  images: z.array(
    z.object({
      id: z.string().optional(),
      url: z.string(),
      reportId: z.string().optional(),
      path: z.string(),
    })
  ),
});

export const downtimeLogSchema = z
  .object({
    startedAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),
    endedAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),
    adminId: z.string().min(1, "Admin ID is required"),
  })
  .refine((data) => new Date(data.startedAt) < new Date(data.endedAt), {
    message: "End time must be after start time",
    path: ["endedAt"],
  });

export const updateCreditScoreSchema = z.object({
  userId: z.string(),
  creditScore: z.string(),
  adminId: z.string(),
});
