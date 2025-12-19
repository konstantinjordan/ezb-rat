import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ArrowRight, Sprout, TrendingUp, Zap } from "lucide-react";
import type { Difficulty } from "@/lib/types";

export default function Home() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [, setLocation] = useLocation();

  const difficulties: { id: Difficulty; label: string; color: string; icon: React.ReactNode }[] = [
    { id: "beginner", label: "Anfänger", color: "emerald", icon: <Sprout className="h-5 w-5" /> },
    { id: "advanced", label: "Fortgeschritten", color: "blue", icon: <TrendingUp className="h-5 w-5" /> },
    { id: "expert", label: "Experte", color: "red", icon: <Zap className="h-5 w-5" /> }
  ];

  const handleStart = () => {
    if (selectedDifficulty) {
      setLocation(`/game/${selectedDifficulty}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex-1 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl w-full space-y-12 text-center"
        >
          {/* Header */}
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              EZB-Rat
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-light leading-relaxed px-2">
              Schlüpfe in die Rolle des Bundesbank-Präsidenten und steuere die Geldpolitik der Eurozone. Triff schwierige Entscheidungen und verwalte Inflation, Wachstum und Arbeitslosigkeit.
            </p>
          </div>

          {/* Difficulty Selection */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 gap-3">
              {difficulties.map((diff) => {
                const isSelected = selectedDifficulty === diff.id;
                const borderColors: Record<string, string> = {
                  emerald: isSelected ? "border-emerald-500 bg-emerald-500/10" : "border-border hover:border-muted-foreground/50 bg-card/30 hover:bg-card/50",
                  blue: isSelected ? "border-blue-500 bg-blue-500/10" : "border-border hover:border-muted-foreground/50 bg-card/30 hover:bg-card/50",
                  red: isSelected ? "border-red-500 bg-red-500/10" : "border-border hover:border-muted-foreground/50 bg-card/30 hover:bg-card/50"
                };
                
                return (
                  <button
                    key={diff.id}
                    onClick={() => setSelectedDifficulty(diff.id)}
                    className={`p-5 rounded-lg border-2 transition-all flex items-center justify-center gap-3 ${borderColors[diff.color]}`}
                  >
                    {diff.icon}
                    <div className="font-semibold text-lg">{diff.label}</div>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Start Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Button
              onClick={handleStart}
              disabled={!selectedDifficulty}
              size="lg"
              className="w-full text-xl px-8 py-8 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              Spiel Starten
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Von Jan, Leander und Konstantin</p>
        </div>
      </footer>
    </div>
  );
}
