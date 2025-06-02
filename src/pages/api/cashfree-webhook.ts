import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  const payload = await request.json();

  // Validate webhook signature if required by Cashfree
  // Process payment status, update DB, send confirmation email, etc.

  // Example: Log the event
  console.log('Cashfree webhook received:', payload);

  // Always respond quickly to webhooks
  return new Response('OK', { status: 200 });
};
