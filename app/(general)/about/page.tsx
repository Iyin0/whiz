import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Heart, ShieldCheck, Target, Users } from 'lucide-react';

import { PageHero } from '@/components/site/page-hero';
import { SectionHeading } from '@/components/site/section-heading';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/ui/reveal';

export const metadata: Metadata = {
  title: 'About | Whiz Academy',
  description: 'Meet the mission, values, and people behind Whiz Academy.',
};

const values = [
  {
    title: 'Purpose-driven',
    description: 'Every decision traces back to our mission: digital inclusion as a pathway to opportunity.',
    icon: Target,
  },
  {
    title: 'Community-first',
    description: 'We co-design with communities, not for them. Local context shapes everything we do.',
    icon: Users,
  },
  {
    title: 'Radical transparency',
    description: 'We publish our finances, outcomes, and failures. Accountability builds trust.',
    icon: ShieldCheck,
  },
  {
    title: 'Human-centered',
    description: 'Technology is the tool. Human potential and dignity are always the point.',
    icon: Heart,
  },
];

const leaders = [
  {
    name: 'Dr. Tunde Adewale',
    role: 'Executive Director',
    bio: 'Former Google Africa lead with 15 years in digital education and NGO leadership.',
    image: '/images/about_tunde.jpg',
  },
  {
    name: 'Ngozi Obi-Eze',
    role: 'Director of Programs',
    bio: 'Curriculum designer and pedagogy expert. Former UNICEF education advisor.',
    image: '/images/about_ngozi.jpg',
  },
  {
    name: 'Ibrahim Yusuf',
    role: 'Director of Partnerships',
    bio: 'Corporate development specialist who has secured over $4M in funding.',
    image: '/images/about_ibrahim.jpg',
  },
  {
    name: 'Chioma Nwosu',
    role: 'Head of Community Impact',
    bio: 'Community organizer with deep roots in rural development and grassroots mobilization.',
    image: '/images/about_chioma.jpg',
  },
];

export default function AboutPage() {
  return (
    <main className="bg-white pt-16 text-[#0d1117] transition-colors duration-300 dark:bg-[#0d1117] dark:text-white">
      <PageHero
        eyebrow="About Whiz Academy"
        title="We believe geography should never limit opportunity"
        description="Founded in 2022, Whiz Academy is Nigeria's leading NGO for rural digital education, positioning technology as the great equalizer."
      />

      <section className="py-20 sm:py-24">
        <div className="mx-auto grid max-w-[1143px] gap-8 px-6 lg:grid-cols-2 lg:gap-12">
          <Reveal direction="left">
            <article className="h-full rounded-3xl border border-black/[0.08] bg-[#f8fafb] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#04af9f]/25 hover:shadow-[0_18px_45px_rgba(13,17,23,0.08)] dark:border-white/10 dark:bg-[#141d20] dark:hover:border-[#04af9f]/35 sm:p-10">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-[#04af9f]/[0.09]">
                <Image src="/icons/mission-target.svg" alt="" width={24} height={24} aria-hidden="true" loading="eager" unoptimized />
              </div>
              <h2 className="mt-6 font-jakarta text-2xl font-extrabold">Our Mission</h2>
              <p className="mt-4 text-lg leading-[1.65] text-[#6b7280] dark:text-white/60">
                To bridge the digital and technological gap between rural and urban communities in Nigeria by enlightening, educating, and empowering underserved communities with digital and technical knowledge.
              </p>
            </article>
          </Reveal>

          <Reveal direction="right" delay={100}>
            <article className="h-full rounded-3xl border border-black/[0.08] bg-[#f8fafb] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#a8640f]/25 hover:shadow-[0_18px_45px_rgba(13,17,23,0.08)] dark:border-white/10 dark:bg-[#141d20] dark:hover:border-[#a8640f]/35 sm:p-10">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-[#a8640f]/[0.09]">
                <Image src="/icons/vision-telescope.svg" alt="" width={24} height={24} aria-hidden="true" loading="eager" unoptimized />
              </div>
              <h2 className="mt-6 font-jakarta text-2xl font-extrabold">Our Vision</h2>
              <p className="mt-4 text-lg leading-[1.65] text-[#6b7280] dark:text-white/60">
                A Nigeria where every young person, regardless of geography, gender, or economic background, has the digital skills and opportunities to build a thriving future in the technology economy.
              </p>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#f8fafb] py-20 transition-colors duration-300 dark:bg-[#11181b] sm:py-24">
        <div className="mx-auto max-w-[1143px] px-6">
          <SectionHeading eyebrow="Core Values" title="What guides everything we do" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={index * 80}>
                <article className="group h-full rounded-2xl border border-black/[0.08] bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#04af9f]/30 hover:shadow-[0_16px_38px_rgba(13,17,23,0.08)] dark:border-white/10 dark:bg-[#141d20] dark:hover:border-[#04af9f]/40">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-[#04af9f]/[0.09] text-[#04af9f] transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-110">
                    <value.icon aria-hidden="true" className="size-[22px]" />
                  </div>
                  <h3 className="mt-5 font-jakarta text-lg font-extrabold">{value.title}</h3>
                  <p className="mt-3 text-sm leading-[1.65] text-[#6b7280] dark:text-white/60">{value.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-[1143px] px-6">
          <SectionHeading eyebrow="Leadership" title="The people behind the mission" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {leaders.map((leader, index) => (
              <Reveal key={leader.name} delay={index * 80}>
                <article className="group overflow-hidden rounded-2xl border border-black/[0.08] bg-[#f8fafb] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#04af9f]/30 hover:shadow-[0_18px_45px_rgba(13,17,23,0.1)] dark:border-white/10 dark:bg-[#141d20] dark:hover:border-[#04af9f]/40">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={leader.image} alt={leader.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-jakarta text-lg font-extrabold">{leader.name}</h3>
                    <p className="mt-1 text-xs font-semibold text-[#04af9f]">{leader.role}</p>
                    <p className="mt-3 text-sm leading-[1.55] text-[#6b7280] dark:text-white/60">{leader.bio}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f8fafb] py-20 text-center transition-colors duration-300 dark:bg-[#11181b]">
        <Reveal className="mx-auto max-w-[768px] px-6">
          <h2 className="font-jakarta text-3xl font-extrabold sm:text-4xl">Join the movement</h2>
          <p className="mx-auto mt-4 max-w-[672px] text-base leading-7 text-[#6b7280] dark:text-white/60">
            Whether you donate, volunteer, or partner, there&apos;s a place for you in Nigeria&apos;s digital education story.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild className="h-12 rounded-2xl bg-[#04af9f] px-6 text-white shadow-none hover:bg-[#039b8d] hover:text-white">
              <Link href="/donate">Donate Now</Link>
            </Button>
            <Button asChild variant="outline" className="h-12 rounded-2xl border-black/[0.08] bg-transparent px-6 shadow-none hover:border-[#04af9f]/35 hover:bg-[#04af9f]/[0.05] dark:border-white/10 dark:hover:bg-[#04af9f]/10">
              <Link href="/volunteer">Volunteer</Link>
            </Button>
            <Button asChild variant="ghost" className="h-12 rounded-2xl px-6 text-[#04af9f] hover:bg-[#04af9f]/[0.07] hover:text-[#04af9f]">
              <Link href="/partner">Partner With Us <ArrowRight aria-hidden="true" className="size-4" /></Link>
            </Button>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
