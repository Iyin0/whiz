import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GetInvolved from '@/components/layout/get-involved';
import Ongoing from './ongoing';
import InDevelopment from './in-development';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Projects() {

  const tabs = [
    {
      label: 'Ongoing',
      content: <Ongoing />,
    },
    {
      label: 'In Development',
      content: <InDevelopment />,
    },
  ];

  return (
    <div>
      <section className="relative min-h-[100svh] overflow-hidden bg-[url('/images/ProjectHero.png')] bg-cover bg-center">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,31,28,0.94)_0%,rgba(9,31,28,0.78)_48%,rgba(9,31,28,0.26)_100%)]" />
        <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-4 py-28 text-white sm:px-8 lg:px-10">
          <p className="text-sm font-semibold uppercase text-secondary">Programs</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold sm:text-6xl">
            Flagship programs shaped with local communities.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/75">
            Explore the Offa Digital Literacy Program and the next community-led learning
            tracks being prepared for rural African learners.
          </p>
          <Button asChild className="mt-8 h-12 w-fit rounded-md bg-secondary px-6 text-secondary-foreground hover:bg-secondary/90">
            <Link href="/partner#partner-form">
              Partner on a program
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="bg-background px-4 py-14 sm:px-8 sm:py-20 lg:px-10">
        <Tabs defaultValue="Ongoing" className="mx-auto w-full max-w-7xl">
        <div className="flex justify-start">
          <TabsList className="h-auto rounded-lg border bg-white p-1 shadow-sm">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.label}
                value={tab.label}
                className="rounded-md px-5 py-2.5 text-sm font-semibold text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-none"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        {tabs.map((tab) => (
          <TabsContent key={tab.label} value={tab.label} className="mt-8">
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
      </section>
      <GetInvolved />
    </div>
  );
}
