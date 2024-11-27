import { getAllSurveysUseCase } from "@/use-cases/user-survey";
import { SurveyResults } from "./survey-results";

const FeedbacksPage = async () => {
  const surveys = await getAllSurveysUseCase();

  return (
    <div className="w-full flex flex-col p-6">
      <div className="pb-6 flex flex-col gap-3">
        <div className="text-lg text-muted-foreground">
          Administrator Dashboard
        </div>
        <h1 className="text-primary scroll-m-20 text-4xl tracking-tight lg:text-5xl">
          Survey Results
        </h1>
      </div>
      {/* <div className=" gap-6"> */}
      <SurveyResults sampleData={surveys} />
      {/* </div> */}
    </div>
  );
};

export default FeedbacksPage;
