export interface Drug {
  id: string;
  name: string;
  class: string;
  color: 'blue' | 'orange' | 'purple' | 'green' | 'red' | 'cyan';
}

export interface Interaction {
  drugA: string;
  drugB: string;
  severity: 'MAJOR' | 'MODERATE' | 'MINOR';
  description: string;
}

export const DRUG_DATABASE: Drug[] = [
  { id: 'warfarin', name: 'Warfarin', class: 'Anticoagulant', color: 'blue' },
  { id: 'aspirin', name: 'Aspirin', class: 'NSAID / Antiplatelet', color: 'orange' },
  { id: 'ibuprofen', name: 'Ibuprofen', class: 'NSAID', color: 'orange' },
  { id: 'metformin', name: 'Metformin', class: 'Antidiabetic', color: 'purple' },
  { id: 'lisinopril', name: 'Lisinopril', class: 'ACE Inhibitor', color: 'green' },
  { id: 'potassium', name: 'Potassium Chloride', class: 'Electrolyte Supplement', color: 'green' },
  { id: 'atorvastatin', name: 'Atorvastatin', class: 'Statin', color: 'red' },
  { id: 'amlodipine', name: 'Amlodipine', class: 'Calcium Channel Blocker', color: 'cyan' },
  { id: 'omeprazole', name: 'Omeprazole', class: 'Proton Pump Inhibitor', color: 'blue' },
  { id: 'clopidogrel', name: 'Clopidogrel', class: 'Antiplatelet', color: 'red' },
];

export const INTERACTION_DATABASE: Interaction[] = [
  {
    drugA: 'Warfarin',
    drugB: 'Aspirin',
    severity: 'MAJOR',
    description: 'Increased bleeding risk — anticoagulant and antiplatelet effects compound.',
  },
  {
    drugA: 'Warfarin',
    drugB: 'Ibuprofen',
    severity: 'MODERATE',
    description: 'NSAID elevates anticoagulation; GI bleed risk increased.',
  },
  {
    drugA: 'Aspirin',
    drugB: 'Ibuprofen',
    severity: 'MODERATE',
    description: 'Duplicate antiplatelet activity; gastrointestinal ulceration risk.',
  },
  {
    drugA: 'Warfarin',
    drugB: 'Clopidogrel',
    severity: 'MAJOR',
    description: 'Dual antiplatelet + anticoagulant — severe hemorrhage risk.',
  },
  {
    drugA: 'Lisinopril',
    drugB: 'Potassium Chloride',
    severity: 'MAJOR',
    description: 'ACE inhibitor reduces potassium excretion — hyperkalemia risk.',
  },
];

export function getInteractions(selectedDrugs: Drug[]): Interaction[] {
  const names = selectedDrugs.map((d) => d.name);
  return INTERACTION_DATABASE.filter(
    (i) => names.includes(i.drugA) && names.includes(i.drugB)
  );
}

export function calculateRiskScore(interactions: Interaction[]): number {
  let score = 0;
  for (const i of interactions) {
    if (i.severity === 'MAJOR') score += 40;
    else if (i.severity === 'MODERATE') score += 20;
    else score += 5;
  }
  return Math.min(score, 100);
}

// Bron-Kerbosch maximal clique enumeration
export function bronKerbosch(drugs: Drug[], interactions: Interaction[]): string[][] {
  const names = drugs.map((d) => d.name);
  const adj: Record<string, Set<string>> = {};
  for (const n of names) adj[n] = new Set();
  for (const i of interactions) {
    if (names.includes(i.drugA) && names.includes(i.drugB)) {
      adj[i.drugA].add(i.drugB);
      adj[i.drugB].add(i.drugA);
    }
  }

  const cliques: string[][] = [];

  function bk(R: string[], P: string[], X: string[]) {
    if (P.length === 0 && X.length === 0) {
      if (R.length >= 2) cliques.push([...R]);
      return;
    }
    const pivot = [...P, ...X].reduce((best, v) =>
      (adj[v]?.size ?? 0) > (adj[best]?.size ?? 0) ? v : best
    );
    const candidates = P.filter((v) => !adj[pivot]?.has(v));
    for (const v of candidates) {
      const neighbors = [...(adj[v] ?? [])];
      bk(
        [...R, v],
        P.filter((u) => neighbors.includes(u)),
        X.filter((u) => neighbors.includes(u))
      );
      P = P.filter((u) => u !== v);
      X = [...X, v];
    }
  }

  bk([], [...names], []);
  return cliques;
}
