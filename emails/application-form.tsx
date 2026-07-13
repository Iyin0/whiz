import * as React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Section,
  Text,
} from '@react-email/components';

interface ApplicationFormEmailProps {
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
}

const labelStyle = {
  color: '#0f2f2a',
  fontWeight: 700,
};

export default function ApplicationFormEmail({
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
}: ApplicationFormEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f5f1e8' }}>
        <Container style={{ maxWidth: '680px', backgroundColor: '#ffffff', padding: '24px', borderRadius: '8px' }}>
          <Heading style={{ color: '#0f2f2a', marginTop: 0 }}>New Whiz Academy Application</Heading>
          <Section>
            <Text><span style={labelStyle}>Role:</span> {roleTitle}</Text>
            <Text><span style={labelStyle}>Role Type:</span> {roleType}</Text>
            <Text><span style={labelStyle}>Name:</span> {firstName} {lastName}</Text>
            <Text><span style={labelStyle}>Email:</span> {email}</Text>
            <Text><span style={labelStyle}>Phone:</span> {phone}</Text>
            <Text><span style={labelStyle}>Location:</span> {location}</Text>
            <Text><span style={labelStyle}>Availability:</span> {availability}</Text>
            <Text><span style={labelStyle}>Weekly Hours:</span> {weeklyHours}</Text>
            {cvUrl ? <Text><span style={labelStyle}>CV/Resume:</span> {cvUrl}</Text> : null}
            {portfolioUrl ? <Text><span style={labelStyle}>Portfolio:</span> {portfolioUrl}</Text> : null}
          </Section>

          <Section>
            <Heading as="h2" style={{ color: '#0f2f2a', fontSize: '20px' }}>Relevant Experience</Heading>
            <Text style={{ lineHeight: '1.6' }}>{experience}</Text>
          </Section>

          <Section>
            <Heading as="h2" style={{ color: '#0f2f2a', fontSize: '20px' }}>Statement</Heading>
            <Text style={{ lineHeight: '1.6' }}>{statement}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
