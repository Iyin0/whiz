import { contacts } from '@/lib/constants';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import ContactForm from './contact-form';
import VolunteerForm from './volunteer-form';
import DonationForm from './donation-form';
import PartnershipForm from './partnership-form';
import SponsorshipForm from './sponsorship-form';

export default function Contact() {
  const forms = [
    {
      title: 'Volunteering',
      form: <VolunteerForm />,
    },
    {
      title: 'Sponsorship',
      form: <SponsorshipForm />,
    },
    {
      title: 'Partnership',
      form: <PartnershipForm />,
    },
    {
      title: 'Donation',
      form: <DonationForm />,
    },
  ];

  return (
    <div>
      <div className="bg-cover bg-center bg-[url('/images/ContactHero.png')] h-[688px]">
        <div className="h-full w-full flex flex-col items-center justify-end gap-24 pb-20 inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(4,_175,_159,_0.3),_rgba(0,_0,_0,_1))]">
          <h1 className="text-white text-4xl font-bold text-center">Contact</h1>
          <div className="flex flex-col sm:flex-row justify-around gap-4 w-full">
            {contacts.map((contact, index) => (
              <div key={index} className="flex flex-col items-center gap-2 text-white grow sm:max-w-[372px]">
                <contact.icon className="w-7 h-7" />
                <div className="flex flex-col">
                  {contact.value.map((value, index) => (
                    <p key={index} className="text-base text-center">{value}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Accordion type="single" collapsible>
        {forms.map((form, index) => (
          <AccordionItem key={index} value={form.title} className="border-black">
            <AccordionTrigger
             className="hover:no-underline px-4 py-7 sm:px-20 text-2xl font-normal"
            >
              {form.title}
            </AccordionTrigger>
            <AccordionContent>{form.form}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <ContactForm />
    </div>
  );
}