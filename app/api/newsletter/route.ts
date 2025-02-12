import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
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
