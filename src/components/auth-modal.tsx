'use client';

import { useState } from 'react';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export function AuthModal({ isOpen, closeModal }: { isOpen: boolean; closeModal: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'register' | 'login'>('register');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Validate passwords match
      if (password !== confirmPassword) {
        throw new Error("Passwords don't match");
      }

      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Registration successful:", userCredential.user);
      closeModal(); // Close the modal
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful:", userCredential);
      closeModal(); // Close the modal
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError("");

    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      console.log("Google login successful");
      closeModal(); // Close the modal
    } catch (err) {
      console.error("Google login error:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[380px] p-8 rounded-lg">
        <DialogHeader className="items-center">
          <DialogTitle className="text-2xl font-normal mb-6">
            {activeTab === 'register' ? 'Create Account' : 'Log In'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Button 
            variant="outline" 
            className="w-full h-10 justify-start gap-3 px-4 text-sm"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            {isLoading ? 'Signing in with Google...' : 'Continue with Google'}
          </Button>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <div className="flex border-b mb-4">
            <button
              className={`flex-1 py-2 text-sm font-medium ${activeTab === 'register' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
              onClick={() => setActiveTab('register')}
            >
              Register
            </button>
            <button
              className={`flex-1 py-2 text-sm font-medium ${activeTab === 'login' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
              onClick={() => setActiveTab('login')}
            >
              Log In
            </button>
          </div>

          {activeTab === 'register' ? (
            <>
              <form onSubmit={handleRegister}>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-10 mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="register-password">Password</Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-10 mt-1"
                      required
                      minLength={6}
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="h-10 mt-1"
                      required
                      minLength={6}
                    />
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="w-full mt-4 h-10"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating account...' : 'Create Account'}
                </Button>
              </form>
            </>
          ) : (
            <form onSubmit={handleLogin}>
              {error && (
                <div className="mb-4 text-sm text-red-500 p-2 bg-red-50 rounded">
                  {error}
                </div>
              )}
              <div className="space-y-3">
                <div>
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-10 mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-10 mt-1"
                    required
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full mt-4 h-10"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Log In'}
              </Button>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}