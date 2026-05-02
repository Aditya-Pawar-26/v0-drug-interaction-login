'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

interface Patient {
  id: string;
  name: string;
  age: number;
  bloodGroup: string;
  conditions: string[];
  avatar: string;
}

export default function PatientSidebar({ patient }: { patient: Patient }) {
  return (
    <Card className="bg-card border border-border/40 p-6 space-y-6 sticky top-32">
      {/* Avatar */}
      <div className="flex justify-center">
        <div className="relative w-32 h-32 rounded-full overflow-hidden ring-4 ring-primary/20 ring-offset-2">
          <Image
            src={patient.avatar}
            alt={patient.name}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Patient Info */}
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-bold text-foreground">{patient.name}</h2>
        <p className="text-sm text-muted-foreground">ID: {patient.id}</p>
      </div>

      {/* Vital Stats */}
      <div className="grid grid-cols-2 gap-4 py-4 border-y border-border/40">
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">{patient.age}</p>
          <p className="text-xs text-muted-foreground mt-1">Age</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-accent">{patient.bloodGroup}</p>
          <p className="text-xs text-muted-foreground mt-1">Blood Group</p>
        </div>
      </div>

      {/* Medical Conditions */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">Medical Conditions</h3>
        <div className="flex flex-wrap gap-2">
          {patient.conditions.map((condition) => (
            <Badge
              key={condition}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
            >
              {condition}
            </Badge>
          ))}
        </div>
      </div>

      {/* Additional Info */}
      <div className="pt-4 border-t border-border/40 space-y-2 text-xs text-muted-foreground">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <p className="text-xs">All medication records verified</p>
      </div>
    </Card>
  );
}
