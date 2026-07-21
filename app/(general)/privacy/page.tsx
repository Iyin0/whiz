import type { Metadata } from 'next';
import Link from 'next/link';

import { LegalPage } from '@/components/site/legal-page';

export const metadata: Metadata = { title: 'Privacy Policy | Whiz Academy', description: 'How Whiz Academy collects, uses, and protects personal information.' };

export default function PrivacyPage() {
  return <LegalPage eyebrow="Your Privacy" title="Privacy Policy" description="We respect the trust you place in Whiz Academy and handle personal information responsibly." updated="21 July 2026" sections={[
    { title: 'Information we collect', content: <p>We collect information you choose to provide through contact, volunteer, partnership, and donation forms, such as your name, contact details, organisation, and message.</p> },
    { title: 'How we use information', content: <p>We use your information to respond to inquiries, coordinate programmes and support, keep appropriate organisational records, and improve our services. We do not sell personal information.</p> },
    { title: 'Storage and service providers', content: <p>Information may be processed by trusted providers that help us operate the website, deliver email, and, when enabled, process donations. We limit access to what is necessary for those services.</p> },
    { title: 'Your choices', content: <p>You may ask to access, correct, or delete personal information we hold about you, subject to applicable legal and record-keeping requirements.</p> },
    { title: 'Contact us', content: <p>For privacy questions, email <Link href="mailto:whizacademy4all@gmail.com" className="font-semibold text-[#04af9f] hover:underline">whizacademy4all@gmail.com</Link>.</p> },
  ]} />;
}
