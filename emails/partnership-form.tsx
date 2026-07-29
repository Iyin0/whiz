import * as React from 'react';
import {
  ContentSection,
  DetailCard,
  DetailRow,
  NotificationLayout,
} from './components/notification-layout';

export interface PartnershipFormEmailProps {
  contactName: string;
  jobTitle: string;
  orgName: string;
  email: string;
  phone: string;
  partnershipTypes: string[];
  website: string;
  message: string;
}

export default function PartnershipFormEmail({
  contactName,
  jobTitle,
  orgName,
  email,
  phone,
  partnershipTypes,
  website,
  message,
}: PartnershipFormEmailProps) {
  return (
    <NotificationLayout
      preview={`New partnership enquiry from ${orgName || contactName}`}
      status="Partnership enquiry"
      title="New partnership inquiry"
      description="A prospective partner submitted an inquiry through the Whiz Academy website."
    >
      <DetailCard>
        <DetailRow label="Contact name" value={contactName} />
        <DetailRow label="Job title" value={jobTitle || 'Not provided'} />
        <DetailRow
          label="Organisation"
          value={orgName || 'Not provided'}
        />
        <DetailRow label="Email" value={email} />
        <DetailRow label="Phone" value={phone} />
        <DetailRow
          label="Partnership types"
          value={partnershipTypes?.join(', ') || 'Not provided'}
        />
        <DetailRow label="Website" value={website || 'Not provided'} />
      </DetailCard>
      <ContentSection title="Partnership goals">{message}</ContentSection>
    </NotificationLayout>
  );
}

PartnershipFormEmail.PreviewProps = {
  contactName: 'Amina Bello',
  jobTitle: 'Programme Director',
  orgName: 'Community Learning Initiative',
  email: 'amina@example.com',
  phone: '+234 800 000 0000',
  partnershipTypes: ['Programme sponsorship', 'Technology support'],
  website: 'https://example.com',
  message:
    'We would like to explore supporting digital-skills training for students in our partner schools.',
} satisfies PartnershipFormEmailProps;
