import { createAdminLog } from "@/data-access/admin-log";
import {
  deleteReportById,
  getAllBehaviorReports,
  getBehaviorReportById,
  getUserBehaviorReports,
  submitBehaviorReport,
  updateReportStatusById,
} from "@/data-access/driver-behavior-report";
import { driverBehaviorReportSchema } from "@/lib/zod";
import { ReportStatus } from "@prisma/client";
import { z } from "zod";

export const submitBehaviorReportUseCase = async (
  data: z.infer<typeof driverBehaviorReportSchema>
) => {
  const report = await submitBehaviorReport(data);

  return report;
};

export const getAllBehaviorReportsUseCase = async () => {
  const reports = await getAllBehaviorReports();

  return reports;
};

export const getUserBehaviorReportsUseCase = async (userId: string) => {
  const reports = await getUserBehaviorReports(userId);

  return reports;
};

export const getBehaviorReportByIdUseCase = async (reportId: string) => {
  const report = await getBehaviorReportById(reportId);

  return report;
};

export const updateReportStatusByIdUseCase = async (
  reportId: string,
  status: ReportStatus,
  adminId?: string
) => {
  const report = await updateReportStatusById(reportId, status, adminId);

  return report;
};

export const deleteReportByIdUseCase = async (
  reportId: string,
  adminId?: string
) => {
  const report = await deleteReportById(reportId);

  if (adminId) {
    await createAdminLog({
      action: "DELETE",
      table: "DRIVERBEHAVIORREPORT",
      adminId: adminId as string,
    });
  }

  return report;
};
