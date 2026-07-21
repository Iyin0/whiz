import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  MapPin,
  Users,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/ui/reveal';

export const metadata: Metadata = {
  title: 'Offa Digital Literacy Programme | Whiz Academy',
  description: "Explore Whiz Academy's flagship annual community digital literacy programme in Offa, Kwara State.",
};

const programmeFacts = [
  { label: 'Location', value: 'Offa, Kwara State, Nigeria', icon: MapPin },
  { label: 'Running Since', value: '2022 (Annual Programme)', icon: CalendarDays },
  { label: 'Target Group', value: 'Ages 10–30', icon: Users },
  { label: 'Programme Format', value: 'In-person, community-based', icon: Clock3 },
  { label: 'Cost to Participants', value: 'Free', icon: CircleDollarSign },
  { label: 'Parent Programme', value: 'Community Digital Literacy', icon: BookOpen },
];

const learnings = [
  'Navigate computers, smartphones, and tablets with confidence',
  'Use the internet safely and productively for research and communication',
  'Create and manage documents, spreadsheets, and presentations',
  'Set up and use email and professional digital communication tools',
  'Understand cybersecurity, online privacy, and digital safety',
  'Access government, banking, and educational digital services',
  'Apply digital tools to everyday life, work, and small business',
];

const milestones = [
  ['2022', 'ODLP Edition 1 launched, first cohort of young people trained in Offa.'],
  ['2023', 'Programme expanded in scope, curriculum updated based on community feedback.'],
  ['2024', 'ODLP edition run and established as the annual flagship initiative.'],
  ['2025', 'Advanced modules introduced, deepening the programme curriculum and participant outcomes.'],
];

export default function OdlpPage() {
  return (
    <main className="bg-white pt-16 text-[#0d1117] transition-colors duration-300 dark:bg-[#0d1117] dark:text-white">
      <section className="relative isolate flex min-h-[510px] items-end overflow-hidden text-white">
        <Image src="/images/odlp_hero.jpg" alt="Students participating in the Offa Digital Literacy Programme" fill priority sizes="100vw" className="-z-20 object-cover" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(13,17,23,0.98)_0%,rgba(13,17,23,0.58)_55%,rgba(13,17,23,0.18)_100%)]" />
        <Reveal className="mx-auto w-full max-w-[1280px] px-6 pb-14">
          <Link href="/programs" className="inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"><ArrowLeft aria-hidden="true" className="size-4" />All Programmes</Link>
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#04af9f] px-3 py-1 text-xs font-bold"><span className="size-1.5 rounded-full bg-white" />Ongoing</span>
            <span className="rounded-full bg-[#a8640f] px-3 py-1 text-xs font-bold">Flagship Project</span>
            <span className="inline-flex items-center gap-1.5 text-sm text-white/55"><MapPin aria-hidden="true" className="size-3.5" />Offa, Kwara State</span>
          </div>
          <h1 className="mt-4 font-jakarta text-4xl font-extrabold leading-tight tracking-[-0.9px] sm:text-5xl lg:text-[60px]">Offa Digital Literacy Programme</h1>
          <p className="mt-3 text-lg text-white/60">Since 2022 · Community Digital Literacy Programme</p>
        </Reveal>
      </section>

      <section className="border-b border-black/[0.08] bg-[#f8fafb] transition-colors duration-300 dark:border-white/10 dark:bg-[#11181b]">
        <div className="mx-auto grid max-w-[1280px] gap-6 px-6 py-5 sm:grid-cols-2 lg:grid-cols-6">
          {programmeFacts.map((fact) => (
            <div key={fact.label} className="flex items-center gap-3">
              <fact.icon aria-hidden="true" className="size-4 shrink-0 text-[#04af9f]" />
              <div><p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#6b7280] dark:text-white/45">{fact.label}</p><p className="mt-1 text-sm font-semibold">{fact.value}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto grid max-w-[1143px] gap-12 px-6 lg:grid-cols-[minmax(0,1fr)_330px]">
          <div className="space-y-16">
            <Reveal>
              <h2 className="font-jakarta text-3xl font-extrabold">About the Programme</h2>
              <p className="mt-5 text-base leading-7 text-[#6b7280] dark:text-white/60">
                The Offa Digital Literacy Programme (ODLP) is Whiz Academy&apos;s flagship annual initiative, launched in 2022 in the city of Offa, Kwara State. It is the organisation&apos;s founding programme and serves as the living blueprint for digital education in underserved Nigerian communities. Each edition trains young people in foundational digital skills, equipping them for education, employment, and entrepreneurship in an increasingly digital world.
              </p>
              <p className="mt-4 border-l-[3px] border-[#04af9f] pl-5 text-base italic leading-7 text-[#6b7280] dark:text-white/60">
                To ensure that every young person in Offa and beyond has access to the digital skills they need to participate fully in modern life, regardless of their economic background.
              </p>
            </Reveal>

            <Reveal>
              <h2 className="font-jakarta text-2xl font-extrabold">What Participants Learn</h2>
              <ul className="mt-6 grid gap-3">
                {learnings.map((learning) => <li key={learning} className="flex items-start gap-3 text-sm leading-6 text-[#6b7280] dark:text-white/60"><CheckCircle2 aria-hidden="true" className="mt-1 size-4 shrink-0 text-[#04af9f]" />{learning}</li>)}
              </ul>
            </Reveal>

            <Reveal>
              <h2 className="font-jakarta text-2xl font-extrabold">Why It Matters</h2>
              <div className="mt-6 grid gap-4">
                {[
                  ['The Digital Divide is Real', 'Many young Nigerians in cities like Offa have limited or no access to computers, internet, or structured digital education. Without these skills, they are shut out of modern employment and opportunity.'],
                  ['A Blueprint for Expansion', "Every lesson learned from ODLP directly shapes Whiz Academy's plans for future community programmes. It is our proof of concept, our research lab, and our most tangible act of service."],
                  ['Community Rooted', 'ODLP is designed with and for the Offa community, not imposed on it. Local leaders, educators, and young people co-shape the curriculum and delivery each edition.'],
                ].map(([title, description]) => <article key={title} className="rounded-2xl border border-black/[0.08] bg-[#f8fafb] p-6 dark:border-white/10 dark:bg-[#141d20]"><h3 className="font-jakarta text-base font-extrabold">{title}</h3><p className="mt-2 text-sm leading-6 text-[#6b7280] dark:text-white/60">{description}</p></article>)}
              </div>
            </Reveal>

            <Reveal>
              <h2 className="font-jakarta text-2xl font-extrabold">Programme Milestones</h2>
              <ol className="relative mt-7 border-l border-[#04af9f]/30 pl-7">
                {milestones.map(([year, text], index) => <li key={year} className={index === milestones.length - 1 ? 'relative' : 'relative pb-8'}><span aria-hidden="true" className="absolute -left-[33px] top-1 size-3 rounded-full border-[3px] border-white bg-[#04af9f] ring-1 ring-[#04af9f] dark:border-[#0d1117]" /><p className="text-xs font-bold text-[#04af9f]">{year}</p><p className="mt-1 text-sm leading-6 text-[#6b7280] dark:text-white/60">{text}</p></li>)}
              </ol>
            </Reveal>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <Reveal direction="right">
              <div className="rounded-2xl border border-black/[0.08] bg-[#f8fafb] p-6 dark:border-white/10 dark:bg-[#141d20]">
                <h2 className="font-jakarta text-lg font-extrabold">Programme at a Glance</h2>
                <dl className="mt-5 space-y-4 text-sm">
                  {[
                    ['Status', 'Ongoing — Annual'], ['Location', 'Offa, Kwara State'], ['Since', '2022'], ['Target Group', 'Ages 10–30'], ['Cost', 'Free'], ['Format', 'In-person'], ['Certificate', 'Yes, on completion'],
                  ].map(([label, value]) => <div key={label} className="flex items-start justify-between gap-4 border-b border-black/[0.06] pb-3 last:border-0 last:pb-0 dark:border-white/10"><dt className="text-[#6b7280] dark:text-white/45">{label}</dt><dd className="text-right font-semibold">{value}</dd></div>)}
                </dl>
                <div className="mt-6 grid gap-3">
                  <Button asChild className="h-11 rounded-xl bg-[#04af9f] text-white shadow-none hover:bg-[#039b8d] hover:text-white"><Link href="/volunteer#apply">Volunteer with ODLP</Link></Button>
                  <Button asChild variant="outline" className="h-11 rounded-xl border-black/[0.08] bg-transparent shadow-none dark:border-white/10"><Link href="/donate">Donate to ODLP</Link></Button>
                </div>
              </div>
            </Reveal>
            <Reveal direction="right" delay={80}>
              <div className="rounded-2xl border border-black/[0.08] p-6 dark:border-white/10">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#6b7280] dark:text-white/45">Part of</p>
                <div className="mt-3 flex gap-3"><BookOpen aria-hidden="true" className="mt-0.5 size-5 text-[#04af9f]" /><div><p className="text-sm font-semibold">Community Digital Literacy Programme</p><Link href="/programs" className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#04af9f]">View all projects <ArrowRight aria-hidden="true" className="size-3" /></Link></div></div>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      <section className="bg-[#f8fafb] py-20 transition-colors duration-300 dark:bg-[#11181b]">
        <Reveal className="mx-auto max-w-[1143px] px-6">
          <div className="rounded-3xl border border-[#04af9f]/20 bg-[linear-gradient(135deg,rgba(4,175,159,0.09),rgba(4,175,159,0.02))] p-8 sm:p-10">
            <h2 className="font-jakarta text-3xl font-extrabold">Get Involved</h2>
            <p className="mt-3 text-base text-[#6b7280] dark:text-white/60">Support the Offa Digital Literacy Programme and help us reach more young people.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                ['Volunteer as an Instructor', '/volunteer', 'Share your digital skills by teaching in our programme sessions.'],
                ['Donate to the Programme', '/donate', 'Fund devices, internet access, and training materials.'],
                ['Partner with Us', '/partner', "Bring your organisation's resources to scale this programme."],
              ].map(([title, href, description]) => <Link key={title} href={href} className="group rounded-2xl border border-black/[0.08] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#04af9f]/30 dark:border-white/10 dark:bg-[#141d20]"><h3 className="font-jakarta text-base font-extrabold">{title}</h3><p className="mt-2 text-sm leading-6 text-[#6b7280] dark:text-white/60">{description}</p><span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#04af9f]">Learn More <ArrowRight aria-hidden="true" className="size-3 transition-transform group-hover:translate-x-1" /></span></Link>)}
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
