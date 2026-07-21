import type { ReactNode } from 'react';

import { PageHero } from '@/components/site/page-hero';
import { Reveal } from '@/components/ui/reveal';

interface LegalSection {
  title: string;
  content: ReactNode;
}

interface LegalPageProps {
  eyebrow: string;
  title: string;
  description: string;
  updated: string;
  sections: LegalSection[];
}

export function LegalPage({ eyebrow, title, description, updated, sections }: LegalPageProps) {
  return (
    <main className="bg-white transition-colors dark:bg-[#0d1117]">
      <PageHero compact eyebrow={eyebrow} title={title} description={description} />
      <section className="px-6 py-16 sm:py-24">
        <Reveal className="mx-auto max-w-[820px]">
          <p className="border-b border-black/[0.08] pb-6 text-sm text-[#6b7280] dark:border-white/10 dark:text-white/50">
            Last updated: {updated}
          </p>
          <div className="mt-9 space-y-10">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="font-jakarta text-xl font-extrabold text-[#0d1117] dark:text-white sm:text-2xl">{section.title}</h2>
                <div className="mt-3 space-y-3 text-sm leading-7 text-[#5f6875] dark:text-white/60 sm:text-base">
                  {section.content}
                </div>
              </section>
            ))}
          </div>
        </Reveal>
      </section>
    </main>
  );
}
