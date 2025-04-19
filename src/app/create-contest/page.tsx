'use client'

import { useRouter } from 'next/navigation'
import { FormProvider } from '@/context/form-context'
import { useFormContext } from '@/context/form-context'
import { Progress } from '@/app/components/ui/progress'
import { ContestDetails } from '@/app/components/create-contest/contest-details'
import { ContestCategory } from '@/app/components/create-contest/contest-category'
import { ContestBudget } from '@/app/components/create-contest/contest-budget'
import { ContestPreview } from '@/app/components/create-contest/contest-preview'
import { Button } from '@/app/components/ui/button'

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
  const { currentStep } = useFormContext()
  const router = useRouter() // Use Next.js router for navigation

  const progressValue = (currentStep / steps.length) * 100

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-4">
          <Button variant="secondary" onClick={() => router.back()}>
            ← Back
          </Button>
        </div>

        {/* Progress bar */}
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

        {/* Form steps */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {currentStep === 1 && <ContestDetails />}
          {currentStep === 2 && <ContestCategory />}
          {currentStep === 3 && <ContestBudget />}
          {currentStep === 4 && <ContestPreview />}
        </div>
      </div>
    </div>
  )
}