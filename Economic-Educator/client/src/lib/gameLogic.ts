import { GameState, Indicator, PlayerDecision, Scenario } from './types';

// Initial constants
const TARGET_INFLATION = 2.0;
const TARGET_GROWTH = 1.5;

export function createInitialState(difficulty: 'beginner' | 'advanced' | 'expert', scenario: Scenario): GameState {
  // Generate difficulty-specific initial histories
  const baseInflation = 1.8 + (scenario.inflationPressure * 0.3);
  const baseGrowth = 1.0 + (scenario.growthMomentum * 0.2);
  
  let inflationHistory: number[];
  let growthHistory: number[];
  let unemploymentHistory: number[];
  
  if (difficulty === 'beginner') {
    // Beginner: stable progression
    inflationHistory = [baseInflation, baseInflation + 0.1, baseInflation + 0.2, baseInflation + 0.3];
    growthHistory = [baseGrowth, baseGrowth + 0.1, baseGrowth + 0.2, baseGrowth + 0.1];
    unemploymentHistory = [7.0, 6.9, 6.8, 6.7];
  } else if (difficulty === 'advanced') {
    // Advanced: moderate volatility
    inflationHistory = [baseInflation - 0.2, baseInflation + 0.1, baseInflation + 0.4, baseInflation + 0.6];
    growthHistory = [baseGrowth - 0.3, baseGrowth + 0.1, baseGrowth - 0.1, baseGrowth + 0.2];
    unemploymentHistory = [6.8, 6.9, 7.1, 6.9];
  } else {
    // Expert: high volatility
    inflationHistory = [baseInflation - 0.5, baseInflation + 0.2, baseInflation + 0.8, baseInflation + 1.1];
    growthHistory = [baseGrowth - 0.8, baseGrowth - 0.5, baseGrowth + 0.1, baseGrowth - 0.3];
    unemploymentHistory = [6.5, 7.0, 7.3, 7.5];
  }
  
  const currentInflation = 2.5 + (scenario.inflationPressure);
  const currentGrowth = 1.2 + (scenario.growthMomentum);
  
  return {
    round: 1,
    difficulty,
    score: 100,
    history: [],
    currentScenario: scenario,
    isGameOver: false,
    feedback: null,
    indicators: {
      inflation: {
        type: 'inflation',
        name: 'Inflationsrate (HICP)',
        value: currentInflation,
        history: inflationHistory,
        target: TARGET_INFLATION,
        unit: '%',
        description: 'Der harmonisierte Verbraucherpreisindex. Ziel der EZB: nahe, aber unter 2%.'
      },
      gdp_growth: {
        type: 'gdp_growth',
        name: 'BIP Wachstum',
        value: currentGrowth,
        history: growthHistory,
        target: TARGET_GROWTH,
        unit: '%',
        description: 'Wachstum des Bruttoinlandsprodukts.'
      },
      unemployment: {
        type: 'unemployment',
        name: 'Arbeitslosenquote',
        value: 6.5,
        history: unemploymentHistory,
        unit: '%',
        description: 'Prozentsatz der Arbeitslosen an der Erwerbsbevölkerung.'
      },
      exchange_rate: {
        type: 'exchange_rate',
        name: 'Euro-Kurs (USD)',
        value: 1.10,
        history: [1.12, 1.11, 1.10, 1.10],
        unit: '$',
        description: 'Wechselkurs des Euro zum US-Dollar.'
      }
    }
  };
}

export function calculateNextState(currentState: GameState, decision: PlayerDecision): GameState {
  const nextState = { ...currentState };
  const { indicators } = nextState;

  // Clone indicators to avoid mutation
  const newInflation = { ...indicators.inflation };
  const newGrowth = { ...indicators.gdp_growth };
  const newUnemployment = { ...indicators.unemployment };
  const newExchange = { ...indicators.exchange_rate };

  // --- SIMULATION LOGIC (Simplified Model) ---

  let inflationChange = 0;
  let growthChange = 0;

  // Check if vote was rejected
  const voteRejected = decision.votesPassed === false;

  // Difficulty-based randomness: affects volatility
  const difficultyMultiplier = nextState.difficulty === 'beginner' ? 0.5 : nextState.difficulty === 'advanced' ? 1.0 : 1.5;
  const randomVariation = (Math.random() - 0.5) * 0.2 * difficultyMultiplier;

  // If vote was rejected, apply negative consequences
  if (voteRejected) {
    inflationChange += 0.3;  // Inflation worsens due to lack of clear policy
    growthChange -= 0.2;     // Growth slows due to policy uncertainty
  } else {
    // Apply policy effects only if vote passed
    // 1. Interest Rate Effect (only if selected)
    if (decision.interestRate) {
      if (decision.interestRate === 'raise') {
        inflationChange -= 0.5; // Strong effect fighting inflation
        growthChange -= 0.3;    // Cools economy
      } else if (decision.interestRate === 'lower') {
        inflationChange += 0.4; // Stimulates inflation
        growthChange += 0.4;    // Stimulates growth
      }
      // 'hold' does nothing
    }

    // 2. Open Market Operations (QE/QT) (only if selected)
    if (decision.openMarket) {
      if (decision.openMarket === 'buy') { // QE
        inflationChange += 0.2;
        growthChange += 0.3;
      } else if (decision.openMarket === 'sell') { // QT
        inflationChange -= 0.2;
        growthChange -= 0.2;
      }
      // 'none' does nothing
    }

    // 3. Standing Facility and Minimum Reserve adjustments (optional)
    if (decision.standingFacility === 'emergency_lending') {
      growthChange += 0.1; // Emergency lending boosts confidence
    } else if (decision.standingFacility === 'deposit_facility') {
      inflationChange -= 0.05; // Discourages deposits, supports tightening
    }

    if (decision.minimumReserve === 'decrease') {
      growthChange += 0.15; // More credit available
    } else if (decision.minimumReserve === 'increase') {
      inflationChange -= 0.1; // Restricts money supply
    }
  }

  // 3. Scenario Pressure (External Shocks) + Randomness based on difficulty
  // Add scenario pressure and difficulty-based variation
  inflationChange += (nextState.currentScenario.inflationPressure * 0.2) + randomVariation; 
  growthChange += (nextState.currentScenario.growthMomentum * 0.2) + (randomVariation * 0.5);

  // Apply changes
  newInflation.value = Math.max(0, Number((newInflation.value + inflationChange).toFixed(2)));
  newGrowth.value = Number((newGrowth.value + growthChange).toFixed(2));
  
  // Unemployment is inversely related to growth (Okun's Law approx)
  const unemploymentChange = -0.5 * growthChange;
  newUnemployment.value = Math.max(0, Number((newUnemployment.value + unemploymentChange).toFixed(2)));

  // Update Histories
  newInflation.history = [...newInflation.history, newInflation.value];
  newGrowth.history = [...newGrowth.history, newGrowth.value];
  newUnemployment.history = [...newUnemployment.history, newUnemployment.value];
  newExchange.history = [...newExchange.history, newExchange.value]; // Keeping exchange static for now for simplicity

  // Update State
  nextState.indicators = {
    inflation: newInflation,
    gdp_growth: newGrowth,
    unemployment: newUnemployment,
    exchange_rate: newExchange
  };

  // Generate Feedback/Outcome Text
  let feedback = "";
  if (voteRejected) {
    feedback = "Der Rat hat deinen Vorschlag abgelehnt! Ohne Konsens verschärft sich die wirtschaftliche Unsicherheit.";
    nextState.score -= 15;
  } else if (Math.abs(newInflation.value - TARGET_INFLATION) < 0.5) {
    feedback = "Gute Entscheidung! Die Inflation nähert sich dem Zielwert.";
    nextState.score += 10;
  } else if (newInflation.value > TARGET_INFLATION + 2) {
    feedback = "Vorsicht! Die Inflation gerät außer Kontrolle.";
    nextState.score -= 10;
  } else if (newGrowth.value < 0) {
    feedback = "Die Wirtschaft schrumpft (Rezession). Stimulierende Maßnahmen könnten nötig sein.";
    nextState.score -= 5;
  } else {
    feedback = "Die Auswirkungen deiner Politik zeigen sich langsam.";
  }

  nextState.round += 1;
  nextState.history.push({
    round: currentState.round,
    decision,
    indicators: {
      inflation: newInflation.value,
      gdp_growth: newGrowth.value,
      unemployment: newUnemployment.value,
      exchange_rate: newExchange.value
    }
  });
  
  nextState.feedback = feedback;

  return nextState;
}
