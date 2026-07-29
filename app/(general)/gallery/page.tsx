import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Images, Sparkles, Users } from 'lucide-react';

import { PageHero } from '@/components/site/page-hero';
import { SectionHeading } from '@/components/site/section-heading';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/ui/reveal';

import GalleryExperience from './gallery-experience';

export const metadata: Metadata = {
  title: 'Gallery | Whiz Academy',
  description:
    'Explore photos from Whiz Academy programmes, learners, volunteers, and community events across Nigeria.',
};

const galleryHighlights = [
  {
    icon: Images,
    title: 'Real programme moments',
    description: 'Photos captured during our learning sessions and community activities.',
  },
  {
    icon: Users,
    title: 'People at the centre',
    description: 'Meet the learners, educators, volunteers, and partners moving the mission forward.',
  },
  {
    icon: Sparkles,
    title: 'One growing archive',
    description: 'The gallery updates as new moments are added to our shared programme album.',
  },
];

export default function GalleryPage() {
  return (
    <main className="overflow-hidden bg-white pt-16 text-[#0d1117] transition-colors duration-300 dark:bg-[#0d1117] dark:text-white">
      <PageHero
        eyebrow="Whiz Academy Gallery"
        title={
          <>
            Moments from <span className="text-[#43d8ca]">the movement</span>
          </>
        }
        description="Step inside our programmes and see the curiosity, collaboration, and community behind every Whiz Academy experience."
        imageSrc="/images/ProjectHero.png"
        imageAlt="Whiz Academy learners and educators gathered outside a school"
        imageClassName="opacity-35"
        className="bg-[linear-gradient(145deg,#071311_0%,#102b27_100%)]"
      />

      <section className="border-b border-black/[0.07] bg-[#f8fafb] py-12 transition-colors duration-300 dark:border-white/10 dark:bg-[#11181b] sm:py-14">
        <div className="mx-auto grid max-w-[1120px] gap-5 px-6 md:grid-cols-3">
          {galleryHighlights.map((highlight, index) => (
            <Reveal key={highlight.title} delay={index * 80}>
              <article className="group flex h-full gap-4 rounded-2xl border border-black/[0.07] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#04af9f]/30 hover:shadow-[0_14px_34px_rgba(13,17,23,0.07)] dark:border-white/10 dark:bg-[#141d20] dark:hover:border-[#04af9f]/40">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#04af9f]/10 text-[#04af9f] transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105">
                  <highlight.icon aria-hidden="true" className="size-5" />
                </span>
                <div>
                  <h2 className="font-jakarta text-sm font-extrabold">{highlight.title}</h2>
                  <p className="mt-1.5 text-xs leading-5 text-[#6b7280] dark:text-white/55">
                    {highlight.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-[1120px] px-6">
          <SectionHeading
            eyebrow="Our Community in Pictures"
            title="Every frame tells part of the story"
            description="Browse highlights from the same Google Drive album used by our earlier programme gallery—now in a faster, dedicated experience."
          />
          <div className="mt-12">
            <GalleryExperience />
          </div>
        </div>
      </section>

      <section className="bg-[#073d38] py-16 text-center text-white sm:py-20">
        <Reveal className="mx-auto max-w-[760px] px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#43d8ca]">
            Be part of the next chapter
          </p>
          <h2 className="mt-4 font-jakarta text-3xl font-extrabold sm:text-4xl">
            Help us create more moments like these
          </h2>
          <p className="mx-auto mt-4 max-w-[620px] text-base leading-7 text-white/65">
            Your support helps more learners and communities access practical digital education.
          </p>
          <Button
            asChild
            className="mt-8 h-12 rounded-xl bg-[#04af9f] px-6 font-bold text-white shadow-none hover:bg-[#05c4b2] hover:text-white active:bg-[#039b8d]"
          >
            <Link href="/donate">
              Support our programmes
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </Button>
        </Reveal>
      </section>
    </main>
  );
}
