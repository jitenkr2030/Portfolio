'use client'

import React, { useState } from 'react'
import { BookingData } from '@/types/booking'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  CreditCard, 
  DollarSign, 
  Shield, 
  CheckCircle, 
  Clock,
  Download,
  Mail,
  Phone,
  Building,
  Calendar,
  User
} from 'lucide-react'

interface PaymentFormProps {
  bookingData: Partial<BookingData>
  onPaymentComplete: (paymentData: any) => void
  onBack: () => void
}

export function PaymentForm({ bookingData, onPaymentComplete, onBack }: PaymentFormProps) {
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    billingAddress: '',
    billingCity: '',
    billingZip: ''
  })

  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'paypal' | 'bank_transfer'>('credit_card')

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))

    const paymentResult = {
      id: `pay_${Date.now()}`,
      bookingId: bookingData.id || `book_${Date.now()}`,
      amount: bookingData.pricing?.deposit || 0,
      currency: bookingData.pricing?.currency || 'USD',
      paymentMethod,
      transactionId: `txn_${Date.now()}`,
      status: 'completed',
      createdAt: new Date(),
      receiptUrl: `/receipts/receipt_${Date.now()}.pdf`
    }

    onPaymentComplete(paymentResult)
    setIsProcessing(false)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="h-5 w-5 mr-2" />
            Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Client Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start">
                  <User className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                  <div>
                    <div className="font-medium">{bookingData.clientInfo?.name}</div>
                    <div className="text-gray-600">{bookingData.clientInfo?.email}</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                  <div>{bookingData.clientInfo?.phone}</div>
                </div>
                {bookingData.clientInfo?.company && (
                  <div className="flex items-start">
                    <Building className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                    <div>{bookingData.clientInfo?.company}</div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Payment Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Project Total:</span>
                  <span className="font-medium">₹{bookingData.pricing?.total?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Deposit Due Now:</span>
                  <span className="font-medium text-blue-600">₹{bookingData.pricing?.deposit?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Remaining Balance:</span>
                  <span className="font-medium">₹{bookingData.pricing?.remaining?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method:</span>
                  <Badge variant="outline">{paymentMethod.replace('_', ' ').toUpperCase()}</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Method Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => setPaymentMethod('credit_card')}
              className={`p-4 border rounded-lg text-center transition-colors ${
                paymentMethod === 'credit_card' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <CreditCard className="h-8 w-8 mx-auto mb-2" />
              <div className="font-medium">Credit Card</div>
              <div className="text-xs text-gray-600">Visa, Mastercard, Amex</div>
            </button>

            <button
              onClick={() => setPaymentMethod('paypal')}
              className={`p-4 border rounded-lg text-center transition-colors ${
                paymentMethod === 'paypal' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="h-8 w-8 mx-auto mb-2 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">PP</span>
              </div>
              <div className="font-medium">PayPal</div>
              <div className="text-xs text-gray-600">Fast & Secure</div>
            </button>

            <button
              onClick={() => setPaymentMethod('bank_transfer')}
              className={`p-4 border rounded-lg text-center transition-colors ${
                paymentMethod === 'bank_transfer' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Building className="h-8 w-8 mx-auto mb-2" />
              <div className="font-medium">Bank Transfer</div>
              <div className="text-xs text-gray-600">Direct deposit</div>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Payment Form */}
      {paymentMethod === 'credit_card' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="h-5 w-5 mr-2" />
              Credit Card Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePayment} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number *</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardName">Name on Card *</Label>
                  <Input
                    id="cardName"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date *</Label>
                  <Input
                    id="expiryDate"
                    placeholder="MM/YY"
                    maxLength={5}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV *</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    maxLength={4}
                    required
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h5 className="font-medium">Billing Address</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="billingAddress">Street Address *</Label>
                    <Input
                      id="billingAddress"
                      placeholder="123 Main St"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="billingCity">City *</Label>
                    <Input
                      id="billingCity"
                      placeholder="New York"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="billingZip">ZIP Code *</Label>
                    <Input
                      id="billingZip"
                      placeholder="10001"
                      required
                    />
                  </div>
                </div>
              </div>

              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  Your payment information is encrypted and secure. We use industry-standard security measures to protect your data.
                </AlertDescription>
              </Alert>

              <div className="flex justify-between items-center pt-6">
                <Button type="button" variant="outline" onClick={onBack}>
                  Back
                </Button>
                
                <Button type="submit" disabled={isProcessing} className="flex items-center">
                  {isProcessing ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <DollarSign className="w-4 h-4 mr-2" />
                      Pay ₹{bookingData.pricing?.deposit?.toLocaleString()}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {paymentMethod === 'paypal' && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-xl font-bold">PayPal</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Pay with PayPal</h3>
            <p className="text-gray-600 mb-6">You will be redirected to PayPal to complete your payment securely.</p>
            <div className="flex justify-center space-x-4">
              <Button variant="outline" onClick={onBack}>
                Back
              </Button>
              <Button onClick={handlePayment} disabled={isProcessing}>
                {isProcessing ? 'Redirecting...' : 'Continue to PayPal'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {paymentMethod === 'bank_transfer' && (
        <Card>
          <CardContent className="text-center py-12">
            <Building className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Bank Transfer</h3>
            <p className="text-gray-600 mb-6">Please use the following bank details for your deposit payment.</p>
            
            <div className="bg-gray-50 p-6 rounded-lg mb-6 text-left max-w-md mx-auto">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">Bank Name:</span>
                  <span>First National Bank</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Account Name:</span>
                  <span>Your Company Name</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Account Number:</span>
                  <span>1234567890</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Routing Number:</span>
                  <span>021000021</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Amount:</span>
                  <span className="font-medium text-blue-600">₹{bookingData.pricing?.deposit?.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <Button variant="outline" onClick={onBack}>
                Back
              </Button>
              <Button onClick={handlePayment} disabled={isProcessing}>
                {isProcessing ? 'Processing...' : 'I Have Sent the Payment'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}