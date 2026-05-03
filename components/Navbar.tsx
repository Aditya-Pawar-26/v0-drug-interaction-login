'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/AppContext';
import { Activity, LogOut, User, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const { userRole, setUserRole } = useApp();
  const router = useRouter();

  const handleLogout = () => {
    setUserRole(null);
    router.push('/login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#0f3638] text-white shadow-md print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/profile" className="flex items-center gap-2 font-bold text-lg tracking-tight hover:opacity-90 transition-opacity">
            <Activity className="w-5 h-5 text-teal-300" />
            <span>RxGraph</span>
          </Link>

          {/* Nav Links */}
          <div className="hidden sm:flex items-center gap-1">
            <Link href="/profile" className="px-3 py-1.5 rounded-md text-sm font-medium text-teal-100 hover:bg-teal-700/50 transition-colors">
              Profile
            </Link>
            <Link href="/analyze" className="px-3 py-1.5 rounded-md text-sm font-medium text-teal-100 hover:bg-teal-700/50 transition-colors">
              Analyze
            </Link>
            <Link href="/results" className="px-3 py-1.5 rounded-md text-sm font-medium text-teal-100 hover:bg-teal-700/50 transition-colors">
              Results
            </Link>
            <Link href="/report" className="px-3 py-1.5 rounded-md text-sm font-medium text-teal-100 hover:bg-teal-700/50 transition-colors">
              Report
            </Link>
          </div>

          {/* Right: role badge + logout */}
          <div className="flex items-center gap-3">
            {userRole && (
              <div className="hidden sm:flex items-center gap-1.5 bg-teal-700/40 rounded-full px-3 py-1 text-xs font-medium text-teal-200">
                {userRole === 'doctor' ? (
                  <Stethoscope className="w-3.5 h-3.5" />
                ) : (
                  <User className="w-3.5 h-3.5" />
                )}
                <span className="capitalize">{userRole}</span>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-teal-100 hover:text-white hover:bg-teal-700/50 gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
