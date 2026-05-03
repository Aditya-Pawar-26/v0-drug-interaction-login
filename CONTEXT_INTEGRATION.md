# AppContext Integration - Complete Summary

## Overview
A comprehensive React Context system has been implemented to manage all state and data flow across the Drug Interaction Checker application. The context enables seamless data sharing between pages and components.

## Files Created

### 1. **`lib/bronKerbosch.ts`** - Algorithm Library
Implementation of the Bron-Kerbosch algorithm for finding maximal cliques in drug interaction graphs.

**Key Functions:**
- `findMaximalCliques(adjacencyList)` - Finds all maximal cliques in a graph
- `buildAdjacencyList(interactions)` - Builds graph adjacency list from interaction data
- `getCliqueSeverity(clique, interactions)` - Determines severity of drug cliques

**Usage:** Used by AppContext to detect dangerous multi-drug combinations (3+ drugs interacting).

---

### 2. **`context/AppContext.tsx`** - Global State Management
Central React Context for managing all application state.

**Context Value Properties:**

```typescript
interface AppContextType {
  // Drug Management
  selectedDrugs: Drug[]
  addDrug(drug: Drug): void
  removeDrug(drugId: number): void
  clearDrugs(): void

  // Analysis Results
  interactionResults: Interaction[]
  riskScore: number
  detectedCliques: DetectedClique[]

  // Methods
  analyzeInteractions(): void
  availableDrugs: Drug[]
}
```

**Risk Score Calculation:**
```
riskScore = min((majorCount × 40) + (moderateCount × 20) + (minorCount × 5), 100)
```

**Mock Data Included:**
- 13 available drugs (Warfarin, Aspirin, Ibuprofen, etc.)
- 8 drug interactions with severity levels
- Pre-configured drug classes and dosages

---

## Updated Components

### **`components/drug-search-card.tsx`**
Now uses AppContext to:
- Access `availableDrugs` for autocomplete
- Call `addDrug()` when drug is selected
- Call `removeDrug()` when chip is deleted
- Call `analyzeInteractions()` on "Analyze" button
- Navigate to `/results` after analysis

**Key Changes:**
- Removed local drug database (uses context now)
- Updated color mapping to use drug class instead of color enum
- Added validation to require ≥2 drugs before analysis
- Connected "Analyze" button to trigger analysis and navigation

---

### **`components/interaction-results-panel.tsx`**
Now uses AppContext to:
- Display `interactionResults` from context
- Show `riskScore` with dynamic risk level
- Display `detectedCliques` for multi-drug warnings
- Remove hard-coded mock data

**Key Changes:**
- All interaction data comes from `useApp()` hook
- Risk level dynamically calculated based on score
- Dangerous combinations display cliques from Bron-Kerbosch algorithm
- Proper TypeScript types for severity ('major', 'moderate', 'minor')

---

### **`app/layout.tsx`**
Wrapped entire app with AppProvider.

**Change:**
```tsx
<AppProvider>
  {children}
</AppProvider>
```

---

## Mock Interaction Database

**5 Major Severity Interactions:**
1. Warfarin + Aspirin → "Risk of serious bleeding"
2. Warfarin + Clopidogrel → "Severe bleeding risk"
3. Lisinopril + PotassiumChloride → "Risk of hyperkalemia"
4. Simvastatin + Grapefruit → "Increased statin levels"

**2 Moderate Severity Interactions:**
1. Warfarin + Ibuprofen → "Increased anticoagulation effect"
2. Aspirin + Ibuprofen → "Increased GI bleeding risk"
3. Metformin + Alcohol → "Lactic acidosis risk"
4. Amoxicillin + Methotrexate → "Increased toxicity"

---

## Data Flow

### Scenario: User Selects and Analyzes Drugs

1. **User selects drugs** on `/checker` page
   - Clicks drug in autocomplete dropdown
   - `addDrug()` called via context
   - Drug added to `selectedDrugs` array
   - Colored chip appears showing drug + dosage

2. **User clicks "Analyze Interactions"**
   - Validation: requires ≥2 drugs
   - Calls `analyzeInteractions()` from context
   - Bron-Kerbosch algorithm runs
   - `interactionResults` populated with pairwise interactions
   - `riskScore` calculated
   - `detectedCliques` populated with multi-drug combinations
   - Navigation to `/results` page

3. **Results page displays analysis**
   - All data from `useApp()` hook
   - Risk gauge shows score and level
   - Interaction list shows all pairs
   - Dangerous combination alert displays cliques

4. **User can modify selection**
   - Click chip "X" to remove drug
   - `removeDrug()` called
   - Analysis doesn't auto-run (must click Analyze again)

---

## Hook Usage

**In any component:**
```tsx
import { useApp } from '@/context/AppContext'

export function MyComponent() {
  const {
    selectedDrugs,
    addDrug,
    removeDrug,
    interactionResults,
    riskScore,
    detectedCliques,
    analyzeInteractions
  } = useApp()

  // Use context values...
}
```

---

## Type Definitions

**Drug:**
```typescript
interface Drug {
  id: number
  name: string
  class: string
  dosage: string
}
```

**Interaction:**
```typescript
interface Interaction {
  drugA: string
  drugB: string
  severity: 'major' | 'moderate' | 'minor'
  description: string
}
```

**DetectedClique:**
```typescript
interface DetectedClique {
  drugs: string[]
  severity: 'major' | 'moderate' | 'minor'
}
```

---

## Algorithm Integration

**Bron-Kerbosch Pivot Variant:**
- Optimized for finding maximal cliques
- Uses pivot selection to reduce search space
- Time Complexity: O(3^(n/3)) worst case
- Practical performance good for small graphs

**When Used:**
- After `analyzeInteractions()` called
- Only displays cliques with 3+ drugs
- Severity determined by highest interaction severity in clique

---

## Build Status
✅ All routes compile successfully
- `/` - Login
- `/checker` - Drug search with context integration
- `/results` - Results display with context data
- `/profile` - Patient profile
- `/report` - Clinical report

**Total Build Time:** ~2.7s (Turbopack)

---

## Next Steps for Development

1. **Backend Integration:**
   - Replace mock data with API calls
   - Persist analysis results to database
   - Add user authentication state

2. **Advanced Features:**
   - Save favorite drug combinations
   - Generate PDF reports with analysis
   - Add drug dosage customization

3. **Performance:**
   - Memoize expensive calculations
   - Lazy load large datasets
   - Cache previous analyses

---

## Key Files Reference

```
context/
  └── AppContext.tsx          (Central context with state & logic)

lib/
  └── bronKerbosch.ts         (Maximal clique algorithm)

app/
  ├── layout.tsx              (AppProvider wrapper)
  ├── page.tsx                (Login)
  ├── checker/page.tsx        (Drug search - uses context)
  ├── results/page.tsx        (Results display - uses context)
  ├── profile/page.tsx        (Patient profile)
  └── report/page.tsx         (Clinical report)

components/
  ├── drug-search-card.tsx    (Updated to use context)
  ├── interaction-results-panel.tsx (Updated to use context)
  └── [other components...]
```

---

**Context-Integrated Successfully! ✅**
All pages now share state through AppContext with proper type safety and React best practices.
