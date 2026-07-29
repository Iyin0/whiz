'use client';

import Image from 'next/image';
import {
  ArrowLeft,
  ArrowRight,
  Images,
  RefreshCw,
} from 'lucide-react';
import {
  type FocusEvent as ReactFocusEvent,
  type PointerEvent as ReactPointerEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type GalleryImage = {
  id: string;
  name?: string | null;
  mimeType?: string | null;
  url: string;
  thumbnailUrl?: string | null;
  webViewLink?: string | null;
  webContentLink?: string | null;
};

type GalleryResponse = {
  images?: GalleryImage[];
  error?: string;
};

const INITIAL_VISIBLE_IMAGES = 12;
const LOAD_MORE_COUNT = 12;
const AUTO_ADVANCE_DELAY = 5000;
const MANUAL_INTERACTION_PAUSE = 8000;
const SWIPE_THRESHOLD = 48;

type PointerStart = {
  id: number;
  x: number;
  y: number;
};

function getCaption(image: GalleryImage, index: number) {
  const cleanedName = image.name
    ?.replace(/^copy of\s+/i, '')
    .replace(/\.[a-z0-9]+$/i, '')
    .replace(/[_-]+/g, ' ')
    .trim();

  if (!cleanedName || /^\d{8,}/.test(cleanedName)) {
    return `Programme moment ${String(index + 1).padStart(2, '0')}`;
  }

  return cleanedName;
}

export default function GalleryExperience() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_IMAGES);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isFocusedWithin, setIsFocusedWithin] = useState(false);
  const [isManualPause, setIsManualPause] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const pointerStart = useRef<PointerStart | null>(null);
  const manualPauseTimeout = useRef<number | null>(null);
  const preloadedImages = useRef<Map<string, HTMLImageElement>>(new Map());

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener('change', updateMotionPreference);

    return () => mediaQuery.removeEventListener('change', updateMotionPreference);
  }, []);

  useEffect(
    () => () => {
      if (manualPauseTimeout.current !== null) {
        window.clearTimeout(manualPauseTimeout.current);
      }

      preloadedImages.current.clear();
    },
    [],
  );

  useEffect(() => {
    let isActive = true;

    async function loadImages() {
      try {
        setIsLoading(true);
        setError('');

        const response = await fetch('/api/gallery', {
          method: 'GET',
          cache: 'no-store',
        });
        const result = (await response.json()) as GalleryResponse;

        if (!response.ok) {
          throw new Error(result.error || 'Failed to load gallery images');
        }

        if (isActive) {
          setImages(result.images ?? []);
          setActiveIndex(0);
          setVisibleCount(INITIAL_VISIBLE_IMAGES);
        }
      } catch (requestError) {
        if (isActive) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : 'Failed to load gallery images',
          );
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    loadImages();

    return () => {
      isActive = false;
    };
  }, []);

  const canAutoAdvance =
    images.length > 1 &&
    !prefersReducedMotion &&
    !isHovered &&
    !isFocusedWithin &&
    !isManualPause;

  useEffect(() => {
    if (!canAutoAdvance) return;

    const timeout = window.setTimeout(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % images.length);
    }, AUTO_ADVANCE_DELAY);

    return () => window.clearTimeout(timeout);
  }, [activeIndex, canAutoAdvance, images.length]);

  const previewIndices = useMemo(() => {
    if (images.length === 0) return [];

    return Array.from(
      new Set(
        [-2, -1, 0, 1, 2].map(
          (offset) => (activeIndex + offset + images.length) % images.length,
        ),
      ),
    );
  }, [activeIndex, images.length]);

  useEffect(() => {
    if (images.length === 0) return;

    [-2, -1, 0, 1, 2].forEach((offset) => {
      const imageIndex = (activeIndex + offset + images.length) % images.length;
      const imageUrl = images[imageIndex]?.url;

      if (!imageUrl || preloadedImages.current.has(imageUrl)) return;

      const preloadedImage = new window.Image();
      preloadedImage.decoding = 'async';
      preloadedImage.src = imageUrl;
      preloadedImages.current.set(imageUrl, preloadedImage);
    });
  }, [activeIndex, images]);

  const pauseAutoAdvance = () => {
    setIsManualPause(true);

    if (manualPauseTimeout.current !== null) {
      window.clearTimeout(manualPauseTimeout.current);
    }

    manualPauseTimeout.current = window.setTimeout(() => {
      setIsManualPause(false);
      manualPauseTimeout.current = null;
    }, MANUAL_INTERACTION_PAUSE);
  };

  const showNext = () => {
    if (images.length === 0) return;
    pauseAutoAdvance();
    setActiveIndex((currentIndex) => (currentIndex + 1) % images.length);
  };

  const showPrevious = () => {
    if (images.length === 0) return;
    pauseAutoAdvance();
    setActiveIndex(
      (currentIndex) => (currentIndex - 1 + images.length) % images.length,
    );
  };

  const selectImage = (index: number, scrollToFeatured = false) => {
    pauseAutoAdvance();
    setActiveIndex(index);

    if (scrollToFeatured) {
      window.requestAnimationFrame(() => {
        document.getElementById('featured-gallery')?.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: 'start',
        });
      });
    }
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;

    pointerStart.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
    };
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const start = pointerStart.current;
    pointerStart.current = null;

    if (!start || start.id !== event.pointerId) return;

    const distanceX = event.clientX - start.x;
    const distanceY = event.clientY - start.y;

    if (Math.abs(distanceX) <= Math.abs(distanceY) || Math.abs(distanceX) < SWIPE_THRESHOLD) {
      return;
    }

    if (distanceX < 0) showNext();
    if (distanceX > 0) showPrevious();
  };

  const handleBlurCapture = (event: ReactFocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsFocusedWithin(false);
    }
  };

  if (isLoading) {
    return (
      <div aria-live="polite">
        <div className="aspect-[16/9] animate-pulse rounded-3xl bg-[#e9eef0] dark:bg-white/[0.07]" />
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="aspect-[4/3] animate-pulse rounded-2xl bg-[#e9eef0] dark:bg-white/[0.07]"
            />
          ))}
        </div>
        <p className="sr-only">Loading gallery images...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-dashed border-[#04af9f]/30 bg-[#04af9f]/[0.05] px-6 py-14 text-center dark:bg-[#04af9f]/[0.08]">
        <span className="mx-auto flex size-13 items-center justify-center rounded-2xl bg-[#04af9f]/10 text-[#04af9f]">
          <RefreshCw aria-hidden="true" className="size-6" />
        </span>
        <h2 className="mt-5 font-jakarta text-xl font-extrabold">
          The gallery could not be loaded
        </h2>
        <p className="mx-auto mt-3 max-w-[520px] text-sm leading-6 text-[#6b7280] dark:text-white/60">
          Our photo source is temporarily unavailable. Please try again in a little while.
        </p>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-black/[0.12] bg-[#f8fafb] px-6 py-14 text-center dark:border-white/15 dark:bg-[#141d20]">
        <Images aria-hidden="true" className="mx-auto size-8 text-[#04af9f]" />
        <h2 className="mt-5 font-jakarta text-xl font-extrabold">
          New moments are coming soon
        </h2>
        <p className="mt-3 text-sm text-[#6b7280] dark:text-white/60">
          Programme photos will appear here as the shared album is updated.
        </p>
      </div>
    );
  }

  const activeImage = images[activeIndex];
  const activeCaption = getCaption(activeImage, activeIndex);
  const progress = ((activeIndex + 1) / images.length) * 100;

  return (
    <div>
      <section
        id="featured-gallery"
        aria-label="Featured programme photos"
        aria-roledescription="carousel"
        className="scroll-mt-24"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocusCapture={() => setIsFocusedWithin(true)}
        onBlurCapture={handleBlurCapture}
      >
        <div className="mb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#04af9f]">
              Featured moments
            </p>
            <h2 className="mt-2 font-jakarta text-2xl font-extrabold sm:text-3xl">
              Inside our programmes
            </h2>
          </div>
        </div>

        <div className="relative aspect-[4/3] sm:aspect-[16/9]">
          <div
            role="group"
            tabIndex={0}
            aria-label={`${activeCaption}. Image ${activeIndex + 1} of ${images.length}`}
            onKeyDown={(event) => {
              if (event.key === 'ArrowRight') {
                event.preventDefault();
                showNext();
              }
              if (event.key === 'ArrowLeft') {
                event.preventDefault();
                showPrevious();
              }
            }}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={() => {
              pointerStart.current = null;
            }}
            onPointerLeave={(event) => {
              if (event.pointerType === 'mouse') {
                pointerStart.current = null;
              }
            }}
            className="group absolute inset-0 touch-pan-y overflow-hidden rounded-3xl bg-[#0d1716] shadow-[0_26px_70px_rgba(13,17,23,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#04af9f] focus-visible:ring-offset-4 dark:ring-offset-[#0d1117]"
          >
            <Image
              key={activeImage.id}
              src={activeImage.url}
              alt={activeCaption}
              fill
              priority={activeIndex === 0}
              sizes="(max-width: 768px) 100vw, 1120px"
              className="pointer-events-none animate-gallery-fade select-none object-cover motion-reduce:animate-none"
              draggable={false}
            />
            <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(180deg,transparent_45%,rgba(6,18,18,0.82)_100%)]" />

            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-6 p-5 text-white sm:p-8">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">
                  Whiz Academy in action
                </p>
                <p className="mt-2 font-jakarta text-lg font-bold sm:text-2xl">
                  {activeCaption}
                </p>
              </div>
              <p className="shrink-0 text-sm font-semibold text-white/70">
                {String(activeIndex + 1).padStart(2, '0')} /{' '}
                {String(images.length).padStart(2, '0')}
              </p>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={(event) => {
              event.stopPropagation();
              showPrevious();
            }}
            aria-label="Show previous photo"
            className="absolute left-4 top-1/2 z-20 size-11 -translate-y-1/2 touch-manipulation rounded-full border-white/20 bg-black/35 text-white shadow-none backdrop-blur-sm hover:border-white/50 hover:bg-black/55 hover:text-white active:scale-95 sm:left-6"
          >
            <ArrowLeft aria-hidden="true" className="size-5" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
            aria-label="Show next photo"
            className="absolute right-4 top-1/2 z-20 size-11 -translate-y-1/2 touch-manipulation rounded-full border-white/20 bg-black/35 text-white shadow-none backdrop-blur-sm hover:border-white/50 hover:bg-black/55 hover:text-white active:scale-95 sm:right-6"
          >
            <ArrowRight aria-hidden="true" className="size-5" />
          </Button>
        </div>

        <div
          aria-hidden="true"
          className="mt-4 h-1 overflow-hidden rounded-full bg-black/[0.07] dark:bg-white/10"
        >
          <div
            className="h-full rounded-full bg-[#04af9f] transition-[width] duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-5 flex justify-center gap-2">
          {previewIndices.map((imageIndex) => {
            const image = images[imageIndex];
            const isActive = imageIndex === activeIndex;

            return (
              <Button
                key={`${image.id}-${imageIndex}`}
                type="button"
                variant="ghost"
                onClick={() => selectImage(imageIndex)}
                aria-label={`Show ${getCaption(image, imageIndex)}`}
                aria-current={isActive ? 'true' : undefined}
                className={cn(
                  'relative h-14 w-16 overflow-hidden rounded-xl border p-0 shadow-none transition-all hover:-translate-y-0.5 hover:bg-transparent sm:h-16 sm:w-20',
                  isActive
                    ? 'border-[#04af9f] ring-2 ring-[#04af9f]/20'
                    : 'border-black/[0.08] opacity-55 hover:opacity-90 dark:border-white/10',
                )}
              >
                <Image
                  src={image.thumbnailUrl ?? image.url}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </Button>
            );
          })}
        </div>
      </section>

      <section className="mt-20 sm:mt-24">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#04af9f]">
              Photo archive
            </p>
            <h2 className="mt-2 font-jakarta text-2xl font-extrabold sm:text-3xl">
              More moments from the field
            </h2>
          </div>
          <p className="text-sm text-[#6b7280] dark:text-white/55">
            Showing {Math.min(visibleCount, images.length)} of {images.length} photos
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
          {images.slice(0, visibleCount).map((image, index) => {
            const caption = getCaption(image, index);

            return (
              <Button
                key={image.id}
                type="button"
                variant="ghost"
                onClick={() => selectImage(index, true)}
                aria-label={`Feature ${caption}`}
                className="group relative aspect-[4/3] h-auto overflow-hidden rounded-2xl border border-black/[0.08] bg-[#e9eef0] p-0 shadow-none hover:bg-[#e9eef0] focus-visible:ring-2 focus-visible:ring-[#04af9f] dark:border-white/10 dark:bg-white/[0.06]"
              >
                <Image
                  src={image.thumbnailUrl ?? image.url}
                  alt={caption}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(6,18,18,0.72)_100%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />
                <span className="absolute inset-x-0 bottom-0 translate-y-2 px-4 py-3 text-left text-xs font-semibold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                  {caption}
                </span>
              </Button>
            );
          })}
        </div>

        {visibleCount < images.length ? (
          <div className="mt-10 flex justify-center">
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                setVisibleCount((currentCount) =>
                  Math.min(currentCount + LOAD_MORE_COUNT, images.length),
                )
              }
              className="h-12 rounded-xl border-black/[0.08] bg-transparent px-6 font-bold shadow-none hover:border-[#04af9f]/35 hover:bg-[#04af9f]/[0.06] hover:text-[#047e74] dark:border-white/10 dark:hover:bg-[#04af9f]/10 dark:hover:text-[#43d8ca]"
            >
              Load more photos
            </Button>
          </div>
        ) : null}
      </section>
    </div>
  );
}
