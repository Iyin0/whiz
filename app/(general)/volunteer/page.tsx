import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, BriefcaseBusiness, Code2, HeartHandshake, Megaphone, Users } from 'lucide-react';

import { PageHero } from '@/components/site/page-hero';
import { SectionHeading } from '@/components/site/section-heading';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/ui/reveal';

import VolunteerForm from '../contact/volunteer-form';

export const metadata: Metadata = {
  title: 'Volunteer | Whiz Academy',
  description: "Contribute your skills to Nigeria's digital education movement.",
};

const roles = [
  { title: 'Program Instructor', description: 'Deliver sessions in our digital literacy, coding, or STEM programs at a community hub near you.', commitment: '8–12 hrs/week', tags: ['Teaching', 'Any tech discipline'], icon: BookOpen },
  { title: 'Curriculum Developer', description: 'Help design and update program curricula to stay current with industry needs and best pedagogical practices.', commitment: 'Flexible', tags: ['Instructional design', 'Tech expertise'], icon: Code2 },
  { title: 'Mentor', description: 'Provide one-on-one guidance to program graduates navigating their first tech jobs or launching businesses.', commitment: '2–4 hrs/week', tags: ['Tech career', 'Entrepreneurship'], icon: Users },
  { title: 'Community Outreach', description: 'Help us identify communities that need our programs and run awareness campaigns.', commitment: 'Weekends', tags: ['Communication', 'Local knowledge'], icon: Megaphone },
  { title: 'Technical Support', description: 'Set up and maintain digital hubs, troubleshoot equipment, and ensure our community labs stay operational.', commitment: 'Project-based', tags: ['IT', 'Hardware', 'Networking'], icon: BriefcaseBusiness },
  { title: 'Fundraising & Partnerships', description: 'Connect Whiz Academy with corporate partners, grant bodies, and donors who can amplify our impact.', commitment: 'Flexible', tags: ['Sales', 'Business development'], icon: HeartHandshake },
];

const faqs = [
  ['Do I need to be based in Nigeria to volunteer?', 'No. Several roles, including mentoring, curriculum development, fundraising, and project support, can be completed remotely.'],
  ['Can companies send employee volunteers?', 'Yes. We can build a structured employee volunteering track around your team’s skills and availability.'],
  ['Is there a minimum commitment?', 'Commitment varies by role. Some roles need a few hours each week, while others are project-based or monthly.'],
  ['Do volunteers receive any recognition?', 'Volunteers receive onboarding, support, impact updates, and recognition or certificates where appropriate.'],
  ["Can I volunteer if I'm not a tech professional?", 'Absolutely. Community engagement, operations, partnerships, storytelling, and mentoring all need diverse skills.'],
];

export default function VolunteerPage() {
  return (
    <main className="bg-white pt-16 text-[#0d1117] transition-colors duration-300 dark:bg-[#0d1117] dark:text-white">
      <PageHero
        eyebrow="Volunteer"
        title={<>Give your skills,<span className="block">change a community</span></>}
        description="Whether you have 2 hours a week or 2 months to spare, there's a meaningful role for you in Nigeria's digital education movement."
        actions={<><Button asChild className="h-12 rounded-xl bg-[#04af9f] px-6 text-white shadow-none hover:bg-[#039b8d] active:bg-[#028579]"><Link href="#roles">See Open Roles</Link></Button><Button asChild variant="outline" className="h-12 rounded-xl border-white/25 bg-transparent px-6 text-white shadow-none hover:border-white/50 hover:bg-white/10 hover:text-white"><Link href="#apply">Apply Now</Link></Button></>}
      />

      <section className="border-b border-black/[0.08] py-10 dark:border-white/10">
        <div className="mx-auto grid max-w-[1143px] grid-cols-2 gap-8 px-6 text-center sm:grid-cols-4">
          {[['5+', 'Active volunteers'], ['1', 'Community served'], ['6', 'Volunteer tracks'], ['4.9★', 'Volunteer satisfaction']].map(([value, label]) => <div key={label}><strong className="font-jakarta text-3xl font-extrabold text-[#04af9f]">{value}</strong><p className="mt-1 text-sm text-[#6b7280] dark:text-white/55">{label}</p></div>)}
        </div>
      </section>

      <section id="roles" className="scroll-mt-24 py-20 sm:py-24">
        <div className="mx-auto max-w-[1143px] px-6">
          <SectionHeading eyebrow="Open Roles" title="Find your fit" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {roles.map((role, index) => (
              <Reveal key={role.title} delay={index * 70}>
                <article className="group h-full rounded-2xl border border-black/[0.08] bg-[#f8fafb] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#04af9f]/30 hover:shadow-[0_16px_38px_rgba(13,17,23,0.08)] dark:border-white/10 dark:bg-[#141d20] dark:hover:border-[#04af9f]/40">
                  <div className="flex items-start justify-between"><span className="text-xs font-medium text-[#6b7280] dark:text-white/55">{role.commitment}</span><span className="text-xl text-[#04af9f] transition-transform group-hover:rotate-90">+</span></div>
                  <div className="mt-5 flex size-11 items-center justify-center rounded-xl bg-[#04af9f]/[0.09] text-[#04af9f]"><role.icon aria-hidden="true" className="size-5" /></div>
                  <h3 className="mt-5 font-jakarta text-lg font-extrabold">{role.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#6b7280] dark:text-white/60">{role.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">{role.tags.map((tag) => <span key={tag} className="rounded-full bg-[#04af9f]/[0.09] px-2.5 py-1 text-[11px] font-semibold text-[#04af9f]">{tag}</span>)}</div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f8fafb] py-20 transition-colors duration-300 dark:bg-[#11181b] sm:py-24">
        <div className="mx-auto grid max-w-[980px] items-center gap-10 px-6 lg:grid-cols-[420px_1fr]">
          <Reveal direction="left"><div className="relative aspect-[3/2] overflow-hidden rounded-3xl"><Image src="/images/volunteer_instructor.jpg" alt="A volunteer instructor leading a computer-lab training session" fill sizes="(max-width: 1024px) 100vw, 420px" className="object-cover" /></div></Reveal>
          <Reveal direction="right">
            <span className="font-jakarta text-6xl leading-none text-[#04af9f]">“</span>
            <blockquote className="-mt-3 font-jakarta text-xl font-medium italic leading-[1.55] sm:text-2xl">I gave 2 weeks as a volunteer instructor. What I got back, in gratitude, in purpose, in connections, was worth a year of corporate work.</blockquote>
            <div className="mt-6 flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-full bg-[#04af9f] text-sm font-bold text-white">AK</span><div><p className="font-semibold">Ayeni Komolafe</p><p className="mt-1 text-sm text-[#6b7280] dark:text-white/55">School Teacher · Former Volunteer Instructor, Offa, Kwara State.</p></div></div>
          </Reveal>
        </div>
      </section>

      <section id="apply" className="scroll-mt-24 py-20 sm:py-24">
        <div className="mx-auto max-w-[820px] px-6">
          <SectionHeading eyebrow="Apply" title="Ready to volunteer?" description="Applications reviewed within 5 business days." />
          <Reveal className="mt-10"><VolunteerForm /></Reveal>
        </div>
      </section>

      <section className="bg-[#f8fafb] py-20 transition-colors duration-300 dark:bg-[#11181b]">
        <div className="mx-auto max-w-[768px] px-6">
          <SectionHeading title="Frequently asked questions" />
          <Reveal className="mt-10"><Accordion type="single" collapsible className="space-y-3">{faqs.map(([question, answer]) => <AccordionItem key={question} value={question} className="rounded-2xl border border-black/[0.08] bg-white px-5 dark:border-white/10 dark:bg-[#141d20]"><AccordionTrigger className="py-5 text-left text-sm font-semibold hover:text-[#04af9f] hover:no-underline">{question}</AccordionTrigger><AccordionContent className="pb-5 text-sm leading-6 text-[#6b7280] dark:text-white/60">{answer}</AccordionContent></AccordionItem>)}</Accordion></Reveal>
        </div>
      </section>
    </main>
  );
}
