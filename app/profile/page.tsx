'use client';

import { useState } from 'react';
import PatientSidebar from '@/components/patient-sidebar';
import MedicationTimeline from '@/components/medication-timeline';
import RiskScoreBadge from '@/components/risk-score-badge';

export default function PatientProfilePage() {
  const [patient] = useState({
    id: 'P12345',
    name: 'John Anderson',
    age: 52,
    bloodGroup: 'O+',
    conditions: ['Diabetes', 'Hypertension'],
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
  });

  const [medications] = useState([
    {
      id: 1,
      name: 'Metformin',
      dosage: '500mg',
      startDate: '2023-01-15',
      endDate: '2024-12-31',
      severity: 'safe',
    },
    {
      id: 2,
      name: 'Lisinopril',
      dosage: '10mg',
      startDate: '2022-06-10',
      endDate: null,
      severity: 'safe',
    },
    {
      id: 3,
      name: 'Atorvastatin',
      dosage: '20mg',
      startDate: '2023-03-22',
      endDate: '2024-06-15',
      severity: 'major',
    },
    {
      id: 4,
      name: 'Aspirin',
      dosage: '81mg',
      startDate: '2023-09-01',
      endDate: null,
      severity: 'safe',
    },
    {
      id: 5,
      name: 'Omeprazole',
      dosage: '20mg',
      startDate: '2024-01-10',
      endDate: '2024-04-30',
      severity: 'safe',
    },
  ]);

  const [riskScore] = useState(42);

  return (
    <div className="min-h-screen bg-background">
      {/* Dark Teal Header */}
      <header className="bg-primary text-primary-foreground sticky top-0 z-40 shadow-md">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Patient Medical Profile</h1>
              <p className="text-primary-foreground/80 text-sm mt-1">Medication history and interaction tracking</p>
            </div>
            <RiskScoreBadge score={riskScore} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex gap-6 p-8">
        {/* Left Sidebar */}
        <div className="w-80">
          <PatientSidebar patient={patient} />
        </div>

        {/* Main Area - Timeline */}
        <div className="flex-1">
          <MedicationTimeline medications={medications} />
        </div>
      </div>
    </div>
  );
}
