import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpenCheck,
} from 'lucide-react';

import { PageHero } from '@/components/site/page-hero';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/ui/reveal';

export const metadata: Metadata = {
  title: 'Programs | Whiz Academy',
  description: 'Explore Whiz Academy programmes and projects expanding digital access across rural Nigeria.',
};

const programmes = [
  {
    number: '01',
    title: 'Community Digital Literacy Programme',
    description: 'Deliver practical, inclusive digital literacy education that empowers underserved rural communities with the digital skills needed for education, employment, entrepreneurship, and everyday life.',
    icon: '/icons/program-community-literacy.svg',
    color: '#04af9f',
    surface: 'rgba(4,175,159,0.09)',
    project: {
      title: 'Offa Digital Literacy Programme (ODLP)',
      description: "Whiz Academy's flagship annual community digital literacy initiative since 2022, successfully training young people in Offa, Kwara State across multiple editions. The blueprint for all future community expansion.",
      href: '/programs/offa-digital-literacy-programme',
      status: 'Ongoing',
      flagship: true,
    },
    pipeline: [
      'Rural Community Digital Literacy Outreach Programme',
      'Adult Digital Literacy Programme',
      'Girls in Digital Skills Initiative',
      'Senior Citizens Digital Literacy Programme',
      'Inclusive Digital Literacy Programme for Persons with Disabilities',
    ],
  },
  {
    number: '02',
    title: 'School Digital Education Programme',
    description: 'Build sustainable digital learning ecosystems within Primary and Secondary schools through continuous technology education, innovation, and mentorship.',
    icon: '/icons/program-school-education.svg',
    color: '#6366f1',
    surface: 'rgba(99,102,241,0.09)',
    pipeline: ['Whiz Club (School Digital Clubs)', 'School Digital Innovation Challenge', 'Student Tech Ambassador Programme'],
  },
  {
    number: '03',
    title: 'Community Technology Access Programme',
    description: 'Improve equitable access to digital devices, technology infrastructure, and community learning spaces.',
    icon: '/icons/program-technology-access.svg',
    color: '#a8640f',
    surface: 'rgba(168,100,15,0.09)',
    pipeline: ['Digital Literacy Centres', 'Community Digital Hubs', 'Device Donation Initiative', 'Mobile Digital Lab', 'Solar-Powered Digital Learning Centres', 'Community Innovation & Makerspace'],
  },
  {
    number: '04',
    title: 'Digital Safety & Responsible Technology Programme',
    description: 'Promote safe, ethical, and responsible use of technology while protecting communities from digital risks.',
    icon: '/icons/program-digital-safety.svg',
    color: '#ec4899',
    surface: 'rgba(236,72,153,0.09)',
    pipeline: ['Stay Safe Online Campaign', 'Online Scam Awareness Initiative', 'Digital Citizenship Programme', 'Safe Social Media Campaign', 'Child Online Protection Initiative', 'Digital Wellbeing Campaign', 'Community Cyber Awareness Week'],
  },
  {
    number: '05',
    title: 'Community Digital Awareness Programme',
    description: 'Increase public awareness of digital opportunities and encourage lifelong digital learning through mass communication and community engagement.',
    icon: '/icons/program-awareness.svg',
    color: '#f59e0b',
    surface: 'rgba(245,158,11,0.10)',
    pipeline: ['Offa Digital Literacy Radio Programme', 'Community Digital Awareness Campaigns', 'School Awareness Tours', 'Digital Inclusion Week', 'Community Technology Talks', 'Community Digital Festivals', 'Rural Technology Expo', 'Digital Champions Recognition Awards'],
  },
  {
    number: '06',
    title: 'Capacity Building & Sustainability Programme',
    description: "Develop local educators, volunteers, and community leaders to ensure the long-term sustainability of Whiz Academy's programmes.",
    icon: '/icons/program-capacity.svg',
    color: '#10b981',
    surface: 'rgba(16,185,129,0.09)',
    pipeline: ['Train-the-Trainer Programme', 'Teacher Capacity Building Programme', 'Community Digital Champions Network', 'Community Leadership Development', 'Youth Leadership Fellowship', 'Volunteer Leadership Programme', 'Community Partnership Development Initiative'],
  },
];

export default function ProgramsPage() {
  return (
    <main className="bg-white pt-16 text-[#0d1117] transition-colors duration-300 dark:bg-[#0d1117] dark:text-white">
      <PageHero
        compact
        eyebrow="Programme & Project Portfolio"
        title="Our Programmes & Projects"
        description="Six interconnected programmes, each anchored by ongoing projects and a pipeline of future initiatives designed to transform digital access across rural Nigeria."
      />

      <nav aria-label="Programme status" className="sticky top-16 z-30 border-b border-black/[0.08] bg-white/95 backdrop-blur-md dark:border-white/10 dark:bg-[#0d1117]/95">
        <div className="mx-auto flex max-w-[1280px] gap-3 px-6 py-4">
          <Button asChild variant="outline" className="h-8 rounded-full border-2 border-[#04af9f] bg-transparent px-4 text-xs font-semibold text-[#04af9f] shadow-none hover:bg-[#04af9f]/[0.07] hover:text-[#04af9f]">
            <Link href="#ongoing-projects"><span aria-hidden="true" className="size-1.5 rounded-full bg-[#04af9f]" />Ongoing</Link>
          </Button>
          <Button asChild variant="outline" className="h-8 rounded-full border-black/[0.08] bg-transparent px-4 text-xs font-semibold text-[#6b7280] shadow-none hover:border-[#04af9f]/30 hover:bg-[#04af9f]/[0.04] hover:text-[#04af9f] dark:border-white/10 dark:text-white/60">
            <Link href="#coming-soon">Coming Soon</Link>
          </Button>
        </div>
      </nav>

      <div id="ongoing-projects" className="scroll-mt-28">
        {programmes.map((programme, index) => (
          <section key={programme.title} className={index % 2 === 0 ? 'py-20 sm:py-24' : 'bg-[#f8fafb] py-20 transition-colors duration-300 dark:bg-[#11181b] sm:py-24'}>
            <div className="mx-auto max-w-[1143px] px-6">
              <Reveal>
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-8">
                  <div className="flex shrink-0 items-center gap-4">
                    <div className="flex size-14 items-center justify-center rounded-2xl" style={{ color: programme.color, backgroundColor: programme.surface }}>
                      <Image src={programme.icon} alt="" width={24} height={24} aria-hidden="true" loading="eager" unoptimized />
                    </div>
                    <span className="font-jakarta text-6xl font-extrabold leading-none" style={{ color: `${programme.color}1a` }}>{programme.number}</span>
                  </div>
                  <div className="max-w-[760px]">
                    <p className="text-xs font-bold uppercase tracking-[0.12em]" style={{ color: programme.color }}>Programme {Number(programme.number)}</p>
                    <h2 className="mt-2 font-jakarta text-2xl font-extrabold leading-tight sm:text-3xl">{programme.title}</h2>
                    <p className="mt-3 text-base leading-7 text-[#6b7280] dark:text-white/60">{programme.description}</p>
                  </div>
                </div>
              </Reveal>

              {programme.project ? (
                <Reveal delay={80} className="mt-10 sm:ml-[88px]">
                  <article className="group rounded-2xl border-2 border-[#04af9f] bg-[#f8fafb] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(4,175,159,0.12)] dark:bg-[#141d20] sm:p-7">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[#04af9f]"><span className="size-1.5 rounded-full bg-[#04af9f]" />{programme.project.status}</span>
                          {programme.project.flagship ? <span className="rounded-full bg-[#a8640f] px-2 py-1 text-xs font-bold text-white">Flagship Project</span> : null}
                        </div>
                        <h3 className="mt-3 font-jakarta text-xl font-extrabold">{programme.project.title}</h3>
                        <p className="mt-2 max-w-[820px] text-sm leading-[1.65] text-[#6b7280] dark:text-white/60">{programme.project.description}</p>
                      </div>
                      <Button asChild variant="ghost" className="h-10 shrink-0 rounded-xl px-3 text-[#04af9f] hover:bg-[#04af9f]/[0.08] hover:text-[#04af9f]">
                        <Link href={programme.project.href}>View Project <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-1" /></Link>
                      </Button>
                    </div>
                  </article>
                </Reveal>
              ) : null}

              <Reveal delay={120} className="mt-8 sm:ml-[88px]" >
                {index === 0 ? <p className="mb-4 text-sm font-bold text-[#6b7280] dark:text-white/60">Future Projects</p> : null}
                <div id={index === 0 ? 'coming-soon' : undefined} className="grid scroll-mt-28 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {programme.pipeline.map((project) => (
                    <Link key={project} href={`/contact?subject=${encodeURIComponent(project)}`} style={{ '--program-accent': programme.color } as CSSProperties} className="group rounded-xl border border-black/[0.08] bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--program-accent)] hover:shadow-[0_12px_28px_rgba(13,17,23,0.07)] dark:border-white/10 dark:bg-[#141d20] dark:hover:border-[var(--program-accent)]">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: programme.color }}>Coming Soon</span>
                          <h3 className="mt-2 text-sm font-semibold leading-5">{project}</h3>
                        </div>
                        <BookOpenCheck aria-hidden="true" className="mt-1 size-4 shrink-0 transition-transform duration-300 group-hover:scale-110" style={{ color: programme.color }} />
                      </div>
                    </Link>
                  ))}
                </div>
              </Reveal>
            </div>
          </section>
        ))}
      </div>

      <section className="bg-[#f8fafb] py-20 text-center transition-colors duration-300 dark:bg-[#11181b]">
        <Reveal className="mx-auto max-w-[768px] px-6">
          <h2 className="font-jakarta text-3xl font-extrabold">Want to support a programme?</h2>
          <p className="mt-4 text-base leading-7 text-[#6b7280] dark:text-white/60">Partner with us, volunteer your skills, or donate to help bring future projects to life.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild className="h-12 rounded-2xl bg-[#04af9f] px-6 text-white shadow-none hover:bg-[#039b8d] hover:text-white"><Link href="/partner">Become a Partner</Link></Button>
            <Button asChild variant="outline" className="h-12 rounded-2xl border-black/[0.08] bg-transparent px-6 shadow-none dark:border-white/10"><Link href="/volunteer">Volunteer with Us</Link></Button>
            <Button asChild variant="ghost" className="h-12 rounded-2xl px-6 text-[#04af9f] hover:bg-[#04af9f]/[0.08] hover:text-[#04af9f]"><Link href="/donate">Donate</Link></Button>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
