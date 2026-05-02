export default function MedicalCrossLogo() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-primary"
    >
      {/* Background circle */}
      <circle cx="20" cy="20" r="20" fill="currentColor" opacity="0.1" />
      
      {/* Medical cross */}
      <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        {/* Vertical line */}
        <line x1="20" y1="8" x2="20" y2="32" />
        {/* Horizontal line */}
        <line x1="8" y1="20" x2="32" y2="20" />
      </g>
    </svg>
  );
}
