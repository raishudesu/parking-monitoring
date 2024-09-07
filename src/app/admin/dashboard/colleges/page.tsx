import { CollegesTable } from "./colleges-table";
import { getAllCollegesUseCase } from "@/use-cases/colleges";

const CollegePage = async () => {
  const colleges = await getAllCollegesUseCase();

  return (
    <div className="w-full flex flex-col p-6">
      <div className="pb-6 flex flex-col gap-3">
        <div className="text-lg text-muted-foreground">
          Administrator Dashboard
        </div>
        <h1 className="scroll-m-20 text-4xl tracking-tight lg:text-5xl">
          Colleges
        </h1>
      </div>
      <div className="mt-6">
        <CollegesTable data={colleges} />
      </div>
    </div>
  );
};

export default CollegePage;
