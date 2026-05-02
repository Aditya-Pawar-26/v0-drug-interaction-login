'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Medication {
  id: number;
  name: string;
  dosage: string;
  startDate: string;
  endDate: string | null;
  severity: 'safe' | 'major';
}

const SEVERITY_VALUES = { safe: 'safe', major: 'major' } as const;

interface MedicationTimelineProps {
  medications: Medication[];
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

const getSeverityColor = (severity: 'safe' | 'major') => {
  if (severity === 'major') {
    return 'bg-red-100 text-red-800 border-red-300';
  }
  return 'bg-green-100 text-green-800 border-green-300';
};

const getSeverityIcon = (severity: 'safe' | 'major') => {
  if (severity === 'major') {
    return '⚠️';
  }
  return '✓';
};

export default function MedicationTimeline({ medications }: MedicationTimelineProps) {
  return (
    <section className="space-y-6" aria-label="Patient medication timeline">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Medication History</h2>
        <p className="text-muted-foreground">Timeline of past and current medications</p>
      </div>

      <div className="relative space-y-6 pl-8" role="list" aria-label={`Medication timeline with ${medications.length} entries`}>
        {/* Timeline vertical line */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-accent to-secondary" aria-hidden="true" />

        {medications.map((med, index) => (
          <div key={med.id} className="relative" role="listitem">
            {/* Timeline dot */}
            <div className="absolute -left-7 top-2 w-5 h-5 rounded-full bg-white border-4 border-primary ring-2 ring-primary/10" aria-hidden="true" />

            {/* Medication card */}
            <Card className="bg-card border border-border/40 hover:border-primary/50 hover:shadow-md transition-all p-5 space-y-4">
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">{med.name}</h3>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">Dosage:</span>
                    <span className="font-medium text-foreground">{med.dosage}</span>
                  </div>
                </div>
                <Badge 
                  className={`flex items-center gap-1 h-fit whitespace-nowrap border ${getSeverityColor(med.severity)}`}
                  aria-label={`Severity: ${med.severity === 'major' ? 'Major Interaction' : 'Safe'}`}
                >
                  <span aria-hidden="true">{getSeverityIcon(med.severity)}</span>
                  <span>{med.severity === 'major' ? 'Major Interaction' : 'Safe'}</span>
                </Badge>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground pt-2 border-t border-border/40">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Start:</span>
                  <span>{formatDate(med.startDate)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">End:</span>
                  <span>
                    {med.endDate ? formatDate(med.endDate) : <span className="text-accent font-medium">Ongoing</span>}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
}
