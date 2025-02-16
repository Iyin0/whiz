import { Resend } from 'resend';
import { render } from '@react-email/components';
import PartnershipFormEmail from '@/emails/partnership-form';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const { firstName, lastName, email, phone, orgName } = await req.json();

        const emailHtml = await render(PartnershipFormEmail({ firstName, lastName, email, phone, orgName }));

        const response = await resend.emails.send({
            from: 'support@whizacademy.org',
            to: 'whizacademy4all@gmail.com',
            subject: 'New Partnership Form Submission',
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
