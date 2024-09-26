import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  getActiveGpoCountUseCase,
  getGpoCountUseCase,
} from "@/use-cases/gpo-users";
import { getParkingSpaceCountUseCase } from "@/use-cases/parking-spaces";
import { BadgeCheck, CircleParking, ClipboardMinus, Users } from "lucide-react";

const Overview = async () => {
  const [parkingSpaceCount, gpoCount, activeGpoCount] = await Promise.all([
    getParkingSpaceCountUseCase(),
    getGpoCountUseCase(),
    getActiveGpoCountUseCase(),
  ]);

  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Parking Spaces
              </CardTitle>
              <CircleParking size={20} className="text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{parkingSpaceCount}</div>
              <p className="text-xs text-muted-foreground">
                {/* +20.1% from last month */}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                GPO Accounts
              </CardTitle>
              <Users size={20} className="text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{gpoCount}</div>
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
              <BadgeCheck size={20} className="text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeGpoCount}</div>
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
              <ClipboardMinus size={20} className="text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Not available</div>
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
