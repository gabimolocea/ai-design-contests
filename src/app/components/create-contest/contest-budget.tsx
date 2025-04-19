'use client'

import { useFormContext } from '@/context/form-context'
import { Slider } from '@/app/components/ui/slider'
import { Button } from '@/app/components/ui/button'

const budgetRanges = [
  { min: 100, max: 300, label: 'Basic' },
  { min: 301, max: 600, label: 'Standard' },
  { min: 601, max: 1000, label: 'Premium' }
]

export function ContestBudget() {
  const { formData, setFormData, setCurrentStep } = useFormContext()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentStep(4)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold">Set Your Budget</h2>
      
      <div className="space-y-8">
        <div>
          <div className="flex justify-between mb-4">
            <span className="font-medium">Budget Range</span>
            <span>${formData.budget}</span>
          </div>
          <Slider
            defaultValue={[formData.budget || 200]}
            min={100}
            max={1000}
            step={50}
            onValueChange={(value) => setFormData({...formData, budget: value[0]})}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          {budgetRanges.map((range) => (
            <div
              key={range.label}
              onClick={() => setFormData({...formData, budget: range.min + 50})}
              className={`p-4 border rounded-lg cursor-pointer ${
                formData.budget >= range.min && formData.budget <= range.max
                  ? 'border-primary bg-primary/10'
                  : 'hover:bg-muted/50'
              }`}
            >
              <h3 className="font-medium">{range.label}</h3>
              <p className="text-sm text-muted-foreground">
                ${range.min} - ${range.max}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => setCurrentStep(2)}
        >
          Back
        </Button>
        <Button 
          type="submit" 
          disabled={!formData.budget}
          className="px-8 py-4 text-lg"
        >
          Continue
        </Button>
      </div>
    </form>
  )
}