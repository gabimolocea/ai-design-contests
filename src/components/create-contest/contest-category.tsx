'use client'

import { useFormContext } from '@/context/form-context'
import { Button } from '@/components/ui/button'

const categories = [
  { id: 'logo', name: 'Logo Design' },
  { id: 'web', name: 'Website Design' },
  { id: 'branding', name: 'Branding' },
  { id: 'packaging', name: 'Packaging Design' }
]

export function ContestCategory() {
  const { formData, setFormData, setCurrentStep } = useFormContext()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentStep(3)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold">Select Category</h2>
      
      <div className="grid grid-cols-2 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => setFormData({...formData, contestType: category.id})}
            className={`p-6 border rounded-lg cursor-pointer transition-colors ${
              formData.contestType === category.id 
                ? 'border-primary bg-primary/10' 
                : 'hover:bg-muted/50'
            }`}
          >
            <h3 className="font-medium">{category.name}</h3>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => setCurrentStep(1)}
        >
          Back
        </Button>
        <Button 
          type="submit" 
          disabled={!formData.contestType}
          className="px-8 py-4 text-lg"
        >
          Continue
        </Button>
      </div>
    </form>
  )
}