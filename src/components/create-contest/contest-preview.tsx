// components/create-contest/contest-preview.tsx
'use client'

import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { FileText, CircleDollarSign, Trophy, ArrowLeft } from 'lucide-react'
import { useFormContext } from '@/context/form-context'

interface ContestPreviewProps {
  onSubmit: () => Promise<void>; // Add onSubmit prop
  isSubmitting: boolean; // Add isSubmitting prop
}

export function ContestPreview({ onSubmit, isSubmitting }: ContestPreviewProps) {
  const { formData, setCurrentStep } = useFormContext()

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Preview Your Contest</h2>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Contest Details Card */}
        <Card>
          <CardHeader className="flex flex-row items-center space-x-4 space-y-0">
            <FileText className="h-6 w-6 text-primary" />
            <CardTitle>Contest Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Contest Name</h3>
              <p className="text-lg">{formData.contestName || 'Not provided'}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
              <p className="whitespace-pre-line">
                {formData.description || 'Not provided'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Category & Budget Card */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center space-x-4 space-y-0">
              <Trophy className="h-6 w-6 text-primary" />
              <CardTitle>Category</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{formData.category || 'Not provided'}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center space-x-4 space-y-0">
              <CircleDollarSign className="h-6 w-6 text-primary" />
              <CardTitle>Budget</CardTitle>
            </CardHeader>
            <CardContent>
              <p>${formData.budget}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Files Preview (if files were uploaded) */}
      {formData.files?.length > 0 && (
        <Card>
          <CardHeader>
            <h3 className="text-sm font-medium text-muted-foreground">Uploaded Files</h3>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              {formData.files.map((file: File, index: number) => (
                <div key={index} className="flex items-center gap-2 p-2 border rounded">
                  <FileText className="h-4 w-4" />
                  <span className="text-sm">{file.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col-reverse gap-4 pt-6 sm:flex-row sm:justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(3)}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Button
          onClick={onSubmit} // Use the onSubmit prop
          disabled={isSubmitting} // Use the isSubmitting prop
          className="px-8 py-4 text-lg"
        >
          {isSubmitting ? 'Launching...' : 'Launch Contest'}
        </Button>
      </div>

      {/* Pricing Breakdown (optional) */}
      <div className="text-sm text-muted-foreground">
        <p>${formData.budget} prize pool + ${(formData.budget * 0.1).toFixed(0)} platform fee</p>
      </div>
    </div>
  )
}