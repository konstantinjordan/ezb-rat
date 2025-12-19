import { Scenario, Difficulty } from './types';

export const SCENARIOS: Record<Difficulty, Scenario[]> = {
  beginner: [
    {
      id: 'beg_1',
      title: 'Steigende Preise im Supermarkt',
      newsFlash: [
        { id: 'n1', headline: 'Inflation erreicht 3,5% - Höchster Stand seit 5 Jahren', source: 'Tagesschau', sentiment: 'negative' },
        { id: 'n2', headline: 'Verbraucher besorgt über Energiepreise', source: 'Frankfurter Allgemeine', sentiment: 'negative' },
      ],
      economicContext: 'Die Wirtschaft erholt sich von einer leichten Rezession, aber die Preise ziehen schneller an als erwartet. Die Energiepreise sind der Haupttreiber.',
      inflationPressure: 0.8,
      growthMomentum: 0.2,
    },
    {
      id: 'beg_2',
      title: 'Wirtschaftsboom oder Überhitzung?',
      newsFlash: [
        { id: 'n3', headline: 'Baugewerbe boomt: Materialknappheit', source: 'Handelsblatt', sentiment: 'positive' },
        { id: 'n4', headline: 'Lohnforderungen der Gewerkschaften steigen', source: 'Süddeutsche Zeitung', sentiment: 'neutral' },
      ],
      economicContext: 'Die Nachfrage ist riesig. Unternehmen kommen mit der Produktion kaum hinterher. Es droht eine Lohn-Preis-Spirale.',
      inflationPressure: 1.2,
      growthMomentum: 0.5,
    },
  ],
  advanced: [
    {
      id: 'adv_1',
      title: 'Stagflations-Gespenst',
      newsFlash: [
        { id: 'n5', headline: 'Wirtschaftswachstum stagniert bei hoher Inflation', source: 'Bloomberg', sentiment: 'negative' },
        { id: 'n6', headline: 'Ölpreis-Schock nach geopolitischen Spannungen', source: 'Reuters', sentiment: 'negative' },
      ],
      economicContext: 'Ein schwieriges Dilemma: Die Wirtschaft lahmt (braucht niedrige Zinsen), aber die Preise steigen (braucht hohe Zinsen).',
      inflationPressure: 1.5,
      growthMomentum: -0.5,
    },
  ],
  expert: [
    {
      id: 'exp_1',
      title: 'Euro-Krise 2.0',
      newsFlash: [
        { id: 'n7', headline: 'Renditeabstände (Spreads) der Staatsanleihen weiten sich aus', source: 'Financial Times', sentiment: 'negative' },
        { id: 'n8', headline: 'Vertrauenskrise an den Märkten', source: 'Wall Street Journal', sentiment: 'negative' },
        { id: 'n9', headline: 'Inflation galoppiert davon', source: 'EZB Intern', sentiment: 'negative' },
      ],
      economicContext: 'Das Vertrauen in den Euro wankt. Die Märkte testen die Entschlossenheit der EZB. Gleichzeitig droht eine Rezession in Südeuropa.',
      inflationPressure: 2.0,
      growthMomentum: -1.0,
    },
  ]
};

export const ARGUMENTS = [
  { id: 'arg_price_stability', text: 'Unser vorrangiges Ziel ist Preisstabilität. Wir müssen die Inflation bekämpfen.' },
  { id: 'arg_economic_growth', text: 'Wir dürfen die Erholung der Wirtschaft nicht abwürgen.' },
  { id: 'arg_market_stability', text: 'Die Märkte brauchen jetzt Beruhigung und Liquidität.' },
  { id: 'arg_wait_and_see', text: 'Die aktuellen Effekte sind nur temporär, wir sollten abwarten.' },
];
