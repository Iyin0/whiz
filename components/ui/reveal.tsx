'use client';

import { type ReactNode, useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

type RevealDirection = 'up' | 'left' | 'right' | 'scale';

const hiddenTransforms: Record<RevealDirection, string> = {
  up: 'translate-y-7',
  left: '-translate-x-8',
  right: 'translate-x-8',
  scale: 'scale-[0.97]',
};

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: RevealDirection;
}

export function Reveal({
  children,
  className,
  delay = 0,
  direction = 'up',
}: RevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setIsVisible(true);
        observer.unobserve(element);
      },
      { rootMargin: '0px 0px -64px', threshold: 0.14 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={elementRef}
      className={cn(
        'transition-[opacity,transform] duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:transition-none',
        isVisible
          ? 'translate-x-0 translate-y-0 scale-100 opacity-100'
          : cn('opacity-0 will-change-[opacity,transform]', hiddenTransforms[direction]),
        className,
      )}
      style={{ transitionDelay: isVisible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  );
}
