import FeedbackForm from "@/components/feedback-form";
import UserSurveyForm from "@/components/userSurveryForm";
import React from "react";

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
      <UserSurveyForm />
    </div>
  );
};

export default FeedbackPage;
