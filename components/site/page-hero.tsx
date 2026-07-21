import type { ReactNode } from 'react';

import { Reveal } from '@/components/ui/reveal';
import { cn } from '@/lib/utils';

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  description: string;
  actions?: ReactNode;
  className?: string;
  compact?: boolean;
}

export function PageHero({
  eyebrow,
  title,
  description,
  actions,
  className,
  compact = false,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        'relative isolate flex items-center overflow-hidden bg-[linear-gradient(152deg,#0d1117_0%,#0d2320_100%)] text-white',
        compact ? 'min-h-[476px] py-20' : 'min-h-[592px] py-24 sm:py-28',
        className,
      )}
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-40 [background-image:radial-gradient(circle_at_18%_20%,rgba(4,175,159,0.2),transparent_34%),radial-gradient(circle_at_84%_78%,rgba(168,100,15,0.16),transparent_30%)]" />
      <Reveal className="mx-auto w-full max-w-[896px] px-6 text-center">
        <p className="inline-flex rounded-full border border-[#04af9f]/25 bg-[#04af9f]/[0.13] px-[13px] py-[7px] text-xs font-semibold leading-4 text-[#04af9f]">
          {eyebrow}
        </p>
        <h1 className="mx-auto mt-4 max-w-[880px] font-jakarta text-4xl font-extrabold leading-[1.08] tracking-[-0.9px] sm:text-5xl sm:tracking-[-1.2px] lg:text-[60px] lg:leading-[1.18] lg:tracking-[-1.5px]">
          {title}
        </h1>
        <p className="mx-auto mt-6 max-w-[672px] text-base leading-7 text-white/70 sm:text-xl sm:leading-8">
          {description}
        </p>
        {actions ? <div className="mt-9 flex flex-wrap items-center justify-center gap-4">{actions}</div> : null}
      </Reveal>
    </section>
  );
}
