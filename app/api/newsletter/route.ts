import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

const newsletterSchema = z.object({
  email: z.string().trim().email().max(254),
});

export async function POST(req: Request) {
  try {
    const { email } = newsletterSchema.parse(await req.json());
    const apiKey = process.env.RESEND_API_KEY;
    const audienceId = process.env.RESEND_AUDIENCE_ID;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Email service is not configured. RESEND_API_KEY is missing.' },
        { status: 500 },
      );
    }

    if (!audienceId) {
      return NextResponse.json(
        { error: 'Newsletter service is not configured. RESEND_AUDIENCE_ID is missing.' },
        { status: 500 },
      );
    }

    const response = await new Resend(apiKey).contacts.create({
      email,
      unsubscribed: false,
      audienceId,
    });

    if (response.error) throw new Error(response.error.message);

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 });
    }

    // eslint-disable-next-line no-console
    console.error('Failed to subscribe newsletter contact', error);
    return NextResponse.json({ error: 'Failed to subscribe. Please try again.' }, { status: 500 });
  }
}
