import { getGpoByIdUseCase } from "@/use-cases/gpo-users";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import UserDetails from "./user-details";
import { getAllCollegesUseCase } from "@/use-cases/colleges";

const AccountPage = async ({ params }: { params: Params }) => {
  const { id } = params;

  const user = await getGpoByIdUseCase(id);

  const colleges = await getAllCollegesUseCase();

  const userAssertion = {
    ...user,
    email: user.email as string,
    department: user.department as string,
    imageLink: user.imageLink as string,
    creditScore: user.creditScore as number,
    password: "",
  };
  return (
    <div className="w-full flex flex-col p-6">
      <div className="pb-6 flex flex-col gap-3">
        <div className="text-lg text-muted-foreground">
          Administrator Dashboard
        </div>
        <h1 className="text-primary scroll-m-20 text-4xl tracking-tight lg:text-5xl">
          Account Details
        </h1>
      </div>
      <UserDetails user={userAssertion} colleges={colleges} />
    </div>
  );
};

export default AccountPage;
