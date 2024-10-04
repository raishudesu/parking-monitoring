import React from "react";
import { getAllCollegesUseCase } from "@/use-cases/colleges";
import { AccountsTable, GPOAccountData } from "./accounts-table";
import { getAllGpoAccountsUseCase } from "@/use-cases/gpo-users";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { College } from "@prisma/client";

const AccountsPage = async () => {
  let gpoAccounts: GPOAccountData[] | null = null;
  let colleges: College[] | null = null;
  let error: string | null = null;

  try {
    const [fetchedAccounts, fetchedColleges] = await Promise.all([
      getAllGpoAccountsUseCase(),
      getAllCollegesUseCase(),
    ]);

    gpoAccounts = fetchedAccounts as GPOAccountData[];
    colleges = fetchedColleges as College[];

    // Ensure colleges is not null and all items have the correct shape
    // if (
    //   !colleges ||
    //   colleges.some((college) => !college.id || !college.collegeName)
    // ) {
    //   throw new Error("Invalid college data received");
    // }
  } catch (err) {
    console.error("Error fetching data:", err);
    error =
      "There was an error fetching the accounts data. Please try again later.";
  }

  return (
    <div className="w-full flex flex-col p-6">
      <div className="pb-6 flex flex-col gap-3">
        <div className="text-lg text-muted-foreground">
          Administrator Dashboard
        </div>
        <h1 className="scroll-m-20 text-4xl tracking-tight lg:text-5xl">
          Accounts
        </h1>
      </div>
      {error ? (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : gpoAccounts ? (
        <AccountsTable data={gpoAccounts} colleges={colleges as College[]} />
      ) : (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>No Data</AlertTitle>
          <AlertDescription>
            No accounts data available at the moment.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default AccountsPage;
