'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  CreditCard, 
  Lock, 
  Shield, 
  CheckCircle, 
  ArrowRight,
  ArrowLeft,
  Clock,
  DollarSign,
  FileText,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Smartphone,
  Globe,
  Database,
  Palette,
  Code
} from 'lucide-react'

interface CheckoutItem {
  id: number
  name: string
  description: string
  price: number
  quantity: number
  category: string
  features: string[]
}

interface FormData {
  // Personal Information
  firstName: string
  lastName: string
  email: string
  phone: string
  
  // Billing Information
  cardNumber: string
  expiryDate: string
  cvv: string
  cardholderName: string
  
  // Project Details
  projectName: string
  projectDescription: string
  budget: string
  timeline: string
  
  // Billing Address
  address: string
  city: string
  state: string
  zipCode: string
  country: string
}

const checkoutItems: CheckoutItem[] = [
  {
    id: 1,
    name: "E-Commerce Platform",
    description: "Complete e-commerce solution with payment integration",
    price: 15000,
    quantity: 1,
    category: "Web Development",
    features: ["Responsive Design", "Payment Gateway", "Admin Panel", "SEO Optimized"]
  },
  {
    id: 2,
    name: "UI/UX Design Package",
    description: "Professional design services with multiple revisions",
    price: 3500,
    quantity: 1,
    category: "Design",
    features: ["Wireframing", "Prototyping", "Design System", "User Testing"]
  }
]

const paymentMethods = [
  { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
  { id: 'paypal', name: 'PayPal', icon: Globe },
  { id: 'bank', name: 'Bank Transfer', icon: Database }
]

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [selectedPayment, setSelectedPayment] = useState('card')
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    projectName: '',
    projectDescription: '',
    budget: '',
    timeline: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  })

  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const subtotal = checkoutItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + tax

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const validateStep = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return formData.firstName && formData.lastName && formData.email && formData.phone
      case 2:
        return formData.projectName && formData.projectDescription && formData.budget && formData.timeline
      case 3:
        if (selectedPayment === 'card') {
          return formData.cardNumber && formData.expiryDate && formData.cvv && formData.cardholderName
        }
        return true
      default:
        return true
    }
  }

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1)
    }
  }

  const handlePrevious = () => {
    setStep(step - 1)
  }

  const handleSubmit = async () => {
    setIsProcessing(true)
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setIsComplete(true)
    }, 3000)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Successful!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for your payment. Your order has been confirmed and you will receive a confirmation email shortly.
            </p>
            <div className="space-y-2 text-sm text-gray-500 mb-6">
              <p>Order ID: #{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
              <p>Total Paid: {formatPrice(total)}</p>
              <p>Date: {new Date().toLocaleDateString()}</p>
            </div>
            <Button className="w-full">
              View Order Details
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-600" />
                <span className="text-sm text-gray-600">Secure Payment</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                {[1, 2, 3, 4].map((stepNumber) => (
                  <div key={stepNumber} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step >= stepNumber ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {stepNumber}
                    </div>
                    <span className={`ml-2 text-sm ${
                      step >= stepNumber ? 'text-blue-600 font-medium' : 'text-gray-500'
                    }`}>
                      {stepNumber === 1 ? 'Personal' : stepNumber === 2 ? 'Project' : stepNumber === 3 ? 'Payment' : 'Review'}
                    </span>
                    {stepNumber < 4 && (
                      <div className={`w-16 h-1 mx-4 ${
                        step > stepNumber ? 'bg-blue-600' : 'bg-gray-200'
                      }`}></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Step Content */}
            <Card>
              <CardContent className="p-6">
                {step === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                        <Input
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                        <Input
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          placeholder="Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="john.doe@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <Input
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900">Project Details</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                        <Input
                          value={formData.projectName}
                          onChange={(e) => handleInputChange('projectName', e.target.value)}
                          placeholder="My Awesome Project"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Project Description</label>
                        <textarea
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows={4}
                          value={formData.projectDescription}
                          onChange={(e) => handleInputChange('projectDescription', e.target.value)}
                          placeholder="Describe your project requirements..."
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Budget Range</label>
                          <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.budget}
                            onChange={(e) => handleInputChange('budget', e.target.value)}
                          >
                            <option value="">Select budget range</option>
                            <option value="1000-5000">$1,000 - $5,000</option>
                            <option value="5000-10000">$5,000 - $10,000</option>
                            <option value="10000-20000">$10,000 - $20,000</option>
                            <option value="20000+">$20,000+</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Timeline</label>
                          <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.timeline}
                            onChange={(e) => handleInputChange('timeline', e.target.value)}
                          >
                            <option value="">Select timeline</option>
                            <option value="1-2 weeks">1-2 weeks</option>
                            <option value="1-2 months">1-2 months</option>
                            <option value="2-4 months">2-4 months</option>
                            <option value="4+ months">4+ months</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900">Payment Method</h2>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {paymentMethods.map((method) => (
                          <Card
                            key={method.id}
                            className={`cursor-pointer transition-all ${
                              selectedPayment === method.id ? 'ring-2 ring-blue-500' : ''
                            }`}
                            onClick={() => setSelectedPayment(method.id)}
                          >
                            <CardContent className="p-4 text-center">
                              <method.icon className="h-8 w-8 mx-auto mb-2 text-gray-600" />
                              <p className="text-sm font-medium">{method.name}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      {selectedPayment === 'card' && (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                            <Input
                              value={formData.cardholderName}
                              onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                              placeholder="John Doe"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                            <Input
                              value={formData.cardNumber}
                              onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                              placeholder="1234 5678 9012 3456"
                              maxLength={19}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                              <Input
                                value={formData.expiryDate}
                                onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                                placeholder="MM/YY"
                                maxLength={5}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                              <Input
                                value={formData.cvv}
                                onChange={(e) => handleInputChange('cvv', e.target.value)}
                                placeholder="123"
                                maxLength={3}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900">Review Order</h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Personal Information</h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
                          <p><strong>Email:</strong> {formData.email}</p>
                          <p><strong>Phone:</strong> {formData.phone}</p>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Project Details</h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p><strong>Project:</strong> {formData.projectName}</p>
                          <p><strong>Budget:</strong> {formData.budget}</p>
                          <p><strong>Timeline:</strong> {formData.timeline}</p>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Payment Method</h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p><strong>Method:</strong> {paymentMethods.find(m => m.id === selectedPayment)?.name}</p>
                          {selectedPayment === 'card' && (
                            <p><strong>Card:</strong> ****{formData.cardNumber.slice(-4)}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={step === 1}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  <div className="flex space-x-3">
                    {step === 4 ? (
                      <Button
                        onClick={handleSubmit}
                        disabled={isProcessing}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        {isProcessing ? 'Processing...' : 'Complete Payment'}
                        {isProcessing ? <Lock className="h-4 w-4 ml-2" /> : <ArrowRight className="h-4 w-4 ml-2" />}
                      </Button>
                    ) : (
                      <Button onClick={handleNext}>
                        Next
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {checkoutItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-600">{item.description}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {item.features.slice(0, 2).map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatPrice(item.price)}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
                
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax (8%)</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div className="flex justify-between font-medium text-lg pt-2 border-t">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Shield className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="font-medium text-blue-900">Secure Payment</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    Your payment information is encrypted and secure. We never store your card details.
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">What's Included:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Full project development
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Unlimited revisions
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      6 months support
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Source code included
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}