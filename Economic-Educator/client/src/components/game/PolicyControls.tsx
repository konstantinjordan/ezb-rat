import { useState } from "react";
import { PlayerDecision } from "@/lib/types";
import { ARGUMENTS } from "@/lib/scenarios";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";

interface PolicyControlsProps {
  onSubmit: (decision: PlayerDecision) => void;
  isSubmitting?: boolean;
}

export function PolicyControls({ onSubmit, isSubmitting = false }: PolicyControlsProps) {
  const [interestRate, setInterestRate] = useState<'raise' | 'hold' | 'lower' | null>(null);
  const [openMarket, setOpenMarket] = useState<'buy' | 'sell' | 'none' | null>(null);
  const [standingFacility, setStandingFacility] = useState<'emergency_lending' | 'deposit_facility' | 'standard' | null>(null);
  const [minimumReserve, setMinimumReserve] = useState<'increase' | 'decrease' | 'hold' | null>(null);
  const [argument, setArgument] = useState<string>('');

  const handleSubmit = () => {
    onSubmit({
      interestRate,
      openMarket,
      standingFacility,
      minimumReserve,
      argument
    });
  };

  const isFormValid = argument !== '';

  return (
    <Card className="border-t-4 border-t-secondary shadow-lg">
      <CardHeader className="pb-3 sm:pb-6">
        <CardTitle className="text-2xl sm:text-3xl">Instrumente & Entscheidung</CardTitle>
        <CardDescription className="text-sm sm:text-base">Wählen Sie Ihre geldpolitischen Maßnahmen.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-6 p-3 sm:p-6">
        
        {/* Leitzins */}
        <div className="space-y-2 sm:space-y-3">
          <Label className="text-base sm:text-lg font-semibold">1. Leitzins</Label>
          <RadioGroup 
            value={interestRate || ''} 
            onValueChange={(v) => setInterestRate((v || null) as any)}
            className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4"
          >
            <div>
              <RadioGroupItem value="lower" id="rate-lower" className="peer sr-only" />
              <Label
                htmlFor="rate-lower"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 sm:p-3 hover:bg-accent text-xs font-semibold peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
              >
                Senken
              </Label>
            </div>
            <div>
              <RadioGroupItem value="hold" id="rate-hold" className="peer sr-only" />
              <Label
                htmlFor="rate-hold"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-3 hover:bg-accent text-xs font-semibold peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
              >
                Halten
              </Label>
            </div>
            <div>
              <RadioGroupItem value="raise" id="rate-raise" className="peer sr-only" />
              <Label
                htmlFor="rate-raise"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-3 hover:bg-accent text-xs font-semibold peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
              >
                Erhöhen
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Offenmarktgeschäfte */}
        <div className="space-y-2 sm:space-y-3">
          <Label className="text-base sm:text-lg font-semibold">2. Offenmarktgeschäfte</Label>
          <RadioGroup 
            value={openMarket || ''} 
            onValueChange={(v) => setOpenMarket((v || null) as any)}
            className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4"
          >
            <div>
              <RadioGroupItem value="buy" id="market-buy" className="peer sr-only" />
              <Label
                htmlFor="market-buy"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 sm:p-3 hover:bg-accent text-xs font-semibold peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
              >
                Kaufen
              </Label>
            </div>
            <div>
              <RadioGroupItem value="none" id="market-none" className="peer sr-only" />
              <Label
                htmlFor="market-none"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-3 hover:bg-accent text-xs font-semibold peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
              >
                Neutral
              </Label>
            </div>
            <div>
              <RadioGroupItem value="sell" id="market-sell" className="peer sr-only" />
              <Label
                htmlFor="market-sell"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-3 hover:bg-accent text-xs font-semibold peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
              >
                Verkaufen
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Ständige Fazilität */}
        <div className="space-y-2 sm:space-y-3">
          <Label className="text-base sm:text-lg font-semibold">3. Ständige Fazilität</Label>
          <RadioGroup 
            value={standingFacility || ''} 
            onValueChange={(v) => setStandingFacility((v || null) as any)}
            className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4"
          >
            <div>
              <RadioGroupItem value="emergency_lending" id="facility-lending" className="peer sr-only" />
              <Label
                htmlFor="facility-lending"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-1.5 sm:p-2 hover:bg-accent text-xs font-semibold peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
              >
                Notfall
              </Label>
            </div>
            <div>
              <RadioGroupItem value="standard" id="facility-standard" className="peer sr-only" />
              <Label
                htmlFor="facility-standard"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent text-xs font-semibold peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
              >
                Standard
              </Label>
            </div>
            <div>
              <RadioGroupItem value="deposit_facility" id="facility-deposit" className="peer sr-only" />
              <Label
                htmlFor="facility-deposit"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent text-xs font-semibold peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
              >
                Einlage
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Mindestreserve */}
        <div className="space-y-2 sm:space-y-3">
          <Label className="text-base sm:text-lg font-semibold">4. Mindestreservesatz</Label>
          <RadioGroup 
            value={minimumReserve || ''} 
            onValueChange={(v) => setMinimumReserve((v || null) as any)}
            className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4"
          >
            <div>
              <RadioGroupItem value="decrease" id="reserve-decrease" className="peer sr-only" />
              <Label
                htmlFor="reserve-decrease"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent text-xs font-semibold peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
              >
                Senken
              </Label>
            </div>
            <div>
              <RadioGroupItem value="hold" id="reserve-hold" className="peer sr-only" />
              <Label
                htmlFor="reserve-hold"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent text-xs font-semibold peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
              >
                Halten
              </Label>
            </div>
            <div>
              <RadioGroupItem value="increase" id="reserve-increase" className="peer sr-only" />
              <Label
                htmlFor="reserve-increase"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent text-xs font-semibold peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
              >
                Erhöhen
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Argumentation */}
        <div className="space-y-2 sm:space-y-3 pt-3 sm:pt-4 border-t">
          <Label className="text-base sm:text-lg font-semibold">5. Begründung für den Rat</Label>
          <Select value={argument} onValueChange={setArgument}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Wählen Sie Ihr Hauptargument..." />
            </SelectTrigger>
            <SelectContent>
              {ARGUMENTS.map((arg) => (
                <SelectItem key={arg.id} value={arg.id}>
                  {arg.text}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button 
          className="w-full mt-4 sm:mt-6 text-sm sm:text-lg py-4 sm:py-6" 
          size="lg" 
          onClick={handleSubmit}
          disabled={!isFormValid || isSubmitting}
        >
          {isSubmitting ? (
            "Wird verarbeitet..." 
          ) : (
            <>
              Zur Abstimmung
              <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
