import { getCreditScore } from "@/data-access/gpo-users";
import AvailableParkingSpaces from "./available-parking-spaces";
import CreditScore from "./credit-score";
import CurrentSession from "./current-session";
import SessionHistory from "./session-history";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  getAvailableSpacesUseCase,
  getUnavailableSpacesUseCase,
} from "@/use-cases/parking-spaces";
import { createClient } from "@/utils/supabase/server";

const GpoDashboardPage = async () => {
  const session = await getServerSession(authOptions);

  const creditScore = await getCreditScore(session?.user.id as string);
  const [availableParkingSpaces, unavailableParkingSpaces] = await Promise.all([
    getAvailableSpacesUseCase(),
    getUnavailableSpacesUseCase(),
  ]);

  // const supabase = createClient();

  return (
    <div className="w-full flex flex-col p-6">
      <div className="pb-6 flex flex-col gap-3">
        <div className="text-lg text-muted-foreground">Dashboard</div>
        <h1 className="scroll-m-20 text-4xl tracking-tight lg:text-5xl">
          Welcome! 🎉
        </h1>
      </div>

      <div className="w-full grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 w-full mt-6">
          <h2 className="text-muted-foreground scroll-m-20 font-semibold pb-2 text-xl tracking-tight transition-colors first:mt-0">
            My Sessions
          </h2>
          <div>
            <CurrentSession />
          </div>
          <div className="mt-6">
            <AvailableParkingSpaces
              availableParkingSpaces={availableParkingSpaces}
              unavailableParkingSpaces={unavailableParkingSpaces}
            />
          </div>
        </div>
        <div className="mt-6 w-full">
          <h2 className="text-muted-foreground scroll-m-20 font-semibold pb-2 text-xl tracking-tight transition-colors first:mt-0">
            Credit Score
          </h2>
          <CreditScore creditScore={creditScore?.creditScore as number} />
          <h2 className="mt-6 text-muted-foreground scroll-m-20 font-semibold pb-2 text-xl tracking-tight transition-colors first:mt-0">
            History
          </h2>
          <div className="overflow-y-scroll bg-card w-full border rounded-xl p-6">
            <SessionHistory />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GpoDashboardPage;
