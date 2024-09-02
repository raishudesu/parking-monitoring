import { getAllGpoSessionsUseCase } from "@/use-cases/gpo-sessions";
import { SessionsTable } from "./sessions-table";

const SessionsPage = async () => {
  const gpoSessions = await getAllGpoSessionsUseCase();

  return (
    <div className="w-full flex flex-col p-6">
      <div className="pb-6 flex flex-col gap-3">
        <div className="text-lg text-muted-foreground">
          Administrator Dashboard
        </div>
        <h1 className="scroll-m-20 text-4xl tracking-tight lg:text-5xl">
          Sessions
        </h1>
      </div>
      <div className="mt-6">
        <SessionsTable data={gpoSessions} />
      </div>
    </div>
  );
};

export default SessionsPage;
