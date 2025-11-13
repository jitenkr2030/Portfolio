'use client'

import React, { useState } from 'react'
import { PaymentReceipt } from '@/types/booking'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  CheckCircle, 
  Download, 
  Mail, 
  Phone, 
  Building, 
  Calendar,
  DollarSign,
  CreditCard,
  FileText,
  Receipt,
  Share,
  User
} from 'lucide-react'

interface PaymentReceiptProps {
  receipt: PaymentReceipt
  bookingData: Partial<BookingData>
  onDownload: () => void
  onEmail: () => void
  onShare: () => void
}

export function PaymentReceiptComponent({ 
  receipt, 
  bookingData, 
  onDownload, 
  onEmail, 
  onShare 
}: PaymentReceiptProps) {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    setIsDownloading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    onDownload()
    setIsDownloading(false)
  }

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'credit_card':
        return <CreditCard className="h-5 w-5" />
      case 'paypal':
        return <div className="h-5 w-5 bg-blue-600 rounded flex items-center justify-center">
          <span className="text-white text-xs font-bold">PP</span>
        </div>
      case 'bank_transfer':
        return <Building className="h-5 w-5" />
      default:
        return <DollarSign className="h-5 w-5" />
    }
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Receipt Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Receipt className="h-6 w-6 text-green-600 mr-3" />
              <div>
                <CardTitle className="text-xl">Payment Receipt</CardTitle>
                <p className="text-sm text-gray-600">Transaction #{receipt.transactionId}</p>
              </div>
            </div>
            <div className="text-right">
              <Badge className="bg-green-100 text-green-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                {receipt.status.toUpperCase()}
              </Badge>
              <p className="text-xs text-gray-500 mt-1">{formatDate(receipt.createdAt)}</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Payment Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="h-5 w-5 mr-2" />
            Payment Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Payment Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount Paid:</span>
                    <span className="font-medium text-green-600">${receipt.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Currency:</span>
                    <span className="font-medium">{receipt.currency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Method:</span>
                    <div className="flex items-center">
                      {getPaymentMethodIcon(receipt.paymentMethod)}
                      <span className="ml-2 font-medium capitalize">
                        {receipt.paymentMethod.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Transaction ID:</span>
                    <span className="font-mono text-xs">{receipt.transactionId}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Booking Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Booking ID:</span>
                    <span className="font-medium">{receipt.bookingId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Project Total:</span>
                    <span className="font-medium">₹{bookingData.pricing?.total?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Deposit Paid:</span>
                    <span className="font-medium text-blue-600">₹{bookingData.pricing?.deposit?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Remaining Balance:</span>
                    <span className="font-medium">₹{bookingData.pricing?.remaining?.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Client & Project Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Client Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              Client Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start">
                <User className="h-4 w-4 mr-3 mt-0.5 text-gray-500" />
                <div>
                  <div className="font-medium">{bookingData.clientInfo?.name}</div>
                  <div className="text-sm text-gray-600">Client Name</div>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="h-4 w-4 mr-3 mt-0.5 text-gray-500" />
                <div>
                  <div className="font-medium">{bookingData.clientInfo?.email}</div>
                  <div className="text-sm text-gray-600">Email Address</div>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="h-4 w-4 mr-3 mt-0.5 text-gray-500" />
                <div>
                  <div className="font-medium">{bookingData.clientInfo?.phone}</div>
                  <div className="text-sm text-gray-600">Phone Number</div>
                </div>
              </div>
              
              {bookingData.clientInfo?.company && (
                <div className="flex items-start">
                  <Building className="h-4 w-4 mr-3 mt-0.5 text-gray-500" />
                  <div>
                    <div className="font-medium">{bookingData.clientInfo?.company}</div>
                    <div className="text-sm text-gray-600">Company</div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Project Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Project Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <div className="font-medium">{bookingData.projectDetails?.title}</div>
                <div className="text-sm text-gray-600">Project Title</div>
              </div>
              
              <div>
                <div className="font-medium">{bookingData.timeline?.duration} weeks</div>
                <div className="text-sm text-gray-600">Estimated Duration</div>
              </div>
              
              <div>
                <div className="font-medium">
                  {bookingData.timeline?.startDate && formatDate(bookingData.timeline.startDate)}
                </div>
                <div className="text-sm text-gray-600">Start Date</div>
              </div>
              
              <div>
                <div className="font-medium">
                  {bookingData.timeline?.endDate && formatDate(bookingData.timeline.endDate)}
                </div>
                <div className="text-sm text-gray-600">Estimated Completion</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project Description */}
      {bookingData.projectDetails?.description && (
        <Card>
          <CardHeader>
            <CardTitle>Project Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">
              {bookingData.projectDetails.description}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Payment Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-600">Project Total:</span>
              <span className="font-medium">₹{bookingData.pricing?.total?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-600">Deposit Paid (30%):</span>
              <span className="font-medium text-blue-600">-${bookingData.pricing?.deposit?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-600">Remaining Balance:</span>
              <span className="font-medium">${bookingData.pricing?.remaining?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center py-2 text-lg font-semibold">
              <span>Total Paid:</span>
              <span className="text-green-600">${receipt.amount.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Card>
        <CardContent className="text-center py-8">
          <div className="mb-6">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Payment Successful!
            </h3>
            <p className="text-lg text-gray-600">
              Thank you for your payment. Your booking has been confirmed and you will receive a confirmation email shortly.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleDownload} 
              disabled={isDownloading}
              className="flex items-center"
            >
              <Download className="w-4 h-4 mr-2" />
              {isDownloading ? 'Downloading...' : 'Download Receipt'}
            </Button>
            
            <Button variant="outline" onClick={onEmail} className="flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              Email Receipt
            </Button>
            
            <Button variant="outline" onClick={onShare} className="flex items-center">
              <Share className="w-4 h-4 mr-2" />
              Share Receipt
            </Button>
          </div>
          
          <div className="mt-6 text-sm text-gray-500">
            <p>A copy of this receipt has been sent to {bookingData.clientInfo?.email}</p>
            <p className="mt-1">Booking ID: {receipt.bookingId} | Receipt ID: {receipt.id}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}