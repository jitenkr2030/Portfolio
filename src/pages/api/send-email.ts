import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  const { to, subject, text } = await request.json();

  try {
    const data = await resend.emails.send({
      from: 'Your Name <your@email.com>',
      to,
      subject,
      text,
    });
    return new Response(JSON.stringify({ success: true, data }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error }), { status: 500 });
  }
};
