import type { Metadata } from 'next';
import Link from 'next/link';

import { LegalPage } from '@/components/site/legal-page';

export const metadata: Metadata = { title: 'Terms of Use | Whiz Academy', description: 'Terms that apply when using the Whiz Academy website.' };

export default function TermsPage() {
  return <LegalPage eyebrow="Website Terms" title="Terms of Use" description="These terms help keep our website useful, safe, and clear for everyone." updated="21 July 2026" sections={[
    { title: 'Using this website', content: <p>You may use this website to learn about Whiz Academy, contact our team, and support our work. You agree not to misuse the website, interfere with its operation, or submit unlawful or misleading information.</p> },
    { title: 'Website content', content: <p>Unless stated otherwise, website text, graphics, and branding belong to Whiz Academy or are used with permission. You may share links to our public pages but may not present our content as your own.</p> },
    { title: 'Donations and payments', content: <p>The donation interface currently collects an expression of intent only. Payment processing will be activated through a verified payment provider, with any additional payment terms shown before a transaction is completed.</p> },
    { title: 'Accuracy and availability', content: <p>We work to keep information accurate and the website available, but programme details may change and uninterrupted access cannot be guaranteed.</p> },
    { title: 'Questions', content: <p>If you have a question about these terms, please <Link href="/contact" className="font-semibold text-[#04af9f] hover:underline">contact our team</Link>.</p> },
  ]} />;
}
