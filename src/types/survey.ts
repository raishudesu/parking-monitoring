// Interface for the raw survey response
export interface SurveyResponse {
  id: string;
  overallExperience: number;
  easeOfUse: string;
  realtimeFeatures: string;
  qrFunctionality: string;
  notificationFeedback: string;
  suggestions: string;
  likelyToRecommend: string;
  userId: string;
}

// Interface for the transformed survey data
export interface TransformedSurveyData {
  totalResponses: number;
  overallExperience: number;
  easeOfUse: Record<string, number>;
  realtimeFeatures: Record<string, number>;
  qrFunctionality: Record<string, number>;
  notifications: Record<string, number>;
  likelyToRecommend: Record<string, number>;
  suggestions: string[];
}

export type CategoryCounters = {
  easeOfUse: Record<string, number>;
  realtimeFeatures: Record<string, number>;
  qrFunctionality: Record<string, number>;
  notifications: Record<string, number>;
  likelyToRecommend: Record<string, number>;
};
