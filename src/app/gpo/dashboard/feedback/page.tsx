import React from "react";
import ParkingSystemSurvey from "./user-survey-form";
import { ScrollArea } from "@/components/ui/scroll-area";

const FeedbackPage = () => {
  return (
    <div className="w-full flex flex-col p-6">
      <div className="pb-6 flex flex-col gap-3">
        <div className="text-lg text-muted-foreground">Dashboard</div>
        <h1 className="text-primary scroll-m-20 text-4xl tracking-tight lg:text-5xl">
          Submit Feedback
        </h1>
      </div>
      {/* <FeedbackForm /> */}
      <ScrollArea>
        <ParkingSystemSurvey />
      </ScrollArea>
    </div>
  );
};

export default FeedbackPage;
