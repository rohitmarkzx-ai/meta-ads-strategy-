
export interface Competitor {
  name: string;
  products: string;
  audience: string;
  adStyle: string;
}

export interface Trend {
  insight: string;
  explanation: string;
}

export interface Audience {
  location: string;
  ageRanges: string[];
  gender: string;
  languages: string[];
  interests: string[];
  behaviors: string[];
  rationale: string;
}

export interface Creative {
  direction: string;
  hook: string;
  adCopy: string;
  cta: string;
  visualSuggestion: string;
  trendingStyles?: string;
}

export interface PlacementBudget {
  placements: string;
  dailyBudgetINR: number;
  scalingStrategy: string;
}

export interface ActionPlan {
  days1_3: string;
  days4_5: string;
  days6_7: string;
}

export interface ProTip {
  tip: string;
}

export interface Report {
  competitorResearch: Competitor[];
  trendInsights: Trend[];
  targetAudience: Audience;
  creativeRecommendations: Creative[];
  placementsAndBudget: PlacementBudget;
  actionPlan: ActionPlan;
  proTips: ProTip[];
}
