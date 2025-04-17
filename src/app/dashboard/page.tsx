'use client';

import { useAuth } from '@/context/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
    <div className="container py-8 mx-auto max-w-[1080] px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Welcome back, {user?.displayName || 'User'}!</h1>
        <Button asChild>
          <Link href="/create-contest">Start New Contest</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Active Contests Card */}
        <Card>
          <CardHeader>
            <CardTitle>Your Active Contests</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">5</p>
            <Button variant="link" className="pl-0 mt-4">
              <Link href="/contests/active">View all</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Submissions Card */}
        <Card>
          <CardHeader>
            <CardTitle>Your Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">12</p>
            <Button variant="link" className="pl-0 mt-4">
              <Link href="/submissions">View all</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Notifications Card */}
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">3</p>
            <Button variant="link" className="pl-0 mt-4">
              <Link href="/notifications">View all</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Section */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {/* Example activity items */}
          <div className="border rounded-lg p-4">
            <p>Your submission for &quot;Logo Design Contest&quot; received 5 stars</p>
            <p className="text-sm text-muted-foreground">2 hours ago</p>
          </div>
          <div className="border rounded-lg p-4">
            <p>New contest &quot;Website Redesign&quot; matches your skills</p>
            <p className="text-sm text-muted-foreground">1 day ago</p>
          </div>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}