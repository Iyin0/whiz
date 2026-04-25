import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GetInvolved from '@/components/layout/get-involved';
import Ongoing from './ongoing';
import InDevelopment from './in-development';

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
      <div className="bg-cover bg-center bg-[url('/images/ProjectHero.png')] h-[500px]">
        <div className="h-full w-full flex justify-center items-end pb-28 inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(4,_175,_159,_0.3),_rgba(0,_0,_0,_1))]">
          <h1 className="text-white text-4xl font-bold">Projects</h1>
        </div>
      </div>
      <Tabs defaultValue="Ongoing" className="w-full px-4 sm:px-12 py-16">
        <div className="flex justify-center items-center">
          <TabsList className="bg-white rounded-none gap-x-7">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.label}
                value={tab.label}
                className="rounded-none px-0 text-lg text-black/20 font-normal data-[state=active]:shadow-none data-[state=active]:text-black data-[state=active]:border-b data-[state=active]:border-black"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        {tabs.map((tab) => (
          <TabsContent key={tab.label} value={tab.label} className="mt-12">
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
      <GetInvolved />
    </div>
  );
}