'use client';

import { useState } from 'react';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { updateDisplayName, changePassword } from '@/lib/firebase-auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase/config';

export default function SettingsPage() {
  const [user] = useAuthState(auth);
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleUpdateDisplayName = async () => {
    setLoading(true);
    setMessage('');
    try {
      await updateDisplayName(displayName); // Update both Firebase Auth and Firestore
      setMessage('Display name updated successfully!');
    } catch (error) {
      console.error(error);
      setMessage('Failed to update display name.');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    setLoading(true);
    setMessage('');
    try {
      await changePassword(newPassword);
      setMessage('Password changed successfully!');
    } catch (error) {
      console.error(error);
      setMessage('Failed to change password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="space-y-6">
        {/* Update Display Name */}
        <div>
          <h2 className="text-lg font-medium">Update Display Name</h2>
          <div className="flex items-center gap-4 mt-2">
            <Input
              type="text"
              placeholder="Enter new display name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
            <Button onClick={handleUpdateDisplayName} disabled={loading}>
              {loading ? 'Updating...' : 'Update'}
            </Button>
          </div>
        </div>

        {/* Change Password */}
        <div>
          <h2 className="text-lg font-medium">Change Password</h2>
          <div className="flex items-center gap-4 mt-2">
            <Input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Button onClick={handleChangePassword} disabled={loading}>
              {loading ? 'Changing...' : 'Change'}
            </Button>
          </div>
        </div>

        {/* Status Message */}
        {message && <p className="text-sm text-muted-foreground mt-4">{message}</p>}
      </div>
    </div>
  );
}