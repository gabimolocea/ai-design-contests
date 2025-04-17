'use client';

import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, User } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase/config';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { FcGoogle } from 'react-icons/fc'; // Google icon

export function AuthModal({
  isOpen,
  closeModal,
  onSuccess,
  hideCloseIcon = false, // New prop to hide the close icon
  disableOpacityLayer = false, // New prop to disable the opacity layer
}: {
  isOpen: boolean;
  closeModal: () => void;
  onSuccess?: () => void; // Optional callback for success
  hideCloseIcon?: boolean;
  disableOpacityLayer?: boolean;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('Designer'); // Default role
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'register' | 'login'>('register');
  const [googleUser, setGoogleUser] = useState<User | null>(null); // Store Google user for role selection
  const [step, setStep] = useState<'auth' | 'role-selection'>('auth'); // Track modal step

  // Registration handler
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (password !== confirmPassword) {
        throw new Error("Passwords don't match");
      }

      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store user data in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        displayName: user.displayName || '',
        role: role, // Store the selected role
      });

      console.log('Registration successful:', user);
      if (onSuccess) onSuccess(); // Trigger success callback
      closeModal(); // Close the modal
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      
      // Handle Firebase-specific errors
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Redirecting to login...');
        setActiveTab('login'); // Switch to the login tab
      } else {
        setError(err.message || 'An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Log in the user with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful:', userCredential.user);
      if (onSuccess) onSuccess(); // Trigger success callback
      closeModal(); // Close the modal
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  // Google Authentication handler
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError('');

    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      // Check if the user already exists in Firestore
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        // If the user doesn't exist, store the Google user and move to role selection step
        setGoogleUser(user);
        setStep('role-selection'); // Move to role selection step
      } else {
        console.log('Google login successful:', user);
        if (onSuccess) onSuccess(); // Trigger success callback
        closeModal(); // Close the modal
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  // Role selection handler for Google login
  const handleRoleSelection = async () => {
    if (!googleUser) return;

    setIsLoading(true);
    setError('');

    try {
      // Store the selected role in Firestore
      await setDoc(doc(db, 'users', googleUser.uid), {
        email: googleUser.email,
        displayName: googleUser.displayName || '',
        role: role, // Store the selected role
      });

      console.log('Role selection successful for Google user:', googleUser);
      if (onSuccess) onSuccess(); // Trigger success callback
      closeModal(); // Close the modal
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[380px] p-8 rounded-lg"
      hideCloseIcon={hideCloseIcon} // Pass the prop to DialogContent
      disableOpacity={disableOpacityLayer} // Pass the prop to DialogOverlay via DialogContent
      >
        <DialogHeader className="items-center">
          <DialogTitle className="text-2xl font-normal mb-6">
            {step === 'auth' ? (activeTab === 'register' ? 'Create Account' : 'Log In') : 'Select Your Role'}
          </DialogTitle>
    
        </DialogHeader>

        {step === 'auth' ? (
          <div className="space-y-4">
            {/* Google Login Button */}
            <Button
              variant="outline"
              className="w-full h-10 justify-start gap-3 px-4 text-sm"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <FcGoogle className="text-lg" /> {/* Google Icon */}
              {isLoading ? 'Signing in with Google...' : 'Continue with Google'}
            </Button>

            {/* Divider Line */}
            <div className="flex items-center my-4">
              <div className="flex-grow h-px bg-muted"></div>
              <span className="px-2 text-sm text-muted-foreground">or</span>
              <div className="flex-grow h-px bg-muted"></div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Tabs for Register and Login */}
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
                  <div>
                    <Label htmlFor="role">Role</Label>
                    <select
                      id="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full h-10 mt-1 border rounded px-2"
                      required
                    >
                      <option value="Designer">Designer</option>
                      <option value="Customer">Customer</option>
                    </select>
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
            ) : (
              <form onSubmit={handleLogin}>
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
                  {isLoading ? 'Logging in...' : 'Log In'}
                </Button>
              </form>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Please select your role to continue:</p>
            <div>
              <Label htmlFor="role">Role</Label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full h-10 mt-1 border rounded px-2"
                required
              >
                <option value="Designer">Designer</option>
                <option value="Customer">Customer</option>
              </select>
            </div>
            <Button
              onClick={handleRoleSelection}
              className="w-full mt-4 h-10"
              disabled={isLoading}
            >
              {isLoading ? 'Saving role...' : 'Continue'}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}