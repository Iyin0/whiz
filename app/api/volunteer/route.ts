import { Resend } from 'resend';
import { render } from '@react-email/components';
import VolunteerFormEmail from '@/emails/volunteer-form';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const { firstName, lastName, email, phone } = await req.json();

        const emailHtml = await render(VolunteerFormEmail({ firstName, lastName, email, phone }));

        const response = await resend.emails.send({
            from: 'support@whizacademy.org',
            to: 'whizacademy4all@gmail.com',
            subject: 'New Volunteer Form Submission',
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
