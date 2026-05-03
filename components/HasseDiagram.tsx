'use client';

export function HasseDiagram() {
  return (
    <div className="flex justify-center">
      <svg width="300" height="280" viewBox="0 0 300 280" className="drop-shadow-md">
        {/* Title */}
        <text x="150" y="20" textAnchor="middle" className="text-sm font-semibold fill-gray-900 dark:fill-white">
          NSAID Safer Alternative Chain
        </text>

        {/* Top Node: Ibuprofen (Red) */}
        <circle cx="150" cy="60" r="35" fill="#ef4444" opacity="0.8" className="drop-shadow" />
        <text x="150" y="65" textAnchor="middle" dy="0.3em" className="text-white font-bold text-sm">
          Ibuprofen
        </text>

        {/* Arrow 1: Ibuprofen → Naproxen */}
        <line x1="150" y1="95" x2="150" y2="125" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead)" />

        {/* Middle Node: Naproxen (Yellow) */}
        <circle cx="150" cy="160" r="35" fill="#eab308" opacity="0.8" className="drop-shadow" />
        <text x="150" y="165" textAnchor="middle" dy="0.3em" className="text-white font-bold text-sm">
          Naproxen
        </text>

        {/* Arrow 2: Naproxen → Paracetamol */}
        <line x1="150" y1="195" x2="150" y2="225" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead)" />

        {/* Bottom Node: Paracetamol (Green) */}
        <circle cx="150" cy="260" r="35" fill="#22c55e" opacity="0.8" className="drop-shadow" />
        <text x="150" y="260" textAnchor="middle" dy="0.3em" className="text-white font-bold text-sm">
          Paracetamol
        </text>

        {/* Risk Labels */}
        <text x="190" y="65" className="text-xs fill-red-600 dark:fill-red-400 font-mono">
          HIGH RISK
        </text>
        <text x="190" y="165" className="text-xs fill-yellow-700 dark:fill-yellow-400 font-mono">
          MODERATE
        </text>
        <text x="190" y="260" className="text-xs fill-green-700 dark:fill-green-400 font-mono">
          SAFER
        </text>

        {/* Arrow marker definition */}
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#94a3b8" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
