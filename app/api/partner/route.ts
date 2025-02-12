import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const { firstName, lastName, email, phone, orgName } = await req.json();

        const response = await resend.emails.send({
            from: 'support@whizacademy.org',
            to: 'whizacademy4all@gmail.com',
            subject: 'New Partnership Form Submission',
            html: `<p><strong>First Name:</strong> ${firstName}</p>
                   <p><strong>Last Name:</strong> ${lastName}</p>
                   <p><strong>Email:</strong> ${email}</p>
                   <p><strong>Phone:</strong> ${phone}</p>
                   <p><strong>Organization Name:</strong> ${orgName}</p>`,
        });

        if (response.error) {
            throw new Error(response.error.message);
        }
        return Response.json({ success: true });
    } catch (error) {
        return Response.json({ error: `Failed to send email: ${error}` }, { status: 500 });
    }
}
