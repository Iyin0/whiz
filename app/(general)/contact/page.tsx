'use client';

import { contacts } from '@/lib/constants';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useCallback, useEffect, useState } from 'react';
import ContactForm from './contact-form';
import VolunteerForm from './volunteer-form';
import DonationForm from './donation-form';
import PartnershipForm from './partnership-form';
import SponsorshipForm from './sponsorship-form';

const formHashToValue: Record<string, string> = {
  volunteer: 'Volunteer',
  sponsorship: 'Sponsorship',
  partnership: 'Partnership',
  donate: 'Donation',
};

export default function Contact() {
  const [openForm, setOpenForm] = useState('Volunteer');

  const openFormFromHash = useCallback(() => {
    const hash = window.location.hash.replace('#', '');
    const nextForm = formHashToValue[hash];

    if (!nextForm) {
      return;
    }

    setOpenForm(nextForm);

    window.setTimeout(() => {
      const target = document.getElementById(hash);
      const trigger = target?.querySelector<HTMLButtonElement>('button');

      target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      trigger?.focus({ preventScroll: true });
    }, 120);
  }, []);

  useEffect(() => {
    openFormFromHash();
    window.addEventListener('hashchange', openFormFromHash);

    return () => {
      window.removeEventListener('hashchange', openFormFromHash);
    };
  }, [openFormFromHash]);

  const forms = [
    {
      id: 'volunteer',
      title: 'Volunteer',
      description: 'Offer time, skills, or mentorship alongside local facilitators.',
      form: <VolunteerForm />,
    },
    {
      id: 'sponsorship',
      title: 'Sponsorship',
      description: 'Underwrite equipment, learning materials, logistics, or a full cohort.',
      form: <SponsorshipForm />,
    },
    {
      id: 'partnership',
      title: 'Partnership',
      description: 'Collaborate with Whiz Academy through institutions and community networks.',
      form: <PartnershipForm />,
    },
    {
      id: 'donate',
      title: 'Donation',
      description: 'Give funds, devices, materials, or useful resources communities can keep using.',
      form: <DonationForm />,
    },
  ];

  return (
    <div>
      <section className="relative min-h-[100svh] overflow-hidden bg-[url('/images/ContactHero.png')] bg-cover bg-center">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,31,28,0.94)_0%,rgba(9,31,28,0.76)_52%,rgba(9,31,28,0.26)_100%)]" />
        <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-4 py-28 text-white sm:px-8 lg:px-10">
          <p className="text-sm font-semibold uppercase text-secondary">Contact</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold sm:text-6xl">Build with a community-led foundation initiative.</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/75">
            Reach out to volunteer, sponsor, partner, donate, or ask a question about
            expanding practical digital literacy through local leadership.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {contacts.map((contact) => (
              <div key={contact.label} className="rounded-lg border border-white/[0.14] bg-white/10 p-5 backdrop-blur">
                <contact.icon className="h-6 w-6 text-secondary" />
                <h2 className="mt-4 text-sm font-semibold uppercase text-white/60">{contact.label}</h2>
                <div className="mt-2 space-y-1">
                  {contact.value.map((value) => (
                    <p key={value} className="text-sm leading-6 text-white/85">{value}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background px-4 py-14 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 max-w-2xl">
            <p className="text-sm font-semibold uppercase text-accent">Ways to help</p>
            <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">Choose how you want to stand with the work.</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Each form sends your request directly to the Whiz Academy team so we can follow up
              with the right next steps for your support, institution, or community.
            </p>
          </div>
          <Accordion
            type="single"
            collapsible
            value={openForm}
            onValueChange={(value) => {
              setOpenForm(value);
            }}
            className="space-y-4"
          >
            {forms.map((form) => (
              <AccordionItem
                key={form.id}
                value={form.title}
                id={form.id}
                className="scroll-mt-28 rounded-lg border bg-white px-5 shadow-sm"
              >
                <AccordionTrigger className="py-5 text-left hover:no-underline">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{form.title}</h3>
                    <p className="mt-1 text-sm font-normal text-muted-foreground">{form.description}</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent>{form.form}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
      <ContactForm />
    </div>
  );
}
