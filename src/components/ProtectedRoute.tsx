'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';


export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login'); // Redirect to login if not authenticated
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p>Loading or verifying authentication...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}