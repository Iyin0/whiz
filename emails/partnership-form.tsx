import * as React from 'react';
import { Body, Container, Head, Heading, Html, Section, Text } from '@react-email/components';

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
    <Html>
      <Head />
      <Body style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f4f4f4' }}>
        <Container style={{ maxWidth: '600px', backgroundColor: '#ffffff', padding: '20px', borderRadius: '5px' }}>
          <Heading style={{ color: '#333', textAlign: 'center' }}>New Partnership Inquiry</Heading>
          <Section>
            <Text><strong>Contact Name:</strong> {contactName}</Text>
            <Text><strong>Job Title:</strong> {jobTitle || 'Not provided'}</Text>
            <Text><strong>Organisation Name:</strong> {orgName || 'Not provided'}</Text>
            <Text><strong>Email:</strong> {email}</Text>
            <Text><strong>Phone:</strong> {phone}</Text>
            <Text><strong>Partnership Types:</strong> {partnershipTypes.join(', ')}</Text>
            <Text><strong>Website:</strong> {website || 'Not provided'}</Text>
            <Text><strong>Goals:</strong></Text>
            <Text>{message}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
