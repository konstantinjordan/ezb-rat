import { useState, useEffect } from "react";
import { useRoute } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import { 
  createInitialState, 
  calculateNextState, 
} from "@/lib/gameLogic";
import { SCENARIOS } from "@/lib/scenarios";
import { GameState, Difficulty, PlayerDecision } from "@/lib/types";
import { NewsTicker } from "@/components/game/NewsTicker";
import { EconomicDashboard } from "@/components/game/EconomicDashboard";
import { PolicyControls } from "@/components/game/PolicyControls";
import { CouncilVote } from "@/components/game/CouncilVote";
import { WelcomeScreen } from "@/components/game/WelcomeScreen";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, ArrowRight, Home } from "lucide-react";
import { Link } from "wouter";

type GamePhase = 'welcome' | 'decision' | 'council' | 'result';

export default function Game() {
  const [, params] = useRoute("/game/:difficulty");
  const difficulty = (params?.difficulty as Difficulty) || 'beginner';
  
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [phase, setPhase] = useState<GamePhase>('welcome');
  const [currentDecision, setCurrentDecision] = useState<PlayerDecision | null>(null);

  // Initialize Game
  useEffect(() => {
    const initialScenario = SCENARIOS[difficulty][0];
    setGameState(createInitialState(difficulty, initialScenario));
  }, [difficulty]);

  // Scroll to top when phase changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [phase]);

  const handleWelcomeStart = () => {
    setPhase('decision');
  };

  if (!gameState) return <div className="flex h-screen items-center justify-center">Laden...</div>;

  const handleDecisionSubmit = (decision: PlayerDecision) => {
    setCurrentDecision(decision);
    setPhase('council');
  };

  const handleCouncilComplete = (passing: boolean) => {
    if (currentDecision && gameState) {
      const decisionWithVote = { ...currentDecision, votesPassed: passing };
      const nextState = calculateNextState(gameState, decisionWithVote);
      setGameState(nextState);
      setPhase('result');
    }
  };

  const handleNextRound = () => {
    // Check for Game Over logic or Scenario progression here
    // For prototype, we just loop or pick random scenario
    const nextScenarioIndex = (gameState.round) % SCENARIOS[difficulty].length;
    const nextScenario = SCENARIOS[difficulty][nextScenarioIndex] || SCENARIOS[difficulty][0];
    
    setGameState(prev => prev ? ({
      ...prev,
      currentScenario: nextScenario
    }) : null);
    
    setPhase('decision');
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-primary text-primary-foreground shadow-md">
        <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-3 flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <Link href="/" className="hover:opacity-80 transition-opacity flex-shrink-0">
              <Home className="h-5 w-5" />
            </Link>
            <h1 className="font-serif text-sm sm:text-base md:text-2xl font-bold tracking-tight truncate">
              <span className="hidden sm:inline">EZB-Rat: <span className="font-light opacity-90">Entscheidung in Frankfurt</span></span>
              <span className="sm:hidden">EZB-Rat</span>
            </h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm font-medium flex-shrink-0">
            <div className="bg-primary-foreground/10 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
              R{gameState.round}
            </div>
            <div className="bg-secondary text-secondary-foreground px-2 sm:px-3 py-1 rounded-full font-bold text-xs sm:text-sm">
              {gameState.score}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <AnimatePresence mode="wait">
          
          {phase === 'welcome' && gameState && (
            <WelcomeScreen difficulty={difficulty} onStart={handleWelcomeStart} />
          )}

          {phase === 'decision' && (
            <motion.div
              key="decision"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="space-y-6"
            >
              <div className="text-center mb-4 sm:mb-8">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-3">{gameState.currentScenario.title}</h2>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-2">{gameState.currentScenario.economicContext}</p>
              </div>

              <NewsTicker news={gameState.currentScenario.newsFlash} />

              <div className="grid gap-4 sm:gap-6 lg:gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                  <EconomicDashboard indicators={gameState.indicators} />
                </div>
                <div className="lg:col-span-1">
                  <PolicyControls onSubmit={handleDecisionSubmit} />
                </div>
              </div>
            </motion.div>
          )}

          {phase === 'council' && currentDecision && (
            <motion.div
              key="council"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-12"
            >
              <CouncilVote decision={currentDecision} onComplete={handleCouncilComplete} />
            </motion.div>
          )}

          {phase === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="text-center space-y-4">
                <div className="inline-block p-4 rounded-full bg-primary/10 mb-4">
                  <h2 className="text-4xl font-bold text-primary">Ergebnisse der Runde {gameState.round - 1}</h2>
                </div>
                <p className="text-2xl font-serif max-w-2xl mx-auto leading-relaxed">
                  {gameState.feedback}
                </p>
              </div>

              <EconomicDashboard indicators={gameState.indicators} />

              <div className="flex justify-center pt-8">
                <Button size="lg" onClick={handleNextRound} className="text-xl px-12 h-16 rounded-lg shadow-lg">
                  Weiter zur nächsten Runde
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}
