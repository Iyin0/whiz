import * as React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface NotificationLayoutProps {
  preview: string;
  status: string;
  title: string;
  description: string;
  accentColor?: string;
  children: React.ReactNode;
}

interface DetailCardProps {
  children: React.ReactNode;
  accentColor?: string;
}

interface DetailRowProps {
  label: string;
  value: React.ReactNode;
}

interface ContentSectionProps {
  title: string;
  children: React.ReactNode;
}

export function NotificationLayout({
  preview,
  status,
  title,
  description,
  accentColor = '#04af9f',
  children,
}: NotificationLayoutProps) {
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body
        style={{
          backgroundColor: '#f4f7f6',
          color: '#23312e',
          fontFamily: 'Arial, sans-serif',
          margin: 0,
          padding: '24px 12px',
        }}
      >
        <Container
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e3ebe9',
            borderRadius: '10px',
            maxWidth: '640px',
            padding: '28px',
          }}
        >
          <Text
            style={{
              color: accentColor,
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '1.2px',
              margin: 0,
              textTransform: 'uppercase',
            }}
          >
            {status}
          </Text>
          <Heading
            style={{
              color: '#0f2f2a',
              fontSize: '28px',
              lineHeight: '1.25',
              margin: '8px 0 0',
            }}
          >
            {title}
          </Heading>
          <Text
            style={{
              color: '#52605d',
              fontSize: '15px',
              lineHeight: '1.6',
              margin: '12px 0 0',
            }}
          >
            {description}
          </Text>

          {children}

          <Text
            style={{
              borderTop: '1px solid #e3ebe9',
              color: '#7a8885',
              fontSize: '12px',
              lineHeight: '1.5',
              margin: '24px 0 0',
              paddingTop: '16px',
            }}
          >
            This notification was sent automatically by the Whiz Academy
            website.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export function DetailCard({
  children,
  accentColor = '#04af9f',
}: DetailCardProps) {
  return (
    <Section
      style={{
        backgroundColor: '#f4f7f6',
        borderLeft: `4px solid ${accentColor}`,
        borderRadius: '6px',
        marginTop: '20px',
        padding: '12px 18px',
      }}
    >
      {children}
    </Section>
  );
}

export function DetailRow({ label, value }: DetailRowProps) {
  return (
    <Text
      style={{
        color: '#34423f',
        fontSize: '15px',
        lineHeight: '1.55',
        margin: '10px 0',
        overflowWrap: 'anywhere',
      }}
    >
      <span style={{ color: '#0f2f2a', fontWeight: 700 }}>{label}:</span>{' '}
      {value}
    </Text>
  );
}

export function ContentSection({ title, children }: ContentSectionProps) {
  return (
    <Section
      style={{
        border: '1px solid #dce7e4',
        borderRadius: '8px',
        marginTop: '20px',
        padding: '16px 18px',
      }}
    >
      <Text
        style={{
          color: '#0f2f2a',
          fontSize: '14px',
          fontWeight: 700,
          margin: '0 0 8px',
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          color: '#52605d',
          fontSize: '15px',
          lineHeight: '1.65',
          margin: 0,
          overflowWrap: 'anywhere',
          whiteSpace: 'pre-wrap',
        }}
      >
        {children}
      </Text>
    </Section>
  );
}
