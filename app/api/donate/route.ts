import { Resend } from 'resend';
import { render } from '@react-email/components';
import DonationFormEmail from '@/emails/donation-form';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const apiKey = process.env.RESEND_API_KEY;

        if (!apiKey) {
            return NextResponse.json(
            { error: 'Email service is not configured. RESEND_API_KEY is missing.' },
            { status: 500 }
            );
        }

        const resend = new Resend(apiKey);
        const { firstName, lastName, email, phone, donation } = await req.json();

        const emailHtml = await render(DonationFormEmail({ firstName, lastName, email, phone, donation }));

        const response = await resend.emails.send({
            from: 'support@simefoundation.org',
            to: 'whizacademy4all@gmail.com',
            subject: 'New Donation Form Submission',
            html: emailHtml,
        });

        if (response.error) {
            throw new Error(response.error.message);
        }
        return Response.json({ success: true });
    } catch (error) {
        return Response.json({ error: `Failed to send email: ${error}` }, { status: 500 });
    }
}
