import { Resend } from 'resend';
import { render } from '@react-email/components';
import ContactFormEmail from '@/emails/contact-form';
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
        const { firstName, lastName, email, phone, message } = await req.json();

        const emailHtml = await render(ContactFormEmail({ firstName, lastName, email, phone, message }));

        const response = await resend.emails.send({
            from: 'support@simefoundation.org',
            to: 'whizacademy4all@gmail.com',
            subject: 'New Contact Form Submission',
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
