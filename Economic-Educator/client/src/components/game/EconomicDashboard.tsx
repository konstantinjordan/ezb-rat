import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Indicator } from "@/lib/types";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface EconomicDashboardProps {
  indicators: Record<string, Indicator>;
}

export function EconomicDashboard({ indicators }: EconomicDashboardProps) {
  // Transform data for Recharts
  // We need an array of objects like { round: 1, inflation: 2.5, growth: 1.2 }
  const rounds = indicators.inflation.history.length;
  const chartData = Array.from({ length: rounds }).map((_, i) => ({
    name: `Q${i + 1}`,
    Inflation: indicators.inflation.history[i],
    Wachstum: indicators.gdp_growth.history[i],
    Arbeitslosigkeit: indicators.unemployment.history[i],
  }));

  const getTrendIcon = (indicator: Indicator) => {
    const current = indicator.value;
    const prev = indicator.history[indicator.history.length - 2] || current;
    if (current > prev) return <TrendingUp className="h-4 w-4 text-red-500" />;
    if (current < prev) return <TrendingDown className="h-4 w-4 text-green-500" />;
    return <Minus className="h-4 w-4 text-gray-500" />;
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        {Object.values(indicators).filter(ind => ind.type !== 'exchange_rate').map((ind) => (
          <Card key={ind.type} className="border-l-4 border-l-primary shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
              <CardTitle className="text-base font-medium text-muted-foreground">
                {ind.name}
              </CardTitle>
              {getTrendIcon(ind)}
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-4xl font-bold">{ind.value}{ind.unit}</div>
              <p className="text-sm text-muted-foreground mt-1">
                {ind.target ? `Ziel: ${ind.target}${ind.unit}` : 'Kein explizites Ziel'}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="col-span-4 shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl">Wirtschaftliche Entwicklung</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `${value}%`} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Legend />
                <Line type="monotone" dataKey="Inflation" stroke="hsl(var(--primary))" strokeWidth={2} dot={true} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="Wachstum" stroke="hsl(var(--secondary))" strokeWidth={2} dot={true} />
                <Line type="monotone" dataKey="Arbeitslosigkeit" stroke="hsl(var(--muted-foreground))" strokeWidth={2} strokeDasharray="5 5" dot={true} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
