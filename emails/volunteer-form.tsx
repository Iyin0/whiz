import * as React from 'react';
import { Body, Container, Head, Heading, Html, Section, Text } from '@react-email/components';

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
    <Html>
      <Head />
      <Body style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f4f4f4' }}>
        <Container style={{ maxWidth: '600px', backgroundColor: '#ffffff', padding: '20px', borderRadius: '5px' }}>
          <Heading style={{ color: '#333', textAlign: 'center' }}>New Volunteer Application</Heading>
          <Section>
            <Text><strong>Full Name:</strong> {fullName}</Text>
            <Text><strong>Email:</strong> {email}</Text>
            <Text><strong>LinkedIn:</strong> {linkedIn || 'Not provided'}</Text>
            <Text><strong>Preferred Role:</strong> {role}</Text>
            <Text><strong>Availability:</strong> {availability}</Text>
            <Text><strong>Skills and Motivation:</strong></Text>
            <Text>{experience}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
