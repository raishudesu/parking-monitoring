import { AccountType } from "@prisma/client";

export type ProcessedBehaviorData = {
  accountType: AccountType;
  sessionCount: number;
  averageDuration: number;
};

export type AggregatedData = {
  totalSessions: number;
  totalDuration: number;
  sessionCount: number;
  averageDuration?: number; // Optional, will be calculated
};

// Define a  type for the aggregation mapping
export type AggregationMap = {
  [accountType: string]: AggregatedData; // Use string index for account types
};
