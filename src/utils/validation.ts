import { FormData, CalculatorField } from '@/types/calculator'

export interface ValidationError {
  field: string
  message: string
}

export interface ValidationRule {
  required?: boolean
  min?: number
  max?: number
  pattern?: RegExp
  custom?: (value: any) => boolean | string
}

// Validation rules for each field
export const VALIDATION_RULES: Record<string, ValidationRule> = {
  projectType: {
    required: true
  },
  features: {
    required: true,
    custom: (value: string[]) => {
      if (value.length === 0) return 'Please select at least one feature'
      return true
    }
  },
  designComplexity: {
    required: true
  },
  'technicalStack.frontend': {
    required: true
  },
  'technicalStack.backend': {
    required: true
  },
  'technicalStack.database': {
    required: true
  },
  'timeline.duration': {
    required: true,
    min: 1,
    max: 52
  },
  'timeline.urgency': {
    required: true
  },
  'timeline.support': {
    required: true
  },
  'budget.min': {
    required: true,
    min: 500
  },
  'budget.max': {
    required: true,
    min: 1000,
    custom: (value: number, formData: FormData) => {
      if (value < formData.budget.min) {
        return 'Maximum budget must be greater than minimum budget'
      }
      return true
    }
  }
}

// Validate a single field
export function validateField(field: string, value: any, formData?: FormData): ValidationError | null {
  const rule = VALIDATION_RULES[field]
  if (!rule) return null
  
  // Required validation
  if (rule.required && (value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0))) {
    return {
      field,
      message: `${field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')} is required`
    }
  }
  
  // Min validation for numbers
  if (rule.min !== undefined && typeof value === 'number' && value < rule.min) {
    return {
      field,
      message: `${field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')} must be at least ${rule.min}`
    }
  }
  
  // Max validation for numbers
  if (rule.max !== undefined && typeof value === 'number' && value > rule.max) {
    return {
      field,
      message: `${field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')} must be no more than ${rule.max}`
    }
  }
  
  // Pattern validation for strings
  if (rule.pattern && typeof value === 'string' && !rule.pattern.test(value)) {
    return {
      field,
      message: `${field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')} is invalid`
    }
  }
  
  // Custom validation
  if (rule.custom) {
    const customResult = rule.custom(value, formData)
    if (customResult !== true) {
      return {
        field,
        message: typeof customResult === 'string' ? customResult : `${field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')} is invalid`
      }
    }
  }
  
  return null
}

// Validate entire form
export function validateForm(formData: FormData): ValidationError[] {
  const errors: ValidationError[] = []
  
  // Validate all fields
  Object.keys(VALIDATION_RULES).forEach(field => {
    const value = getNestedValue(formData, field)
    const error = validateField(field, value, formData)
    if (error) {
      errors.push(error)
    }
  })
  
  return errors
}

// Get nested value from object using dot notation
function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : undefined
  }, obj)
}

// Check if form is valid
export function isFormValid(formData: FormData): boolean {
  const errors = validateForm(formData)
  return errors.length === 0
}

// Get error message for a field
export function getErrorMessage(field: string, formData: FormData): string | null {
  const value = getNestedValue(formData, field)
  const error = validateField(field, value, formData)
  return error ? error.message : null
}

// Format error messages for display
export function formatErrors(errors: ValidationError[]): Record<string, string> {
  const formattedErrors: Record<string, string> = {}
  
  errors.forEach(error => {
    formattedErrors[error.field] = error.message
  })
  
  return formattedErrors
}

// Validate step completion
export function validateStep(step: number, formData: FormData): boolean {
  const stepFields = getStepFields(step)
  
  for (const field of stepFields) {
    const value = getNestedValue(formData, field)
    const error = validateField(field, value, formData)
    if (error) {
      return false
    }
  }
  
  return true
}

// Get fields for each step
function getStepFields(step: number): string[] {
  const stepFields = [
    ['projectType'], // Step 1: Project Type
    ['features'], // Step 2: Features
    ['designComplexity'], // Step 3: Design
    ['technicalStack.frontend', 'technicalStack.backend', 'technicalStack.database'], // Step 4: Technical
    ['timeline.duration', 'timeline.urgency', 'timeline.support', 'budget.min', 'budget.max'] // Step 5: Timeline
  ]
  
  return stepFields[step] || []
}