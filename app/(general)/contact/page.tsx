import type { Metadata } from 'next';
import Link from 'next/link';
import { Clock3, Mail, MapPin, Phone } from 'lucide-react';
import {
  RiInstagramLine,
  RiLinkedinFill,
  RiTwitterXFill,
  RiYoutubeFill,
} from 'react-icons/ri';

import { PageHero } from '@/components/site/page-hero';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/ui/reveal';

import ContactForm from './contact-form';

export const metadata: Metadata = {
  title: 'Contact | Whiz Academy',
  description: 'Contact Whiz Academy to volunteer, partner, donate equipment, or bring our programs to your community.',
};

const socialLinks = [
  { label: 'X (formerly Twitter)', href: 'https://x.com/Whizacademy_', icon: RiTwitterXFill },
  { label: 'Instagram', href: 'https://www.instagram.com/whizacademy_', icon: RiInstagramLine },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/whizacademy4all', icon: RiLinkedinFill },
  { label: 'YouTube', href: 'https://www.youtube.com/@WhizAcademy', icon: RiYoutubeFill },
];

interface ContactPageProps {
  searchParams: Promise<{ subject?: string }>;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const { subject } = await searchParams;
  const initialMessage = subject ? `I would like to learn more about ${subject}.` : '';

  return (
    <main className="bg-white pt-16 text-[#0d1117] transition-colors dark:bg-[#0d1117] dark:text-white">
      <PageHero
        compact
        eyebrow="Contact Us"
        title="Let's build something together"
        description="Whether you want to volunteer, partner, donate equipment, or bring our programs to your community, we'd love to hear from you."
        className="bg-[linear-gradient(145deg,#0c1219_0%,#0a211f_100%)]"
      />

      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto grid max-w-[1095px] gap-14 lg:grid-cols-[400px_1fr] lg:gap-48">
          <Reveal>
            <h2 className="font-jakarta text-2xl font-extrabold">Get in touch</h2>
            <div className="mt-7 space-y-6">
              <ContactDetail icon={Mail} label="Email">
                <Link href="mailto:whizacademy4all@gmail.com" className="font-medium transition-colors hover:text-[#04af9f]">whizacademy4all@gmail.com</Link>
              </ContactDetail>
              <ContactDetail icon={Phone} label="Phone">
                <Link href="tel:+2348105859460" className="block font-medium transition-colors hover:text-[#04af9f]">+234 810 585 9460</Link>
                <Link href="tel:+2348105853150" className="block font-medium transition-colors hover:text-[#04af9f]">+234 810 585 3150</Link>
                <Link href="tel:+447587873007" className="block font-medium transition-colors hover:text-[#04af9f]">+44 758 787 3007</Link>
              </ContactDetail>
              <ContactDetail icon={Clock3} label="Hours">
                <p className="font-medium">Mon – Sat, 9am – 5pm WAT</p>
              </ContactDetail>
            </div>

            <h2 className="mt-12 font-jakarta text-xl font-extrabold">Head Office</h2>
            <div className="mt-5 rounded-2xl border border-[#dfe4e8] bg-[#f8fafb] p-6 dark:border-white/10 dark:bg-[#141d20]">
              <p className="text-sm font-bold text-[#04af9f]">Kwara State</p>
              <div className="mt-3 flex items-start gap-3 text-sm leading-6 text-[#6b7280] dark:text-white/60">
                <MapPin aria-hidden="true" className="mt-1 size-4 shrink-0 text-[#04af9f]" />
                <address className="not-italic">3, Adebiyi Street, Behind Yidi Praying Ground, Offa, Kwara State, Nigeria</address>
              </div>
            </div>

            <div className="mt-7 rounded-2xl border border-[#d9efeb] bg-[linear-gradient(145deg,#effaf8_0%,#fffaf4_100%)] p-7 dark:border-white/10 dark:bg-[linear-gradient(145deg,#102321_0%,#191c1b_100%)]">
              <h2 className="font-jakarta text-lg font-extrabold">Follow our journey</h2>
              <p className="mt-3 text-sm leading-6 text-[#6b7280] dark:text-white/60">Daily updates on programs, graduates, and community impact.</p>
              <div className="mt-5 flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                  <Button
                    key={social.label}
                    asChild
                    variant="outline"
                    size="icon"
                    className="size-10 rounded-full border-[#04af9f]/25 bg-white/70 text-[#04af9f] shadow-none transition-all duration-300 hover:-translate-y-0.5 hover:border-[#04af9f] hover:bg-[#04af9f] hover:text-white focus-visible:ring-2 focus-visible:ring-[#04af9f]/35 dark:border-white/15 dark:bg-white/[0.04] dark:text-[#14c6b5] dark:hover:border-[#04af9f] dark:hover:bg-[#04af9f] dark:hover:text-white"
                  >
                    <Link
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Follow Whiz Academy on ${social.label}`}
                      title={social.label}
                    >
                      <social.icon aria-hidden="true" className="size-[18px]" />
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <ContactForm initialSubject={subject ? 'Programme information' : ''} initialMessage={initialMessage} />
          </Reveal>
        </div>
      </section>
    </main>
  );
}

function ContactDetail({ icon: Icon, label, children }: { icon: typeof Mail; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#dff5f3] text-[#04af9f]"><Icon aria-hidden="true" className="size-4" /></span>
      <div>
        <p className="text-xs text-[#6b7280] dark:text-white/50">{label}</p>
        <div className="mt-1 text-sm leading-6">{children}</div>
      </div>
    </div>
  );
}
