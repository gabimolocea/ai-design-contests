'use client'

import { useRouter } from 'next/navigation'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/lib/firebase/config'
import { saveContestToFirestore } from '@/lib/firebase/contestService'
import { FormProvider, useFormContext } from '@/context/form-context'
import { Progress } from '@/components/ui/progress'
import { ContestDetails } from '@/components/create-contest/contest-details'
import { ContestCategory } from '@/components/create-contest/contest-category'
import { ContestBudget } from '@/components/create-contest/contest-budget'
import { ContestPreview } from '@/components/create-contest/contest-preview'
import { AuthModal } from '@/components/auth-modal'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function CreateContestPage() {
  const steps = [
    { id: 1, name: 'Contest Details' },
    { id: 2, name: 'Category' },
    { id: 3, name: 'Budget' },
    { id: 4, name: 'Preview' }
  ]

  return (
    <FormProvider>
      <CreateContestContent steps={steps} />
    </FormProvider>
  )
}

function CreateContestContent({ steps }: { steps: { id: number; name: string }[] }) {
  const { currentStep, formData } = useFormContext()
  const [user, loading] = useAuthState(auth)
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)

  const progressValue = (currentStep / steps.length) * 100

  const handleSubmit = async () => {
    if (!user) {
      setShowAuthModal(true)
      return
    }

    // Validate form data
    if (!formData.contestName || !formData.budget || !formData.category) {
      alert('Please complete all required fields before submitting.')
      return
    }

    setIsSubmitting(true)

    try {
      const contestId = await saveContestToFirestore(formData, user.uid)
      console.log('Contest created successfully with ID:', contestId)

      if (contestId) {
        router.push(`/payment?contestId=${contestId}`)
      } else {
        console.error('Invalid contest ID:', contestId)
        alert('An error occurred while redirecting to the payment page.')
      }
    } catch (error) {
      console.error('Error saving contest:', error)
      alert('An error occurred while saving the contest. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-4">
          <Button variant="secondary" onClick={() => router.back()}>
            ← Back
          </Button>
        </div>

        <div className="mb-8">
          <Progress value={progressValue} className="h-2" />
          <div className="flex justify-between mt-4">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`text-sm ${
                  currentStep >= step.id ? 'font-bold text-primary' : 'text-muted-foreground'
                }`}
              >
                {step.name}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          {currentStep === 1 && <ContestDetails />}
          {currentStep === 2 && <ContestCategory />}
          {currentStep === 3 && <ContestBudget />}
          {currentStep === 4 && <ContestPreview onSubmit={handleSubmit} isSubmitting={isSubmitting} />}
        </div>
      </div>

      {!loading && showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          closeModal={() => setShowAuthModal(false)}
          onSuccess={async () => {
            setShowAuthModal(false)
            setIsSubmitting(true)
            try {
              const contestId = await saveContestToFirestore(formData, user?.uid || '')
              console.log('Contest created successfully with ID:', contestId)
              router.push(`/payment?contestId=${contestId}`)
            } catch (error) {
              console.error('Error saving contest:', error)
              alert('An error occurred while saving the contest. Please try again.')
            } finally {
              setIsSubmitting(false)
            }
          }}
        />
      )}
    </div>
  )
}