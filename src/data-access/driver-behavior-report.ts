import prisma from "@/lib/db";
import { driverBehaviorReportSchema } from "@/lib/zod";
import { ReportStatus } from "@prisma/client";
import { z } from "zod";

export const submitBehaviorReport = async (
  data: z.infer<typeof driverBehaviorReportSchema>
) => {
  const { images, ...reportData } = data;

  const report = await prisma.driverBehaviorReport.create({
    data: {
      ...reportData,
      images: {
        create: images.map((image) => ({
          url: image.url,
          path: image.path,
        })),
      },
    },
  });

  return report;
};

export const getAllBehaviorReports = async () => {
  const reports = await prisma.driverBehaviorReport.findMany({
    select: {
      id: true,
      status: true,
      reportType: true,
      createdAt: true,
      reportedByAccount: {
        select: {
          id: true,
          email: true,
        },
      },
    },
  });

  return reports;
};

export const getUserBehaviorReports = async (userId: string) => {
  const reports = await prisma.driverBehaviorReport.findMany({
    where: {
      reportedByAccountId: userId,
    },
    select: {
      id: true,
      status: true,
      reportType: true,
      createdAt: true,
      reportedByAccount: {
        select: {
          id: true,
          email: true,
        },
      },
      images: true,
    },
  });

  return reports;
};

export const getBehaviorReportById = async (reportId: string) => {
  const report = await prisma.driverBehaviorReport.findFirst({
    where: {
      id: reportId,
    },
    include: {
      reportedByAccount: {
        select: {
          id: true,
          email: true,
        },
      },
      resolvedByAdmin: {
        select: {
          firstName: true,
        },
      },
      images: true,
      parkingSpace: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return report;
};

export const updateReportStatusById = async (
  reportId: string,
  status: ReportStatus,
  adminId?: string
) => {
  const report = await prisma.driverBehaviorReport.update({
    where: {
      id: reportId,
    },
    data: {
      status,
      resolvedByAdminId: status === "RESOLVED" ? adminId : null,
      resolvedAt: status === "RESOLVED" ? new Date() : null,
    },
  });

  return report;
};

export const deleteReportById = async (reportId: string) => {
  const report = await prisma.driverBehaviorReport.delete({
    where: {
      id: reportId,
    },
  });

  return report;
};
