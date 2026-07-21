import Link from 'next/link';
import { ArrowRight, CheckCircle2, Handshake, Heart, Users } from 'lucide-react';

import { Reveal } from '@/components/ui/reveal';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const opportunities = [
  {
    title: 'Donate',
    description:
      '$25 equips a student for a week. $500 powers an entire classroom. Every amount has a direct, trackable impact on a real person.',
    features: [
      'One-time or monthly giving',
      'Project-specific donations',
      'Corporate and CSR sponsorships',
      'Tax-deductible in eligible countries',
    ],
    cta: 'Donate Now',
    href: '/donate',
    icon: Heart,
    accent: '#04af9f',
    iconBackground: 'rgba(4,175,159,0.09)',
    dark: false,
  },
  {
    title: 'Volunteer',
    description:
      'Give your skills, not just your money. Teach, mentor, build, or connect, we have roles for tech professionals, educators, and community champions alike.',
    features: [
      'Program instructor',
      'Curriculum developer',
      'Community outreach',
      'Remote mentorship available',
    ],
    cta: 'Become a Volunteer',
    href: '/volunteer',
    icon: Users,
    accent: '#a8640f',
    iconBackground: 'rgba(168,100,15,0.09)',
    dark: false,
  },
  {
    title: 'Partner',
    description:
      "Bring your organisation's resources and credibility to the movement. Corporate partners, governments, schools, and tech companies all have a track built for them.",
    features: [
      'Corporate & CSR programs',
      'School & university partnerships',
      'Technology donations',
      'Government collaboration',
    ],
    cta: 'Become a Partner',
    href: '/partner',
    icon: Handshake,
    accent: '#04af9f',
    iconBackground: 'rgba(4,175,159,0.14)',
    dark: true,
  },
];

export default function GetInvolved() {
  return (
    <section id="join-us" className="scroll-mt-16 bg-white py-20 transition-colors duration-300 dark:bg-[#0d1117] sm:py-24">
      <div className="mx-auto max-w-[1280px] px-6">
        <Reveal className="text-center">
          <p className="inline-flex rounded-full border border-[#04af9f]/20 bg-[#04af9f]/[0.07] px-[13px] py-[7px] text-xs font-semibold leading-4 text-[#04af9f]">
            Get Involved
          </p>
          <h2 className="mt-4 font-jakarta text-4xl font-extrabold leading-[1.02] tracking-[-0.9px] text-[#0d1117] transition-colors duration-300 dark:text-white sm:text-5xl sm:leading-[48px] sm:tracking-[-1.2px]">
            There&apos;s a place for you
            <span className="block">in this movement</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[672px] text-base leading-7 text-[#6b7280] transition-colors duration-300 dark:text-white/60 sm:text-lg">
            Whether you give, show up, or bring your organisation along, every form of support
            changes lives in rural Nigeria.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:mt-16 lg:grid-cols-3">
          {opportunities.map((opportunity, index) => (
            <Reveal key={opportunity.title} delay={index * 100}>
              <article
                className={cn(
                  'group flex min-h-[536px] flex-col rounded-3xl border p-8 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_22px_55px_rgba(13,17,23,0.12)]',
                  opportunity.dark
                    ? 'border-[#04af9f]/20 bg-[linear-gradient(123deg,#0d1117_0%,#0d2320_100%)] text-white hover:border-[#04af9f]/45'
                    : 'border-black/[0.08] bg-[#f8fafb] text-[#0d1117] hover:border-[#04af9f]/25 dark:border-white/10 dark:bg-[#141d20] dark:text-white dark:hover:border-[#04af9f]/40 dark:hover:shadow-[0_22px_55px_rgba(0,0,0,0.28)]',
                )}
              >
                <div
                  className="flex size-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-110"
                  style={{ backgroundColor: opportunity.iconBackground, color: opportunity.accent }}
                >
                  <opportunity.icon aria-hidden="true" className="size-[26px]" strokeWidth={1.75} />
                </div>

                <h3 className="mt-6 font-jakarta text-2xl font-extrabold leading-8">
                  {opportunity.title}
                </h3>
                <p
                  className={cn(
                    'mt-3 min-h-[137px] text-base leading-[26px]',
                    opportunity.dark ? 'text-white/60' : 'text-[#6b7280] dark:text-white/60',
                  )}
                >
                  {opportunity.description}
                </p>

                <ul className="mt-6 space-y-2">
                  {opportunity.features.map((feature) => (
                    <li
                      key={feature}
                      className={cn(
                        'flex items-center gap-2 text-sm leading-5',
                        opportunity.dark ? 'text-white/70' : 'text-[#0d1117] dark:text-white/75',
                      )}
                    >
                      <CheckCircle2
                        aria-hidden="true"
                        className="size-3.5 shrink-0"
                        style={{ color: opportunity.accent }}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className={cn(
                    'mt-auto h-[52px] rounded-2xl text-base font-semibold shadow-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#04af9f]/40',
                    opportunity.title === 'Volunteer'
                      ? 'border-2 border-black/[0.08] bg-transparent text-[#a8640f] hover:border-[#a8640f]/30 hover:bg-[#a8640f]/[0.04] hover:text-[#a8640f] dark:border-white/10 dark:text-[#d78a2d] dark:hover:border-[#d78a2d]/40 dark:hover:bg-[#d78a2d]/10 dark:hover:text-[#d78a2d]'
                      : 'bg-[#04af9f] text-white hover:bg-[#039b8d] hover:text-white hover:shadow-[0_12px_28px_rgba(4,175,159,0.22)]',
                  )}
                >
                  <Link href={opportunity.href}>
                    {opportunity.cta}
                    <ArrowRight
                      aria-hidden="true"
                      className="size-[15px] transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </Button>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
