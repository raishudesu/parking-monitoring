import { getAllGpoViolationsUseCase } from "@/use-cases/gpo-violations";
import { ViolationsTable } from "./violations-table";

const ViolationsPage = async () => {
  const violations = await getAllGpoViolationsUseCase();

  return (
    <div className="w-full flex flex-col py-6 px-3 md:px-6">
      <div className="pb-6 flex flex-col gap-3">
        <div className="text-lg text-muted-foreground">
          Administrator Dashboard
        </div>
        <h1 className="scroll-m-20 text-4xl tracking-tight lg:text-5xl">
          Violations ⚠️
        </h1>
      </div>

      <div className="mt-6">
        <ViolationsTable data={violations} />
      </div>
    </div>
  );
};

export default ViolationsPage;
