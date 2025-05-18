import React, { Suspense } from "react";
import { getAllCollegesUseCase } from "@/use-cases/colleges";
import { AccountsTable, GPOAccountData } from "./accounts-table";
import { getAllGpoAccountsUseCase } from "@/use-cases/gpo-users";
import { AccountType, College } from "@prisma/client";
import LoadingTable from "@/components/loading-table";

const AccountsTableWithData = async ({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    gatePassNumber?: string;
    email?: string;
    accountType?: AccountType;
  }>;
}) => {
  const awaitedParams = await searchParams;
  const currentPage = Number(awaitedParams.page) || 1;
  const pageSize = 10;
  const gatePassNumberFilter = awaitedParams.gatePassNumber || "";
  const emailFilter = awaitedParams.email || undefined;
  const accountTypeFilter = awaitedParams.accountType || undefined;

  const [fetchedAccounts, fetchedColleges] = await Promise.all([
    getAllGpoAccountsUseCase({
      page: currentPage,
      limit: pageSize,
      gpoNumberFilter: gatePassNumberFilter,
      emailFilter,
      accountTypeFilter,
    }),
    getAllCollegesUseCase(),
  ]);

  return (
    <AccountsTable
      data={fetchedAccounts.data}
      colleges={fetchedColleges as College[]}
      totalCount={fetchedAccounts.totalCount}
      currentPage={currentPage}
      pageCount={fetchedAccounts.pageCount}
    />
  );
};

const AccountsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    gatePassNumber?: string;
    email?: string;
    accountType?: AccountType;
  }>;
}) => {
  return (
    <div className="w-full flex flex-col p-6">
      <div className="pb-6 flex flex-col gap-3">
        <div className="text-lg text-muted-foreground">
          Administrator Dashboard
        </div>
        <h1 className="text-primary scroll-m-20 text-4xl tracking-tight lg:text-5xl">
          Gate Pass Owners
        </h1>
      </div>
      <Suspense fallback={<LoadingTable />}>
        <AccountsTableWithData searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default AccountsPage;
