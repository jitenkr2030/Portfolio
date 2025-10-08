// Calculator Types
export interface CalculatorStep {
  id: string
  title: string
  description: string
  icon: string
  progress: number
}

export interface CalculatorField {
  name: string
  type: 'select' | 'multiselect' | 'range' | 'checkbox' | 'radio' | 'input'
  label: string
  required: boolean
  options?: Option[]
  range?: { min: number; max: number; step: number }
  dependencies?: string[]
  placeholder?: string
  description?: string
}

export interface Option {
  value: string
  label: string
  description?: string
  costImpact?: number
  timeImpact?: number
}

export interface FormData {
  projectType: string
  features: string[]
  designComplexity: string
  technicalStack: {
    frontend: string
    backend: string
    database: string
  }
  timeline: {
    duration: number
    urgency: string
    support: string
  }
  budget: {
    min: number
    max: number
  }
}

export interface PricingResult {
  development: number
  design: number
  testing: number
  deployment: number
  support: number
  total: number
  breakdown: {
    category: string
    amount: number
    percentage: number
  }[]
}

export interface TimelineResult {
  planning: number
  design: number
  development: number
  testing: number
  deployment: number
  total: number
  phases: {
    name: string
    duration: number
    description: string
  }[]
}

export interface CalculatorState {
  currentStep: number
  formData: FormData
  pricing: PricingResult | null
  timeline: TimelineResult | null
  isLoading: boolean
  errors: Record<string, string>
}

export interface CalculatorActions {
  updateField: (field: string, value: any) => void
  nextStep: () => void
  previousStep: () => void
  calculatePricing: () => void
  resetCalculator: () => void
  setStep: (step: number) => void
}

// Pricing Types
export interface PricingEngine {
  baseRates: Record<string, { min: number; max: number; avg: number }>
  featureMultipliers: Record<string, number>
  designComplexity: Record<string, { multiplier: number; description: string }>
  technicalFactors: Record<string, Record<string, number>>
  timelineAdjustments: Record<string, number>
}

export interface Feature {
  id: string
  name: string
  category: string
  description: string
  costImpact: number
  timeImpact: number
  complexity: 'low' | 'medium' | 'high'
}

// AI Types
export interface AIRecommendation {
  type: 'feature' | 'design' | 'technical' | 'timeline'
  title: string
  description: string
  impact: {
    cost: number
    time: number
    quality: number
  }
  confidence: number
  reasoning: string
}

export interface OptimizationSuggestion {
  area: string
  current: any
  suggested: any
  savings: number
  tradeoffs: string[]
}

// Analytics Types
export interface CalculatorAnalytics {
  userSession: string
  timestamp: Date
  steps: Record<string, {
    timeSpent: number
    interactions: number
    abandonments: number
  }>
  finalEstimate: {
    total: number
    breakdown: PricingResult
    timeline: TimelineResult
  }
  conversion: {
    requestedQuote: boolean
    scheduledCall: boolean
    exportedPDF: boolean
  }
}