import { Resend } from 'resend';
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
        const { email } = await req.json();

        const response = await resend.contacts.create({
            email,
            unsubscribed: false,
            audienceId: process.env.RESEND_AUDIENCE_ID as string,
        });

        if (response.error) {
            throw new Error(response.error.message);
        }
        return Response.json({ success: true });
    } catch (error) {
        return Response.json({ error: `Failed to subscribe email: ${error}` }, { status: 500 });
    }
}
