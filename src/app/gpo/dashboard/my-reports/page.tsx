import { ReportList } from "./report-card";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUserBehaviorReportsUseCase } from "@/use-cases/driver-behavior-report";

const FeedbackPage = async () => {
  const session = await getServerSession(authOptions);
  const reports = await getUserBehaviorReportsUseCase(
    session?.user.id as string
  );
  return (
    <div className="w-full flex flex-col p-6">
      <div className="pb-6 flex flex-col gap-3">
        <div className="text-lg text-muted-foreground">Dashboard</div>
        <h1 className="text-primary scroll-m-20 text-4xl tracking-tight lg:text-5xl">
          My Reports
        </h1>
      </div>
      <ReportList reports={reports} />
    </div>
  );
};

export default FeedbackPage;
