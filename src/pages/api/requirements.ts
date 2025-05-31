import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const details = formData.get('details');
  const communication = formData.get('communication');
  // You can also handle file uploads here if needed

  // TODO: Save to DB, send email, etc.

  return new Response(JSON.stringify({ success: true }), { status: 200 });
};
