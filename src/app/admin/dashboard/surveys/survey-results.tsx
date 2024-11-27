"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { StarRating } from "@/app/gpo/dashboard/feedback/star-rating";
import { SurveyResponse, TransformedSurveyData } from "@/types/survey";

const ResultSection = ({
  title,
  data,
}: {
  title: string;
  data: Record<string, number>;
}) => (
  <div className="space-y-2">
    <h3 className="text-lg font-semibold">{title}</h3>
    {Object.entries(data).map(([key, value]) => (
      <div key={key} className="flex items-center justify-between">
        <span className="text-sm">{key}</span>
        <div className="flex items-center space-x-2 w-2/3">
          <Progress value={value} className="w-full" />
          <span className="text-sm font-medium">{value}%</span>
        </div>
      </div>
    ))}
  </div>
);

export const SurveyResults = ({
  sampleData,
}: {
  sampleData: TransformedSurveyData;
}) => {
  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          System Survey Results
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Total Responses: {sampleData.totalResponses}
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Overall Experience</h3>
          <div className="flex items-center justify-between">
            <StarRating
              rating={Math.round(sampleData.overallExperience)}
              onRatingChange={() => {}}
            />
            <span className="text-sm font-medium">
              {sampleData.overallExperience.toFixed(1)} / 5
            </span>
          </div>
        </div>

        <ResultSection title="Ease of Use" data={sampleData.easeOfUse} />
        <ResultSection
          title="Real-time Features"
          data={sampleData.realtimeFeatures}
        />
        <ResultSection
          title="QR Functionality"
          data={sampleData.qrFunctionality}
        />
        <ResultSection title="Notifications" data={sampleData.notifications} />
        <ResultSection
          title="Likely to Recommend"
          data={sampleData.likelyToRecommend}
        />

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Top Suggestions</h3>
          <ul className="list-disc pl-5 space-y-1">
            {sampleData.suggestions.map((suggestion, index) => (
              <li key={index} className="text-sm">
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
