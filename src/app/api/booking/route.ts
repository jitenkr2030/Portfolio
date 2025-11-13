import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const {
      calculatorData,
      clientInfo,
      projectDetails,
      pricing,
      timeline
    } = body

    // Validate required fields
    if (!clientInfo?.name || !clientInfo?.email || !clientInfo?.phone) {
      return NextResponse.json(
        { error: 'Missing required client information' },
        { status: 400 }
      )
    }

    if (!projectDetails?.title || !projectDetails?.description) {
      return NextResponse.json(
        { error: 'Missing required project details' },
        { status: 400 }
      )
    }

    // Create booking object
    const booking = {
      id: `book_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      calculatorData,
      clientInfo,
      projectDetails,
      pricing: {
        total: pricing.total,
        deposit: Math.round(pricing.total * 0.3),
        remaining: Math.round(pricing.total * 0.7),
        currency: pricing.currency || 'USD'
      },
      timeline: {
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + (timeline.total * 7 * 24 * 60 * 60 * 1000)).toISOString(),
        duration: timeline.total
      },
      status: 'pending',
      paymentStatus: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    // Here you would save to database
    // For now, we'll just return the booking object
    console.log('Booking created:', booking)

    return NextResponse.json({
      success: true,
      booking,
      message: 'Booking created successfully'
    })

  } catch (error) {
    console.error('Booking creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Booking API endpoint',
    endpoints: {
      'POST /api/booking': 'Create a new booking'
    }
  })
}