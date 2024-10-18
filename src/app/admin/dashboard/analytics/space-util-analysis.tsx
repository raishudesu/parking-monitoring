import { getSpaceUtilDataUseCase } from "@/use-cases/analytics";
import React from "react";
import SpaceUtilizationChart from "./space-util-chart";

const SpaceUtilAnalysis = async () => {
  const data = await getSpaceUtilDataUseCase();

  return <SpaceUtilizationChart data={data} />;
};

export default SpaceUtilAnalysis;
