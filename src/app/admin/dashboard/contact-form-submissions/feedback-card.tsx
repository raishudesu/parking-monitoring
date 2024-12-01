import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Mail } from "lucide-react";
import DeleteUserFeedbackDialog from "./delete-feedback-dialog";

type FeedbackCardProps = {
  id: string;
  name: string;
  email: string;
  message: string;
};

export default function FeedbackCard({
  id,
  name = "John Doe",
  email = "john@example.com",
  message = "Great product! I really enjoyed using it.",
}: FeedbackCardProps) {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-4">
        <div className="flex flex-row items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarFallback>
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <CardTitle className="text-md">{name}</CardTitle>
            <div className="flex items-center text-sm text-muted-foreground">
              <Mail className="mr-1 h-4 w-4" />
              {email}
            </div>
          </div>
        </div>
        <DeleteUserFeedbackDialog feedbackId={id} />

        {/* <div className="md:hidden">
          <DeleteUserFeedbackDialog feedbackId={id} />
        </div> */}
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{message}</p>
      </CardContent>
    </Card>
  );
}
