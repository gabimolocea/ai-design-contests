'use client'

import { useFormContext } from '@/context/form-context'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export function ContestDetails() {
  const { formData, setFormData, setCurrentStep } = useFormContext()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentStep(2)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold">Contest Details</h2>
      
      <div>
        <label className="block mb-2 font-medium">Contest Name</label>
        <Input
          value={formData.contestName}
          onChange={(e) => setFormData({...formData, contestName: e.target.value})}
          placeholder="e.g. Modern Logo for Tech Startup"
          required
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">Description</label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          placeholder="Describe what you're looking for..."
          rows={5}
          required
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit" className="px-8 py-4 text-lg">
          Continue
        </Button>
      </div>
    </form>
  )
}