'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Drug, Interaction, getInteractions, calculateRiskScore, bronKerbosch } from './drugData';

export type UserRole = 'doctor' | 'patient' | null;

interface AppContextValue {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  selectedDrugs: Drug[];
  addDrug: (drug: Drug) => void;
  removeDrug: (id: string) => void;
  clearDrugs: () => void;
  interactions: Interaction[];
  riskScore: number;
  cliques: string[][];
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [selectedDrugs, setSelectedDrugs] = useState<Drug[]>([]);

  const interactions = getInteractions(selectedDrugs);
  const riskScore = calculateRiskScore(interactions);
  const cliques = bronKerbosch(selectedDrugs, interactions);

  const addDrug = (drug: Drug) => {
    setSelectedDrugs((prev) => {
      if (prev.find((d) => d.id === drug.id)) return prev;
      return [...prev, drug];
    });
  };

  const removeDrug = (id: string) => {
    setSelectedDrugs((prev) => prev.filter((d) => d.id !== id));
  };

  const clearDrugs = () => setSelectedDrugs([]);

  return (
    <AppContext.Provider
      value={{
        userRole,
        setUserRole,
        selectedDrugs,
        addDrug,
        removeDrug,
        clearDrugs,
        interactions,
        riskScore,
        cliques,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
