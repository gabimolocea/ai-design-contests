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

  const handleCategoryChange = (categoryId: string, categoryName: string) => {
    // Update both contestType and category in formData
    setFormData({ ...formData, contestType: categoryId, category: categoryName })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentStep(3) // Move to the next step
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold">Select Category</h2>
      
      <div className="grid grid-cols-2 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => handleCategoryChange(category.id, category.name)} // Update both fields
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
          onClick={() => setCurrentStep(1)} // Go back to the previous step
        >
          Back
        </Button>
        <Button 
          type="submit" 
          disabled={!formData.contestType} // Disable if no category is selected
          className="px-8 py-4 text-lg"
        >
          Continue
        </Button>
      </div>
    </form>
  )
}