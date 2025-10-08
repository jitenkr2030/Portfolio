export interface BookingData {
  id: string
  calculatorData: any
  clientInfo: {
    name: string
    email: string
    phone: string
    company: string
  }
  projectDetails: {
    title: string
    description: string
    requirements: string[]
  }
  pricing: {
    total: number
    deposit: number
    remaining: number
    currency: string
  }
  timeline: {
    startDate: Date
    endDate: Date
    duration: number
  }
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
  paymentStatus: 'pending' | 'deposit_paid' | 'fully_paid' | 'overdue'
  createdAt: Date
  updatedAt: Date
}

export interface PaymentReceipt {
  id: string
  bookingId: string
  amount: number
  currency: string
  paymentMethod: 'credit_card' | 'paypal' | 'bank_transfer' | 'crypto'
  transactionId: string
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  createdAt: Date
  receiptUrl?: string
}