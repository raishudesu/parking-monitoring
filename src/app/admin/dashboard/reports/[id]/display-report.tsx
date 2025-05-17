"use client";

import { format } from "date-fns";
import {
  AlertCircle,
  CheckCircle2,
  CircleX,
  Clock,
  Mail,
  User,
} from "lucide-react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ReportStatus } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useServerAction } from "zsa-react";
import { updateReportStatusAction } from "./actions";
import { toast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import DeleteReportDialog from "@/app/gpo/dashboard/my-reports/delete-report-dialog";

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
  id: string;
  reportedByAccountId: string;
  parkingSpaceId: string | null;
  reportType: ReportType;
  otherDescription: string | null;
  createdAt: Date;
  resolvedAt: Date | null;
  resolvedByAdminId: string | null;
  status: ReportStatus;
  parkingSpace: {
    id: string;
    name: string;
  } | null;
  resolvedByAdmin: {
    firstName: string;
  } | null;
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
  report: Report;
}

export function DisplayReport({ report }: ReportCardProps) {
  const [currentStatus, setCurrentStatus] = useState<ReportStatus>(
    report.status
  );
  const status = statusConfig[currentStatus];

  const { isPending, execute } = useServerAction(updateReportStatusAction);
  const session = useSession();

  const handleStatusChange = async (newStatus: ReportStatus) => {
    setCurrentStatus(newStatus);

    try {
      const [data, err] = await execute({
        reportId: report.id,
        reportStatus: newStatus,
        adminId: session.data?.user.id as string,
      });

      if (err) {
        toast({
          title: "Oops... Something went wrong",
          description: "Try again later",
          variant: "destructive",
        });

        console.error(err);
        return;
      }

      toast({
        title: "Report Status Updated",
      });
    } catch (error) {
      toast({
        title: "Oops... Something went wrong",
        description: "Try again later",
        variant: "destructive",
      });

      console.error(error);
    }
  };

  return (
    <Card className="w-full">
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <span className="sr-only">Open status menu</span>
                <Badge
                  variant="secondary"
                  className={`${status.color} hover:bg-muted-foreground text-white flex gap-1 items-center`}
                >
                  {status.icon}
                  {status.label}
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              {Object.entries(statusConfig).map(([key, value]) => (
                <DropdownMenuItem
                  key={key}
                  onClick={() => handleStatusChange(key as ReportStatus)}
                  className="flex items-center gap-2"
                >
                  <div className={`${value.color} p-1 rounded`}>
                    {value.icon}
                  </div>
                  {value.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="break-all flex flex-col md:flex-row gap-2 text-sm text-muted-foreground">
          <div className="flex gap-2 items-center">
            <User className="h-4 w-4" />
            <span>ID: {report.reportedByAccount.id}</span>
          </div>
          {report.reportedByAccount.email && (
            <div className="flex gap-2 items-center">
              <Mail className="h-4 w-4" />
              <span>{report.reportedByAccount.email}</span>
            </div>
          )}
        </div>

        {report.parkingSpaceId && (
          <div className="text-sm">
            <span className="font-bold text-primary">Parking Space:</span>{" "}
            {report.parkingSpace?.name}
          </div>
        )}

        {report.otherDescription && (
          <div className="text-sm">
            <span className="font-bold text-primary">Description:</span>{" "}
            {report.otherDescription}
          </div>
        )}

        {report.images.length > 0 && (
          <Carousel className="w-full max-w-xs mx-auto">
            <CarouselContent>
              {report.images.map((image) => (
                <CarouselItem key={image.id}>
                  <div className="relative aspect-square">
                    <Image
                      src={image.url}
                      alt={`Report image from ${format(
                        image.uploadedAt,
                        "PP"
                      )}`}
                      fill
                      className="rounded-lg object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}

        {report.resolvedAt && (
          <div className="text-sm text-muted-foreground">
            <span className="font-medium">Resolved:</span>{" "}
            {format(report.resolvedAt, "PPP 'at' p")}
            {report.resolvedByAdmin && (
              <>
                {" "}
                by Admin:{" "}
                <span className="text-primary font-bold">
                  {report.resolvedByAdmin.firstName}
                </span>
              </>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <DeleteReportDialog
          reportId={report.id}
          adminId={session.data?.user.id as string}
        />
      </CardFooter>
    </Card>
  );
}
