import type { ReactNode } from 'react';

import { Reveal } from '@/components/ui/reveal';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: SectionHeadingProps) {
  return (
    <Reveal className={cn(align === 'center' ? 'text-center' : 'text-left', className)}>
      {eyebrow ? (
        <p className="inline-flex rounded-full border border-[#04af9f]/20 bg-[#04af9f]/[0.07] px-[13px] py-[7px] text-xs font-semibold leading-4 text-[#04af9f]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className={cn('font-jakarta text-3xl font-extrabold leading-tight tracking-[-0.7px] text-[#0d1117] dark:text-white sm:text-4xl sm:tracking-[-0.9px]', eyebrow && 'mt-4')}>
        {title}
      </h2>
      {description ? (
        <p className={cn('mt-4 text-base leading-7 text-[#6b7280] dark:text-white/60 sm:text-lg', align === 'center' && 'mx-auto max-w-[672px]')}>
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
