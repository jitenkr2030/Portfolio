'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  User, 
  Mail, 
  Phone, 
  Building, 
  MapPin, 
  FileText,
  Calendar,
  DollarSign,
  Clock
} from 'lucide-react'

interface BookingFormProps {
  calculatorData: any
  pricing: any
  timeline: any
  onSubmit: (data: any) => void
  onCancel: () => void
}

export function BookingForm({ 
  calculatorData, 
  pricing, 
  timeline, 
  onSubmit, 
  onCancel 
}: BookingFormProps) {
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    
    // Project Details
    projectName: '',
    projectDescription: '',
    preferredStartDate: '',
    budgetRange: '',
    
    // Additional Requirements
    additionalRequirements: '',
    referenceWebsites: '',
    targetAudience: '',
    
    // Terms
    agreeToTerms: false,
    agreeToPrivacy: false
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Personal Information
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    
    // Project Details
    if (!formData.projectName.trim()) newErrors.projectName = 'Project name is required'
    if (!formData.projectDescription.trim()) {
      newErrors.projectDescription = 'Project description is required'
    }
    if (!formData.preferredStartDate) {
      newErrors.preferredStartDate = 'Preferred start date is required'
    }
    
    // Terms
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions'
    }
    if (!formData.agreeToPrivacy) {
      newErrors.agreeToPrivacy = 'You must agree to the privacy policy'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const bookingData = {
        ...formData,
        calculatorData,
        pricing,
        timeline,
        submittedAt: new Date().toISOString()
      }
      
      onSubmit(bookingData)
    } catch (error) {
      console.error('Booking submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Main Form */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              Personal & Project Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className={errors.firstName ? 'border-red-500' : ''}
                    />
                    {errors.firstName && (
                      <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className={errors.lastName ? 'border-red-500' : ''}
                    />
                    {errors.lastName && (
                      <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={errors.email ? 'border-red-500' : ''}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={errors.phone ? 'border-red-500' : ''}
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="company">Company (Optional)</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="position">Position (Optional)</Label>
                    <Input
                      id="position"
                      value={formData.position}
                      onChange={(e) => handleInputChange('position', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Project Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Project Details</h3>
                
                <div>
                  <Label htmlFor="projectName">Project Name *</Label>
                  <Input
                    id="projectName"
                    value={formData.projectName}
                    onChange={(e) => handleInputChange('projectName', e.target.value)}
                    className={errors.projectName ? 'border-red-500' : ''}
                  />
                  {errors.projectName && (
                    <p className="text-sm text-red-500 mt-1">{errors.projectName}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="projectDescription">Project Description *</Label>
                  <Textarea
                    id="projectDescription"
                    rows={4}
                    value={formData.projectDescription}
                    onChange={(e) => handleInputChange('projectDescription', e.target.value)}
                    className={errors.projectDescription ? 'border-red-500' : ''}
                    placeholder="Describe your project in detail..."
                  />
                  {errors.projectDescription && (
                    <p className="text-sm text-red-500 mt-1">{errors.projectDescription}</p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="preferredStartDate">Preferred Start Date *</Label>
                    <Input
                      id="preferredStartDate"
                      type="date"
                      value={formData.preferredStartDate}
                      onChange={(e) => handleInputChange('preferredStartDate', e.target.value)}
                      className={errors.preferredStartDate ? 'border-red-500' : ''}
                    />
                    {errors.preferredStartDate && (
                      <p className="text-sm text-red-500 mt-1">{errors.preferredStartDate}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="budgetRange">Budget Range</Label>
                    <Input
                      id="budgetRange"
                      value={formData.budgetRange}
                      onChange={(e) => handleInputChange('budgetRange', e.target.value)}
                      placeholder="e.g., ₹8,00,000 - ₹20,00,000"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Additional Requirements */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Additional Information</h3>
                
                <div>
                  <Label htmlFor="additionalRequirements">Additional Requirements</Label>
                  <Textarea
                    id="additionalRequirements"
                    rows={3}
                    value={formData.additionalRequirements}
                    onChange={(e) => handleInputChange('additionalRequirements', e.target.value)}
                    placeholder="Any additional features or requirements..."
                  />
                </div>

                <div>
                  <Label htmlFor="referenceWebsites">Reference Websites</Label>
                  <Textarea
                    id="referenceWebsites"
                    rows={2}
                    value={formData.referenceWebsites}
                    onChange={(e) => handleInputChange('referenceWebsites', e.target.value)}
                    placeholder="Websites you like or want to reference..."
                  />
                </div>

                <div>
                  <Label htmlFor="targetAudience">Target Audience</Label>
                  <Textarea
                    id="targetAudience"
                    rows={2}
                    value={formData.targetAudience}
                    onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                    placeholder="Describe your target audience..."
                  />
                </div>
              </div>

              <Separator />

              {/* Terms and Conditions */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Terms and Conditions</h3>
                
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      id="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                      className="mt-1"
                    />
                    <label htmlFor="agreeToTerms" className="text-sm text-gray-700">
                      I agree to the terms and conditions and understand that this is a preliminary estimate. 
                      Final pricing may vary based on detailed requirements analysis.
                    </label>
                  </div>
                  {errors.agreeToTerms && (
                    <p className="text-sm text-red-500">{errors.agreeToTerms}</p>
                  )}
                  
                  <div className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      id="agreeToPrivacy"
                      checked={formData.agreeToPrivacy}
                      onChange={(e) => handleInputChange('agreeToPrivacy', e.target.checked)}
                      className="mt-1"
                    />
                    <label htmlFor="agreeToPrivacy" className="text-sm text-gray-700">
                      I agree to the privacy policy and consent to the collection and use of my personal 
                      information for the purpose of this project estimate.
                    </label>
                  </div>
                  {errors.agreeToPrivacy && (
                    <p className="text-sm text-red-500">{errors.agreeToPrivacy}</p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between pt-6">
                <Button type="button" variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Continue to Payment'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Project Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Project Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Project Type</h4>
              <Badge variant="secondary">
                {calculatorData.projectType || 'Not specified'}
              </Badge>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Selected Features</h4>
              <div className="space-y-1">
                {calculatorData.features?.map((feature: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs mr-1 mb-1">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Design Complexity</h4>
              <Badge variant="secondary">
                {calculatorData.designComplexity || 'Not specified'}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Pricing Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="h-5 w-5 mr-2" />
              Pricing Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Base Cost:</span>
              <span className="font-medium">${pricing?.baseCost || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Features Cost:</span>
              <span className="font-medium">${pricing?.featuresCost || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Design Cost:</span>
              <span className="font-medium">${pricing?.designCost || 0}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>Total Estimate:</span>
              <span className="text-blue-600">${pricing?.totalCost || 0}</span>
            </div>
          </CardContent>
        </Card>

        {/* Timeline Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Timeline Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Duration:</span>
              <span className="font-medium">{timeline?.duration || 0} weeks</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Start Date:</span>
              <span className="font-medium">
                {formData.preferredStartDate || 'Not set'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Estimated Completion:</span>
              <span className="font-medium">
                {formData.preferredStartDate 
                  ? new Date(new Date(formData.preferredStartDate).getTime() + (timeline?.duration || 0) * 7 * 24 * 60 * 60 * 1000).toLocaleDateString()
                  : 'Not set'
                }
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}