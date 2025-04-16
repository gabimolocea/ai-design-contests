'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import { 
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  sendSignInLinkToEmail 
} from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';

// Add to your .env.local
const actionCodeSettings = {
  url: process.env.NEXT_PUBLIC_FIREBASE_REDIRECT_URL || 'http://localhost:3000/login',
  handleCodeInApp: true,
};

export function AuthModal({ closeModal }: { closeModal: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'magicLink' | 'password'>('magicLink');
  const router = useRouter(); // Initialize useRouter

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', email);
      alert('Check your email for the magic link!');
    } catch (err) {
      if (err instanceof Error) {
        if (err instanceof Error) {
          if (err instanceof Error) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
          } else {
            setError('An unknown error occurred.');
          }
        } else {
          setError('An unknown error occurred.');
        }
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Redirect to "/dashboard" after login
  useAuthRedirect("/");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful:", userCredential); // Debug log
      closeModal(); // Close the modal
      router.push("/"); // Redirect to the homepage
    } catch (err) {
      console.error("Login error:", err); // Debug log
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
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
      closeModal(); // Close the modal
      router.push("/");
    } catch (err) {
      console.error("Google login error:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm" className="text-sm font-medium">
          Log in
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[380px] p-8 rounded-lg">
        <DialogHeader className="items-center">
          <DialogTitle className="text-2xl font-normal mb-6">Log in</DialogTitle>
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

          <Button 
            variant="outline" 
            className="w-full h-10 justify-start gap-3 px-4 text-sm"
            onClick={handleGithubLogin}
          >
            <Github className="h-4 w-4" />
            Continue with GitHub
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or
              </span>
            </div>
          </div>

          <div className="flex border-b mb-4">
            <button
              className={`flex-1 py-2 text-sm font-medium ${activeTab === 'magicLink' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
              onClick={() => setActiveTab('magicLink')}
            >
              Magic Link
            </button>
            <button
              className={`flex-1 py-2 text-sm font-medium ${activeTab === 'password' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
              onClick={() => setActiveTab('password')}
            >
              Password
            </button>
          </div>

          {activeTab === 'magicLink' ? (
            <form onSubmit={handleMagicLink}>
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-10"
                  required
                />
                <p className="text-xs text-muted-foreground px-1">
                  We'll email you a magic link for a password-free sign in.
                </p>
              </div>
              <Button 
                type="submit" 
                className="w-full mt-4 h-10"
                disabled={isLoading}
              >
                {isLoading ? 'Sending link...' : 'Get magic link'}
              </Button>
            </form>
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
                {isLoading ? 'Signing in...' : 'Sign in with password'}
              </Button>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}