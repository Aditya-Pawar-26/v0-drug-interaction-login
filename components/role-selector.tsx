import { Button } from '@/components/ui/button';
import { Stethoscope, User } from 'lucide-react';

interface RoleSelectorProps {
  onSelectRole: (role: 'doctor' | 'patient') => void;
}

export default function RoleSelector({ onSelectRole }: RoleSelectorProps) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground text-center">
        Select your role to continue
      </p>

      <div className="grid grid-cols-1 gap-3">
        <Button
          onClick={() => onSelectRole('doctor')}
          variant="outline"
          className="h-14 border-2 border-primary/30 hover:border-primary hover:bg-primary/5 transition-all duration-200"
        >
          <Stethoscope className="mr-3 h-5 w-5 text-primary" />
          <span className="text-base font-semibold">Login as Doctor</span>
        </Button>

        <Button
          onClick={() => onSelectRole('patient')}
          variant="outline"
          className="h-14 border-2 border-primary/30 hover:border-primary hover:bg-primary/5 transition-all duration-200"
        >
          <User className="mr-3 h-5 w-5 text-primary" />
          <span className="text-base font-semibold">Login as Patient</span>
        </Button>
      </div>

      <p className="text-xs text-muted-foreground text-center pt-2">
        Don&apos;t have an account? <a href="#" className="text-primary hover:underline font-medium">Sign up here</a>
      </p>
    </div>
  );
}
