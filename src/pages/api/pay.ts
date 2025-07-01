import type { APIRoute } from 'astro';
import { Cashfree } from '@cashfreepayments/cashfree-sdk';

const cashfree = new Cashfree({
  apiKey: process.env.CASHFREE_API_KEY || '',
  secretKey: process.env.CASHFREE_SECRET_KEY || '',
  env: 'PRODUCTION' // or 'TEST' for sandbox environment
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const service = formData.get('service');
    const coupon = formData.get('coupon');

    // Get service price based on service type
    const prices = {
      'web-dev': 49900, // ₹499
      'ai': 29900,      // ₹299
      'wp-plugin': 19900,// ₹199
      'hosting': 9900   // ₹99
    };

    const amount = prices[service as keyof typeof prices] || prices['web-dev'];
    
    // Apply coupon discount if valid
    const finalAmount = coupon ? amount * 0.9 : amount;

    // Create Cashfree order
    const orderData = {
      orderId: `order_${Date.now()}`,
      orderAmount: finalAmount / 100, // Convert to rupees
      orderCurrency: 'INR',
      orderNote: 'Service Payment',
      customerDetails: {
        customerId: `customer_${Date.now()}`,
        customerEmail: '',
        customerPhone: ''
      },
      orderMeta: {
        returnUrl: 'https://jitenderkumar.in/dashboard?order={order_id}',
        notifyUrl: 'https://jitenderkumar.in/api/cashfree-webhook'
      }
    };

    const order = await cashfree.orders.createOrder(orderData);

    // Return order details to client
    return new Response(JSON.stringify({
      orderId: order.orderId,
      orderToken: order.orderToken,
      paymentSessionId: order.paymentSessionId,
      amount: finalAmount,
      currency: 'INR'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })

  } catch (error) {
    console.error('Payment creation error:', error);
    return new Response(JSON.stringify({
      error: 'Failed to create payment. Please try again.'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};