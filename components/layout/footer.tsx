import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import {
  RiFacebookFill,
  RiInstagramLine,
  RiLinkedinBoxFill,
  RiTwitterXFill,
  RiYoutubeFill,
} from 'react-icons/ri';

import { Logo } from '@/components/ui/logo';
import { Button } from '@/components/ui/button';

const socialLinks = [
  {
    label: 'X (formerly Twitter)',
    href: 'https://x.com/Whizacademy_',
    icon: RiTwitterXFill,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/whizacademy4all',
    icon: RiLinkedinBoxFill,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/whizacademy_',
    icon: RiInstagramLine,
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/share/18iPXg3E6u',
    icon: RiFacebookFill,
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@WhizAcademy',
    icon: RiYoutubeFill,
  },
];

const organizationLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Careers', href: '/careers' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
];

const involvementLinks = [
  { label: 'Donate', href: '/donate' },
  { label: 'Volunteer', href: '/volunteer' },
  { label: 'Partner With Us', href: '/partner' },
  { label: 'Programs', href: '/programs' },
];

export default function Footer() {
  return (
    <footer className="border-t border-black/[0.08] bg-white text-[#0d1117] transition-colors duration-300 dark:border-white/10 dark:bg-[#0d1117] dark:text-white">
      <div className="mx-auto max-w-[1280px] px-6 py-12 sm:py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" aria-label="Whiz Academy home" className="inline-flex">
              <Logo textColor="theme" />
            </Link>
            <p className="mt-4 max-w-[238px] text-sm leading-[22.75px] text-[#6b7280] transition-colors duration-300 dark:text-white/60">
              Bridging the digital divide in rural Nigeria through education, innovation, and
              community empowerment.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  asChild
                  variant="outline"
                  size="icon"
                  className="size-9 rounded-xl border-black/[0.08] bg-transparent text-[#6b7280] shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-[#04af9f]/35 hover:bg-[#04af9f]/[0.06] hover:text-[#04af9f] focus-visible:ring-2 focus-visible:ring-[#04af9f]/30 dark:border-white/10 dark:text-white/60 dark:hover:border-[#04af9f]/45 dark:hover:bg-[#04af9f]/10 dark:hover:text-[#04af9f] [&_svg]:size-[15px]"
                >
                  <Link
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    <social.icon aria-hidden="true" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          <FooterColumn title="Organization" links={organizationLinks} />
          <FooterColumn title="Get Involved" links={involvementLinks} />

          <div>
            <h2 className="text-sm font-bold leading-5">Contact</h2>
            <address className="mt-4 space-y-4 not-italic text-sm leading-5 text-[#6b7280] transition-colors duration-300 dark:text-white/60">
              <div className="flex items-start gap-3">
                <MapPin aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 text-[#04af9f]" />
                <span>3, Adebiyi Street, Behind Yidi Praying Ground, Offa, Kwara State, Nigeria</span>
              </div>
              <Link
                href="mailto:whizacademy4all@gmail.com"
                className="group flex items-start gap-3 transition-colors hover:text-[#04af9f]"
              >
                <Mail aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 text-[#04af9f]" />
                <span>whizacademy4all@gmail.com</span>
              </Link>
              <div className="flex items-start gap-3">
                <Phone aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 text-[#04af9f]" />
                <div className="space-y-0.5">
                  <Link href="tel:+2348105859460" className="block transition-colors hover:text-[#04af9f]">
                    +234 810 585 9460
                  </Link>
                  <Link href="tel:+2348105853150" className="block transition-colors hover:text-[#04af9f]">
                    +234 810 585 3150
                  </Link>
                  <Link href="tel:+447587873007" className="block transition-colors hover:text-[#04af9f]">
                    +44 758 787 3007
                  </Link>
                </div>
              </div>
            </address>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-5 border-t border-black/[0.08] pt-8 text-xs leading-4 text-[#6b7280] transition-colors duration-300 dark:border-white/10 dark:text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2024 Whiz Academy. Registered NGO, Nigeria. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            <Link href="/privacy" className="transition-colors hover:text-[#04af9f]">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-[#04af9f]">
              Terms of Use
            </Link>
            <Link href="/accessibility" className="transition-colors hover:text-[#04af9f]">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: Array<{ label: string; href: string }>;
}) {
  return (
    <div>
      <h2 className="text-sm font-bold leading-5">{title}</h2>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="inline-flex text-sm leading-5 text-[#6b7280] transition-all duration-300 hover:translate-x-1 hover:text-[#04af9f] dark:text-white/60 dark:hover:text-[#04af9f]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
