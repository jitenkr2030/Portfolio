import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const service = formData.get('service');
  const date = formData.get('date');
  const description = formData.get('description');
  const login = formData.get('login');
  // File upload (if any)
  const file = formData.get('file');

  // TODO: Save to DB, send email, etc.

  // Example: log the booking
  console.log({ service, date, description, login, file });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
};
