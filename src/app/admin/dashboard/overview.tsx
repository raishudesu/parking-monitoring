import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import Image from "next/image";
// import QRDialog from "./qr-dialog";
import { Button } from "@/components/ui/button";
import {
  BadgeCheck,
  CircleParking,
  ClipboardMinus,
  Unlink,
  Users,
} from "lucide-react";

const Overview = () => {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Parking Spaces
              </CardTitle>
              <CircleParking size={20} className="text-[#FE7D55]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">
                {/* +20.1% from last month */}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Gate Pass Owners
              </CardTitle>
              <Users size={20} className="text-[#FE7D55]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">120</div>
              <p className="text-xs text-muted-foreground">
                {/* +19% from last month */}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active GPO Accounts
              </CardTitle>
              <BadgeCheck size={20} className="text-[#FE7D55]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">120</div>
              <p className="text-xs text-muted-foreground">
                {/* +2 from last month */}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Survey Responses
              </CardTitle>
              <ClipboardMinus size={20} className="text-[#FE7D55]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">120</div>
              <p className="text-xs text-muted-foreground">
                {/* +2 from last month */}
              </p>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default Overview;
