'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type ImageType = {
  id: string;
  name?: string | null;
  mimeType?: string | null;
  url: string;
  webViewLink?: string | null;
  webContentLink?: string | null;
  thumbnailLink?: string | null;
};

export default function ImageView({images}: {images: ImageType[]}) {
  const [count, setCount] = useState(12);

  if (images.length === 0) {
    return (
      <div className="rounded-lg border border-dashed bg-background p-8 text-center">
        <p className="font-semibold text-foreground">No gallery images are available yet.</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Workshop photos will appear here once the gallery source is updated.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {images
          .filter((image) => image.webContentLink !== null && image.webContentLink !== undefined)
          .slice(0, count)
          .map((image) => (
            <div key={image.id} className="overflow-hidden rounded-lg bg-muted">
              <Image
                src={image.webContentLink ?? image.url}
                alt={`${image.name}`}
                width={196}
                height={200}
                className="aspect-square h-full w-full object-cover transition duration-300 hover:scale-105"
                loading="lazy"
              />
            </div>
          ))
        } 
      </div>
      <div className={cn('flex justify-center items-center w-full mt-10', count >= images.length ? 'hidden' : '')}>
        <Button
          variant="outline"
          className="rounded-md border-primary text-primary hover:bg-primary hover:text-white"
          onClick={() => {
            if (count < images.length) {
              setCount(count + 12);
            }
          }}
        >
          View More
        </Button>
      </div>
    </>
  );
}
