import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BarChart3,
  Building2,
  CalendarDays,
  Cpu,
  Download,
  Globe2,
  GraduationCap,
  Handshake,
  Heart,
  Lightbulb,
  MapPin,
  Medal,
  MessageSquare,
  Monitor,
  Rocket,
  School,
  Shield,
  Sparkles,
  Target,
  University,
  Users,
  Zap,
} from 'lucide-react';

import PartnershipForm from '@/app/(general)/contact/partnership-form';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/ui/reveal';

export const metadata: Metadata = {
  title: 'Partner With Us | Whiz Academy',
  description:
    "Partner with Whiz Academy to bridge Nigeria's digital divide through quality digital education and technology access.",
};

const reasons = [
  { icon: BarChart3, title: '75% Digital Literacy', description: 'Working toward 75% digital literacy in every partner community we serve.' },
  { icon: Globe2, title: 'Sustainable Development', description: 'Building lasting infrastructure and capacity that outlives any single programme.' },
  { icon: GraduationCap, title: 'Teacher Capacity', description: 'Every teacher trained becomes a digital education multiplier in their school.' },
  { icon: Rocket, title: 'Youth Empowerment', description: 'Equipping young Nigerians with skills to compete in the global digital economy.' },
  { icon: Monitor, title: 'Technology Access', description: 'Bridging the hardware and connectivity gap in underserved rural communities.' },
];

const tracks = [
  {
    icon: Handshake,
    title: 'Strategic Partnerships',
    description: 'Long-term collaborations involving funding, expertise, expansion, and co-innovation to scale digital education across Nigeria.',
    color: '#00b5a5',
    surface: '#e3f6f4',
  },
  {
    icon: Medal,
    title: 'Programme Sponsorship',
    description: 'Sponsor flagship initiatives Offa Digital Literacy, Digital Skills Workshops, AI Education, or Teacher Development programmes.',
    color: '#bd7100',
    surface: '#f7eee3',
  },
  {
    icon: Cpu,
    title: 'Technology Partnerships',
    description: 'Support through laptops, tablets, internet connectivity, software, AI tools, and fully equipped digital labs.',
    color: '#6c63ff',
    surface: '#ececff',
  },
  {
    icon: Users,
    title: 'Community Partnerships',
    description: 'Ideal for schools, local governments, community leaders, NGOs, and faith-based organisations working at the grassroots level.',
    color: '#ef4894',
    surface: '#fde8f3',
  },
  {
    icon: Lightbulb,
    title: 'Knowledge & Volunteer',
    description: 'Professionals contribute through mentoring, teaching, curriculum development, research, and corporate volunteering.',
    color: '#ed9700',
    surface: '#fcf2e2',
  },
  {
    icon: BarChart3,
    title: 'Funding & Grants',
    description: 'Ideal for foundations, CSR programmes, development agencies, and international organisations seeking verifiable impact.',
    color: '#06b884',
    surface: '#e2f6ef',
  },
];

const opportunities = [
  {
    image: '/images/partner_community.jpg',
    alt: 'Students and educators gathered outside a community school',
    tag: 'Full community impact',
    icon: MapPin,
    title: 'Adopt a Community',
    description: 'Support the complete digital transformation of a rural community through education, teacher training, technology access, and ongoing mentorship.',
  },
  {
    image: '/images/partner_school.jpg',
    alt: 'A rural school building selected for digital education support',
    tag: '300–600 students impacted',
    icon: School,
    title: 'Adopt a School',
    description: 'Equip one school with a full digital literacy programme, hardware, trained teachers, and curriculum transforming every student in the school.',
  },
  {
    image: '/images/partner_hub.jpg',
    alt: 'Learners working together in a community digital hub',
    tag: 'Permanent community asset',
    icon: University,
    title: 'Sponsor a Digital Hub',
    description: 'Help establish a sustainable community technology centre that serves learners of all ages year-round, long after the partnership begins.',
  },
  {
    image: '/images/partner_learners.jpg',
    alt: 'Students gathered after a community learning programme',
    tag: 'Direct learner sponsorship',
    icon: Users,
    title: 'Sponsor 100 Learners',
    description: 'Provide 100 young people with high-quality digital education, mentorship, and the tools they need to build real technical careers.',
  },
  {
    image: '/images/partner_devices.jpg',
    alt: 'Learners using computers in a community lab',
    tag: 'Immediate tangible impact',
    icon: Monitor,
    title: 'Donate Digital Devices',
    description: 'Donate laptops, tablets, smartphones, monitors, or accessories every device goes directly into the hands of a learner who needs it.',
  },
  {
    image: '/images/partner_teacher.jpg',
    alt: 'Teachers participating in a digital training session',
    tag: 'Force-multiplier effect',
    icon: GraduationCap,
    title: 'Support Teacher Training',
    description: 'Empower local educators with digital teaching skills. One trained teacher multiplies impact across hundreds of students every year.',
  },
];

const partnerTypes = [
  { icon: Building2, title: 'Corporate Organisations' },
  { icon: Cpu, title: 'Technology Companies' },
  { icon: University, title: 'Government Agencies' },
  { icon: Globe2, title: 'International NGOs' },
  { icon: Heart, title: 'Foundations' },
  { icon: School, title: 'Schools' },
  { icon: GraduationCap, title: 'Universities' },
  { icon: Lightbulb, title: 'Professional Associations' },
  { icon: Users, title: 'Community Organisations' },
  { icon: Handshake, title: 'Development Partners' },
];

const benefits = [
  { icon: Sparkles, title: 'Visible Social Impact', description: "Tangible, documented impact in rural Nigerian communities with your organisation's name attached." },
  { icon: Shield, title: 'CSR Alignment', description: 'Meets international CSR standards education, digital inclusion, gender equity, and SDG alignment.' },
  { icon: Users, title: 'Employee Volunteering', description: 'Structured volunteering opportunities that engage and energise your team with meaningful work.' },
  { icon: Medal, title: 'Brand Recognition', description: 'Co-branding on programmes, events, alumni communications, and our annual impact campaign.' },
  { icon: BarChart3, title: 'Impact Reports', description: 'Detailed, audited reports showing exactly where your investment went and what it produced.' },
  { icon: MapPin, title: 'Community Visibility', description: "Named hubs, named cohorts, and featured stories from the communities you've helped transform." },
  { icon: Lightbulb, title: 'Innovation Opportunities', description: 'First access to pilot new programmes, co-develop curricula, and shape the future of rural edtech.' },
  { icon: Handshake, title: 'Long-term Collaboration', description: 'We build real relationships with partners not transactional sponsorships that end at the cheque.' },
];

const journey = [
  { icon: MessageSquare, number: '01', title: 'Express Interest', description: 'Fill out our partnership inquiry form or send us an email. We respond within 48 hours.', color: '#04af9f' },
  { icon: CalendarDays, number: '02', title: 'Discovery Meeting', description: 'A conversation to understand your goals, resources, and how we can build something meaningful together.', color: '#bd7100' },
  { icon: Zap, number: '03', title: 'Co-create Partnership', description: 'We design a bespoke partnership model scope, investment, deliverables, and impact metrics.', color: '#04af9f' },
  { icon: Target, number: '04', title: 'Deliver Sustainable Impact', description: 'We execute, report transparently, and continuously improve. You see your impact in real time.', color: '#bd7100' },
];

const faqs = [
  { question: 'Who can partner with Whiz Academy?', answer: 'Companies, government agencies, foundations, NGOs, schools, universities, community organisations, professional associations, and individuals can partner with us.' },
  { question: 'Can individuals volunteer?', answer: 'Yes. Professionals and other skilled individuals can support through teaching, mentoring, curriculum development, research, and programme delivery.' },
  { question: 'Do you accept only financial sponsorship?', answer: 'No. We also welcome technology, equipment, connectivity, expertise, volunteer time, venues, and other resources that meet a programme need.' },
  { question: 'Can organisations sponsor specific programmes?', answer: 'Yes. Partners can support a specific programme, school, community, learner cohort, digital hub, or teacher-training initiative.' },
  { question: 'Do you work outside Kwara State?', answer: 'Our work began in Kwara State, and we welcome conversations about expanding effective digital education programmes into more Nigerian communities.' },
  { question: 'How are partnership funds used?', answer: 'Funding is directed to agreed programme delivery, learning resources, technology access, facilitator capacity, and transparent impact reporting.' },
  { question: 'Can we donate equipment instead of money?', answer: 'Yes. Laptops, tablets, smartphones, monitors, accessories, connectivity, and other appropriate equipment are welcome.' },
  { question: 'Can schools request partnerships?', answer: 'Yes. Schools can contact us to discuss digital literacy programmes, technology access, and teacher development.' },
];

function SectionTitle({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <Reveal className="text-center">
      <p className="inline-flex rounded-full border border-[#04af9f]/25 bg-[#04af9f]/[0.07] px-3 py-1.5 text-xs font-semibold text-[#00a99a]">{eyebrow}</p>
      <h2 className="mt-4 font-jakarta text-[32px] font-extrabold leading-tight tracking-[-0.8px] text-[#0d1117] dark:text-white sm:text-[40px]">{title}</h2>
      {description ? <p className="mx-auto mt-3 max-w-[660px] text-base leading-7 text-[#6b7280] dark:text-white/60">{description}</p> : null}
    </Reveal>
  );
}

export default function PartnerPage() {
  return (
    <main className="overflow-hidden bg-white pt-16 text-[#0d1117] transition-colors dark:bg-[#0d1117] dark:text-white">
      <section className="relative isolate min-h-[747px] overflow-hidden text-white">
        <Image src="/images/partner_hero.jpg" alt="Students and educators at a partner school in rural Nigeria" fill priority className="-z-20 object-cover" sizes="100vw" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(12,18,25,0.91)_0%,rgba(12,18,25,0.72)_52%,rgba(5,47,45,0.65)_100%)]" />
        <div className="mx-auto grid min-h-[747px] max-w-[1120px] items-center gap-12 px-6 py-16 lg:grid-cols-[1fr_506px]">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-[#04af9f]/35 bg-[#003d3a]/80 px-3 py-2 text-sm font-medium text-[#08c7b5] before:size-1 before:rounded-full before:bg-current">
              Partnership Opportunities
            </p>
            <h1 className="mt-7 max-w-[560px] font-jakarta text-[42px] font-extrabold leading-[1.12] tracking-[-1.3px] sm:text-[48px]">
              Partner with Whiz Academy to Bridge Nigeria&apos;s Digital Divide
            </h1>
            <p className="mt-6 max-w-[575px] text-[17px] leading-8 text-white/72">
              Whether you&apos;re a company, government agency, foundation, NGO, school, university, or individual your partnership can transform underserved communities through quality digital education, technology access, and lifelong opportunity.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-nowrap sm:items-center">
              <Button asChild className="h-13 w-full shrink-0 whitespace-nowrap rounded-xl bg-[#08b7a7] px-5 text-sm font-bold text-white hover:bg-[#079d90] active:bg-[#058b80] sm:w-auto">
                <Link href="#partner-form">Become a Partner <ArrowRight aria-hidden="true" /></Link>
              </Button>
              <Button asChild variant="outline" className="h-13 w-full shrink whitespace-nowrap rounded-xl border-white/25 bg-black/10 px-4 text-sm font-bold text-white hover:border-white/50 hover:bg-white/10 hover:text-white sm:w-auto">
                <Link href="/contact?subject=Partnership%20brochure"><Download aria-hidden="true" /> Download Partnership Brochure</Link>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={150} className="rounded-[28px] border border-white/15 bg-white/[0.10] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-md">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/65">Our reach so far</p>
            <dl className="mt-5 divide-y divide-white/10">
              {[
                ['Rural Communities Served', '1'],
    ['Learners Empowered', '500+'],
                ['Volunteers Engaged', '10+'],
                ['Schools Reached', '25+'],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between gap-5 py-5 first:pt-3 last:pb-2">
                  <dt className="text-sm text-white/70">{label}</dt>
                  <dd className="font-jakarta text-3xl font-extrabold text-[#08c7b5]">{value}</dd>
                </div>
              ))}
            </dl>
            <Button asChild className="mt-6 h-12 w-full rounded-xl bg-[#08b7a7] font-bold text-white hover:bg-[#079d90]">
              <Link href="#partner-form">Start a Conversation</Link>
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="px-6 py-24 sm:py-28">
        <div className="mx-auto grid max-w-[1095px] gap-14 lg:grid-cols-[1.02fr_1fr] lg:items-start">
          <Reveal>
            <p className="inline-flex rounded-full border border-[#04af9f]/25 bg-[#04af9f]/[0.07] px-3 py-1.5 text-xs font-semibold text-[#00a99a]">Why Partner With Us</p>
            <h2 className="mt-7 max-w-[520px] font-jakarta text-[36px] font-extrabold leading-[1.12] tracking-[-1px] text-[#0d1117] dark:text-white sm:text-[42px]">Sustainable impact is built through collaboration</h2>
            <div className="mt-7 max-w-[535px] space-y-5 text-base leading-7 text-[#6b7280] dark:text-white/60">
              <p>No single organisation can bridge Nigeria&apos;s digital divide alone. Whiz Academy was built on the belief that the most durable change happens when the right partners come together each bringing different resources, reach, and expertise.</p>
              <p>Our partnerships are co-created, not transactional. We work with you to design an engagement that aligns with your goals, fits your budget, and delivers impact you can genuinely be proud of backed by transparent reporting and real community relationships.</p>
              <p>When you partner with Whiz Academy, you&apos;re not buying a logo placement. You&apos;re joining a movement to make digital opportunity universal in rural Nigeria.</p>
            </div>
            <Button asChild variant="link" className="mt-7 h-auto p-0 text-base font-bold text-[#04af9f] hover:text-[#038d81]">
              <Link href="#partner-form">Let&apos;s build something together <ArrowRight aria-hidden="true" /></Link>
            </Button>
          </Reveal>
          <div className="space-y-4">
            {reasons.map((reason, index) => (
              <Reveal key={reason.title} delay={index * 55} className="group flex gap-5 rounded-2xl border border-[#dfe4e8] bg-[#f8fafb] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#04af9f]/45 hover:shadow-lg dark:border-white/10 dark:bg-[#141d20]">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#dff5f3] text-[#04af9f] transition-transform duration-300 group-hover:scale-105"><reason.icon aria-hidden="true" className="size-5" /></span>
                <div><h3 className="font-jakarta text-lg font-bold">{reason.title}</h3><p className="mt-1 text-sm leading-6 text-[#6b7280] dark:text-white/60">{reason.description}</p></div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f9fa] px-6 py-24 transition-colors dark:bg-[#101719] sm:py-28">
        <div className="mx-auto max-w-[1095px]">
          <SectionTitle eyebrow="Partnership Tracks" title="Find your partnership model" description="Six distinct tracks designed to match your organisation's goals, resources, and preferred style of engagement." />
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tracks.map((track, index) => (
              <Reveal key={track.title} delay={(index % 3) * 65} className="group flex min-h-[285px] flex-col rounded-2xl border border-[#dfe4e8] bg-[#f8fafb] p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-[#141d20]">
                <span className="flex size-12 items-center justify-center rounded-xl" style={{ color: track.color, backgroundColor: track.surface }}><track.icon aria-hidden="true" className="size-6" /></span>
                <h3 className="mt-7 font-jakarta text-lg font-bold">{track.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#6b7280] dark:text-white/60">{track.description}</p>
                <Button asChild variant="link" className="mt-auto h-auto justify-start p-0 pt-6 font-bold" style={{ color: track.color }}><Link href="#partner-form">Learn More <ArrowRight aria-hidden="true" /></Link></Button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="opportunities" className="scroll-mt-16 px-6 py-24 sm:py-28">
        <div className="mx-auto max-w-[1095px]">
          <SectionTitle eyebrow="Featured Opportunities" title="Choose your impact" description="Six flagship opportunities each one a concrete, meaningful way to change lives in rural Nigeria." />
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {opportunities.map((opportunity, index) => (
              <Reveal key={opportunity.title} delay={(index % 3) * 65} className="group flex overflow-hidden rounded-2xl border border-[#dfe4e8] bg-[#f8fafb] transition-all duration-300 hover:-translate-y-1 hover:border-[#04af9f]/45 hover:shadow-xl dark:border-white/10 dark:bg-[#141d20]">
                <div className="flex w-full flex-col">
                  <div className="relative h-44 overflow-hidden">
                    <Image src={opportunity.image} alt={opportunity.alt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
                    <span className="absolute bottom-3 left-4 rounded-full bg-[#04af9f] px-3 py-1 text-[11px] font-semibold text-white">{opportunity.tag}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-3"><span className="flex size-9 items-center justify-center rounded-full bg-[#dff5f3] text-[#04af9f]"><opportunity.icon aria-hidden="true" className="size-4" /></span><h3 className="font-jakarta text-lg font-bold">{opportunity.title}</h3></div>
                    <p className="mt-4 text-sm leading-6 text-[#6b7280] dark:text-white/60">{opportunity.description}</p>
                    <Button asChild className="mt-6 h-10 w-full rounded-xl bg-[#04af9f] text-sm font-bold text-white hover:bg-[#038f83]"><Link href="#partner-form">Partner With Us</Link></Button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f9fa] px-6 py-24 transition-colors dark:bg-[#101719] sm:py-28">
        <div className="mx-auto max-w-[1095px]">
          <SectionTitle eyebrow="Our Partners" title="Who we partner with" description="We welcome any organisation that shares our commitment to digital inclusion and community transformation." />
          <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-5">
            {partnerTypes.map((partner, index) => (
              <Reveal key={partner.title} delay={(index % 5) * 45} className="group flex min-h-28 flex-col items-center justify-center rounded-2xl border border-[#dfe4e8] bg-[#f8fafb] px-4 py-5 text-center transition-all hover:-translate-y-1 hover:border-[#04af9f]/45 dark:border-white/10 dark:bg-[#141d20]">
                <span className="flex size-10 items-center justify-center rounded-xl bg-[#dff5f3] text-[#04af9f] transition-transform group-hover:scale-105"><partner.icon aria-hidden="true" className="size-5" /></span>
                <h3 className="mt-3 text-xs font-bold leading-5">{partner.title}</h3>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 sm:py-28">
        <div className="mx-auto max-w-[1095px]">
          <SectionTitle eyebrow="Benefits" title="What partnership gives you" description="More than goodwill a partnership with Whiz Academy delivers structured, documented, and visible value." />
          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <Reveal key={benefit.title} delay={(index % 4) * 55} className="group min-h-[205px] rounded-2xl border border-[#dfe4e8] bg-[#f8fafb] p-7 transition-all hover:-translate-y-1 hover:border-[#04af9f]/45 hover:shadow-lg dark:border-white/10 dark:bg-[#141d20]">
                <span className="flex size-10 items-center justify-center rounded-xl bg-[#dff5f3] text-[#04af9f]"><benefit.icon aria-hidden="true" className="size-5" /></span>
                <h3 className="mt-5 font-jakarta text-sm font-bold">{benefit.title}</h3>
                <p className="mt-3 text-xs leading-5 text-[#6b7280] dark:text-white/60">{benefit.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f9fa] px-6 py-24 transition-colors dark:bg-[#101719] sm:py-28">
        <div className="mx-auto max-w-[1095px]">
          <SectionTitle eyebrow="How It Works" title="The partnership journey" />
          <div className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-5 before:absolute before:left-[12.5%] before:right-[12.5%] before:top-9 before:hidden before:h-px before:bg-[linear-gradient(90deg,#04af9f,#bd7100)] md:before:block">
            {journey.map((step, index) => (
              <Reveal key={step.number} delay={index * 70} className="relative text-center">
                <span className="relative mx-auto flex size-[72px] items-center justify-center rounded-full border-4 border-white text-white shadow-[0_7px_14px_rgba(0,0,0,0.18)] dark:border-[#101719]" style={{ backgroundColor: step.color }}><step.icon aria-hidden="true" className="size-7" /></span>
                <p className="mt-6 text-xs text-[#7c8493]">{step.number}</p>
                <h3 className="mt-2 font-jakarta text-lg font-bold">{step.title}</h3>
                <p className="mx-auto mt-3 max-w-[230px] text-sm leading-6 text-[#6b7280] dark:text-white/60">{step.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="partner-form" className="scroll-mt-16 px-6 py-24 sm:py-28">
        <div className="mx-auto max-w-[720px]">
          <SectionTitle eyebrow="Get Started" title="Become a Partner" description="Fill out the form below and our partnerships team will respond within 48 hours." />
          <div className="mt-12"><PartnershipForm /></div>
        </div>
      </section>

      <section className="bg-[#f7f9fa] px-6 py-24 transition-colors dark:bg-[#101719] sm:py-28">
        <div className="mx-auto max-w-[730px]">
          <h2 className="text-center font-jakarta text-3xl font-extrabold">Frequently asked questions</h2>
          <Accordion type="single" collapsible className="mt-12 space-y-3">
            {faqs.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question} className="rounded-2xl border border-[#dfe4e8] bg-[#f8fafb] px-6 transition-colors data-[state=open]:border-[#04af9f]/45 dark:border-white/10 dark:bg-[#141d20]">
                <AccordionTrigger className="py-6 text-left font-jakarta text-sm font-bold hover:text-[#04af9f] hover:no-underline">{faq.question}</AccordionTrigger>
                <AccordionContent className="pb-6 text-sm leading-6 text-[#6b7280] dark:text-white/60">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="relative isolate min-h-[510px] overflow-hidden px-6 py-24 text-center text-white">
        <Image src="/images/partner_collaboration.jpg" alt="People collaborating on digital learning" fill className="-z-20 object-cover" sizes="100vw" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(0,178,164,0.92)_0%,rgba(0,72,72,0.92)_58%,rgba(0,25,34,0.94)_100%)]" />
        <Reveal className="mx-auto max-w-[760px]">
          <h2 className="font-jakarta text-[38px] font-extrabold leading-[1.12] tracking-[-1px] sm:text-[46px]">Let&apos;s Build Digitally Empowered Communities Together</h2>
          <p className="mx-auto mt-6 max-w-[650px] text-lg leading-8 text-white/80">Every partnership creates opportunities for learners, teachers, and communities to thrive in today&apos;s digital world.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button asChild className="h-13 rounded-xl bg-white px-7 font-bold text-[#04af9f] hover:bg-white/90 hover:text-[#038f83]"><Link href="#partner-form">Become a Partner</Link></Button>
            <Button asChild variant="outline" className="h-13 rounded-xl border-white/40 bg-black/10 px-7 font-bold text-white hover:bg-white/10 hover:text-white"><Link href="/contact?subject=Partnership%20brochure"><Download aria-hidden="true" /> Download Brochure</Link></Button>
            <Button asChild variant="outline" className="h-13 rounded-xl border-white/40 bg-black/10 px-7 font-bold text-white hover:bg-white/10 hover:text-white"><Link href="/contact">Contact Partnerships Team</Link></Button>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
