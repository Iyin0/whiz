import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone } from 'lucide-react';
import { RiFacebookCircleFill, RiInstagramLine, RiLinkedinBoxFill, RiTwitterXLine } from 'react-icons/ri';

export default function Footer() {
  const date = new Date();

  const contacts = [
    {
      title: 'Address:',
      icon: MapPin,
      value: ['6, Mount Park Road, Ealing Broadway, London. W5 2RP']
    },
    {
      title: 'Contact:',
      icon: Phone,
      value: ['+447587873007', 'whizacademy4all@gmail.com']
    },
  ];

  const socials = [
    {
      title: 'Facebook',
      value: 'https://www.facebook.com/share/18iPXg3E6u',
      icon: RiFacebookCircleFill
    },
    {
      title: 'Instagram',
      value: 'https://www.instagram.com/whizacademy_',
      icon: RiInstagramLine
    },
    {
      title: 'Twitter',
      value: 'https://x.com/Whizacademy_',
      icon: RiTwitterXLine
    },
    {
      title: 'LinkedIn',
      value: 'https://www.linkedin.com/company/whizacademy4all',
      icon: RiLinkedinBoxFill
    }
  ];

  const firstColumn = [
    {
      title: 'Home',
      link: '/'
    },
    {
      title: 'Projects',
      link: '/projects'
    },
    {
      title: 'Careers',
      link: '/careers'
    },
    {
      title: 'FAQs',
      link: '#faqs'
    },
    {
      title: 'Policies',
      link: '#'
    },
    {
      title: 'SIME Foundation',
      link: 'https://simefoundation.org/'
    },
  ];

  const secondColumn = [
    {
      title: 'Volunteer',
      link: '/contact#volunteer'
    },
    {
      title: 'Sponsorship',
      link: '/contact#sponsorship'
    },
    {
      title: 'Partnership',
      link: '/contact#partnership'
    },
    {
      title: 'Donate',
      link: '/contact#donate'
    },
    {
      title: 'Contact Us',
      link: '/contact'
    },
  ];

  return (
    <footer className="bg-[#102f2a] px-4 text-white sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div className="flex max-w-sm flex-col gap-6">
            <Link href="/" className="w-fit rounded-md bg-white px-3 py-2">
              <Image src="/images/NavLogo.png" alt="Whiz Academy" width={131} height={48} />
            </Link>
            <p className="text-sm leading-6 text-white/75">
              A community-led digital literacy initiative helping rural African learners
              build confidence, access, and practical skills for a technology-driven world.
            </p>
            {contacts.map((contact) => (
              <div key={contact.title} className="flex gap-3 text-sm text-white/80">
                <contact.icon className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                <div>
                  <h3 className="font-semibold text-white">{contact.title}</h3>
                  {contact.value.map((item) => (
                    <p key={item} className="mt-1">{item}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-8 sm:max-w-md">
            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold uppercase text-white/60">Explore</h3>
              {firstColumn.map((item) => (
                <Link key={item.title} href={item.link} className="text-sm text-white/75 transition hover:text-white">{item.title}</Link>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold uppercase text-white/60">Act</h3>
              {secondColumn.map((item) => (
                <Link key={item.title} href={item.link} className="text-sm text-white/75 transition hover:text-white">{item.title}</Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-between gap-8 lg:items-end">
            <div className="max-w-sm lg:text-right">
              <h3 className="text-xl font-semibold">Support the next community cohort.</h3>
              <p className="mt-3 text-sm leading-6 text-white/70">
                Volunteer, sponsor, donate, or partner with Whiz Academy to help local
                communities lead their own digital growth.
              </p>
            </div>
            <div className="flex gap-3">
          {socials.map((social) => (
            <Link
              key={social.title}
              href={social.value}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.title}
              className="flex h-10 w-10 items-center justify-center rounded-md border border-white/[0.15] text-white/75 transition hover:border-secondary hover:text-white"
            >
              <social.icon className="text-xl" />
            </Link>
          ))}
            </div>
          </div>
        </div>
      </div>
      <p className="mx-auto max-w-7xl border-t border-white/[0.12] py-5 text-center text-xs text-white/60 sm:text-left">{`© ${date.getFullYear()} Whiz Academy. All rights reserved.`}</p>
    </footer>
  );
}
