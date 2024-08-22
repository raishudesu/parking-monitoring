import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Fragment } from "react";

const userData = [
  {
    avatar: "/avatars/01.png",
    fallback: "CS",
    name: "CS1",
    email: "College of Sciences",
    points: "GPO-471",
    transactionType: "ENDPARK",
  },
  {
    avatar: "/avatars/01.png",
    fallback: "CS",
    name: "CS1",
    email: "College of Sciences",
    points: "GPO-471",
    transactionType: "ENDPARK",
  },
  {
    avatar: "/avatars/01.png",
    fallback: "CS",
    name: "CS1",
    email: "College of Sciences",
    points: "GPO-471",
    transactionType: "ENDPARK",
  },
  {
    avatar: "/avatars/01.png",
    fallback: "CS",
    name: "CS1",
    email: "College of Sciences",
    points: "GPO-471",
    transactionType: "ENDPARK",
  },
  {
    avatar: "/avatars/01.png",
    fallback: "CS",
    name: "CS1",
    email: "College of Sciences",
    points: "GPO-471",
    transactionType: "ENDPARK",
  },
  {
    avatar: "/avatars/01.png",
    fallback: "CS",
    name: "CS1",
    email: "College of Sciences",
    points: "GPO-471",
    transactionType: "ENDPARK",
  },
];

const RecentTransactions = () => {
  return (
    <div className="space-y-6">
      {userData.map((user, index) => (
        <Fragment key={index}>
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src={user.avatar} alt="Avatar" />
                <AvatarFallback>{user.fallback}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-bold leading-none text-primary">
                  {user.name}
                </p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <div
              className={`text-primary ml-12 mt-3 md:mt-0 md:ml-auto font-semibold text-sm`}
            >
              {user.points} ({user.transactionType})
            </div>
          </div>
          <Separator />
        </Fragment>
      ))}
      <div className="mt-6">
        <small className="text-muted-foreground">Show More</small>
      </div>
    </div>
  );
};

export default RecentTransactions;
