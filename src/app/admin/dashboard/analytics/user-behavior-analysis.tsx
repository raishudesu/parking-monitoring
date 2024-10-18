import { getUserBehaviorDataUseCase } from "@/use-cases/analytics";
import React from "react";
import UserBehaviorChart from "./user-behavior-chart";

const UserBehaviorAnalysis = async () => {
  const data = await getUserBehaviorDataUseCase();

  return <UserBehaviorChart data={data} />;
};

export default UserBehaviorAnalysis;
