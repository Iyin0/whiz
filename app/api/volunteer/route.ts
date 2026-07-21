import { render } from '@react-email/components';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

import VolunteerFormEmail from '@/emails/volunteer-form';

const volunteerSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  linkedIn: z.string().trim().url().or(z.literal('')),
  role: z.string().trim().min(1).max(120),
  availability: z.string().trim().min(1).max(120),
  experience: z.string().trim().min(20).max(5000),
});

export async function POST(req: Request) {
  try {
    const payload = volunteerSchema.parse(await req.json());
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Email service is not configured. RESEND_API_KEY is missing.' },
        { status: 500 },
      );
    }

    const emailHtml = await render(VolunteerFormEmail(payload));
    const response = await new Resend(apiKey).emails.send({
      from: 'support@whizacademy.org',
      to: 'whizacademy4all@gmail.com',
      replyTo: payload.email,
      subject: `New Volunteer Application - ${payload.role}`,
      html: emailHtml,
    });

    if (response.error) throw new Error(response.error.message);

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Please check the volunteer form and try again.', fields: error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    // eslint-disable-next-line no-console
    console.error('Failed to send volunteer form submission', error);
    return NextResponse.json({ error: 'Failed to send your volunteer application. Please try again.' }, { status: 500 });
  }
}
