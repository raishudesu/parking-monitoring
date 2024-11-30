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
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type ReportType =
  | "UNAUTHORIZED_PARKING"
  | "BLOCKING_OTHER_VEHICLES"
  | "PROLONGED_PARKING"
  | "RECKLESS_DRIVING"
  | "OTHER";

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
  UNAUTHORIZED_PARKING: "Unauthorized Parking",
  BLOCKING_OTHER_VEHICLES: "Blocking Other Vehicles",
  PROLONGED_PARKING: "Prolonged Parking",
  RECKLESS_DRIVING: "Reckless Driving",
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

  return (
    <Card className="w-full cursor-pointer hover:border-primary">
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
  const router = useRouter();

  return (
    <>
      <Button
        className="self-start"
        onClick={() => router.push("/gpo/dashboard/submit-report")}
      >
        Submit a Report
      </Button>
      <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <ReportCard key={report.id} report={report} />
        ))}
      </div>
    </>
  );
}
