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
      content: 'Whiz Academy is a social enterprise that provides digital literacy through enlightenment, education and empowerment to rural communities',
    },
    {
      title: 'Why is Whiz Academy?',
      content: 'Whiz Academy is a social enterprise that provides digital literacy through enlightenment, education and empowerment to rural communities',
    },
    {
      title: 'Where is Whiz Academy?',
      content: 'Whiz Academy is a social enterprise that provides digital literacy through enlightenment, education and empowerment to rural communities',
    },
    {
      title: 'Who is Whiz Academy?',
      content: 'Whiz Academy is a social enterprise that provides digital literacy through enlightenment, education and empowerment to rural communities',
    },
  ];
  return (
    <div className="bg-[url('/images/FaqImage.png')] bg-cover bg-center bg-no-repeat min-h-[977px]" id="faqs">
      <div className="h-full min-h-[977px] w-full bg-secondary/80 flex justify-center items-center">
        <div className="w-[90%] h-[90%] bg-white/80 flex flex-col items-center py-12 px-4">
          <h2 className="text-4xl sm:text-5xl font-medium">FAQs</h2>
          <p className="text-center mt-4 mb-10">Find answers to common questions about Whiz Academy, getting involved and the sponsorship process.</p>
          <Accordion type="single" collapsible className="w-full max-w-[790px] space-y-6">
            {list.map((item) => (
              <AccordionItem 
                value={item.title} 
                key={item.title}
                className="w-full border-t border-b border-black/50 py-4 px-12"
              >
                <AccordionTrigger className="hover:no-underline">{item.title}</AccordionTrigger>
                <AccordionContent>
                  {item.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <p className="text-center text-lg font-medium mt-10">Still have questions?</p>
          <p className="text-center mt-2">Contact us for more information or assistance.</p>
          <Link 
            href="/contact" 
            className="mt-5 bg-primary text-base py-2 px-3 rounded-lg text-white font-bold w-fit h-fit"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}