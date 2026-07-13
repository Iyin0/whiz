import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  MapPin,
  ShieldCheck,
  Users,
} from 'lucide-react';

import ApplicationForm from '@/components/applications/application-form';
import { Button } from '@/components/ui/button';
import { careerMeta, careerRoles, selectionProcess } from '@/lib/careers';

export const metadata: Metadata = {
  title: 'Careers | Whiz Academy',
  description: 'Apply for open Whiz Academy instructor and volunteer opportunities in Offa, Kwara State.',
};

const applicationPostings = careerRoles.map((role) => ({
  id: role.id,
  title: role.title,
  type: role.type,
  requiresCv: role.requiresCv,
}));

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-lg border bg-white p-5 shadow-sm">
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function CareersPage() {
  return (
    <div>
      <section className="relative min-h-[78svh] overflow-hidden bg-[url('/images/JoinImage.png')] bg-cover bg-center">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,31,28,0.94)_0%,rgba(9,31,28,0.78)_50%,rgba(9,31,28,0.28)_100%)]" />
        <div className="relative mx-auto flex min-h-[78svh] max-w-7xl flex-col justify-center px-4 pb-20 pt-32 text-white sm:px-8 lg:px-10">
          <p className="text-sm font-semibold uppercase text-secondary">Whiz Academy Careers</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-[1.08] sm:text-6xl">
            {careerMeta.headline}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/78 sm:text-lg">
            {careerMeta.subheading}. We are expanding into a year-round learning model
            serving rural communities across Kwara State, starting in Offa.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="h-12 rounded-md bg-secondary px-6 text-sm font-semibold text-secondary-foreground hover:bg-secondary/90">
              <Link href="#apply">
                Apply now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <dl className="mt-10 grid max-w-4xl gap-3 sm:grid-cols-3">
            {[
              { icon: CalendarDays, label: 'Application deadline', value: careerMeta.deadline },
              { icon: Clock3, label: 'Start date', value: careerMeta.startDate },
              { icon: MapPin, label: 'Primary location', value: 'Offa, Kwara State' },
            ].map((item) => (
              <div key={item.label} className="rounded-lg border border-white/[0.14] bg-white/10 p-4 backdrop-blur">
                <item.icon className="h-5 w-5 text-secondary" />
                <dt className="mt-4 text-xs font-semibold uppercase text-white/60">{item.label}</dt>
                <dd className="mt-1 text-sm font-semibold text-white">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-background px-4 py-14 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase text-accent">Open postings</p>
            <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
              Choose the route that fits how you want to contribute.
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Whiz Academy is recruiting paid instructors and flexible volunteers to deliver
              practical digital skills, learner support, outreach, media, administration, and mentorship.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {careerRoles.map((role) => (
              <article key={role.id} className="rounded-lg border bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase text-accent">{role.position}</p>
                    <h3 className="mt-2 text-2xl font-bold text-foreground">{role.title}</h3>
                  </div>
                  <span className="w-fit rounded-md bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {role.requiresCv ? 'Paid role' : 'Volunteer'}
                  </span>
                </div>

                <div className="mt-5 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                  <p className="flex gap-2">
                    <FileText className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {role.type}
                  </p>
                  <p className="flex gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {role.location}
                  </p>
                </div>

                <p className="mt-5 text-sm leading-6 text-muted-foreground">{role.overview[0]}</p>

                <Button asChild variant="outline" className="mt-6 h-11 rounded-md px-5 text-sm font-semibold">
                  <Link href={`#${role.id}`}>
                    View details
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {careerRoles.map((role, index) => (
        <section
          key={role.id}
          id={role.id}
          className={index % 2 === 0 ? 'scroll-mt-24 bg-white px-4 py-14 sm:px-8 sm:py-20 lg:px-10' : 'scroll-mt-24 bg-background px-4 py-14 sm:px-8 sm:py-20 lg:px-10'}
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
              <div>
                <p className="text-sm font-semibold uppercase text-accent">{role.position}</p>
                <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">{role.title}</h2>
                <div className="mt-5 space-y-4 text-base leading-7 text-muted-foreground">
                  {role.overview.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <div className="mt-6 grid gap-3">
                  <p className="flex gap-2 text-sm font-semibold text-foreground">
                    <FileText className="mt-0.5 h-4 w-4 text-primary" />
                    {role.type}
                  </p>
                  <p className="flex gap-2 text-sm font-semibold text-foreground">
                    <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                    {role.location}
                  </p>
                </div>
              </div>

              <div className="grid gap-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <ListBlock title="Working pattern" items={role.workingPattern} />
                  <ListBlock title="What we offer" items={role.benefits} />
                </div>

                {role.modules ? (
                  <div className="rounded-lg border bg-primary p-6 text-primary-foreground shadow-sm">
                    <h3 className="text-base font-semibold">Curriculum modules</h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {role.modules.map((module) => (
                        <span key={module} className="rounded-md bg-white/10 px-3 py-1 text-sm text-white">
                          {module}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}

                <div className="grid gap-5 md:grid-cols-2">
                  {role.responsibilities.map((group) => (
                    <ListBlock key={group.title} title={group.title} items={group.items} />
                  ))}
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <ListBlock title="Essential" items={role.essential} />
                  <ListBlock title="Desirable" items={role.desirable} />
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="bg-[#102f2a] px-4 py-14 text-white sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase text-secondary">Selection process</p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">A clear route from application to onboarding.</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {selectionProcess.map((step) => (
                <article key={step.stage} className="rounded-lg border border-white/[0.12] bg-white/[0.08] p-5 backdrop-blur">
                  <p className="text-xs font-semibold uppercase text-secondary">{step.stage}</p>
                  <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/70">{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-14 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase text-accent">Equality & safeguarding</p>
            <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
              Inclusive recruitment with clear safeguarding expectations.
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-lg border bg-background p-6">
              <Users className="h-6 w-6 text-primary" />
              <h3 className="mt-4 text-lg font-semibold">Equal opportunity</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Whiz Academy welcomes applications from individuals of all backgrounds,
                regardless of gender, disability, ethnicity, religion, or socioeconomic status.
              </p>
            </div>
            <div className="rounded-lg border bg-background p-6">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <h3 className="mt-4 text-lg font-semibold">Safeguarding</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Successful applicants must uphold child protection policies, maintain professional
                conduct, and complete any required safeguarding training before delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="apply" className="scroll-mt-24 bg-background px-4 py-14 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-sm font-semibold uppercase text-accent">Apply</p>
            <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
              Submit your application before {careerMeta.deadline}.
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Paid instructor applicants should include a CV or resume link. Portfolio or previous
              work links are welcome where applicable.
            </p>
          </div>

          <div className="rounded-lg border bg-white/70 p-5 shadow-sm sm:p-6">
            <ApplicationForm
              postings={applicationPostings}
              deadline={careerMeta.deadline}
              expiresAt={careerMeta.applicationClosesAt}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
