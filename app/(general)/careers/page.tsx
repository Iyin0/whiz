import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpenCheck,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  HeartHandshake,
  MapPin,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';

import ApplicationForm from '@/components/applications/application-form';
import { SectionHeading } from '@/components/site/section-heading';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/ui/reveal';
import { careerMeta, careerRoles, selectionProcess, type CareerRole } from '@/lib/careers';

export const metadata: Metadata = {
  title: 'Careers | Whiz Academy',
  description:
    'Join Whiz Academy and help expand practical digital education across rural communities in Nigeria.',
};

const applicationPostings = careerRoles.map((role) => ({
  id: role.id,
  title: role.title,
  type: role.type,
  requiresCv: role.requiresCv,
}));

const heroFacts = [
  {
    icon: CalendarDays,
    label: 'Application deadline',
    value: careerMeta.deadline,
  },
  {
    icon: Clock3,
    label: 'Programme start',
    value: careerMeta.startDate,
  },
  {
    icon: MapPin,
    label: 'Primary location',
    value: 'Offa, Kwara State',
  },
];

function CheckList({
  title,
  items,
  accent = 'teal',
}: {
  title: string;
  items: string[];
  accent?: 'teal' | 'amber';
}) {
  const accentClass = accent === 'teal' ? 'text-[#04af9f]' : 'text-[#bd7100]';

  return (
    <article className="h-full rounded-2xl border border-black/[0.08] bg-[#f8fafb] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#04af9f]/25 hover:shadow-[0_16px_40px_rgba(13,17,23,0.07)] dark:border-white/10 dark:bg-[#141d20] dark:hover:border-[#04af9f]/35">
      <h3 className="font-jakarta text-base font-extrabold">{title}</h3>
      <ul className="mt-5 space-y-3.5">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-3 text-sm leading-6 text-[#6b7280] dark:text-white/60"
          >
            <CheckCircle2
              aria-hidden="true"
              className={`mt-1 size-4 shrink-0 ${accentClass}`}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function RoleDetails({ role, index }: { role: CareerRole; index: number }) {
  const isPaid = role.requiresCv;
  const accent = isPaid ? 'teal' : 'amber';

  return (
    <section
      id={role.id}
      className={`scroll-mt-20 px-6 py-20 transition-colors duration-300 sm:py-24 ${
        index % 2 === 0
          ? 'bg-white dark:bg-[#0d1117]'
          : 'bg-[#f7f9fa] dark:bg-[#101719]'
      }`}
    >
      <div className="mx-auto grid max-w-[1120px] gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <p
            className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-semibold ${
              isPaid
                ? 'border-[#04af9f]/25 bg-[#04af9f]/[0.07] text-[#04af9f]'
                : 'border-[#bd7100]/25 bg-[#bd7100]/[0.08] text-[#bd7100]'
            }`}
          >
            {role.position} · {isPaid ? 'Paid opportunity' : 'Volunteer opportunity'}
          </p>
          <h2 className="mt-5 font-jakarta text-3xl font-extrabold leading-tight tracking-[-0.8px] sm:text-[42px]">
            {role.title}
          </h2>
          <div className="mt-6 space-y-4 text-base leading-7 text-[#6b7280] dark:text-white/60">
            {role.overview.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-7 space-y-3 rounded-2xl border border-black/[0.08] bg-[#f8fafb] p-5 text-sm dark:border-white/10 dark:bg-[#141d20]">
            <p className="flex items-start gap-3 font-semibold">
              <FileText
                aria-hidden="true"
                className={`mt-0.5 size-4 shrink-0 ${
                  isPaid ? 'text-[#04af9f]' : 'text-[#bd7100]'
                }`}
              />
              {role.type}
            </p>
            <p className="flex items-start gap-3 font-semibold">
              <MapPin
                aria-hidden="true"
                className={`mt-0.5 size-4 shrink-0 ${
                  isPaid ? 'text-[#04af9f]' : 'text-[#bd7100]'
                }`}
              />
              {role.location}
            </p>
          </div>

          <Button
            asChild
            className={`mt-7 h-12 rounded-xl px-6 font-bold text-white shadow-none ${
              isPaid
                ? 'bg-[#04af9f] hover:bg-[#039b8d] active:bg-[#028579]'
                : 'bg-[#bd7100] hover:bg-[#a66200] active:bg-[#8f5500]'
            }`}
          >
            <Link href="#apply">
              Apply for this role
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </Button>
        </Reveal>

        <div className="space-y-6">
          <Reveal delay={80}>
            <div
              className={`rounded-3xl p-7 text-white sm:p-8 ${
                isPaid
                  ? 'bg-[linear-gradient(145deg,#073d38_0%,#102f2a_100%)]'
                  : 'bg-[linear-gradient(145deg,#5b3500_0%,#2f2112_100%)]'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-xl bg-white/10">
                  <Clock3 aria-hidden="true" className="size-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/55">
                    Working pattern
                  </p>
                  <h3 className="mt-1 font-jakarta text-xl font-extrabold">
                    What the commitment looks like
                  </h3>
                </div>
              </div>
              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {role.workingPattern.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.06] p-4 text-sm leading-6 text-white/75"
                  >
                    <CheckCircle2
                      aria-hidden="true"
                      className="mt-1 size-4 shrink-0 text-[#43d8ca]"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {role.modules ? (
            <Reveal delay={120}>
              <div className="rounded-3xl border border-[#04af9f]/20 bg-[#04af9f]/[0.06] p-7 dark:bg-[#04af9f]/[0.08]">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-[#04af9f]/15 text-[#04af9f]">
                    <BookOpenCheck aria-hidden="true" className="size-5" />
                  </span>
                  <h3 className="font-jakarta text-lg font-extrabold">Curriculum modules</h3>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {role.modules.map((module) => (
                    <span
                      key={module}
                      className="rounded-full border border-[#04af9f]/15 bg-white px-3 py-1.5 text-xs font-semibold text-[#047e74] dark:bg-[#141d20] dark:text-[#43d8ca]"
                    >
                      {module}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ) : null}

          <Reveal delay={160}>
            <div>
              <h3 className="font-jakarta text-xl font-extrabold">What you&apos;ll do</h3>
              <p className="mt-2 text-sm leading-6 text-[#6b7280] dark:text-white/60">
                Explore the key areas of responsibility for this opportunity.
              </p>
              <Accordion type="single" collapsible className="mt-5 space-y-3">
                {role.responsibilities.map((group, groupIndex) => (
                  <AccordionItem
                    key={group.title}
                    value={`${role.id}-${group.title}`}
                    className="rounded-2xl border border-black/[0.08] bg-[#f8fafb] px-5 data-[state=open]:border-[#04af9f]/35 dark:border-white/10 dark:bg-[#141d20]"
                  >
                    <AccordionTrigger className="py-5 font-jakarta text-sm font-bold hover:no-underline">
                      <span className="flex items-center gap-3">
                        <span
                          className={`flex size-7 items-center justify-center rounded-lg text-xs ${
                            isPaid
                              ? 'bg-[#04af9f]/10 text-[#04af9f]'
                              : 'bg-[#bd7100]/10 text-[#bd7100]'
                          }`}
                        >
                          {String(groupIndex + 1).padStart(2, '0')}
                        </span>
                        {group.title}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-3 pb-2 pl-10">
                        {group.items.map((item) => (
                          <li
                            key={item}
                            className="flex gap-3 text-sm leading-6 text-[#6b7280] dark:text-white/60"
                          >
                            <CheckCircle2
                              aria-hidden="true"
                              className={`mt-1 size-4 shrink-0 ${
                                isPaid ? 'text-[#04af9f]' : 'text-[#bd7100]'
                              }`}
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-2">
            <Reveal direction="left">
              <CheckList title="Essential" items={role.essential} accent={accent} />
            </Reveal>
            <Reveal direction="right">
              <CheckList title="Desirable" items={role.desirable} accent={accent} />
            </Reveal>
          </div>

          <Reveal>
            <div className="rounded-3xl border border-black/[0.08] bg-white p-7 dark:border-white/10 dark:bg-[#141d20]">
              <div className="flex items-center gap-3">
                <span
                  className={`flex size-10 items-center justify-center rounded-xl ${
                    isPaid
                      ? 'bg-[#04af9f]/10 text-[#04af9f]'
                      : 'bg-[#bd7100]/10 text-[#bd7100]'
                  }`}
                >
                  <Sparkles aria-hidden="true" className="size-5" />
                </span>
                <h3 className="font-jakarta text-lg font-extrabold">What you&apos;ll gain</h3>
              </div>
              <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {role.benefits.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-6 text-[#6b7280] dark:text-white/60"
                  >
                    <CheckCircle2
                      aria-hidden="true"
                      className={`mt-1 size-4 shrink-0 ${
                        isPaid ? 'text-[#04af9f]' : 'text-[#bd7100]'
                      }`}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default function CareersPage() {
  return (
    <main className="overflow-hidden bg-white pt-16 text-[#0d1117] transition-colors duration-300 dark:bg-[#0d1117] dark:text-white">
      <section className="relative isolate overflow-hidden bg-[linear-gradient(145deg,#0d1117_0%,#0c2421_62%,#073d38_100%)] text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 opacity-70 [background-image:radial-gradient(circle_at_8%_20%,rgba(4,175,159,0.20),transparent_30%),radial-gradient(circle_at_86%_22%,rgba(189,113,0,0.17),transparent_28%)]"
        />
        <div className="mx-auto grid min-h-[700px] max-w-[1120px] items-center gap-14 px-6 py-20 lg:grid-cols-[1.02fr_0.98fr] lg:py-24">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-[#04af9f]/35 bg-[#003d3a]/70 px-3 py-2 text-sm font-medium text-[#43d8ca] before:size-1.5 before:rounded-full before:bg-current">
              Careers at Whiz Academy
            </p>
            <h1 className="mt-7 max-w-[620px] font-jakarta text-[42px] font-extrabold leading-[1.08] tracking-[-1.2px] sm:text-[54px] lg:text-[60px]">
              Build skills. Shape futures.{' '}
              <span className="text-[#43d8ca]">Change communities.</span>
            </h1>
            <p className="mt-6 max-w-[600px] text-lg leading-8 text-white/70">
              {careerMeta.subheading}. Join our year-round learning team and help make
              practical digital opportunity accessible to rural communities across Nigeria.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                className="h-13 rounded-xl bg-[#04af9f] px-7 font-bold text-white shadow-none hover:bg-[#039b8d] active:bg-[#028579]"
              >
                <Link href="#open-roles">
                  Explore open roles
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-13 rounded-xl border-white/25 bg-white/[0.04] px-7 font-bold text-white shadow-none hover:border-white/45 hover:bg-white/10 hover:text-white"
              >
                <Link href="#apply">Apply now</Link>
              </Button>
            </div>

            <dl className="mt-10 grid gap-3 sm:grid-cols-3">
              {heroFacts.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm"
                >
                  <item.icon aria-hidden="true" className="size-5 text-[#43d8ca]" />
                  <dt className="mt-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-white/45">
                    {item.label}
                  </dt>
                  <dd className="mt-1.5 text-sm font-bold text-white">{item.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={140} direction="right">
            <div className="relative mx-auto max-w-[540px]">
              <div
                aria-hidden="true"
                className="absolute -inset-5 rounded-[40px] border border-white/[0.06] bg-white/[0.03]"
              />
              <div className="relative overflow-hidden rounded-[32px] border border-white/15 bg-white/[0.08] p-5 shadow-[0_32px_90px_rgba(0,0,0,0.32)] backdrop-blur-sm sm:p-7">
                <div className="relative aspect-[1.5] overflow-hidden rounded-[24px] bg-[linear-gradient(145deg,#dff5f3_0%,#bdeae5_100%)]">
                  <Image
                    src="/images/JoinImage.png"
                    alt="Members of the Whiz Academy learning team"
                    fill
                    priority
                    sizes="(max-width: 1024px) 90vw, 500px"
                    className="object-contain object-bottom"
                  />
                </div>
                <div className="mt-5 flex items-center justify-between gap-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/45">
                      Current openings
                    </p>
                    <p className="mt-1 font-jakarta text-2xl font-extrabold">
                      {careerRoles.length} ways to join
                    </p>
                  </div>
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-[#04af9f] text-white">
                    <BriefcaseBusiness aria-hidden="true" className="size-6" />
                  </span>
                </div>
              </div>

              <div className="absolute -left-3 -top-6 rounded-2xl border border-white/15 bg-[#142d2a]/90 px-5 py-4 shadow-xl backdrop-blur-md sm:-left-8">
                <p className="flex items-center gap-2 text-xs font-semibold text-[#43d8ca]">
                  <span className="size-2 rounded-full bg-[#43d8ca] shadow-[0_0_0_5px_rgba(67,216,202,0.12)]" />
                  Applications open
                </p>
                <p className="mt-1.5 text-sm font-bold">Start your impact journey</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="open-roles" className="scroll-mt-20 px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-[1120px]">
          <SectionHeading
            eyebrow="Open Opportunities"
            title="Find where you can make the greatest impact"
            description="Choose a paid teaching role or a flexible volunteer pathway. Both put your skills directly to work for learners and communities."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {careerRoles.map((role, index) => {
              const isPaid = role.requiresCv;
              const RoleIcon = isPaid ? BookOpenCheck : HeartHandshake;

              return (
                <Reveal key={role.id} delay={index * 90}>
                  <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-black/[0.08] bg-[#f8fafb] p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#04af9f]/35 hover:shadow-[0_22px_55px_rgba(13,17,23,0.1)] dark:border-white/10 dark:bg-[#141d20] dark:hover:border-[#04af9f]/40 sm:p-8">
                    <div
                      aria-hidden="true"
                      className={`absolute inset-x-0 top-0 h-1 ${
                        isPaid ? 'bg-[#04af9f]' : 'bg-[#bd7100]'
                      }`}
                    />
                    <div className="flex items-start justify-between gap-5">
                      <span
                        className={`flex size-13 items-center justify-center rounded-2xl ${
                          isPaid
                            ? 'bg-[#04af9f]/10 text-[#04af9f]'
                            : 'bg-[#bd7100]/10 text-[#bd7100]'
                        }`}
                      >
                        <RoleIcon aria-hidden="true" className="size-6" />
                      </span>
                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                          isPaid
                            ? 'bg-[#04af9f]/10 text-[#047e74] dark:text-[#43d8ca]'
                            : 'bg-[#bd7100]/10 text-[#9a5c00] dark:text-[#f0ac45]'
                        }`}
                      >
                        {isPaid ? 'Paid role' : 'Volunteer'}
                      </span>
                    </div>

                    <p className="mt-7 text-xs font-semibold uppercase tracking-[0.12em] text-[#7c8493] dark:text-white/45">
                      {role.position}
                    </p>
                    <h2 className="mt-2 font-jakarta text-2xl font-extrabold sm:text-[28px]">
                      {role.title}
                    </h2>
                    <p className="mt-4 text-sm leading-6 text-[#6b7280] dark:text-white/60">
                      {role.overview[0]}
                    </p>

                    <div className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
                      <p className="flex items-start gap-2.5 font-medium text-[#4b5563] dark:text-white/70">
                        <FileText
                          aria-hidden="true"
                          className={`mt-0.5 size-4 shrink-0 ${
                            isPaid ? 'text-[#04af9f]' : 'text-[#bd7100]'
                          }`}
                        />
                        {role.type}
                      </p>
                      <p className="flex items-start gap-2.5 font-medium text-[#4b5563] dark:text-white/70">
                        <MapPin
                          aria-hidden="true"
                          className={`mt-0.5 size-4 shrink-0 ${
                            isPaid ? 'text-[#04af9f]' : 'text-[#bd7100]'
                          }`}
                        />
                        {role.location}
                      </p>
                    </div>

                    <Button
                      asChild
                      variant="outline"
                      className="mt-8 h-12 w-full rounded-xl border-black/[0.08] bg-white font-bold shadow-none hover:border-[#04af9f]/35 hover:bg-[#04af9f]/[0.06] hover:text-[#047e74] dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-[#04af9f]/10 dark:hover:text-[#43d8ca]"
                    >
                      <Link href={`#${role.id}`}>
                        View role details
                        <ArrowRight
                          aria-hidden="true"
                          className="size-4 transition-transform group-hover:translate-x-1"
                        />
                      </Link>
                    </Button>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {careerRoles.map((role, index) => (
        <RoleDetails key={role.id} role={role} index={index} />
      ))}

      <section className="bg-[linear-gradient(145deg,#0d1117_0%,#102f2a_100%)] px-6 py-20 text-white sm:py-24">
        <div className="mx-auto max-w-[1120px]">
          <Reveal className="max-w-[650px]">
            <p className="inline-flex rounded-full border border-[#04af9f]/30 bg-[#04af9f]/10 px-3 py-1.5 text-xs font-semibold text-[#43d8ca]">
              Selection Process
            </p>
            <h2 className="mt-5 font-jakarta text-3xl font-extrabold leading-tight tracking-[-0.8px] sm:text-[42px]">
              A clear route from application to onboarding
            </h2>
            <p className="mt-4 text-base leading-7 text-white/60">
              Every candidate follows a transparent process designed to assess fit, readiness, and
              safeguarding expectations.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {selectionProcess.map((step, index) => (
              <Reveal key={step.stage} delay={(index % 3) * 70}>
                <article className="group h-full rounded-2xl border border-white/10 bg-white/[0.055] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#04af9f]/35 hover:bg-white/[0.08]">
                  <div className="flex items-center justify-between gap-5">
                    <span className="font-jakarta text-3xl font-extrabold text-[#43d8ca]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/35">
                      {step.stage}
                    </span>
                  </div>
                  <h3 className="mt-6 font-jakarta text-lg font-bold">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/55">{step.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f9fa] px-6 py-20 transition-colors duration-300 dark:bg-[#101719] sm:py-24">
        <div className="mx-auto max-w-[1120px]">
          <SectionHeading
            eyebrow="How We Hire"
            title="Inclusive recruitment, responsible delivery"
            description="We want every candidate to feel respected and every learner to be protected."
          />
          <div className="mx-auto mt-12 grid max-w-[900px] gap-6 md:grid-cols-2">
            <Reveal direction="left">
              <article className="h-full rounded-3xl border border-black/[0.08] bg-white p-8 dark:border-white/10 dark:bg-[#141d20]">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-[#04af9f]/10 text-[#04af9f]">
                  <Users aria-hidden="true" className="size-6" />
                </span>
                <h3 className="mt-6 font-jakarta text-xl font-extrabold">Equal opportunity</h3>
                <p className="mt-4 text-sm leading-6 text-[#6b7280] dark:text-white/60">
                  Whiz Academy welcomes applications from individuals of all backgrounds,
                  regardless of gender, disability, ethnicity, religion, or socioeconomic status.
                </p>
              </article>
            </Reveal>
            <Reveal direction="right">
              <article className="h-full rounded-3xl border border-black/[0.08] bg-white p-8 dark:border-white/10 dark:bg-[#141d20]">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-[#bd7100]/10 text-[#bd7100]">
                  <ShieldCheck aria-hidden="true" className="size-6" />
                </span>
                <h3 className="mt-6 font-jakarta text-xl font-extrabold">Safeguarding</h3>
                <p className="mt-4 text-sm leading-6 text-[#6b7280] dark:text-white/60">
                  Successful applicants must uphold child protection policies, maintain
                  professional conduct, and complete any required safeguarding training before
                  delivery.
                </p>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="apply" className="scroll-mt-20 px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-[1120px]">
          <SectionHeading
            eyebrow="Apply"
            title="Take the next step"
            description={`Submit your application before ${careerMeta.deadline}. We look forward to learning how your experience and motivation can strengthen our mission.`}
          />

          <div className="mt-12 grid overflow-hidden rounded-[32px] border border-black/[0.08] bg-[#f8fafb] shadow-[0_24px_70px_rgba(13,17,23,0.08)] dark:border-white/10 dark:bg-[#141d20] lg:grid-cols-[0.65fr_1.35fr]">
            <Reveal className="bg-[linear-gradient(150deg,#073d38_0%,#102f2a_100%)] p-8 text-white sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#43d8ca]">
                Before you apply
              </p>
              <h2 className="mt-4 font-jakarta text-3xl font-extrabold leading-tight">
                Help us understand the impact you want to make.
              </h2>
              <p className="mt-5 text-sm leading-6 text-white/60">
                Paid instructor applicants should include a shareable CV or resume link.
                Portfolios and previous work samples are welcome where applicable.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  'Choose the opportunity that best matches your availability.',
                  'Share relevant teaching, technology, media, or community experience.',
                  'Explain why Whiz Academy and rural digital education matter to you.',
                ].map((item) => (
                  <p
                    key={item}
                    className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-sm leading-6 text-white/75"
                  >
                    <CheckCircle2
                      aria-hidden="true"
                      className="mt-1 size-4 shrink-0 text-[#43d8ca]"
                    />
                    {item}
                  </p>
                ))}
              </div>

              <div className="mt-8 rounded-2xl bg-white/[0.07] p-5">
                <p className="text-xs text-white/45">Questions before applying?</p>
                <Link
                  href={`mailto:${careerMeta.email}`}
                  className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-[#43d8ca] transition-colors hover:text-white"
                >
                  {careerMeta.email}
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </div>
            </Reveal>

            <div className="p-6 sm:p-8 lg:p-10">
              <ApplicationForm
                postings={applicationPostings}
                deadline={careerMeta.deadline}
                expiresAt={careerMeta.applicationClosesAt}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
