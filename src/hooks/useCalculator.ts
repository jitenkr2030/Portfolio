'use client'

import { create } from 'zustand'
import { CalculatorState, CalculatorActions, FormData, PricingResult, TimelineResult } from '@/types/calculator'
import { calculatePricing, calculateTimeline } from '@/utils/pricing'
import { validateStep, formatErrors } from '@/utils/validation'

interface CalculatorStore extends CalculatorState, CalculatorActions {}

const initialFormData: FormData = {
  projectType: '',
  features: [],
  designComplexity: '',
  technicalStack: {
    frontend: '',
    backend: '',
    database: ''
  },
  timeline: {
    duration: 8,
    urgency: 'normal',
    support: 'basic'
  },
  budget: {
    min: 5000,
    max: 15000
  }
}

export const useCalculator = create<CalculatorStore>((set, get) => ({
  currentStep: 0,
  formData: initialFormData,
  pricing: null,
  timeline: null,
  isLoading: false,
  errors: {},

  // Actions
  updateField: (field: string, value: any) => {
    const { formData } = get()
    
    // Handle nested field updates
    const updatedFormData = { ...formData }
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      if (parent in updatedFormData && typeof updatedFormData[parent as keyof FormData] === 'object') {
        ;(updatedFormData[parent as keyof FormData] as any)[child] = value
      }
    } else {
      ;(updatedFormData as any)[field] = value
    }
    
    set({ formData: updatedFormData })
    
    // Clear error for this field if it exists
    const { errors } = get()
    if (errors[field]) {
      const newErrors = { ...errors }
      delete newErrors[field]
      set({ errors: newErrors })
    }
  },

  nextStep: () => {
    const { currentStep, formData } = get()
    
    // Validate current step before proceeding
    if (validateStep(currentStep, formData)) {
      // Calculate pricing and timeline when moving to results
      if (currentStep === 4) { // Last step before results
        const pricing = calculatePricing(formData)
        const timeline = calculateTimeline(formData)
        set({ pricing, timeline })
      }
      
      set({ currentStep: currentStep + 1 })
    } else {
      // Show validation errors
      const errors = validateStep(currentStep, formData)
      set({ errors: formatErrors(errors) })
    }
  },

  previousStep: () => {
    const { currentStep } = get()
    if (currentStep > 0) {
      set({ currentStep: currentStep - 1 })
    }
  },

  calculatePricing: () => {
    const { formData } = get()
    const pricing = calculatePricing(formData)
    const timeline = calculateTimeline(formData)
    set({ pricing, timeline })
  },

  resetCalculator: () => {
    set({
      currentStep: 0,
      formData: initialFormData,
      pricing: null,
      timeline: null,
      isLoading: false,
      errors: {}
    })
  },

  setStep: (step: number) => {
    set({ currentStep: step })
  }
}))

// Helper hook for form field management
export const useFormField = (fieldName: string) => {
  const { formData, updateField, errors } = useCalculator()
  
  const value = fieldName.includes('.') 
    ? fieldName.split('.').reduce((obj, key) => obj?.[key], formData)
    : (formData as any)[fieldName]
  
  const error = errors[fieldName]
  
  const onChange = (newValue: any) => {
    updateField(fieldName, newValue)
  }
  
  return { value, onChange, error }
}

// Helper hook for step navigation
export const useStepNavigation = () => {
  const { currentStep, nextStep, previousStep, setStep } = useCalculator()
  
  const goToStep = (step: number) => {
    setStep(step)
  }
  
  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === 5 // 5 steps total (0-4) + results (5)
  
  return {
    currentStep,
    nextStep,
    previousStep,
    goToStep,
    isFirstStep,
    isLastStep,
    progress: ((currentStep + 1) / 6) * 100 // 6 total steps including results
  }
}

// Helper hook for pricing and timeline data
export const usePricingData = () => {
  const { pricing, timeline, formData } = useCalculator()
  
  const hasPricing = pricing !== null && timeline !== null
  
  return {
    pricing,
    timeline,
    hasPricing,
    formData
  }
}