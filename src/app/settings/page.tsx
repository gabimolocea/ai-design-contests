'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('Account');

  return (
    <div className="container mx-auto max-w-[1080] py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      {/* Tabs */}
      <div className="flex border-b mb-8">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'Account' ? 'border-b-2 border-black' : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('Account')}
        >
          Account
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'Preferences' ? 'border-b-2 border-black' : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('Preferences')}
        >
          Preferences
        </button>
      </div>

      {/* Account Tab */}
      {activeTab === 'Account' && (
        <div className="space-y-8">
          {/* Your Profile Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
              <Button variant="outline">Change</Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="first-name" className="block text-sm font-medium mb-1">
                  First Name
                </label>
                <Input
                  id="first-name"
                  type="text"
                  placeholder="First Name"
                  defaultValue="John"
                  className="bg-white"
                />
              </div>
              <div>
                <label htmlFor="last-name" className="block text-sm font-medium mb-1">
                  Last Name
                </label>
                <Input
                  id="last-name"
                  type="text"
                  placeholder="Last Name"
                  defaultValue="Doe"
                  className="bg-white"
                />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="bio" className="block text-sm font-medium mb-1">
                Bio
              </label>
              <Input
                id="bio"
                type="text"
                placeholder="Bio"
                defaultValue="A short bio about yourself."
                className="bg-white"
              />
            </div>
            <div className="mt-4">
              <Button>Save Changes</Button>
            </div>
          </div>

          {/* Emails Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Emails</h2>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Email Address"
                defaultValue="johndoe@example.com"
                className="bg-white"
              />
            </div>
            <div className="mt-4">
              <Button>Add Email</Button>
            </div>
          </div>

          {/* Phone Number Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Phone Number</h2>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1">
                Phone Number
              </label>
              <Input
                id="phone"
                type="text"
                placeholder="Phone Number"
                defaultValue="+1 234 567 890"
                className="bg-white"
              />
            </div>
            <div className="mt-4">
              <Button>Update</Button>
            </div>
          </div>
        </div>
      )}

      {/* Preferences Tab */}
      {activeTab === 'Preferences' && (
        <div className="space-y-8">
          {/* Display Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Display</h2>
            <p>Choose your desired interface:</p>
            <div className="flex gap-4 mt-4">
              <div className="w-24 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                System
              </div>
              <div className="w-24 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                Light
              </div>
              <div className="w-24 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                Dark
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="language" className="block text-sm font-medium mb-1">
                Language
              </label>
              <select id="language" className="w-full border rounded-lg p-2 bg-white">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
          </div>

          {/* Notifications Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Notifications</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Event Invites</span>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <span>Event Reminders</span>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <span>Event Updates</span>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <span>Feedback Requests</span>
                <Switch />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}