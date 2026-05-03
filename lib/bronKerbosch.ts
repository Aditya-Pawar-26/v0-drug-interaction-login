/**
 * Bron-Kerbosch Algorithm for finding maximal cliques
 * A clique is a subset of vertices where every pair is connected by an edge
 * This implementation uses the pivot variant for optimization
 */

export interface AdjacencyList {
  [key: string]: string[];
}

export interface Clique {
  drugs: string[];
  severity: 'major' | 'moderate' | 'minor';
}

/**
 * Find all maximal cliques in an undirected graph using Bron-Kerbosch algorithm
 * @param adjacencyList - Adjacency list representation of the graph
 * @returns Array of cliques (each clique is an array of drug names)
 */
export function findMaximalCliques(adjacencyList: AdjacencyList): string[][] {
  const cliques: string[][] = [];
  const vertices = Object.keys(adjacencyList);

  function bronKerbosch(
    r: Set<string>,
    p: Set<string>,
    x: Set<string>
  ): void {
    if (p.size === 0 && x.size === 0) {
      // Found a maximal clique
      if (r.size > 0) {
        cliques.push(Array.from(r).sort());
      }
      return;
    }

    // Choose pivot from P ∪ X (the vertex with max neighbors in P)
    const candidates = new Set([...p, ...x]);
    let pivot = '';
    let maxNeighbors = -1;

    for (const v of candidates) {
      const neighbors = adjacencyList[v] || [];
      const neighborsInP = neighbors.filter(n => p.has(n)).length;
      if (neighborsInP > maxNeighbors) {
        maxNeighbors = neighborsInP;
        pivot = v;
      }
    }

    // Process vertices in P \ N(pivot)
    const pivotNeighbors = new Set(adjacencyList[pivot] || []);
    const toProcess = Array.from(p).filter(v => !pivotNeighbors.has(v));

    for (const v of toProcess) {
      const neighbors = adjacencyList[v] || [];
      const newR = new Set([...r, v]);
      const newP = new Set(p).intersection(new Set(neighbors));
      const newX = new Set(x).intersection(new Set(neighbors));

      bronKerbosch(newR, newP, newX);

      p.delete(v);
      x.add(v);
    }
  }

  const initialP = new Set(vertices);
  const initialX = new Set<string>();
  const initialR = new Set<string>();

  bronKerbosch(initialR, initialP, initialX);

  return cliques;
}

/**
 * Build adjacency list from interaction data
 * @param interactions - Array of drug interactions
 * @returns Adjacency list where edges exist between interacting drugs
 */
export function buildAdjacencyList(
  interactions: Array<{
    drugA: string;
    drugB: string;
    severity: string;
  }>
): AdjacencyList {
  const adjacencyList: AdjacencyList = {};

  for (const interaction of interactions) {
    const { drugA, drugB } = interaction;

    if (!adjacencyList[drugA]) {
      adjacencyList[drugA] = [];
    }
    if (!adjacencyList[drugB]) {
      adjacencyList[drugB] = [];
    }

    if (!adjacencyList[drugA].includes(drugB)) {
      adjacencyList[drugA].push(drugB);
    }
    if (!adjacencyList[drugB].includes(drugA)) {
      adjacencyList[drugB].push(drugA);
    }
  }

  return adjacencyList;
}

/**
 * Determine severity of a clique based on its interactions
 */
export function getCliqueSeverity(
  clique: string[],
  interactions: Array<{
    drugA: string;
    drugB: string;
    severity: string;
  }>
): 'major' | 'moderate' | 'minor' {
  let maxSeverity = 'minor';

  for (const interaction of interactions) {
    const { drugA, drugB, severity } = interaction;

    if (
      (clique.includes(drugA) && clique.includes(drugB)) ||
      clique.length > 2
    ) {
      if (severity === 'major') {
        return 'major';
      }
      if (severity === 'moderate' && maxSeverity !== 'major') {
        maxSeverity = 'moderate';
      }
    }
  }

  return maxSeverity as 'major' | 'moderate' | 'minor';
}
