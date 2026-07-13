import { cn } from '@/lib/utils';
import { Gift, HandHeart, Handshake, Users } from 'lucide-react';
import Link from 'next/link';

export default function GetInvolved() {
  const list = [
    {
      title: 'Volunteer',
      description: 'Offer time, mentorship, and practical support alongside local facilitators.',
      route: '/contact#volunteer',
      icon: Users,
    },
    {
      title: 'Sponsorship',
      description: 'Underwrite cohorts, devices, materials, and workshop logistics.',
      route: '/contact#sponsorship',
      icon: HandHeart,
    },
    {
      title: 'Partnership',
      description: 'Build with us through schools, institutions, and community networks.',
      route: '/contact#partnership',
      icon: Handshake,
    },
    {
      title: 'Donations',
      description: 'Contribute funds, equipment, or learning resources with lasting use.',
      route: '/contact#donate',
      icon: Gift,
    }
  ];
  return (
    <section className="bg-white px-4 py-16 sm:px-8 sm:py-24 lg:px-10">
      <div className="mx-auto max-w-7xl">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <p className="text-sm font-semibold uppercase text-accent">Get involved</p>
          <h2 className="mt-3 max-w-xl text-3xl font-bold text-foreground sm:text-4xl">
            Invest in community-led digital futures.
          </h2>
        </div>
        <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
          Support a model that respects local leadership and equips rural learners with
          practical skills, confidence, and access. Every route below helps communities carry
          the work forward.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((item, index) => (
          <Link
            href={item.route}
            key={item.title}
            className={cn(
              'group rounded-lg border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md',
              index % 2 === 0 ? 'border-primary/20' : 'border-secondary/25'
            )}
          >
            <div className={cn(
              'flex h-11 w-11 items-center justify-center rounded-md',
              index % 2 === 0 ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'
            )}>
              <item.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-5 text-lg font-semibold text-foreground">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
            <p className="mt-5 text-sm font-semibold text-primary transition group-hover:translate-x-1">
              Begin here
            </p>
          </Link>
        ))}
      </div>
      </div>
    </section>
  );
}
