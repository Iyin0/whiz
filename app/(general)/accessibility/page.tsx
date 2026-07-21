import type { Metadata } from 'next';
import Link from 'next/link';

import { LegalPage } from '@/components/site/legal-page';

export const metadata: Metadata = { title: 'Accessibility | Whiz Academy', description: 'Whiz Academy’s commitment to an accessible and inclusive website.' };

export default function AccessibilityPage() {
  return <LegalPage eyebrow="Inclusive Access" title="Accessibility" description="Digital opportunity should be open to everyone. That commitment includes how we build this website." updated="21 July 2026" sections={[
    { title: 'Our commitment', content: <p>We aim to provide a website that people can navigate and understand across different devices, abilities, and assistive technologies.</p> },
    { title: 'What we are doing', content: <p>We use semantic page structure, keyboard-accessible controls, visible focus states, descriptive labels, colour contrast, responsive layouts, and reduced-motion support where practical.</p> },
    { title: 'Ongoing improvement', content: <p>Accessibility is an ongoing process. As pages and services evolve, we will continue testing the experience and correcting barriers we find.</p> },
    { title: 'Tell us about a barrier', content: <p>If anything prevents you from using this site, please <Link href="/contact" className="font-semibold text-[#04af9f] hover:underline">contact us</Link>. Include the page and a short description of the problem so we can investigate.</p> },
  ]} />;
}
