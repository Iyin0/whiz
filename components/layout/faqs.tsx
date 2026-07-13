import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Link from 'next/link';

export default function Faqs() {
  const list = [
    {
      title: 'What is Whiz Academy?',
      content: 'Whiz Academy is a community-led digital literacy initiative focused on practical technology education for rural African communities.',
    },
    {
      title: 'What makes the model community-led?',
      content: 'Programs are shaped around local schools, community needs, and facilitators who understand the learners, culture, and long-term context.',
    },
    {
      title: 'Where are the workshops currently focused?',
      content: 'The Offa Digital Literacy Program currently focuses on Offa, Kwara State, with a broader ambition to support more rural communities across Nigeria and beyond.',
    },
    {
      title: 'How can I support Whiz Academy?',
      content: 'You can volunteer, sponsor a cohort, partner through an institution, or donate funds, devices, and learning resources that communities can keep using.',
    },
  ];
  return (
    <section className="bg-white px-4 py-16 sm:px-8 sm:py-24 lg:px-10" id="faqs">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <p className="text-sm font-semibold uppercase text-accent">FAQs</p>
          <h2 className="mt-3 max-w-lg text-3xl font-bold text-foreground sm:text-4xl">
            Clarity for thoughtful partners.
          </h2>
          <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground">
            Find answers about the Whiz Academy model, current program focus, and the ways
            individuals, families, and institutions can support community-owned digital access.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex h-11 items-center justify-center rounded-md bg-primary px-5 text-sm font-semibold text-white transition hover:bg-primary/90"
          >
            Contact Us
          </Link>
        </div>
        <div className="rounded-lg border bg-background p-3 shadow-sm sm:p-5">
          <Accordion type="single" collapsible className="w-full">
            {list.map((item) => (
              <AccordionItem 
                value={item.title} 
                key={item.title}
                className="border-b border-border px-3 last:border-0 sm:px-5"
              >
                <AccordionTrigger className="py-5 text-left text-base font-semibold hover:no-underline">
                  {item.title}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-6 text-muted-foreground">
                  {item.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
