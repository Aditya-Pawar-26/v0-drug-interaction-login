# Dynamic Logging & Full AppContext Integration

## Overview
The `/app/checker/page.tsx` is now fully dynamic with complete AppContext integration. When users add/remove drugs and trigger analysis, the entire flow is wired to global state with detailed terminal-style logging.

## Drug Selection Flow

### When a Drug is Added
1. **300ms delay sequence**:
   - T+0ms: `▶ Node added: [drugname] | Adjacency list updated | O(1)`
   - T+300ms: `▶ Checking pairs via DFS | O(V+E) | DAA Unit II`
   - T+600ms (per existing drug): `▶ Edge: [DrugA] ↔ [DrugB] | [SEVERITY] | DAA Unit II`

2. **Context updates**:
   - `addDrug()` adds to `selectedDrugs` array
   - Chips render with color-coded class styling
   - Remove button uses `removeDrug()` callback

### When a Drug is Removed
- `removeDrug()` updates context
- Log appends: `▶ Drug removed from analysis`

## Analysis Flow

### When "Analyze Interactions" is Clicked
1. **Validation**: Check minimum 2 drugs selected
2. **Execution sequence** (100ms intervals):
   - T+0ms: Call `analyzeInteractions()` which:
     - Finds all drug pairs in mock database
     - Populates `interactionResults` with severity
     - Calculates `riskScore` using formula: `(major×40 + moderate×20 + minor×5)` capped at 100
     - Runs Bron-Kerbosch algorithm to find 3+ drug cliques
     - Saves results to `detectedCliques` in context
   - T+100ms: `▶ Running DFS traversal | O(V+E) | DAA Unit II`
   - T+400ms: `▶ Bron-Kerbosch clique detection | DAA Unit V — NP-Complete`
   - T+700ms: `▶ Analysis complete | Found [N] interactions`
   - T+1000ms: Navigate to `/results` page (data already in context)

## Log Panel Features

### Dynamic Updates
- **Auto-scroll**: Panel automatically scrolls to bottom as logs append
- **Terminal styling**: Green `$` prompt with monospace font
- **Live aria-live region**: Screen readers announce updates
- **Max height**: Shows up to 10-12 log lines before scrolling

### Sample Log Sequence
```
▶ Drug Interaction Checker initialized
▶ Awaiting drug input...
▶ Node added: Warfarin | Adjacency list updated | O(1)
▶ Checking pairs via DFS | O(V+E) | DAA Unit II
▶ Node added: Aspirin | Adjacency list updated | O(1)
▶ Checking pairs via DFS | O(V+E) | DAA Unit II
▶ Edge: Warfarin ↔ Aspirin | MAJOR | DAA Unit II
▶ Running DFS traversal | O(V+E) | DAA Unit II
▶ Bron-Kerbosch clique detection | DAA Unit V — NP-Complete
▶ Analysis complete | Found 1 interactions
```

## Implementation Details

### useRef for Auto-Scroll
```typescript
const logPanelRef = useRef<HTMLDivElement>(null)

useEffect(() => {
  if (logPanelRef.current) {
    logPanelRef.current.scrollTop = logPanelRef.current.scrollHeight
  }
}, [logs])
```

### Context Integration
- **selectedDrugs** - Array of Drug objects with id, name, class, dosage
- **interactionResults** - Array of pairwise interactions (drugA, drugB, severity, description)
- **riskScore** - Number 0-100 calculated from interaction severity counts
- **detectedCliques** - Array of 3+ drug combinations that all interact

### Mock Interaction Data
```typescript
[
  { drugA: 'Warfarin', drugB: 'Aspirin', severity: 'major' },
  { drugA: 'Warfarin', drugB: 'Ibuprofen', severity: 'moderate' },
  { drugA: 'Aspirin', drugB: 'Ibuprofen', severity: 'moderate' },
  { drugA: 'Warfarin', drugB: 'Clopidogrel', severity: 'major' },
  { drugA: 'Lisinopril', drugB: 'PotassiumChloride', severity: 'major' },
]
```

## Data Flow Diagram
```
DrugSearchCard
  ├─ handleDrugSelect()
  │  ├─ addDrug() → selectedDrugs (context)
  │  └─ setLogs() → terminal display
  │
  ├─ handleRemoveDrug()
  │  ├─ removeDrug() → selectedDrugs (context)
  │  └─ setLogs() → terminal display
  │
  └─ handleAnalyze()
     ├─ analyzeInteractions() → populates context
     │  ├─ interactionResults
     │  ├─ riskScore
     │  └─ detectedCliques
     ├─ setLogs() → animated logs
     └─ router.push('/results') → displays context data
```

## Responsive Design
- Log panel max-height: `max-h-40` (160px)
- Overflow auto-scroll enabled
- Mobile: Full width, stacked layout
- Desktop: Side-by-side with chips above, logs below

## Accessibility
- ARIA live region: `aria-live="polite"` for log updates
- Semantic role: `role="log"`
- Alt text on all interactive elements
- Color-coded severity with text labels, not just colors

## Build Status
✅ All 6 routes compile successfully
- Routes: /, /checker, /profile, /report, /results, /_not-found
- Build time: ~2.7s
- No TypeScript errors or warnings
