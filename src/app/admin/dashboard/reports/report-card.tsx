"use client";

import { format } from "date-fns";
import { AlertCircle, CheckCircle2, CircleX, Mail, User } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ReportStatus } from "@prisma/client";
import { useRouter } from "next/navigation";
import { ReportType as ReportTypePrisma } from "@prisma/client";

type ReportType = ReportTypePrisma;

interface Report {
  reportedByAccount: {
    id: string;
    email: string | null;
  };
  images: {
    id: string;
    path: string;
    url: string;
    reportId: string;
    uploadedAt: Date;
  }[];
  parkingSpace: {
    name: string;
  } | null;
  id: string;
  reportedByAccountId: string;
  parkingSpaceId: string | null;
  reportType: ReportType;
  otherDescription: string | null;
  createdAt: Date;
  resolvedAt: Date | null;
  resolvedByAdminId: string | null;
  status: ReportStatus;
}

interface ReportCard {
  id: string;
  reportedByAccount: {
    id: string;
    email: string | null;
  };
  status: ReportStatus;
  reportType: ReportType;
  createdAt: Date;
}

const reportTypeLabels: Record<ReportType, string> = {
  UNAUTHORIZED_PARKING: "Unauthorized Parking (PWD, VIP, Reserved)",
  RECKLESS_DRIVING: "Reckless Driving",
  IMPROPER_PARKING: "Improper Parking",
  DOUBLE_PARKING: "Double Parking",
  NO_GATE_PASS: "No Gate Pass",
  WRONG_PARKING_TYPE: "Wrong Parking Type",
  VEHICLE_ABANDONMENT: "Vehicle Abandonment",
  VANDALISM: "Vandalism",
  OTHER: "Other",
};

const statusConfig: Record<
  ReportStatus,
  { label: string; color: string; icon: React.ReactNode }
> = {
  PENDING: {
    label: "Pending",
    color: "bg-yellow-500",
    icon: <AlertCircle className="h-4 w-4" />,
  },
  RESOLVED: {
    label: "Resolved",
    color: "bg-green-500",
    icon: <CheckCircle2 className="h-4 w-4" />,
  },
  DISMISSED: {
    label: "Dismissed",
    color: "bg-destructive",
    icon: <CircleX className="h-4 w-4" />,
  },
};

interface ReportCardProps {
  report: ReportCard;
}

export function ReportCard({ report }: ReportCardProps) {
  const status = statusConfig[report.status];

  const router = useRouter();

  return (
    <Card
      className="w-full cursor-pointer hover:border-primary"
      onClick={() => router.push(`/admin/dashboard/reports/${report.id}`)}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl font-bold">
              {reportTypeLabels[report.reportType]}
            </CardTitle>
            <CardDescription>
              Reported on {format(report.createdAt, "PPP 'at' p")}
            </CardDescription>
          </div>
          <Badge
            variant="secondary"
            className={`${status.color} hover:bg-muted-foreground text-white flex gap-1 items-center`}
          >
            {status.icon}
            {status.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>ID: {report.reportedByAccount.id}</span>
          </div>
          {report.reportedByAccount.email && (
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>{report.reportedByAccount.email}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Example usage with multiple reports
export function ReportList({ reports }: { reports: ReportCard[] }) {
  return (
    <>
      {reports.map((report) => (
        <ReportCard key={report.id} report={report} />
      ))}
    </>
  );
}
