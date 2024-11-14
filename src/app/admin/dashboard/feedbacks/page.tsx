import { getAllUserFeedbackUseCase } from "@/use-cases/user-feedback";
import FeedbackCard from "./feedback-card";

const FeedbacksPage = async () => {
  const feedbacks = await getAllUserFeedbackUseCase();
  return (
    <div className="w-full flex flex-col p-6">
      <div className="pb-6 flex flex-col gap-3">
        <div className="text-lg text-muted-foreground">
          Administrator Dashboard
        </div>
        <h1 className="text-primary scroll-m-20 text-4xl tracking-tight lg:text-5xl">
          Feedbacks
        </h1>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {feedbacks.map(({ id, name, email, message }, index) => (
          <FeedbackCard
            id={id}
            name={name}
            email={email}
            message={message}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default FeedbacksPage;
