import {getCreditScore} from "@/data-access/gpo-users";
import AvailableParkingSpaces from "./available-parking-spaces";
import CreditScore from "./credit-score";
import CurrentSession from "./current-session";
import SessionHistory from "./session-history";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import {getAvailableSpacesUseCase, getUnavailableSpacesUseCase,} from "@/use-cases/parking-spaces";

const GpoDashboardPage = async () => {
    const session = await getServerSession(authOptions);

    const [creditScore, availableParkingSpaces, unavailableParkingSpaces] =
        await Promise.all([
            getCreditScore(session?.user.id as string),
            getAvailableSpacesUseCase(),
            getUnavailableSpacesUseCase(),
        ]);

    return (
        <div className="w-full flex flex-col p-6">
            <div className="pb-6 flex flex-col gap-3">
                <div className="text-lg text-muted-foreground">Dashboard</div>
                <h1 className="text-primary scroll-m-20 text-4xl tracking-tight lg:text-5xl">
                    Welcome! 🎉
                </h1>
            </div>

            <div className="w-full grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 w-full">
                    <CurrentSession/>
                    <div className="mt-6">
                        <AvailableParkingSpaces
                            availableParkingSpaces={availableParkingSpaces}
                            unavailableParkingSpaces={unavailableParkingSpaces}
                        />
                    </div>
                </div>
                <div className="mt-6 w-full">
                    <h2 className="text-primary scroll-m-20 font-semibold pb-2 text-xl tracking-tight transition-colors first:mt-0">
                        Credit Score
                    </h2>
                    <CreditScore creditScore={creditScore?.creditScore as number}/>
                    <h2 className="mt-6 text-primary scroll-m-20 font-semibold pb-2 text-xl tracking-tight transition-colors first:mt-0">
                        History
                    </h2>
                    <small className="text-sm text-muted-foreground">
                        This shows your 10 recent parking sessions.
                    </small>
                    <div className="overflow-y-scroll bg-card w-full border rounded-xl p-6">
                        <SessionHistory/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GpoDashboardPage;
