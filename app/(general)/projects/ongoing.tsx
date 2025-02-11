import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Overview from './overview';
import Gallery from './gallery';


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

  return (
    <div>
      <Image
        src="/images/ongoing/ProjectHero2.png"
        alt="Project 1"
        width={1000}
        height={250}
        className="w-full min-h-[250px] object-cover"
        loading="lazy"
      />
      <h2 className="text-lg text-center mt-8 mb-10">
        <span className="text-xl font-semibold">ODLP</span> - Offa Digital
        Literacy Program
      </h2>
      <Separator className="" />
      <Tabs defaultValue="Overview" className="w-full py-10 px-5 sm:px-8">
        <TabsList className="bg-white rounded-none gap-x-7 p-0">
          {tabs.map((tab) => (
            <TabsTrigger 
              key={tab.label} 
              value={tab.label}
              className="rounded-none px-0 text-black/20 text-lg font-normal data-[state=active]:shadow-none data-[state=active]:text-black data-[state=active]:border-b data-[state=active]:border-black"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab.label} value={tab.label}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
