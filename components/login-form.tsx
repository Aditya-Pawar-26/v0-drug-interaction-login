'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft, Mail, Lock } from 'lucide-react';

interface LoginFormProps {
  role: 'doctor' | 'patient';
  onBack: () => void;
}

export default function LoginForm({ role, onBack }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Login:', { email, password, role });
    setIsLoading(false);
  };

  const roleLabel = role === 'doctor' ? 'Doctor' : 'Patient';

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center text-primary hover:text-primary/80 text-sm font-medium transition-colors"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to role selection
      </button>

      {/* Form Header */}
      <div>
        <h2 className="text-xl font-semibold text-foreground">
          {roleLabel} Login
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Enter your credentials to access the system
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="pl-10 bg-input border border-border/50 focus:border-primary focus:ring-primary/50 transition-colors"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-foreground">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="pl-10 bg-input border border-border/50 focus:border-primary focus:ring-primary/50 transition-colors"
            />
          </div>
        </div>

        {/* Forgot Password */}
        <div className="flex justify-end">
          <a href="#" className="text-xs text-primary hover:underline font-medium">
            Forgot password?
          </a>
        </div>

        {/* Continue Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-colors mt-2"
        >
          {isLoading ? 'Signing in...' : 'Continue'}
        </Button>
      </form>

      {/* Footer */}
      <div className="pt-2 border-t border-border/50">
        <p className="text-xs text-muted-foreground text-center">
          Don&apos;t have an account? <a href="#" className="text-primary hover:underline font-medium">Create one</a>
        </p>
      </div>
    </div>
  );
}
