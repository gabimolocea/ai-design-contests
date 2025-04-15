'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Mail, ChevronLeft } from 'lucide-react'

export function AuthModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [mode, setMode] = useState<'initial' | 'email' | 'verify'>('initial')
  const [email, setEmail] = useState('')

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setIsOpen(true)}
        >
          Log In
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">
            {mode === 'verify' ? 'Verify Your Email' : 'Welcome to Luma'}
          </DialogTitle>
        </DialogHeader>

        {mode === 'initial' && (
          <div className="space-y-4">
            <p className="text-center text-muted-foreground">
              Please sign in or sign up below.
            </p>
            
            <div className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start gap-2"
                onClick={() => setMode('email')}
              >
                <Mail className="h-4 w-4" />
                Continue with Email
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start gap-2"
              >
                <GoogleIcon />
                Sign in with Google
              </Button>
            </div>
          </div>
        )}

        {mode === 'email' && (
          <form onSubmit={(e) => {
            e.preventDefault()
            setMode('verify')
          }} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Email</label>
              <Input
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="flex justify-between">
              <Button 
                type="button" 
                variant="ghost" 
                onClick={() => setMode('initial')}
                className="gap-1"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </Button>
              <Button type="submit">
                Continue
              </Button>
            </div>
          </form>
        )}

        {mode === 'verify' && (
          <form onSubmit={(e) => {
            e.preventDefault()
            setIsOpen(false) // Close modal on submit
          }} className="space-y-4">
            <p>We&apos;ve sent a 6-digit passcode to {email}</p>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium">Passcode</label>
              <Input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="123456"
                required
              />
            </div>
            
            <Button type="submit" className="w-full">
              Verify and Sign In
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}

function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}