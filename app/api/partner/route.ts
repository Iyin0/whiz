import { render } from '@react-email/components';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

import PartnershipFormEmail from '@/emails/partnership-form';

const partnershipSchema = z.object({
  contactName: z.string().trim().min(2).max(120),
  jobTitle: z.string().trim().max(120),
  orgName: z.string().trim().max(160),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().min(1).max(40),
  partnershipTypes: z.array(z.string().trim().min(1).max(100)).min(1).max(6),
  website: z.string().trim().url().or(z.literal('')),
  message: z.string().trim().min(10).max(5000),
});

export async function POST(req: Request) {
  try {
    const payload = partnershipSchema.parse(await req.json());
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Email service is not configured. RESEND_API_KEY is missing.' },
        { status: 500 },
      );
    }

    const emailHtml = await render(PartnershipFormEmail(payload));
    const response = await new Resend(apiKey).emails.send({
      from: 'support@whizacademy.org',
      to: 'whizacademy4all@gmail.com',
      replyTo: payload.email,
      subject: `New Partnership Inquiry - ${payload.orgName || payload.contactName}`,
      html: emailHtml,
    });

    if (response.error) throw new Error(response.error.message);

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Please check the partnership form and try again.', fields: error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    // eslint-disable-next-line no-console
    console.error('Failed to send partnership form submission', error);
    return NextResponse.json({ error: 'Failed to send your partnership inquiry. Please try again.' }, { status: 500 });
  }
}
