import { render } from '@react-email/components';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

import ApplicationFormEmail from '@/emails/application-form';
import { careerMeta, careerRoles } from '@/lib/careers';

const wordCount = (value: string) => value.trim().split(/\s+/).filter(Boolean).length;
const minStatementWords = 50;
const maxStatementWords = 300;

const applicationSchema = z.object({
  roleId: z.string().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  location: z.string().min(2),
  availability: z.string().min(1),
  weeklyHours: z.string().min(1),
  experience: z.string().min(20),
  statement: z.string().refine((value) => {
    const words = wordCount(value);

    return words >= minStatementWords && words <= maxStatementWords;
  }),
  cvUrl: z.string().url().optional().or(z.literal('')),
  portfolioUrl: z.string().url().optional().or(z.literal('')),
  safeguardingAgreement: z.literal(true),
  consent: z.literal(true),
});

export async function POST(req: Request) {
  try {
    if (Date.now() > new Date(careerMeta.applicationClosesAt).getTime()) {
      return NextResponse.json(
        { error: 'Applications for this cycle are now closed.' },
        { status: 410 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Email service is not configured. RESEND_API_KEY is missing.' },
        { status: 500 }
      );
    }

    const payload = applicationSchema.parse(await req.json());
    const role = careerRoles.find((item) => item.id === payload.roleId);

    if (!role) {
      return NextResponse.json({ error: 'Selected role was not found.' }, { status: 400 });
    }

    if (role.requiresCv && !payload.cvUrl) {
      return NextResponse.json({ error: 'A CV or resume link is required for paid roles.' }, { status: 400 });
    }

    const resend = new Resend(apiKey);
    const emailHtml = await render(ApplicationFormEmail({
      roleTitle: role.title,
      roleType: role.type,
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      phone: payload.phone,
      location: payload.location,
      availability: payload.availability,
      weeklyHours: payload.weeklyHours,
      experience: payload.experience,
      statement: payload.statement,
      cvUrl: payload.cvUrl,
      portfolioUrl: payload.portfolioUrl,
    }));

    const response = await resend.emails.send({
      from: 'support@whizacademy.org',
      to: careerMeta.email,
      subject: `New Whiz Academy Application - ${role.title}`,
      html: emailHtml,
    });

    if (response.error) {
      throw new Error(response.error.message);
    }

    return Response.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Please check the application form and try again.' }, { status: 400 });
    }

    return NextResponse.json({ error: `Failed to send application: ${error}` }, { status: 500 });
  }
}
