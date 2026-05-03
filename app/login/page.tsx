'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import MedicalCrossLogo from '@/components/medical-cross-logo';
import { ChevronLeft, Mail, Lock, Stethoscope, User, Activity } from 'lucide-react';
import { useApp } from '@/lib/AppContext';

type Role = 'doctor' | 'patient';

const MOCK_CREDS: Record<Role, { email: string; password: string }> = {
  doctor: { email: 'doctor@rxgraph.com', password: 'pass123' },
  patient: { email: 'patient@rxgraph.com', password: 'pass123' },
};

export default function LoginPage() {
  const router = useRouter();
  const { setUserRole } = useApp();
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    setEmail(MOCK_CREDS[role].email);
    setPassword('');
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!selectedRole) return;

    const creds = MOCK_CREDS[selectedRole];
    if (email !== creds.email || password !== creds.password) {
      setError('Invalid credentials. Try: ' + creds.email + ' / pass123');
      return;
    }

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setUserRole(selectedRole);
    router.push('/profile');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center p-4">
      <Card className="w-full max-w-md border border-border/50 shadow-lg bg-card">
        <div className="p-8 space-y-8">
          {/* Logo */}
          <div className="flex flex-col items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-full">
              <MedicalCrossLogo />
            </div>
            <div className="flex items-center gap-1.5 text-primary font-bold text-xl tracking-tight">
              <Activity className="w-5 h-5" />
              RxGraph
            </div>
          </div>

          {/* Header */}
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold text-foreground tracking-tight">
              Drug Interaction Checker
            </h1>
            <p className="text-muted-foreground text-sm">
              Clinical medication safety platform
            </p>
          </div>

          {/* Content */}
          {!selectedRole ? (
            /* Role Selector */
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground text-center">
                Select your role to continue
              </p>
              <div className="grid grid-cols-1 gap-3">
                <Button
                  onClick={() => handleRoleSelect('doctor')}
                  variant="outline"
                  className="h-14 border-2 border-primary/30 hover:border-primary hover:bg-primary/5 transition-all duration-200"
                >
                  <Stethoscope className="mr-3 h-5 w-5 text-primary" />
                  <span className="text-base font-semibold">Login as Doctor</span>
                </Button>
                <Button
                  onClick={() => handleRoleSelect('patient')}
                  variant="outline"
                  className="h-14 border-2 border-primary/30 hover:border-primary hover:bg-primary/5 transition-all duration-200"
                >
                  <User className="mr-3 h-5 w-5 text-primary" />
                  <span className="text-base font-semibold">Login as Patient</span>
                </Button>
              </div>
            </div>
          ) : (
            /* Login Form */
            <div className="space-y-6">
              <button
                onClick={() => { setSelectedRole(null); setError(''); }}
                className="flex items-center text-primary hover:text-primary/80 text-sm font-medium transition-colors"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to role selection
              </button>

              <div>
                <h2 className="text-xl font-semibold text-foreground capitalize">
                  {selectedRole} Login
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Enter your credentials to access the system
                </p>
              </div>

              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-md text-sm text-red-600 dark:text-red-400">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-9"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-foreground">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="pass123"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pl-9"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold mt-2"
                >
                  {isLoading ? 'Signing in...' : 'Continue'}
                </Button>
              </form>
            </div>
          )}
        </div>
      </Card>

      {/* Footer badge */}
      <div className="fixed bottom-6 left-0 right-0 text-center">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-teal-100 text-teal-800 border border-teal-200">
          Powered by Graph Theory · DMS Unit V
        </span>
      </div>
    </div>
  );
}
