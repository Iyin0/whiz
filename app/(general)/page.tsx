import Image from 'next/image';
import Newsletter from '@/components/layout/newsletter';
import GetInvolved from '@/components/layout/get-involved';
import Faqs from '@/components/layout/faqs';
import YearsActive from '@/components/layout/years-active';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Globe2, GraduationCap, HandHeart, Target, Users } from 'lucide-react';

export default function Home() {
  const stats = [
    { value: '500+', label: 'Learners reached in Offa' },
    { value: '15', label: 'Local schools engaged' },
    { value: <YearsActive />, label: 'Years of community-led work' },
  ];

  const pillars = [
    {
      title: 'Enlighten',
      description: 'Start with local context, showing learners how technology connects to daily life and opportunity.',
      icon: Globe2,
    },
    {
      title: 'Educate',
      description: 'Equip students with practical tools, responsible habits, and confidence they can keep using.',
      icon: BookOpen,
    },
    {
      title: 'Empower',
      description: 'Strengthen community ownership so digital skills continue beyond a single workshop.',
      icon: GraduationCap,
    },
  ];

  const reasons = [
    'Community-rooted impact',
    'Hands-on learning support',
    'A direct role in digital equity',
  ];

  return (
    <div>
      <section className="relative min-h-[100svh] overflow-hidden bg-[url('/images/HeroImage.png')] bg-cover bg-center">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,31,28,0.95)_0%,rgba(9,31,28,0.82)_48%,rgba(9,31,28,0.28)_100%)]" />
        <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-4 py-28 text-white sm:px-8 lg:px-10">
          <p className="text-sm font-semibold uppercase text-secondary">Whiz Academy</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-[1.08] sm:text-6xl lg:text-7xl">
            Community-led digital literacy for rural Africa.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
            We partner with local schools, families, and community champions to build
            digital confidence from within, beginning with learners in Offa, Kwara State.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="h-12 rounded-md bg-secondary px-6 text-sm font-semibold text-secondary-foreground hover:bg-secondary/90">
              <Link href="/contact#partnership">
                Partner with the foundation
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-12 rounded-md border-white/40 bg-white/[0.08] px-6 text-sm font-semibold text-white hover:bg-white hover:text-foreground">
              <Link href="/contact#donate">Support a cohort</Link>
            </Button>
          </div>
          <dl className="mt-10 grid max-w-3xl gap-3 sm:grid-cols-3">
            {stats.map((item) => (
              <div key={item.label} className="rounded-lg border border-white/[0.14] bg-white/10 p-4 backdrop-blur">
                <dt className="text-3xl font-bold">{item.value}</dt>
                <dd className="mt-1 text-sm text-white/70">{item.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-background px-4 py-16 sm:px-8 sm:py-24 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase text-accent">Mission statement</p>
            <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
              African communities should not have to leave home to access the digital future.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Whiz Academy works with local leaders to close the digital and technological gap
              between rural and urban communities through practical education, trusted mentorship,
              and community-owned skills development.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { label: 'Local voices', icon: Users },
                { label: 'Practical tools', icon: Target },
                { label: 'Lasting confidence', icon: BookOpen },
              ].map((item) => (
                <div key={item.label} className="rounded-lg border border-accent/15 bg-white p-4 shadow-sm">
                  <item.icon className="h-5 w-5 text-accent" />
                  <p className="mt-3 font-semibold">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
          <Image
            src="/images/MissionLogo.png"
            alt="Mission Statement"
            loading="lazy"
            width={497}
            height={331}
            className="mx-auto h-auto w-full max-w-[460px] rounded-lg object-contain"
          />
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#102f2a] px-4 py-16 text-white sm:px-8 sm:py-24 lg:px-10">
        <div className="absolute inset-0 bg-[url('/images/EnlightenImage.png')] bg-cover bg-center opacity-[0.18]" />
        <div className="absolute inset-0 bg-[#102f2a]/[0.88]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase text-secondary">Community-led model</p>
              <h2 className="mt-3 text-3xl font-bold sm:text-5xl">Enlighten. Educate. Empower.</h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-white/75 sm:text-lg">
              Since 2021, more than 500 students across 15 schools in Offa, Kwara State,
              have joined workshops shaped by local needs, local participation, and a shared
              belief that technology should widen opportunity.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="rounded-lg border border-white/[0.12] bg-white/[0.08] p-6 backdrop-blur">
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
                  <pillar.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-semibold">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/70">{pillar.description}</p>
              </div>
            ))}
          </div>
          <Button asChild variant="outline" className="mt-10 h-12 rounded-md border-white/25 bg-transparent px-6 text-white hover:bg-white hover:text-foreground">
            <Link href="/projects">
              Our programs
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-8 sm:py-24 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1fr] lg:items-center">
          <Image
            src="/images/JoinImage.png"
            alt="Volunteers supporting digital literacy"
            loading="lazy"
            width={706}
            height={468}
            className="h-full max-h-[520px] w-full rounded-lg object-cover"
          />
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase text-accent">Join us</p>
            <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
              Stand with the people already moving their communities forward.
            </h2>
            <p className="mt-5 text-base leading-7 text-muted-foreground">
              Whiz Academy welcomes volunteers, mentors, donors, and institutional partners
              who respect local leadership and want to help rural communities gain practical,
              future-ready digital skills.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {reasons.map((reason) => (
                <div key={reason} className="rounded-lg border border-primary/[0.12] bg-primary/5 p-4">
                  <HandHeart className="h-5 w-5 text-primary" />
                  <p className="mt-3 text-sm font-semibold leading-5">{reason}</p>
                </div>
              ))}
            </div>
            <Button
              asChild
              className="mt-8 h-12 rounded-md px-6 text-sm font-semibold"
            >
              <Link href="/contact#volunteer">
                Join the work
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Newsletter />
      <Faqs />
      <GetInvolved />
    </div>
  );
}
