export type Difficulty = 'beginner' | 'advanced' | 'expert';

export type IndicatorType = 'inflation' | 'gdp_growth' | 'unemployment' | 'exchange_rate';

export interface Indicator {
  type: IndicatorType;
  name: string;
  value: number;
  history: number[];
  target?: number;
  unit: string;
  description: string;
}

export interface GameState {
  round: number;
  difficulty: Difficulty;
  indicators: Record<IndicatorType, Indicator>;
  score: number;
  history: {
    round: number;
    decision: PlayerDecision;
    indicators: Record<IndicatorType, number>; // Snapshot
  }[];
  currentScenario: Scenario;
  isGameOver: boolean;
  feedback: string | null;
}

export interface Scenario {
  id: string;
  title: string;
  newsFlash: NewsItem[];
  economicContext: string;
  // Hidden modifiers for the simulation
  inflationPressure: number;
  growthMomentum: number;
}

export interface NewsItem {
  id: string;
  headline: string;
  source: string; // e.g., "Financial Times", "Reuters", "Bloomberg"
  sentiment: 'positive' | 'negative' | 'neutral';
}

export interface PlayerDecision {
  interestRate?: 'raise' | 'hold' | 'lower' | null;
  openMarket?: 'buy' | 'sell' | 'none' | null;
  standingFacility?: 'emergency_lending' | 'deposit_facility' | 'standard' | null;
  minimumReserve?: 'increase' | 'decrease' | 'hold' | null;
  argument?: string; // ID of the argument selected
}

export interface CouncilMember {
  id: string;
  name: string;
  role: string;
  type: 'hawk' | 'dove' | 'centrist';
  avatarUrl?: string;
  approval: number; // 0-100
}
