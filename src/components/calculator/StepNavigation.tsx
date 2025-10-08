'use client'

import React from 'react'
import { CalculatorStep } from '@/types/calculator'
import { useStepNavigation } from '@/hooks/useCalculator'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  Circle,
  ArrowRight
} from 'lucide-react'

interface StepNavigationProps {
  steps: CalculatorStep[]
}

export function StepNavigation({ steps }: StepNavigationProps) {
  const { currentStep, nextStep, previousStep, isFirstStep, isLastStep, progress } = useStepNavigation()

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-medium text-gray-600">
            Step {currentStep + 1} of {steps.length}
          </div>
          <div className="text-sm font-medium text-blue-600">
            {Math.round(progress)}% Complete
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step Indicators */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  index <= currentStep
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                {index < currentStep ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <span className="font-semibold">{index + 1}</span>
                )}
              </div>
              
              <div className="mt-2 text-center">
                <div className={`text-sm font-medium ${
                  index === currentStep ? 'text-blue-600' : index < currentStep ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {step.title}
                </div>
                <div className="text-xs text-gray-500 max-w-20">
                  {step.description}
                </div>
              </div>
            </div>
            
            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className={`w-16 h-0.5 mx-2 ${
                index < currentStep ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gray-300'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={previousStep}
          disabled={isFirstStep}
          className="flex items-center"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        <div className="flex items-center space-x-2">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => useStepNavigation.getState().goToStep(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentStep ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        <Button
          onClick={nextStep}
          className="flex items-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          {isLastStep ? 'View Results' : 'Next'}
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}

interface StepHeaderProps {
  step: CalculatorStep
}

export function StepHeader({ step }: StepHeaderProps) {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4">
        <span className="text-2xl">{step.icon}</span>
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-2">
        {step.title}
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        {step.description}
      </p>
    </div>
  )
}

interface StepProgressProps {
  currentStep: number
  totalSteps: number
}

export function StepProgress({ currentStep, totalSteps }: StepProgressProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100
  
  return (
    <div className="w-full bg-gray-200 rounded-full h-1">
      <div 
        className="bg-gradient-to-r from-blue-500 to-purple-500 h-1 rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}