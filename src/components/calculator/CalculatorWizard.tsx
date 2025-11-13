'use client'

import React, { useState } from 'react'
import { CalculatorStep, CalculatorField } from '@/types/calculator'
import { BookingData, PaymentReceipt } from '@/types/booking'
import { StepNavigation, StepHeader } from './StepNavigation'
import { FormField } from './FormField'
import { CostBreakdown } from './CostBreakdown'
import { TimelineVisualizer } from './TimelineVisualizer'
// import { BookingForm } from '@/components/booking/BookingForm'
// import { PaymentForm } from '@/components/booking/PaymentForm'
// import { PaymentReceiptComponent } from '@/components/booking/PaymentReceipt'
import { useCalculator, useStepNavigation } from '@/hooks/useCalculator'
import { usePricingEngine } from '@/hooks/usePricingEngine'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  RefreshCw, 
  Download, 
  Share, 
  Mail, 
  Phone,
  Calculator,
  FileText,
  AlertCircle,
  CheckCircle,
  CreditCard
} from 'lucide-react'

// Define calculator steps
const CALCULATOR_STEPS: CalculatorStep[] = [
  {
    id: 'project-type',
    title: 'Project Type',
    description: 'What type of web solution do you need?',
    icon: '📱',
    progress: 20
  },
  {
    id: 'features',
    title: 'Features & Functionality',
    description: 'Select the features you need',
    icon: '⚡',
    progress: 40
  },
  {
    id: 'design',
    title: 'Design Requirements',
    description: 'What level of design do you need?',
    icon: '🎨',
    progress: 60
  },
  {
    id: 'technical',
    title: 'Technical Specifications',
    description: 'Technical requirements and integrations',
    icon: '🔧',
    progress: 80
  },
  {
    id: 'timeline',
    title: 'Timeline & Support',
    description: 'Project duration and ongoing support',
    icon: '📅',
    progress: 100
  }
]

// Define form fields for each step
const STEP_FIELDS: Record<string, CalculatorField[]> = {
  'project-type': [
    {
      name: 'projectType',
      type: 'radio',
      label: 'Select Project Type',
      required: true,
      options: [
        { value: 'simple-website', label: 'Simple Website', description: 'Basic informational website with minimal functionality' },
        { value: 'web-application', label: 'Web Application', description: 'Interactive web app with user accounts and database' },
        { value: 'ecommerce-platform', label: 'E-commerce Platform', description: 'Online store with payment processing and inventory' },
        { value: 'saas-platform', label: 'SaaS Platform', description: 'Software as a Service with subscriptions' },
        { value: 'enterprise-solution', label: 'Enterprise Solution', description: 'Large-scale business solution with complex requirements' }
      ]
    }
  ],
  'features': [
    {
      name: 'features',
      type: 'multiselect',
      label: 'Select Features',
      required: true,
      options: [
        { value: 'responsive-design', label: 'Responsive Design', description: 'Mobile-friendly design that works on all devices' },
        { value: 'user-authentication', label: 'User Authentication', description: 'Secure user login and registration' },
        { value: 'payment-processing', label: 'Payment Processing', description: 'Integration with payment gateways' },
        { value: 'database-integration', label: 'Database Integration', description: 'Custom database setup and integration' },
        { value: 'api-development', label: 'API Development', description: 'RESTful or GraphQL API development' },
        { value: 'content-management', label: 'Content Management', description: 'CMS for managing website content' },
        { value: 'email-notifications', label: 'Email Notifications', description: 'Automated email system' },
        { value: 'search-functionality', label: 'Search Functionality', description: 'Advanced search capabilities' },
        { value: 'analytics-dashboard', label: 'Analytics Dashboard', description: 'Data visualization and reporting' },
        { value: 'progressive-web-app', label: 'Progressive Web App', description: 'Installable app with offline capabilities' },
        { value: 'real-time-updates', label: 'Real-time Updates', description: 'Live data updates using WebSockets' },
        { value: 'multi-language', label: 'Multi-language Support', description: 'Support for multiple languages' },
        { value: 'ai-integration', label: 'AI Integration', description: 'Artificial intelligence features' },
        { value: 'third-party-integrations', label: 'Third-party Integrations', description: 'External service connections' }
      ]
    }
  ],
  'design': [
    {
      name: 'designComplexity',
      type: 'radio',
      label: 'Design Complexity Level',
      required: true,
      options: [
        { value: 'basic', label: 'Basic', description: 'Template-based, minimal custom design' },
        { value: 'custom', label: 'Custom', description: 'Custom design with brand guidelines' },
        { value: 'premium', label: 'Premium', description: 'Advanced animations, micro-interactions' },
        { value: 'enterprise', label: 'Enterprise', description: 'Multiple themes, design system' }
      ]
    }
  ],
  'technical': [
    {
      name: 'technicalStack.frontend',
      type: 'select',
      label: 'Frontend Technology',
      required: true,
      options: [
        { value: 'react', label: 'React', description: 'Popular JavaScript library for building user interfaces' },
        { value: 'nextjs', label: 'Next.js', description: 'React framework with server-side rendering' },
        { value: 'vue', label: 'Vue.js', description: 'Progressive JavaScript framework' },
        { value: 'angular', label: 'Angular', description: 'Platform for building mobile and desktop web applications' },
        { value: 'svelte', label: 'Svelte', description: 'Compile-time framework for building user interfaces' }
      ]
    },
    {
      name: 'technicalStack.backend',
      type: 'select',
      label: 'Backend Technology',
      required: true,
      options: [
        { value: 'nodejs', label: 'Node.js', description: 'JavaScript runtime built on Chrome\'s V8 JavaScript engine' },
        { value: 'python', label: 'Python', description: 'High-level programming language for general-purpose programming' },
        { value: 'ruby', label: 'Ruby', description: 'Dynamic, reflective, object-oriented programming language' },
        { value: 'php', label: 'PHP', description: 'Server-side scripting language designed for web development' },
        { value: 'java', label: 'Java', description: 'Class-based, object-oriented programming language' }
      ]
    },
    {
      name: 'technicalStack.database',
      type: 'select',
      label: 'Database Technology',
      required: true,
      options: [
        { value: 'postgresql', label: 'PostgreSQL', description: 'Powerful, open source object-relational database system' },
        { value: 'mongodb', label: 'MongoDB', description: 'Cross-platform document-oriented database program' },
        { value: 'mysql', label: 'MySQL', description: 'Open-source relational database management system' },
        { value: 'redis', label: 'Redis', description: 'In-memory data structure store, used as a database, cache and message broker' }
      ]
    }
  ],
  'timeline': [
    {
      name: 'timeline.duration',
      type: 'range',
      label: 'Preferred Project Duration (weeks)',
      required: true,
      range: { min: 1, max: 52, step: 1 }
    },
    {
      name: 'timeline.urgency',
      type: 'radio',
      label: 'Project Urgency',
      required: true,
      options: [
        { value: 'normal', label: 'Normal', description: 'Standard development timeline' },
        { value: 'urgent', label: 'Urgent', description: 'Accelerated timeline (+30% cost)' },
        { value: 'super-urgent', label: 'Super Urgent', description: 'Rapid development (+60% cost)' }
      ]
    },
    {
      name: 'timeline.support',
      type: 'radio',
      label: 'Support Level',
      required: true,
      options: [
        { value: 'basic', label: 'Basic Support', description: '30 days of post-launch support' },
        { value: 'standard', label: 'Standard Support', description: '90 days of post-launch support' },
        { value: 'premium', label: 'Premium Support', description: '6 months of priority support' },
        { value: 'enterprise', label: 'Enterprise Support', description: '12 months of 24/7 support' }
      ]
    },
    {
      name: 'budget.min',
      type: 'range',
      label: 'Minimum Budget',
      required: true,
      range: { min: 500, max: 100000, step: 500 }
    },
    {
      name: 'budget.max',
      type: 'range',
      label: 'Maximum Budget',
      required: true,
      range: { min: 1000, max: 200000, step: 1000 }
    }
  ]
}

export function CalculatorWizard() {
  const { currentStep, formData, resetCalculator } = useCalculator()
  const { currentStep: navStep } = useStepNavigation()
  const { pricing, timeline, isCalculating } = usePricingEngine(formData)
  const [isExporting, setIsExporting] = useState(false)
  const [bookingFlow, setBookingFlow] = useState<'calculator' | 'booking' | 'payment' | 'receipt'>('calculator')
  const [bookingData, setBookingData] = useState<Partial<BookingData>>({})
  const [paymentReceipt, setPaymentReceipt] = useState<PaymentReceipt | null>(null)

  const currentStepData = CALCULATOR_STEPS[currentStep]
  const currentFields = STEP_FIELDS[currentStepData.id] || []

  const handleExport = async () => {
    setIsExporting(true)
    // Simulate export functionality
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsExporting(false)
  }

  const handleBookingSubmit = (data: Partial<BookingData>) => {
    setBookingData(data)
    setBookingFlow('payment')
  }

  const handlePaymentComplete = (paymentData: any) => {
    setPaymentReceipt(paymentData)
    setBookingFlow('receipt')
  }

  const handleBackToCalculator = () => {
    setBookingFlow('calculator')
  }

  const handleBackToBooking = () => {
    setBookingFlow('booking')
  }

  const handleDownloadReceipt = () => {
    // Simulate download
    console.log('Downloading receipt...')
  }

  const handleEmailReceipt = () => {
    // Simulate email
    console.log('Emailing receipt...')
  }

  const handleShareReceipt = () => {
    // Simulate share
    console.log('Sharing receipt...')
  }

  const renderStepContent = () => {
    if (currentStep === 5) { // Results step
      return <ResultsStep 
        pricing={pricing} 
        timeline={timeline} 
        isCalculating={isCalculating}
        onBookNow={() => setBookingFlow('booking')}
      />
    }

    return (
      <div className="space-y-6">
        {currentFields.map((field, index) => (
          <FormField key={index} field={field} />
        ))}
      </div>
    )
  }

  // Render booking flow components
  if (bookingFlow === 'booking') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <Button variant="outline" onClick={handleBackToCalculator} className="mb-4">
              ← Back to Calculator
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">
              Complete Your Booking
            </h1>
            <p className="text-lg text-gray-600">
              Provide your information to secure your project estimate
            </p>
          </div>
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">Booking form temporarily disabled</p>
          </div>
        </div>
      </div>
    )
  }

  if (bookingFlow === 'payment') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <Button variant="outline" onClick={handleBackToBooking} className="mb-4">
              ← Back to Booking
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">
              Complete Payment
            </h1>
            <p className="text-lg text-gray-600">
              Pay the deposit to confirm your booking
            </p>
          </div>
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">Payment form temporarily disabled</p>
          </div>
        </div>
      </div>
    )
  }

  if (bookingFlow === 'receipt' && paymentReceipt) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">Receipt view temporarily disabled</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Calculator className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">
              Web Development Cost Calculator
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get an accurate estimate for your web development project in minutes
          </p>
        </div>

        {/* Calculator Container */}
        <Card className="shadow-lg">
          <CardHeader>
            <StepHeader step={currentStepData} />
          </CardHeader>
          <CardContent>
            {/* Step Navigation */}
            <StepNavigation steps={CALCULATOR_STEPS} />
            
            {/* Step Content */}
            <div className="mt-8">
              {renderStepContent()}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex justify-between items-center">
              <Button
                variant="outline"
                onClick={resetCalculator}
                className="flex items-center"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset Calculator
              </Button>

              <div className="flex space-x-2">
                {currentStep === 5 && (
                  <>
                    <Button
                      variant="outline"
                      onClick={handleExport}
                      disabled={isExporting}
                      className="flex items-center"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {isExporting ? 'Exporting...' : 'Export PDF'}
                    </Button>
                    <Button
                      variant="outline"
                      className="flex items-center"
                    >
                      <Share className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

interface ResultsStepProps {
  pricing: any
  timeline: any
  isCalculating: boolean
  onBookNow: () => void
}

function ResultsStep({ pricing, timeline, isCalculating, onBookNow }: ResultsStepProps) {
  if (isCalculating) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-lg text-gray-600">Calculating your estimate...</p>
      </div>
    )
  }

  if (!pricing || !timeline) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <p className="text-lg text-gray-600">Unable to calculate estimate. Please check your inputs.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Success Message */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center">
          <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
          <p className="text-green-800 font-medium">
            Estimate calculated successfully! Here's your project breakdown.
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="h-5 w-5 mr-2" />
              Cost Estimate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                ${Math.round(pricing.total).toLocaleString()}
              </div>
              <p className="text-sm text-gray-600">
                Estimated total cost
              </p>
              <div className="mt-4 text-xs text-gray-500">
                Range: ${Math.round(pricing.total * 0.8).toLocaleString()} - ${Math.round(pricing.total * 1.2).toLocaleString()}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {timeline.total} weeks
              </div>
              <p className="text-sm text-gray-600">
                Estimated project duration
              </p>
              <div className="mt-4 text-xs text-gray-500">
                Range: {Math.max(1, timeline.total - 2)} - {timeline.total + 2} weeks
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CostBreakdown pricing={pricing} />
        <TimelineVisualizer timeline={timeline} />
      </div>

      {/* Call to Action */}
      <Card>
        <CardContent className="text-center py-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Start Your Project?
          </h3>
          <p className="text-lg text-gray-600 mb-6">
            Book now and secure your spot with a 30% deposit. Get started on your project immediately!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={onBookNow}
              className="flex items-center bg-blue-600 hover:bg-blue-700"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Book Now & Pay Deposit
            </Button>
            <Button variant="outline" size="lg" className="flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              Get Detailed Quote
            </Button>
            <Button variant="outline" size="lg" className="flex items-center">
              <Phone className="w-4 h-4 mr-2" />
              Schedule a Call
            </Button>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            <p>🔒 Secure booking process • 💳 30% deposit to secure • 📧 Instant confirmation</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Icons
function DollarSign({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

function Calendar({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  )
}