import { getAllGpoSessionsUseCase } from "@/use-cases/gpo-sessions";
import { SessionData, SessionsTable } from "./sessions-table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

const SessionsPage = async () => {
  let gpoSessions: SessionData[] | null = null;
  let error: string | null = null;

  try {
    const fetchedGpoSessions = await getAllGpoSessionsUseCase();
    gpoSessions = fetchedGpoSessions as SessionData[];
  } catch (err) {
    console.error("Error fetching data:", err);
    error =
      "There was an error fetching the colleges data. Please try again later.";
  }

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
      {error ? (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : gpoSessions ? (
        <SessionsTable data={gpoSessions} />
      ) : (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>No Data</AlertTitle>
          <AlertDescription>
            No GPO sessions data available at the moment.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default SessionsPage;
