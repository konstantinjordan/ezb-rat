import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Users, TrendingUp, Lightbulb } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
  difficulty: string;
}

export function WelcomeScreen({ onStart, difficulty }: WelcomeScreenProps) {
  const difficultyInfo = {
    beginner: {
      title: "Willkommen im Anfängermodus",
      subtitle: "Lerne die Grundlagen der EZB-Geldpolitik"
    },
    advanced: {
      title: "Willkommen im Fortgeschrittenenmodus",
      subtitle: "Meistere komplexe wirtschaftliche Herausforderungen"
    },
    expert: {
      title: "Willkommen im Expertenmodus",
      subtitle: "Navigiere durch Finanzkrisen und Extremszenarien"
    }
  };

  const info = difficultyInfo[difficulty as keyof typeof difficultyInfo];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-2 sm:p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full space-y-4 sm:space-y-6 md:space-y-8"
      >
        {/* Header */}
        <div className="text-center space-y-2 sm:space-y-3">
          <h1 className="text-2xl sm:text-5xl md:text-6xl font-serif font-bold text-center">{info.title}</h1>
          <p className="text-muted-foreground text-sm sm:text-lg md:text-xl">{info.subtitle}</p>
        </div>

        {/* Main Intro Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-t-2 border-t-primary bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-secondary" />
                Was ist die Europäische Zentralbank (EZB)?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm sm:text-base">
              <p>
                Die Europäische Zentralbank ist die Notenbank der Eurozone und verantwortlich für die Geldpolitik von 20 EU-Staaten. 
                Ihr Hauptsitz ist in Frankfurt am Main.
              </p>
              <p>
                <strong>Das primäre Ziel der EZB:</strong> Preisstabilität, das bedeutet eine Inflationsrate nahe 2%. 
                Sie unterstützt auch die wirtschaftlichen Ziele der EU wie Vollbeschäftigung und Wirtschaftswachstum.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Key Instruments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-t-2 border-t-secondary bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Die wichtigsten Instrumente der EZB
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <div className="space-y-2">
                <p className="font-semibold text-primary">1. Leitzins (Hauptrefinanzierungssatz)</p>
                <p className="opacity-80">Der Zinssatz, zu dem Banken sich Geld bei der EZB leihen können. Höhere Zinsen bremsen die Inflation, niedrigere fördern Wachstum.</p>
              </div>
              <div className="space-y-2">
                <p className="font-semibold text-primary">2. Offenmarktgeschäfte</p>
                <p className="opacity-80">Kauf oder Verkauf von Anleihen, um Liquidität in die Wirtschaft zu bringen oder zu entziehen.</p>
              </div>
              <div className="space-y-2">
                <p className="font-semibold text-primary">3. Ständige Fazilitäten</p>
                <p className="opacity-80">Notfall-Kreditmechanismen für Banken in Zeiten von Stress oder Mangel an Vertrauen.</p>
              </div>
              <div className="space-y-2">
                <p className="font-semibold text-primary">4. Mindestreservesatz</p>
                <p className="opacity-80">Prozentsatz der Einlagen, den Banken reservieren müssen. Niedrigere Reserven = mehr Kreditvergabe, höhere = weniger.</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Your Role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="border-t-2 border-t-primary bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-secondary" />
                Deine Aufgabe
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <p>
                Du spielst den <strong>Präsidenten der Deutschen Bundesbank</strong>, ein stimmberechtigtes Mitglied des EZB-Rats.
              </p>
              <p>
                In jeder Runde musst du geldpolitische Entscheidungen treffen und diese vor dem Rat begründen. 
                Nicht alle Ratsmitglieder denken gleich, manche sind "Falken" (inflationskritisch), andere "Tauben" (wachstumsorientiert).
              </p>
              <p>
                Deine Entscheidungen beeinflussen <strong>Inflation</strong>, <strong>Wachstum</strong> und <strong>Arbeitslosigkeit</strong> in der Eurozone.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Start Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center pt-4"
        >
          <Button
            onClick={onStart}
            size="lg"
            className="text-lg px-12 h-14 rounded-lg shadow-lg bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Spiel Starten
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
