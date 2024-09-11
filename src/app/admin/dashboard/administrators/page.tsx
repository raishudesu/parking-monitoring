import { getAdminsUseCase } from "@/use-cases/admin";
import { AdminsTable } from "./admins-table";

const AdministratorsPage = async () => {
  const admins = await getAdminsUseCase();

  return (
    <div className="w-full flex flex-col p-6">
      <div className="pb-6 flex flex-col gap-3">
        <div className="text-lg text-muted-foreground">
          Administrator Dashboard
        </div>
        <h1 className="scroll-m-20 text-4xl tracking-tight lg:text-5xl">
          Administrators
        </h1>
      </div>
      <div className="mt-6 ">
        <AdminsTable data={admins} />
      </div>
    </div>
  );
};

export default AdministratorsPage;
