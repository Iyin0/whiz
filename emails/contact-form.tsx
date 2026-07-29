import * as React from 'react';
import {
  ContentSection,
  DetailCard,
  DetailRow,
  NotificationLayout,
} from './components/notification-layout';

export interface ContactFormEmailProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function ContactFormEmail({
  firstName,
  lastName,
  email,
  phone,
  subject,
  message,
}: ContactFormEmailProps) {
  return (
    <NotificationLayout
      preview={`New contact enquiry from ${firstName} ${lastName}`}
      status="New enquiry"
      title="New contact form submission"
      description="A new message was submitted through the Whiz Academy contact page."
    >
      <DetailCard>
        <DetailRow label="First name" value={firstName} />
        <DetailRow label="Last name" value={lastName} />
        <DetailRow label="Email" value={email} />
        <DetailRow label="Phone" value={phone || 'Not provided'} />
        <DetailRow label="Subject" value={subject} />
      </DetailCard>
      <ContentSection title="Message">{message}</ContentSection>
    </NotificationLayout>
  );
}

ContactFormEmail.PreviewProps = {
  firstName: 'Amara',
  lastName: 'Okafor',
  email: 'amara@example.com',
  phone: '+234 800 000 0000',
  subject: 'School partnership enquiry',
  message:
    'I would like to learn more about bringing a Whiz Academy programme to our community.',
} satisfies ContactFormEmailProps;
