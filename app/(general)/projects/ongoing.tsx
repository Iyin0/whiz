import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Overview from './overview';
import Gallery from './gallery';
import { CalendarDays, MapPin, Users } from 'lucide-react';


export default function Ongoing() {

  const tabs = [
    {
      label: 'Overview',
      content: <Overview />,
    },
    {
      label: 'Gallery',
      content: <Gallery />,
    },
  ];

  const facts = [
    { label: 'Location', value: 'Offa, Kwara State', icon: MapPin },
    { label: 'Reach', value: '500+ students', icon: Users },
    { label: 'Started', value: '2021', icon: CalendarDays },
  ];

  return (
    <article className="overflow-hidden rounded-lg border bg-white shadow-sm">
      <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
        <Image
          src="/images/ongoing/ProjectHero2.png"
          alt="Offa Digital Literacy Program workshop"
          width={1000}
          height={540}
          className="h-full min-h-[300px] w-full object-cover"
          loading="lazy"
        />
        <div className="flex flex-col justify-center p-6 sm:p-10">
          <p className="text-sm font-semibold uppercase text-accent">Flagship project</p>
          <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
            ODLP - Offa Digital Literacy Program
          </h2>
          <p className="mt-5 text-base leading-7 text-muted-foreground">
            A community-led program helping students and residents in Offa build
            practical digital skills, technology awareness, and confidence for future opportunities.
          </p>
          <dl className="mt-6 grid gap-5 border-y border-border py-5 sm:grid-cols-3">
            {facts.map((fact) => (
              <div key={fact.label}>
                <fact.icon className="h-5 w-5 text-primary" />
                <dt className="mt-3 text-xs font-semibold uppercase text-muted-foreground">{fact.label}</dt>
                <dd className="mt-1 text-sm font-semibold text-foreground">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <Tabs defaultValue="Overview" className="w-full border-t px-4 py-8 sm:px-8 sm:py-10">
        <TabsList className="h-auto rounded-lg border bg-background p-1">
          {tabs.map((tab) => (
            <TabsTrigger 
              key={tab.label} 
              value={tab.label}
              className="rounded-md px-5 py-2.5 text-sm font-semibold text-muted-foreground data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab.label} value={tab.label} className="mt-8">
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </article>
  );
}
