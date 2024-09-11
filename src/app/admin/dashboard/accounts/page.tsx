import { getAllCollegesUseCase } from "@/use-cases/colleges";
import { AccountsTable, GPOAccountData } from "./accounts-table";
import { getAllGpoAccountsUseCase } from "@/use-cases/gpo-users";

const AccountsPage = async () => {
  const [gpoAccounts, colleges] = await Promise.all([
    getAllGpoAccountsUseCase(),
    getAllCollegesUseCase(),
  ]);

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
        <AccountsTable
          data={gpoAccounts as GPOAccountData[]}
          colleges={colleges}
        />
      </div>
    </div>
  );
};

export default AccountsPage;
