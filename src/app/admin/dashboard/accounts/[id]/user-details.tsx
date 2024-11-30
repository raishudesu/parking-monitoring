"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarDays,
  CreditCard,
  GraduationCap,
  Mail,
  School,
  User as UserIcon,
} from "lucide-react";
import { AccountType, College } from "@prisma/client";
import AccountUpdateDialog from "../account-update-dialog";
import DeactivateBtn from "../deactivate-btn";
import ReactivateBtn from "../reactivate-btn";

// This would typically come from an API or database
export interface User {
  collegeName: {
    id: string;
    collegeName: string;
  } | null;
  id: string;
  gatePassNumber: string;
  email: string | null;
  accountType: AccountType;
  department: string | null;
  isVIP: boolean;
  isPWD: boolean;
  imageLink: string | null;
  creditScore: number | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

type UserUpdate = {
  collegeName: {
    id: string;
    collegeName: string;
  } | null;
  id: string;
  gatePassNumber: string;
  email: string;
  password: string;
  accountType: "FACULTY" | "STUDENT" | "STAFF";
  collegeId: string | null;
  isVIP: boolean;
  isPWD: boolean;
  department?: string | undefined;
  imageLink?: string | undefined;
  creditScore?: number | undefined;
  isActive?: boolean | undefined;
  createdAt: Date;
  updatedAt: Date;
};

export default function UserDetails({
  user,
  colleges,
}: {
  user: UserUpdate;
  colleges: College[] | null;
}) {
  return (
    <div className="w-full mx-auto p-4">
      <Card className="mx-auto">
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Avatar className="w-32 h-32">
              <AvatarImage
                src={user.imageLink || "/placeholder.svg?height=128&width=128"}
                alt={user.email || "User"}
              />
              <AvatarFallback>
                {/* {user.email ? user.accountType : "U"} */}
                GPO
              </AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <CardTitle className="text-xl md:text-3xl font-bold ">
                <span className="break-all">{user.email || "No Email"}</span>
              </CardTitle>
              <p className="text-xl text-muted-foreground">
                {user.accountType}
              </p>
              <div className="flex justify-center sm:justify-start space-x-2 mt-2">
                <Badge variant={user.isActive ? "default" : "destructive"}>
                  {user.isActive ? "Active" : "Inactive"}
                </Badge>
                {user.isVIP && <Badge variant="secondary">VIP</Badge>}
                {user.isPWD && <Badge variant="secondary">PWD</Badge>}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="personal" className="mt-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="academic">Academic Info</TabsTrigger>
            </TabsList>
            <TabsContent value="personal" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 break-all">
                <InfoItem icon={UserIcon} label="ID" value={user.id} />
                <InfoItem
                  icon={CreditCard}
                  label="Gate Pass Number"
                  value={user.gatePassNumber}
                />
                <InfoItem icon={Mail} label="Email" value={user.email} />
                <InfoItem
                  icon={CalendarDays}
                  label="Created At"
                  value={user.createdAt.toLocaleDateString()}
                />
                <InfoItem
                  icon={CalendarDays}
                  label="Updated At"
                  value={user.updatedAt.toLocaleDateString()}
                />
              </div>
            </TabsContent>
            <TabsContent value="academic" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoItem
                  icon={School}
                  label="College"
                  value={user.collegeName?.collegeName}
                />
                <InfoItem
                  icon={GraduationCap}
                  label="Department"
                  value={user.department}
                />
                <InfoItem
                  icon={CreditCard}
                  label="Credit Score"
                  value={user.creditScore?.toString()}
                />
              </div>
            </TabsContent>
          </Tabs>
          <div className="mt-6 flex md:justify-end">
            {/* <Button onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? "Save Changes" : "Edit Profile"}
            </Button> */}
            <div className="flex gap-2">
              <AccountUpdateDialog
                accountId={user.id}
                data={user}
                colleges={colleges}
              />
              {user.isActive ? (
                <DeactivateBtn accountId={user.id} />
              ) : (
                <ReactivateBtn accountId={user.id} />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string | undefined | null;
}) {
  return (
    <div className="flex items-center space-x-2">
      <Icon className="w-5 h-5 text-muted-foreground" />
      <div>
        <h3 className="font-semibold">{label}</h3>
        <p className="text-muted-foreground">{value || "N/A"}</p>
      </div>
    </div>
  );
}
