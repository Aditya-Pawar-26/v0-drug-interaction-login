'use client';

interface RiskScoreBadgeProps {
  score: number;
}

const getRiskColor = (score: number) => {
  if (score >= 70) return 'bg-red-600 text-white';
  if (score >= 40) return 'bg-amber-500 text-white';
  return 'bg-green-600 text-white';
};

const getRiskLabel = (score: number) => {
  if (score >= 70) return 'High Risk';
  if (score >= 40) return 'Moderate Risk';
  return 'Low Risk';
};

export default function RiskScoreBadge({ score }: RiskScoreBadgeProps) {
  return (
    <div className={`${getRiskColor(score)} rounded-lg px-6 py-4 shadow-lg`}>
      <p className="text-xs font-semibold tracking-wide opacity-90 mb-1">CURRENT RISK SCORE</p>
      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-bold">{score}</span>
        <span className="text-lg opacity-90">%</span>
      </div>
      <p className="text-sm font-medium mt-2">{getRiskLabel(score)}</p>
    </div>
  );
}
