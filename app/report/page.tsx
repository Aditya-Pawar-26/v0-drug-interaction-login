import { ClinicalReport } from '@/components/clinical-report';

export const metadata = {
  title: 'Clinical Drug Interaction Report',
  description: 'Printable drug interaction report for patient',
};

export default function ReportPage() {
  return (
    <div className="min-h-screen bg-white">
      <ClinicalReport />
    </div>
  );
}
