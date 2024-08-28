import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  getAvailableSpacesUseCase,
  getUnavailableSpacesUseCase,
} from "@/use-cases/parking-spaces";
import { CircleParking } from "lucide-react";

const AvailableParkingSpaces = async () => {
  const availableParkingSpaces = await getAvailableSpacesUseCase();

  const unavailableParkingSpaces = await getUnavailableSpacesUseCase();

  return (
    <>
      <div className="w-full h-full gap-4">
        <small className="text-green-500 font-bold">
          Available Parking Spaces
        </small>
        <Tabs defaultValue="overview" className="w-full space-y-4">
          <TabsContent value="overview" className="w-full space-y-4">
            <div className="w-full grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {availableParkingSpaces.length === 0 ? (
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-md font-medium">
                      No available parking spaces.
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mt-6 text-xs text-muted-foreground">
                      Try again later!
                    </p>
                  </CardContent>
                </Card>
              ) : (
                availableParkingSpaces.map(
                  ({ id, name, description, currCapacity, maxCapacity }) => (
                    <Card key={id}>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-lg font-bold">
                          {name}
                        </CardTitle>
                        <CircleParking size={20} className="text-primary" />
                      </CardHeader>
                      <CardContent>
                        <div className="mt-3 text-3xl text-green-500 font-bold">
                          {currCapacity}/{maxCapacity}
                        </div>
                        <p className="mt-6 text-xs text-muted-foreground">
                          {description}
                        </p>
                      </CardContent>
                    </Card>
                  )
                )
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <div className="mt-6 w-full h-full gap-4 ">
        <small className="text-destructive font-bold">
          Unavailable Parking Spaces
        </small>
        <Tabs defaultValue="overview" className="w-full space-y-4">
          <TabsContent value="overview" className="w-full space-y-4">
            <div className="w-full grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {unavailableParkingSpaces.length === 0 ? (
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-md font-medium">
                      No unavailable parking spaces.
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mt-6 text-xs text-muted-foreground">
                      Happy parking!
                    </p>
                  </CardContent>
                </Card>
              ) : (
                unavailableParkingSpaces.map(
                  ({ id, name, description, currCapacity, maxCapacity }) => (
                    <Card key={id}>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-lg font-bold">
                          {name}
                        </CardTitle>
                        <CircleParking size={20} className="text-primary" />
                      </CardHeader>
                      <CardContent>
                        <div className="mt-3 text-3xl text-red-500 font-bold">
                          {currCapacity}/{maxCapacity}
                        </div>
                        <p className="mt-6 text-xs text-muted-foreground">
                          {description}
                        </p>
                      </CardContent>
                    </Card>
                  )
                )
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default AvailableParkingSpaces;
