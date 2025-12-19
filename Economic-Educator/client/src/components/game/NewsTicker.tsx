import { motion, AnimatePresence } from "framer-motion";
import { NewsItem } from "@/lib/types";
import { Newspaper, TrendingUp, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface NewsTickerProps {
  news: NewsItem[];
}

export function NewsTicker({ news }: NewsTickerProps) {
  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex items-center gap-2 text-primary font-serif font-bold text-lg sm:text-xl border-b pb-2 mb-3 sm:mb-4">
        <Newspaper className="h-5 w-5 sm:h-6 sm:w-6" />
        <span className="text-base sm:text-lg">Breaking News</span>
      </div>
      
      <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
        <AnimatePresence>
          {news.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className={`
                h-full border-l-4 shadow-sm hover:shadow-md transition-all
                ${item.sentiment === 'negative' ? 'border-l-destructive bg-red-50/50 dark:bg-red-950/10' : ''}
                ${item.sentiment === 'positive' ? 'border-l-green-500 bg-green-50/50 dark:bg-green-950/10' : ''}
                ${item.sentiment === 'neutral' ? 'border-l-gray-400 bg-gray-50/50 dark:bg-gray-900/10' : ''}
              `}>
                <CardContent className="p-3 sm:p-4 flex gap-2 sm:gap-4">
                  <div className="shrink-0 mt-0.5 sm:mt-1">
                    {item.sentiment === 'negative' && <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-destructive" />}
                    {item.sentiment === 'positive' && <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />}
                    {item.sentiment === 'neutral' && <Newspaper className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-0.5 sm:mb-1">
                      {item.source}
                    </div>
                    <h3 className="font-serif font-medium text-sm sm:text-lg leading-tight">
                      {item.headline}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
