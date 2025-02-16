import * as React from "react";
import { Html, Head, Body, Container, Text, Heading, Section } from "@react-email/components";

interface VolunteerFormEmailProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export default function VolunteerFormEmail({ firstName, lastName, email, phone }: VolunteerFormEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: "Arial, sans-serif", padding: "20px", backgroundColor: "#f4f4f4" }}>
        <Container style={{ maxWidth: "600px", backgroundColor: "#ffffff", padding: "20px", borderRadius: "5px" }}>
          <Heading style={{ color: "#333", textAlign: "center" }}>New Volunteer Form Submission</Heading>
          <Section>
            <Text><strong>First Name:</strong> {firstName}</Text>
            <Text><strong>Last Name:</strong> {lastName}</Text>
            <Text><strong>Email:</strong> {email}</Text>
            <Text><strong>Phone:</strong> {phone}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};
