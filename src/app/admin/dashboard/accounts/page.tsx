import { AccountsTable, GPOAccountData } from "./accounts-table";
import { getAllGpoAccountsUseCase } from "@/use-cases/gpo-users";

const AccountsPage = async () => {
  const gpoAccounts = await getAllGpoAccountsUseCase();

  return (
    <div className="w-full flex flex-col p-6">
      <div className="pb-6 flex flex-col gap-3">
        <div className="text-lg text-muted-foreground">
          Administrator Dashboard
        </div>
        <h1 className="scroll-m-20 text-4xl tracking-tight lg:text-5xl">
          Accounts 🧍
        </h1>
      </div>
      <div>
        <AccountsTable data={gpoAccounts as GPOAccountData[]} />
      </div>
    </div>
  );
};

export default AccountsPage;
