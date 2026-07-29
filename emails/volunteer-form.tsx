import * as React from 'react';
import {
  ContentSection,
  DetailCard,
  DetailRow,
  NotificationLayout,
} from './components/notification-layout';

export interface VolunteerFormEmailProps {
  fullName: string;
  email: string;
  linkedIn: string;
  role: string;
  availability: string;
  experience: string;
}

export default function VolunteerFormEmail({
  fullName,
  email,
  linkedIn,
  role,
  availability,
  experience,
}: VolunteerFormEmailProps) {
  return (
    <NotificationLayout
      preview={`New volunteer application from ${fullName}`}
      status="Volunteer application"
      title="New volunteer application"
      description="A new volunteer submitted their details through the Whiz Academy website."
    >
      <DetailCard>
        <DetailRow label="Full name" value={fullName} />
        <DetailRow label="Email" value={email} />
        <DetailRow label="LinkedIn" value={linkedIn || 'Not provided'} />
        <DetailRow label="Preferred role" value={role} />
        <DetailRow label="Availability" value={availability} />
      </DetailCard>
      <ContentSection title="Skills and motivation">
        {experience}
      </ContentSection>
    </NotificationLayout>
  );
}

VolunteerFormEmail.PreviewProps = {
  fullName: 'Chidi Eze',
  email: 'chidi@example.com',
  linkedIn: 'https://www.linkedin.com/in/example',
  role: 'Programme Mentor',
  availability: 'Weekends',
  experience:
    'I am a software engineer with mentoring experience and would like to support young learners.',
} satisfies VolunteerFormEmailProps;
