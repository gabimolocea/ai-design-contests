'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AuthModal } from '@/components/auth-modal';
import { useAuth } from '@/context/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, User, Settings, LayoutDashboard } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import Link from 'next/link';

export function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, loading } = useAuth();
  const [role, setRole] = useState<string | null>(null);

  // Simulate fetching the user's role (replace with actual logic)
  useEffect(() => {
    const fetchUserRole = async () => {
      if (user) {
        // Replace this with your actual logic to fetch the user's role
        const userRole = 'Customer'; // Example: 'Customer' or 'Designer'
        setRole(userRole);
      } else {
        setRole(null); // Non-logged-in users
      }
    };

    fetchUserRole();
  }, [user]);

  if (loading) {
    return null; // Optionally, show a loading spinner
  }

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="top-0 z-50 w-full">
      <div className="flex h-16 items-center justify-between px-4 w-full mx-auto">
        {/* Left Column */}
        <h1 className="text-xl font-bold">Zignative</h1>

        {/* Central Column */}
        <div className="flex items-center gap-6">
          {/* Dashboard */}
          {(role === 'Customer' || role === 'Designer') && (
            <Link href="/dashboard" className="text-gray-700 hover:text-black">
              Dashboard
            </Link>
          )}

          {/* Pricing */}
          {(role === 'Customer' || role === null) && (
            <Link href="/pricing" className="text-gray-700 hover:text-black">
              Pricing
            </Link>
          )}

          {/* Discover */}
          {(role === 'Designer' || role === null) && (
            <Link href="/discover" className="text-gray-700 hover:text-black">
              Discover
            </Link>
          )}

          {/* Contests */}
          {role === 'Designer' && (
            <Link href="/contests" className="text-gray-700 hover:text-black">
              Contests
            </Link>
          )}

          {/* How it works */}
          {role === null && (
            <Link href="/how-it-works" className="text-gray-700 hover:text-black">
              How it works
            </Link>
          )}

          {/* Find a designer */}
          {role === null && (
            <Link href="/find-a-designer" className="text-gray-700 hover:text-black">
              Find a designer
            </Link>
          )}
        </div>

        {/* Right Column */}
        <div className="flex items-center gap-4">
          {/* Create Contest */}
          {(role === 'Customer' || role === null) && (
            <Link href="/create-contest" className="text-gray-700 hover:text-black">
              Create Contest
            </Link>
          )}

          {/* Avatar Dropdown */}
          {!loading && user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
                    <AvatarFallback>
                      {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem className="cursor-pointer">
                  <Link href="/dashboard" className="flex items-center w-full">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Link href="/profile" className="flex items-center w-full">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Link href="/settings" className="flex items-center w-full">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer text-red-600 focus:text-red-600"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Log in Button */}
          {!user && (
            <Button
              onClick={openModal}
              variant="secondary"
              size="sm"
              className="text-sm font-medium"
            >
              Log in
            </Button>
          )}
        </div>
      </div>

      <AuthModal isOpen={isModalOpen} closeModal={closeModal} />
    </header>
  );
}