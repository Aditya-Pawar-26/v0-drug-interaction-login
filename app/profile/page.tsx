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
        <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">Patient Medical Profile</h1>
              <p className="text-primary-foreground/80 text-xs sm:text-sm mt-1">Medication history and interaction tracking</p>
            </div>
            <RiskScoreBadge score={riskScore} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 p-4 sm:p-6 lg:p-8">
        {/* Left Sidebar */}
        <aside className="w-full lg:w-80">
          <PatientSidebar patient={patient} />
        </aside>

        {/* Main Area - Timeline */}
        <main className="flex-1">
          <MedicationTimeline medications={medications} />
        </main>
      </div>
    </div>
  );
}
