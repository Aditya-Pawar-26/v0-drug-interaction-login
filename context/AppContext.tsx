'use client';

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import {
  findMaximalCliques,
  buildAdjacencyList,
  getCliqueSeverity,
} from '@/lib/bronKerbosch';

/**
 * Mock drug interaction database
 */
const MOCK_INTERACTIONS = [
  { drugA: 'Warfarin', drugB: 'Aspirin', severity: 'major', description: 'Risk of serious bleeding' },
  { drugA: 'Warfarin', drugB: 'Ibuprofen', severity: 'moderate', description: 'Increased anticoagulation effect' },
  { drugA: 'Aspirin', drugB: 'Ibuprofen', severity: 'moderate', description: 'Increased GI bleeding risk' },
  { drugA: 'Warfarin', drugB: 'Clopidogrel', severity: 'major', description: 'Severe bleeding risk' },
  { drugA: 'Lisinopril', drugB: 'PotassiumChloride', severity: 'major', description: 'Risk of hyperkalemia' },
  { drugA: 'Metformin', drugB: 'Alcohol', severity: 'moderate', description: 'Lactic acidosis risk' },
  { drugA: 'Amoxicillin', drugB: 'Methotrexate', severity: 'moderate', description: 'Increased toxicity' },
  { drugA: 'Simvastatin', drugB: 'Grapefruit', severity: 'major', description: 'Increased statin levels' },
];

const AVAILABLE_DRUGS = [
  { id: 1, name: 'Warfarin', class: 'Anticoagulant', dosage: '5mg' },
  { id: 2, name: 'Aspirin', class: 'NSAID', dosage: '500mg' },
  { id: 3, name: 'Ibuprofen', class: 'NSAID', dosage: '400mg' },
  { id: 4, name: 'Paracetamol', class: 'Pain Reliever', dosage: '500mg' },
  { id: 5, name: 'Clopidogrel', class: 'Antiplatelet', dosage: '75mg' },
  { id: 6, name: 'Lisinopril', class: 'ACE Inhibitor', dosage: '10mg' },
  { id: 7, name: 'PotassiumChloride', class: 'Electrolyte', dosage: '20mEq' },
  { id: 8, name: 'Metformin', class: 'Antidiabetic', dosage: '500mg' },
  { id: 9, name: 'Amoxicillin', class: 'Antibiotic', dosage: '250mg' },
  { id: 10, name: 'Methotrexate', class: 'Antineoplastic', dosage: '2.5mg' },
  { id: 11, name: 'Simvastatin', class: 'Statin', dosage: '20mg' },
  { id: 12, name: 'Grapefruit', class: 'Food', dosage: 'N/A' },
  { id: 13, name: 'Alcohol', class: 'Substance', dosage: 'Variable' },
];

export interface Drug {
  id: number;
  name: string;
  class: string;
  dosage: string;
}

export interface Interaction {
  drugA: string;
  drugB: string;
  severity: 'major' | 'moderate' | 'minor';
  description: string;
}

export interface DetectedClique {
  drugs: string[];
  severity: 'major' | 'moderate' | 'minor';
}

interface AppContextType {
  // Drug selection
  selectedDrugs: Drug[];
  addDrug: (drug: Drug) => void;
  removeDrug: (drugId: number) => void;
  clearDrugs: () => void;

  // Interaction results
  interactionResults: Interaction[];
  riskScore: number;
  detectedCliques: DetectedClique[];

  // Analysis
  analyzeInteractions: () => void;

  // Available drugs
  availableDrugs: Drug[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [selectedDrugs, setSelectedDrugs] = useState<Drug[]>([]);
  const [interactionResults, setInteractionResults] = useState<Interaction[]>([]);
  const [detectedCliques, setDetectedCliques] = useState<DetectedClique[]>([]);
  const [riskScore, setRiskScore] = useState(0);

  const addDrug = useCallback((drug: Drug) => {
    setSelectedDrugs(prev => {
      const exists = prev.some(d => d.id === drug.id);
      return exists ? prev : [...prev, drug];
    });
  }, []);

  const removeDrug = useCallback((drugId: number) => {
    setSelectedDrugs(prev => prev.filter(d => d.id !== drugId));
  }, []);

  const clearDrugs = useCallback(() => {
    setSelectedDrugs([]);
    setInteractionResults([]);
    setDetectedCliques([]);
    setRiskScore(0);
  }, []);

  const calculateRiskScore = useCallback(
    (interactions: Interaction[]): number => {
      const majorCount = interactions.filter(i => i.severity === 'major').length;
      const moderateCount = interactions.filter(i => i.severity === 'moderate').length;
      const minorCount = interactions.filter(i => i.severity === 'minor').length;

      const score = majorCount * 40 + moderateCount * 20 + minorCount * 5;
      return Math.min(score, 100);
    },
    []
  );

  const analyzeInteractions = useCallback(() => {
    if (selectedDrugs.length < 2) {
      setInteractionResults([]);
      setDetectedCliques([]);
      setRiskScore(0);
      return;
    }

    // Find all pairwise interactions
    const detected: Interaction[] = [];
    const selectedDrugNames = selectedDrugs.map(d => d.name);

    for (let i = 0; i < selectedDrugNames.length; i++) {
      for (let j = i + 1; j < selectedDrugNames.length; j++) {
        const drugA = selectedDrugNames[i];
        const drugB = selectedDrugNames[j];

        const interaction = MOCK_INTERACTIONS.find(
          m =>
            (m.drugA === drugA && m.drugB === drugB) ||
            (m.drugA === drugB && m.drugB === drugA)
        );

        if (interaction) {
          detected.push({
            drugA: interaction.drugA,
            drugB: interaction.drugB,
            severity: interaction.severity as 'major' | 'moderate' | 'minor',
            description: interaction.description,
          });
        }
      }
    }

    // Build adjacency list and find maximal cliques
    const adjacencyList = buildAdjacencyList(
      MOCK_INTERACTIONS.filter(i =>
        selectedDrugNames.includes(i.drugA) &&
        selectedDrugNames.includes(i.drugB)
      )
    );

    const cliques = findMaximalCliques(adjacencyList);
    const cliqueObjects: DetectedClique[] = cliques
      .filter(clique => clique.length >= 3) // Only show 3+ drug interactions
      .map(clique => ({
        drugs: clique,
        severity: getCliqueSeverity(
          clique,
          MOCK_INTERACTIONS.filter(i =>
            clique.includes(i.drugA) && clique.includes(i.drugB)
          )
        ),
      }));

    // Calculate risk score
    const score = calculateRiskScore(detected);

    setInteractionResults(detected);
    setDetectedCliques(cliqueObjects);
    setRiskScore(score);
  }, [selectedDrugs, calculateRiskScore]);

  const value: AppContextType = useMemo(
    () => ({
      selectedDrugs,
      addDrug,
      removeDrug,
      clearDrugs,
      interactionResults,
      riskScore,
      detectedCliques,
      analyzeInteractions,
      availableDrugs: AVAILABLE_DRUGS,
    }),
    [selectedDrugs, addDrug, removeDrug, clearDrugs, interactionResults, riskScore, detectedCliques, analyzeInteractions]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextType {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
