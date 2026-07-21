import { render } from '@react-email/components';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

import ContactFormEmail from '@/emails/contact-form';

const contactSchema = z.object({
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(40),
  subject: z.string().trim().min(1).max(120),
  message: z.string().trim().min(10).max(5000),
});

export async function POST(req: Request) {
  try {
    const payload = contactSchema.parse(await req.json());
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Email service is not configured. RESEND_API_KEY is missing.' },
        { status: 500 },
      );
    }

    const emailHtml = await render(ContactFormEmail(payload));
    const response = await new Resend(apiKey).emails.send({
      from: 'support@whizacademy.org',
      to: 'whizacademy4all@gmail.com',
      replyTo: payload.email,
      subject: `New Contact Form Submission - ${payload.subject}`,
      html: emailHtml,
    });

    if (response.error) throw new Error(response.error.message);

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Please check the contact form and try again.', fields: error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    // eslint-disable-next-line no-console
    console.error('Failed to send contact form submission', error);
    return NextResponse.json({ error: 'Failed to send your message. Please try again.' }, { status: 500 });
  }
}
