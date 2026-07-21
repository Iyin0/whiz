import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Star,
  Users,
} from 'lucide-react';

import GetInvolved from '@/components/layout/get-involved';
import Newsletter from '@/components/layout/newsletter';
import VoicesCarousel from '@/components/home/voices-carousel';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/ui/reveal';

const heroStats = [
  { value: '300+', label: 'Students Trained' },
  { value: '1', label: 'Community' },
  { value: '25+', label: 'Schools' },
];

const impactStats = [
  { value: 300, suffix: '+', label: 'Students Trained' },
  { value: 1, suffix: '', label: 'Community Reached' },
  { value: 5, suffix: '+', label: 'Volunteers' },
  { value: 25, suffix: '+', label: 'Schools Partnered' },
];

const principles = [
  'Human-centered design',
  'Community co-creation',
  'Technology as liberation',
  'Long-term mentorship',
];

const programs = [
  {
    number: '01',
    eyebrow: 'Programme 1',
    title: 'Community Digital Literacy Programme',
    description:
      'Deliver practical, inclusive digital literacy education that empowers underserved rural communities with the digital skills needed for education, employment, entrepreneurship, and everyday life.',
    projects: '6 projects',
    color: '#04af9f',
    background: 'rgba(4,175,159,0.09)',
  },
  {
    number: '02',
    eyebrow: 'Programme 2',
    title: 'School Digital Education Programme',
    description:
      'Build sustainable digital learning ecosystems within Primary and Secondary schools through continuous technology education, innovation, and mentorship.',
    projects: '3 projects',
    color: '#6366f1',
    background: 'rgba(99,102,241,0.09)',
  },
  {
    number: '03',
    eyebrow: 'Programme 3',
    title: 'Community Technology Access Programme',
    description:
      'Improve equitable access to digital devices, technology infrastructure, and community learning spaces.',
    projects: '6 projects',
    color: '#a8640f',
    background: 'rgba(168,100,15,0.09)',
  },
];

export default function Home() {
  return (
    <main className="overflow-hidden bg-white text-[#0d1117] transition-colors duration-300 dark:bg-[#0d1117] dark:text-white">
      <section
        aria-labelledby="home-hero-title"
        className="relative isolate min-h-[100svh] overflow-hidden bg-[#0d1117] text-white"
      >
        <Image
          src="/images/home_hero.jpg"
          alt="Youth learning technology"
          fill
          priority
          sizes="100vw"
          className="pointer-events-none object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,17,23,0.85)_0%,rgba(13,17,23,0.65)_60%,rgba(13,17,23,0.85)_100%)]"
        />

        <div className="relative z-10 mx-auto box-border flex min-h-[100svh] w-full max-w-[896px] flex-col items-center justify-center px-4 pb-24 pt-32 text-center sm:px-6">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#04af9f]/25 bg-[#04af9f]/[0.13] px-[13px] py-[7px]">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-[#04af9f]/50" />
            <p className="whitespace-nowrap text-xs font-semibold leading-4 text-[#04af9f]">
              Nigeria&apos;s Digital Empowerment Movement
            </p>
          </div>

          <h1
            id="home-hero-title"
            className="max-w-[848px] font-jakarta text-[40px] font-extrabold leading-[1.05] tracking-[-1px] sm:text-[52px] sm:tracking-[-1.3px] lg:text-[60px] lg:leading-[63px] lg:tracking-[-1.5px]"
          >
            Unlocking <span className="text-[#04af9f]">Digital</span> Potential in Rural Nigeria
          </h1>

          <p className="mt-6 max-w-[672px] text-base font-normal leading-[26px] text-white/70 sm:text-lg sm:leading-[29.25px]">
            We train the next generation of African tech innovators, from rural classrooms to
            global opportunity. Not charity. Transformation.
          </p>

          <div className="mt-10 flex w-full max-w-[312px] flex-col justify-center gap-4 sm:flex-row">
            <Button
              asChild
              className="group h-[54px] rounded-2xl bg-[#04af9f] px-6 text-base font-semibold leading-6 text-white shadow-none transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#039b8d] hover:text-white hover:shadow-[0_14px_30px_rgba(4,175,159,0.25)] focus-visible:ring-2 focus-visible:ring-[#04af9f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1117]"
            >
              <Link href="/donate">
                Donate Now
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={1.75}
                />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="h-[54px] rounded-2xl border-white/20 bg-transparent px-6 text-base font-semibold leading-6 text-white shadow-none transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1117]"
            >
              <Link href="#join-us">
                <Users aria-hidden="true" className="size-4" strokeWidth={1.75} />
                Join Us
              </Link>
            </Button>
          </div>

          <dl className="mt-16 grid grid-cols-3 items-start gap-5 sm:gap-12">
            {heroStats.map((item) => (
              <div key={item.label} className="text-center">
                <dt className="font-jakarta text-2xl font-extrabold leading-8 text-white">
                  {item.value}
                </dt>
                <dd className="mt-0.5 text-xs leading-4 text-white/50">{item.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <Link
          href="#mission"
          className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 whitespace-nowrap text-xs leading-4 text-white/40 transition-colors hover:text-white/70 focus-visible:outline-none focus-visible:text-white"
        >
          Scroll to explore
          <ChevronDown aria-hidden="true" className="size-4 animate-bounce motion-reduce:animate-none" strokeWidth={1.5} />
        </Link>
      </section>

      <section id="mission" className="scroll-mt-16 bg-white py-20 transition-colors duration-300 dark:bg-[#0d1117] sm:py-24">
        <div className="mx-auto max-w-[1280px] px-6">
          <Reveal className="text-center">
            <p className="inline-flex rounded-full border border-[#04af9f]/20 bg-[#04af9f]/[0.07] px-[13px] py-[7px] text-xs font-semibold leading-4 text-[#04af9f]">
              Our Numbers
            </p>
            <h2 className="mt-4 font-jakarta text-4xl font-extrabold leading-tight tracking-[-0.9px] text-[#0d1117] transition-colors duration-300 dark:text-white sm:text-5xl sm:leading-[48px] sm:tracking-[-1.2px]">
              Every number is a life changed
            </h2>
            <p className="mx-auto mt-4 max-w-[672px] text-base leading-7 text-[#6b7280] transition-colors duration-300 dark:text-white/60 sm:text-lg">
              Since 2022, building Nigeria&apos;s digital future, one community at a time.
            </p>
          </Reveal>

          <dl className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
            {impactStats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 90}>
                <div className="flex min-h-[118px] flex-col items-center justify-center gap-2 rounded-2xl border border-black/[0.08] bg-[#f8fafb] p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#04af9f]/30 hover:shadow-[0_16px_40px_rgba(13,17,23,0.08)] dark:border-white/10 dark:bg-[#141d20] dark:hover:border-[#04af9f]/40 dark:hover:shadow-[0_16px_40px_rgba(0,0,0,0.24)]">
                  <dt className="font-jakarta text-4xl font-extrabold leading-10 tracking-[-0.9px] text-[#04af9f]">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </dt>
                  <dd className="text-sm font-semibold leading-5 text-[#6b7280] transition-colors duration-300 dark:text-white/60">{stat.label}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-[rgba(241,245,244,0.4)] py-20 transition-colors duration-300 dark:bg-[#0a1716] sm:py-24">
        <div className="mx-auto grid max-w-[1280px] gap-16 px-6 lg:grid-cols-2 lg:items-center lg:gap-20">
          <Reveal direction="left" className="relative pb-10 sm:pb-6">
            <div className="group relative aspect-[1.3229] overflow-hidden rounded-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]">
              <Image
                src="/images/who_we_are.jpg"
                alt="A student developing digital skills"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
              />
            </div>

            <div className="absolute -bottom-1 right-4 w-[228px] rounded-2xl border border-black/[0.08] bg-[#f8fafb] p-6 shadow-[0_20px_25px_rgba(0,0,0,0.14)] transition-all duration-300 hover:-translate-y-1 dark:border-white/10 dark:bg-[#141d20] dark:shadow-[0_20px_30px_rgba(0,0,0,0.3)] sm:-right-6 sm:bottom-[-18px]">
              <p className="font-jakarta text-3xl font-extrabold leading-9 text-[#04af9f]">98%</p>
              <p className="mt-1 text-sm font-semibold leading-5 text-[#6b7280] transition-colors duration-300 dark:text-white/60">
                Graduate satisfaction rate
              </p>
              <div className="mt-2 flex gap-0.5" aria-label="Five out of five stars">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    aria-hidden="true"
                    className="size-3 fill-[#a8640f] text-[#a8640f]"
                  />
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal direction="right">
            <p className="inline-flex rounded-full border border-[#04af9f]/20 bg-[#04af9f]/[0.07] px-[13px] py-[7px] text-xs font-semibold leading-4 text-[#04af9f]">
              Who We Are
            </p>
            <h2 className="mt-6 font-jakarta text-4xl font-extrabold leading-tight tracking-[-0.9px] text-[#0d1117] transition-colors duration-300 dark:text-white sm:text-5xl sm:leading-[60px] sm:tracking-[-1.2px]">
              We don&apos;t just teach tech,
              <span className="block text-[#04af9f]">we build futures.</span>
            </h2>
            <p className="mt-6 max-w-[508px] text-base leading-[26px] text-[#6b7280] transition-colors duration-300 dark:text-white/60">
              A Nigerian NGO founded in 2022, we invest in skills, infrastructure, and community
              champions who multiply impact long after our programs end.
            </p>

            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {principles.map((principle) => (
                <li key={principle} className="flex items-center gap-3 text-sm font-semibold text-[#0d1117] transition-colors duration-300 dark:text-white">
                  <CheckCircle2 aria-hidden="true" className="size-[18px] shrink-0 text-[#04af9f]" />
                  {principle}
                </li>
              ))}
            </ul>

            <Link
              href="/about"
              className="group mt-10 inline-flex items-center gap-2 text-base font-semibold text-[#04af9f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#04af9f]/40"
            >
              Our full story
              <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-20 transition-colors duration-300 dark:bg-[#0d1117] sm:py-24">
        <div className="mx-auto max-w-[1280px] px-6">
          <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="inline-flex rounded-full border border-[#04af9f]/20 bg-[#04af9f]/[0.07] px-[13px] py-[7px] text-xs font-semibold leading-4 text-[#04af9f]">
                Our Programs
              </p>
              <h2 className="mt-4 font-jakarta text-4xl font-extrabold leading-tight tracking-[-0.9px] text-[#0d1117] transition-colors duration-300 dark:text-white sm:text-5xl sm:leading-[48px] sm:tracking-[-1.2px]">
                Skills that open doors
              </h2>
            </div>
            <Link
              href="/programs"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-[#04af9f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#04af9f]/40"
            >
              View all programs
              <ArrowRight aria-hidden="true" className="size-[15px] transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:mt-16 lg:grid-cols-3">
            {programs.map((program, index) => (
              <Reveal key={program.number} delay={index * 100}>
                <Link
                  href="/programs"
                  className="group flex min-h-[276px] flex-col rounded-2xl border border-black/[0.08] bg-[#f8fafb] p-6 transition-all duration-300 ease-out hover:-translate-y-2 hover:border-[#04af9f]/30 hover:shadow-[0_20px_50px_rgba(13,17,23,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#04af9f]/40 dark:border-white/10 dark:bg-[#141d20] dark:hover:border-[#04af9f]/40 dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.28)]"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="flex size-10 items-center justify-center rounded-2xl text-xs font-extrabold"
                      style={{ color: program.color, backgroundColor: program.background }}
                    >
                      {program.number}
                    </span>
                    <span
                      className="text-xs font-bold uppercase leading-4 tracking-[0.05em]"
                      style={{ color: program.color }}
                    >
                      {program.eyebrow}
                    </span>
                  </div>

                  <div className="mt-4 flex-1">
                    <h3 className="font-jakarta text-base font-extrabold leading-[22px] text-[#0d1117] transition-colors duration-300 dark:text-white">
                      {program.title}
                    </h3>
                    <p className="mt-2 h-[68px] overflow-hidden text-sm leading-[22.75px] text-[#6b7280] transition-colors duration-300 dark:text-white/60">
                      {program.description}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-black/[0.08] pt-3 transition-colors duration-300 dark:border-white/10">
                    <span className="text-xs leading-4 text-[#6b7280] transition-colors duration-300 dark:text-white/50">{program.projects}</span>
                    <span className="flex items-center gap-1.5 text-sm font-semibold text-[#04af9f]">
                      Explore
                      <ArrowRight aria-hidden="true" className="size-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={160} className="mt-8 text-center">
            <Button
              asChild
              variant="outline"
              className="group h-[50px] rounded-2xl border-black/[0.08] bg-transparent px-6 text-base font-semibold text-[#0d1117] shadow-none transition-all duration-300 hover:-translate-y-0.5 hover:border-[#04af9f]/30 hover:bg-[#04af9f]/[0.05] hover:text-[#0d1117] focus-visible:ring-2 focus-visible:ring-[#04af9f]/40 dark:border-white/10 dark:text-white dark:hover:border-[#04af9f]/40 dark:hover:bg-[#04af9f]/10 dark:hover:text-white"
            >
              <Link href="/programs">
                View All 6 Programmes
                <ArrowRight aria-hidden="true" className="size-[15px] transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      <VoicesCarousel />

      <div aria-hidden="true" className="h-20 bg-[rgba(241,245,244,0.4)] transition-colors duration-300 dark:bg-[#0a1716] sm:h-40" />
      <Newsletter />
      <GetInvolved />

      <section className="bg-[linear-gradient(160deg,#04af9f_0%,#028f82_100%)] py-20 text-white sm:py-24">
        <Reveal className="mx-auto max-w-[896px] px-6 text-center">
          <h2 className="font-jakarta text-4xl font-extrabold leading-tight sm:text-5xl sm:leading-[48px]">
            Ready to change a life?
          </h2>
          <p className="mx-auto mt-6 max-w-[672px] text-base leading-7 text-white/80 sm:text-lg">
            $25 provides digital tools for a student for a week. $100 trains a teacher. $500
            equips an entire classroom.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              asChild
              className="h-[60px] rounded-2xl bg-white px-8 text-base font-bold text-[#04af9f] shadow-none transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-[#04af9f] hover:shadow-[0_16px_35px_rgba(13,17,23,0.18)] focus-visible:ring-2 focus-visible:ring-white/70"
            >
              <Link href="/donate">Donate Now</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-[60px] rounded-2xl border-2 border-white/30 bg-transparent px-8 text-base font-bold text-white shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-white/60 hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-white/70"
            >
              <Link href="/volunteer">Volunteer Instead</Link>
            </Button>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
