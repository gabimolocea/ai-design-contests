'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type FormData = {
  contestName: string
  contestType: string
  category: string
  description: string
  budget: number
  files: File[]
}

type FormContextType = {
  currentStep: number
  setCurrentStep: (step: number) => void
  formData: FormData
  setFormData: (data: FormData) => void
}

const FormContext = createContext<FormContextType | undefined>(undefined)

export function FormProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    contestName: '',
    contestType: '',
    description: '',
    category: '', // Default to an empty string
    budget: 0, // Default to 0
    files: []
  })

  return (
    <FormContext.Provider value={{ currentStep, setCurrentStep, formData, setFormData }}>
      {children}
    </FormContext.Provider>
  )
}

export function useFormContext() {
  const context = useContext(FormContext)
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider')
  }
  return context
}