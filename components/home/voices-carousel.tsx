'use client';

import {
  type FocusEvent as ReactFocusEvent,
  type PointerEvent as ReactPointerEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Star } from 'lucide-react';

import { Reveal } from '@/components/ui/reveal';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const voices = [
  {
    initials: 'BA',
    name: 'Babatunde Akinwale',
    role: 'ODLP 2.0 Trainee • Offa, Kwara State',
    quote:
      'Overall, ODLP has been a very impactful and beneficial program for me, and I am grateful for the opportunity to be part of it. It has helped shape my interest in becoming a computer enthusiast and encouraged me to continue learning more about technology.',
  },
  {
    initials: 'BA',
    name: 'Blessing Adeyemi',
    role: 'ODLP 3.0 & 4.0 Trainee • Offa, Kwara State',
    quote:
      'Over the past two years in the ODLP program, I have gained valuable knowledge and practical computer skills. I learned how to use some computer application packages. These skills have greatly improved my confidence in using computers and have made me more interested in technology.',
  },
  {
    initials: 'AM',
    name: 'Aisha Mariam',
    role: 'ODLP 4.0 Trainee • Offa, Kwara State',
    quote:
      'The program has been very helpful in developing my digital skills and exposing me to tools that are useful for education and future career opportunities. Attending the program twice has also allowed me to practice more and understand the applications better.',
  },
];

const SWIPE_THRESHOLD = 48;
const INITIAL_AUTO_ADVANCE_DELAY = 2800;
const AUTO_ADVANCE_DELAY = 6000;

export default function VoicesCarousel() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [direction, setDirection] = useState<'next' | 'previous'>('next');
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocusedWithin, setIsFocusedWithin] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const pointerStartY = useRef<number | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const hasCompletedFirstAdvance = useRef(false);

  const canAutoAdvance =
    isInViewport &&
    isDocumentVisible &&
    !prefersReducedMotion &&
    !isHovered &&
    !isFocusedWithin &&
    !isDragging;

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => setPrefersReducedMotion(mediaQuery.matches);
    const updateDocumentVisibility = () => setIsDocumentVisible(!document.hidden);

    updateMotionPreference();
    updateDocumentVisibility();
    mediaQuery.addEventListener('change', updateMotionPreference);
    document.addEventListener('visibilitychange', updateDocumentVisibility);

    return () => {
      mediaQuery.removeEventListener('change', updateMotionPreference);
      document.removeEventListener('visibilitychange', updateDocumentVisibility);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInViewport(entry.isIntersecting),
      { threshold: 0.35 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!canAutoAdvance) return;

    const timeout = window.setTimeout(() => {
      hasCompletedFirstAdvance.current = true;
      setDirection('next');
      setActiveIndex((currentIndex) => (currentIndex + 1) % voices.length);
    }, hasCompletedFirstAdvance.current ? AUTO_ADVANCE_DELAY : INITIAL_AUTO_ADVANCE_DELAY);

    return () => window.clearTimeout(timeout);
  }, [activeIndex, canAutoAdvance]);

  const showSlide = (index: number, nextDirection: 'next' | 'previous') => {
    hasCompletedFirstAdvance.current = true;
    setDirection(nextDirection);
    setActiveIndex((index + voices.length) % voices.length);
  };

  const showNext = () => showSlide(activeIndex + 1, 'next');
  const showPrevious = () => showSlide(activeIndex - 1, 'previous');

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;

    pointerStartY.current = event.clientY;
    setIsDragging(true);

    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // Pointer capture can be unavailable for synthetic accessibility events.
    }
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (pointerStartY.current === null) return;

    const distance = event.clientY - pointerStartY.current;
    setDragOffset(Math.max(-64, Math.min(64, distance * 0.35)));
  };

  const finishPointerGesture = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (pointerStartY.current === null) return;

    const distance = event.clientY - pointerStartY.current;

    pointerStartY.current = null;
    setDragOffset(0);
    setIsDragging(false);

    if (distance <= -SWIPE_THRESHOLD) showNext();
    if (distance >= SWIPE_THRESHOLD) showPrevious();
  };

  const cancelPointerGesture = () => {
    pointerStartY.current = null;
    setDragOffset(0);
    setIsDragging(false);
  };

  const handleBlurCapture = (event: ReactFocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsFocusedWithin(false);
    }
  };

  const activeVoice = voices[activeIndex];

  return (
    <section
      ref={sectionRef}
      onFocusCapture={() => setIsFocusedWithin(true)}
      onBlurCapture={handleBlurCapture}
      className="bg-[linear-gradient(149deg,#0d1117_0%,#0d2320_100%)] py-20 text-white sm:py-24"
    >
      <div className="mx-auto max-w-[1280px] px-6">
        <Reveal className="text-center">
          <p className="inline-flex rounded-full border border-[#04af9f]/25 bg-[#04af9f]/[0.13] px-[13px] py-[7px] text-xs font-semibold leading-4 text-[#04af9f]">
            Stories of Change
          </p>
          <h2 className="mt-4 font-jakarta text-4xl font-extrabold leading-tight tracking-[-0.9px] sm:text-5xl sm:leading-[48px] sm:tracking-[-1.2px]">
            Voices from the community
          </h2>
        </Reveal>

        <Reveal delay={100} className="mx-auto mt-12 max-w-[768px] sm:mt-16">
          <p id="voices-instructions" className="sr-only">
            Stories advance automatically. Swipe up for the next story, swipe down for the previous story, or use the navigation buttons. Automatic rotation pauses while the carousel is focused.
          </p>

          <div
            role="group"
            aria-roledescription="carousel"
            aria-label="Community stories"
            aria-describedby="voices-instructions"
            tabIndex={0}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onKeyDown={(event) => {
              if (event.key === 'ArrowUp' || event.key === 'ArrowRight') {
                event.preventDefault();
                showNext();
              }

              if (event.key === 'ArrowDown' || event.key === 'ArrowLeft') {
                event.preventDefault();
                showPrevious();
              }
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={finishPointerGesture}
            onPointerCancel={cancelPointerGesture}
            className={cn(
              'touch-pan-x select-none rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#04af9f]/60 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0d1716]',
              isDragging ? 'cursor-grabbing' : 'cursor-grab',
            )}
            style={{
              transform: `translateY(${dragOffset}px)`,
              transition: isDragging ? 'none' : 'transform 220ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            <figure
              key={activeIndex}
              aria-live={canAutoAdvance ? 'off' : 'polite'}
              className={cn(
                'flex min-h-[360px] flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/[0.04] p-7 text-center transition-[border-color,background-color,box-shadow] duration-300 hover:border-[#04af9f]/30 hover:bg-white/[0.06] hover:shadow-[0_18px_50px_rgba(0,0,0,0.18)] motion-reduce:animate-none sm:min-h-[270px] sm:p-10',
                direction === 'next' ? 'animate-voice-in-up' : 'animate-voice-in-down',
              )}
            >
              <div className="flex justify-center gap-1" aria-label="Five out of five stars">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    aria-hidden="true"
                    className="size-4 fill-[#a8640f] text-[#a8640f]"
                  />
                ))}
              </div>

              <blockquote className="mx-auto mt-6 max-w-[686px] text-lg italic leading-8 text-white/90 sm:text-xl sm:leading-[32.5px]">
                “{activeVoice.quote}”
              </blockquote>

              <figcaption className="mt-8 flex items-center justify-center gap-3 text-left">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#04af9f] text-sm font-bold text-white">
                  {activeVoice.initials}
                </span>
                <span>
                  <span className="block text-base font-semibold leading-6 text-white">
                    {activeVoice.name}
                  </span>
                  <span className="block text-xs leading-4 text-white/50">
                    {activeVoice.role}
                  </span>
                </span>
              </figcaption>
            </figure>
          </div>

          <div className="mt-6 flex justify-center gap-1" aria-label="Choose a community story">
            {voices.map((voice, index) => (
              <Button
                key={voice.name}
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => showSlide(index, index > activeIndex ? 'next' : 'previous')}
                aria-label={`Show ${voice.name}'s story`}
                aria-current={index === activeIndex ? 'true' : undefined}
                className="group size-8 rounded-full p-0 shadow-none hover:bg-transparent focus-visible:ring-2 focus-visible:ring-[#04af9f]/70"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    'h-2 rounded-full transition-all duration-300 group-hover:bg-[#04af9f]/70',
                    index === activeIndex ? 'w-6 bg-[#04af9f]' : 'w-2 bg-white/20',
                  )}
                />
              </Button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
