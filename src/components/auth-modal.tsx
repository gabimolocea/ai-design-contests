'use client'
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Github } from 'lucide-react'

export function AuthModal() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

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
            onClick={() => console.log('Continue with Google')}
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              {/* Google SVG icon */}
            </svg>
            Continue with Google
          </Button>

          <Button 
            variant="outline" 
            className="w-full h-10 justify-start gap-3 px-4 text-sm"
            onClick={() => console.log('Continue with GitHub')}
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

          <form onSubmit={(e) => {
            e.preventDefault()
            setIsLoading(true)
            // Handle email submission
            setTimeout(() => setIsLoading(false), 2000)
          }}>
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
                We&apos;ll email you a magic link for a password-free sign in.
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
        </div>
      </DialogContent>
    </Dialog>
  )
}