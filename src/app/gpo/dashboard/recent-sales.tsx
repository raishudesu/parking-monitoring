import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const data = [
  {
    fallback: "OM",
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
  },
  {
    fallback: "JL",
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
  },
  {
    fallback: "IN",
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
  },
  {
    fallback: "WK",
    name: "William Kim",
    email: "will@email.com",
  },
  {
    fallback: "SD",
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
  },
];

export function RecentSales() {
  return (
    <div className="w-full space-y-8">
      {data.map(({ fallback, name, email }, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>{fallback}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{name}</p>
            <p className="text-sm text-muted-foreground">{email}</p>
          </div>
          <div className="ml-auto font-medium text-green-500">+10 points</div>
        </div>
      ))}
    </div>
  );
}
