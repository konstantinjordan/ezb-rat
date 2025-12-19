import { motion } from "framer-motion";
import { User, UserCheck, UserX } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlayerDecision } from "@/lib/types";

interface CouncilMember {
  id: number;
  name: string;
  type: 'hawk' | 'dove' | 'centrist';
  country: string;
}

const COUNCIL_MEMBERS: CouncilMember[] = [
  { id: 1, name: "Klaas Knot", type: 'hawk', country: 'Niederlande' },
  { id: 2, name: "Fabio Panetta", type: 'dove', country: 'Italien' },
  { id: 3, name: "Christine Lagarde", type: 'centrist', country: 'Frankreich' },
  { id: 4, name: "Robert Holzmann", type: 'hawk', country: 'Österreich' },
  { id: 5, name: "Olli Rehn", type: 'dove', country: 'Finnland' },
];

interface CouncilVoteProps {
  decision: PlayerDecision;
  onComplete: (passing: boolean) => void;
}

function calculateCoherence(decision: PlayerDecision, memberType: 'hawk' | 'dove' | 'centrist'): number {
  let score = 0;
  let maxScore = 0;

  // Interest Rate Score (only if selected)
  if (decision.interestRate) {
    maxScore += 100;
    if (memberType === 'hawk') {
      score += decision.interestRate === 'raise' ? 100 : decision.interestRate === 'hold' ? 50 : 0;
    } else if (memberType === 'dove') {
      score += decision.interestRate === 'lower' ? 100 : decision.interestRate === 'hold' ? 50 : 0;
    } else {
      score += decision.interestRate === 'hold' ? 100 : 50;
    }
  }

  // Open Market Score (only if selected)
  if (decision.openMarket) {
    maxScore += 100;
    if (memberType === 'hawk') {
      score += decision.openMarket === 'sell' ? 100 : decision.openMarket === 'none' ? 50 : 0;
    } else if (memberType === 'dove') {
      score += decision.openMarket === 'buy' ? 100 : decision.openMarket === 'none' ? 50 : 0;
    } else {
      score += decision.openMarket === 'none' ? 100 : 50;
    }
  }

  // Standing Facility Score (only if selected)
  if (decision.standingFacility) {
    maxScore += 100;
    if (memberType === 'hawk') {
      score += decision.standingFacility === 'deposit_facility' ? 100 : decision.standingFacility === 'standard' ? 50 : 0;
    } else if (memberType === 'dove') {
      score += decision.standingFacility === 'emergency_lending' ? 100 : decision.standingFacility === 'standard' ? 50 : 0;
    } else {
      score += decision.standingFacility === 'standard' ? 100 : 50;
    }
  }

  // Minimum Reserve Score (only if selected)
  if (decision.minimumReserve) {
    maxScore += 100;
    if (memberType === 'hawk') {
      score += decision.minimumReserve === 'increase' ? 100 : decision.minimumReserve === 'hold' ? 50 : 0;
    } else if (memberType === 'dove') {
      score += decision.minimumReserve === 'decrease' ? 100 : decision.minimumReserve === 'hold' ? 50 : 0;
    } else {
      score += decision.minimumReserve === 'hold' ? 100 : 50;
    }
  }

  // If nothing selected, default to neutral (50% approval)
  if (maxScore === 0) return 50;

  return Math.round((score / maxScore) * 100);
}

export function CouncilVote({ decision, onComplete }: CouncilVoteProps) {
  const votes = COUNCIL_MEMBERS.map((member) => {
    const coherence = calculateCoherence(decision, member.type);
    const agrees = coherence > 50; // Members vote yes if coherence > 50%
    
    return { member, coherence, agrees };
  });

  const totalVotes = votes.filter(v => v.agrees).length;
  const passing = totalVotes >= 3; // Need at least 3/5 votes

  return (
    <Card className="w-full max-w-3xl mx-auto border-none shadow-none bg-transparent">
      <CardHeader className="text-center">
        <CardTitle className="text-4xl font-serif">Der EZB-Rat stimmt ab</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 p-4 bg-card/50 border border-border rounded-lg text-base space-y-2">
          <div className="text-muted-foreground">
            <span className="font-semibold text-primary">🦅 Falken:</span> Fokussieren auf Inflationsbekämpfung, unterstützen höhere Zinsen.
          </div>
          <div className="text-muted-foreground">
            <span className="font-semibold text-secondary">🕊️ Tauben:</span> Fokussieren auf Wachstum, unterstützen niedrigere Zinsen.
          </div>
          <div className="text-muted-foreground">
            <span className="font-semibold text-foreground">⚖️ Mitte:</span> Balancieren beide Ziele.
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 justify-items-center mb-6 sm:mb-8">
          {votes.map((vote, i) => {
            const { member, agrees } = vote;
            return (
              <motion.div
                key={member.id}
                initial={{ scale: 0, opacity: 0, rotateY: -90 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                transition={{ delay: i * 0.25, duration: 0.6 }}
                className={`flex flex-col items-center gap-2 w-full ${i === 4 ? 'col-span-2 sm:col-start-2 sm:col-span-1 md:col-start-3' : ''}`}
              >
                <motion.div
                  animate={{ y: agrees ? 0 : -5 }}
                  className={`
                    w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center border-3 sm:border-4 shadow-lg transition-all
                    ${agrees ? 'bg-green-500/20 border-green-500' : 'bg-red-500/20 border-red-500'}
                  `}
                >
                  {agrees ? (
                    <UserCheck className="h-6 w-6 sm:h-8 sm:w-8 text-green-400" />
                  ) : (
                    <UserX className="h-6 w-6 sm:h-8 sm:w-8 text-red-400" />
                  )}
                </motion.div>
                <div className="text-center">
                  <div className="font-bold text-sm sm:text-base text-foreground">{member.name}</div>
                  <div className="text-xs text-muted-foreground hidden sm:block">{member.country}</div>
                  <div className="text-sm text-primary font-semibold capitalize mt-0.5 sm:mt-1">
                    {member.type === 'hawk' ? '🦅 Falke' : member.type === 'dove' ? '🕊️ Taube' : '⚖️ Mitte'}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="my-8 p-6 rounded-lg bg-card/50 border border-border">
          <div className="text-center mb-4">
            <div className="text-3xl font-bold text-primary mb-2">
              {totalVotes}/5 Stimmen
            </div>
            <div className={`text-lg font-semibold ${passing ? 'text-green-400' : 'text-red-400'}`}>
              {passing ? '✓ Beschlossen' : '✗ Abgelehnt'}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground mb-4 pt-4 border-t border-border/50">
            <div>
              <div className="font-semibold text-foreground mb-1">Deine Maßnahmen:</div>
              <ul className="space-y-1 opacity-80">
                <li>• Leitzins: <span className="capitalize text-primary font-medium">{decision.interestRate === 'raise' ? 'erhöhen' : decision.interestRate === 'lower' ? 'senken' : 'halten'}</span></li>
                <li>• Anleihekäufe: <span className="capitalize text-primary font-medium">{decision.openMarket === 'buy' ? 'kaufen' : decision.openMarket === 'sell' ? 'verkaufen' : 'neutral'}</span></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-foreground mb-1">Feinabstimmungen:</div>
              <ul className="space-y-1 opacity-80">
                <li>• Fazilität: <span className="capitalize text-secondary font-medium">{decision.standingFacility === 'emergency_lending' ? 'Notfall' : decision.standingFacility === 'deposit_facility' ? 'Einlage' : 'Standard'}</span></li>
                <li>• Reserve: <span className="capitalize text-secondary font-medium">{decision.minimumReserve === 'increase' ? 'erhöhen' : decision.minimumReserve === 'decrease' ? 'senken' : 'halten'}</span></li>
              </ul>
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="text-center"
        >
          <button 
            onClick={() => onComplete(passing)}
            className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
          >
            Ergebnisse ansehen
          </button>
        </motion.div>
      </CardContent>
    </Card>
  );
}
