import * as React from 'react';
import {
  ContentSection,
  DetailCard,
  DetailRow,
  NotificationLayout,
} from './components/notification-layout';

interface ApplicationFormEmailProps {
  roleId: string;
  roleTitle: string;
  roleType: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  availability: string;
  weeklyHours: string;
  experience: string;
  statement: string;
  cvUrl?: string;
  portfolioUrl?: string;
  safeguardingAgreement: boolean;
  consent: boolean;
}

export default function ApplicationFormEmail({
  roleId,
  roleTitle,
  roleType,
  firstName,
  lastName,
  email,
  phone,
  location,
  availability,
  weeklyHours,
  experience,
  statement,
  cvUrl,
  portfolioUrl,
  safeguardingAgreement,
  consent,
}: ApplicationFormEmailProps) {
  return (
    <NotificationLayout
      preview={`New ${roleTitle} application from ${firstName} ${lastName}`}
      status="Career application"
      title="New Whiz Academy application"
      description="A candidate submitted an application through the Whiz Academy careers page."
    >
      <DetailCard>
        <DetailRow label="Role" value={roleTitle} />
        <DetailRow label="Role ID" value={roleId} />
        <DetailRow label="Role type" value={roleType} />
        <DetailRow label="First name" value={firstName} />
        <DetailRow label="Last name" value={lastName} />
        <DetailRow label="Email" value={email} />
        <DetailRow label="Phone" value={phone} />
        <DetailRow label="Location" value={location} />
        <DetailRow label="Availability" value={availability} />
        <DetailRow label="Weekly hours" value={weeklyHours} />
        <DetailRow label="CV/Resume" value={cvUrl || 'Not provided'} />
        <DetailRow
          label="Portfolio"
          value={portfolioUrl || 'Not provided'}
        />
        <DetailRow
          label="Safeguarding agreement"
          value={safeguardingAgreement ? 'Confirmed' : 'Not confirmed'}
        />
        <DetailRow
          label="Contact consent"
          value={consent ? 'Confirmed' : 'Not confirmed'}
        />
      </DetailCard>
      <ContentSection title="Relevant experience">{experience}</ContentSection>
      <ContentSection title="Statement">{statement}</ContentSection>
    </NotificationLayout>
  );
}

ApplicationFormEmail.PreviewProps = {
  roleId: 'programme-coordinator',
  roleTitle: 'Programme Coordinator',
  roleType: 'Full-time',
  firstName: 'Fatima',
  lastName: 'Al-Hassan',
  email: 'fatima@example.com',
  phone: '+234 800 000 0000',
  location: 'Kano, Nigeria',
  availability: 'Immediately',
  weeklyHours: '40 hours',
  experience:
    'I have coordinated community education programmes and managed volunteer teams across several schools.',
  statement:
    'I am passionate about expanding equitable access to practical digital education.',
  cvUrl: 'https://example.com/fatima-cv.pdf',
  portfolioUrl: 'https://example.com/fatima',
  safeguardingAgreement: true,
  consent: true,
} satisfies ApplicationFormEmailProps;
