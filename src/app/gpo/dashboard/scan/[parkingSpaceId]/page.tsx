import { getParkingSpaceById } from "@/data-access/parking-spaces";
import DurationForm from "./duration-form";
import Link from "next/link";

const SubmitPage = async ({
  params,
}: {
  params: { parkingSpaceId: string };
}) => {
  const { parkingSpaceId } = params;

  const parkingSpace = await getParkingSpaceById(parkingSpaceId);

  if (!parkingSpace) {
    return (
      <div className="w-full h-full flex flex-col py-6 px-3 md:px-6">
        <div className="pb-6 flex flex-col gap-3">
          <div className="text-lg text-muted-foreground">
            Something went wrong.
          </div>
          <h1 className="scroll-m-20 text-4xl tracking-tight lg:text-5xl">
            Invalid Parking Space.
          </h1>
        </div>
        <div className="w-full h-full flex flex-col mt-6">
          <Link
            href={"/gpo/dashboard"}
            className="bg-primary rounded-xl px-4 py-2 text-primary-foreground text-center lg:self-start"
          >
            Go Back
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col py-6 px-3 md:px-6">
      <div className="pb-6 flex flex-col gap-3">
        <div className="text-lg text-muted-foreground">
          Start Parking Session
        </div>
        <h1 className="scroll-m-20 text-4xl tracking-tight lg:text-5xl">
          {parkingSpace?.name}
        </h1>
      </div>
      <div className="w-full h-full flex flex-col mt-6">
        <DurationForm
          parkingSpaceId={parkingSpaceId}
          parkingSpace={parkingSpace}
        />
      </div>
    </div>
  );
};

export default SubmitPage;
