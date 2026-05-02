'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import MedicalCrossLogo from '@/components/medical-cross-logo';
import RoleSelector from '@/components/role-selector';
import LoginForm from '@/components/login-form';

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<'doctor' | 'patient' | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center p-4">
      <Card className="w-full max-w-md border border-border/50 shadow-lg bg-card">
        <div className="p-8 space-y-8">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="p-3 bg-primary/10 rounded-full">
              <MedicalCrossLogo />
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
            <RoleSelector onSelectRole={setSelectedRole} />
          ) : (
            <LoginForm role={selectedRole} onBack={() => setSelectedRole(null)} />
          )}
        </div>
      </Card>

      {/* Footer */}
      <div className="fixed bottom-6 left-0 right-0 text-center text-xs text-muted-foreground">
        <p>For healthcare professionals only. Always verify with official drug references.</p>
      </div>
    </div>
  );
}
