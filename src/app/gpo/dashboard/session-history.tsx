import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {Separator} from "@/components/ui/separator";
import {authOptions} from "@/lib/auth";
import {getGpoSessionsByIdUseCase} from "@/use-cases/gpo-sessions";
import {getServerSession} from "next-auth";
import {Fragment} from "react";

const SessionHistory = async () => {
    const session = await getServerSession(authOptions);
    const sessionHistory = await getGpoSessionsByIdUseCase(
        session?.user.id as string
    );

    return (
        <div className="max-h-80 space-y-6">
            {sessionHistory.map(({status, parkingSpace}, index) => (
                <Fragment key={index}>
                    <div className="flex flex-col md:flex-row md:items-center">
                        <div className="flex items-center">
                            <Avatar className="h-9 w-9">
                                <AvatarFallback>{parkingSpace.name.slice(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div className="ml-4 space-y-1">
                                <p className="text-sm font-bold leading-none text-primary">
                                    {parkingSpace.name}
                                </p>
                            </div>
                        </div>
                        <div
                            className={`text-primary ml-12 mt-3 md:mt-0 md:ml-auto font-semibold text-sm`}
                        >
                            {status}
                        </div>
                    </div>
                    <Separator/>
                </Fragment>
            ))}
            <div className="mt-6">
                <small className="text-muted-foreground">Show More</small>
            </div>
        </div>
    );
};

export default SessionHistory;
