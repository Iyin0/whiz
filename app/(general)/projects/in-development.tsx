import { ArrowRight, Laptop, UsersRound } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function InDevelopment() {
  return (
    <div className="grid min-h-[360px] gap-6 rounded-lg border bg-white p-6 shadow-sm sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      <div>
        <p className="text-sm font-semibold uppercase text-accent">In development</p>
        <h2 className="mt-3 text-3xl font-bold text-foreground">New community learning tracks are being prepared.</h2>
        <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
          Whiz Academy is planning additional programs for youths, adults, and community members
          who need practical digital support designed around local realities.
        </p>
        <Button asChild className="mt-7 h-11 rounded-md bg-primary px-5 text-sm font-semibold text-white hover:bg-primary/90">
          <Link href="/partner#partner-form">
            Discuss a program partnership
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          {
            title: 'Community digital basics',
            description: 'Introductory sessions for adults and first-time technology users.',
            icon: Laptop,
          },
          {
            title: 'Youth skills cohorts',
            description: 'Practical learning tracks that help young people build confidence close to home.',
            icon: UsersRound,
          },
        ].map((item) => (
          <div key={item.title} className="border-l-2 border-primary/20 pl-5">
            <item.icon className="h-6 w-6 text-primary" />
            <h3 className="mt-4 font-semibold text-foreground">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
