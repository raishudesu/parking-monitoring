import { getUserBehaviorDataForAnalysisUseCase } from "@/use-cases/analytics";
import React from "react";
import UserBehaviorChart from "./user-behavior-chart";

const UserBehaviorAnalysis = async () => {
  const data = await getUserBehaviorDataForAnalysisUseCase();

  return <UserBehaviorChart data={data} />;
};

export default UserBehaviorAnalysis;
