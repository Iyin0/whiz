'use client';

import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Image {
  id: string | null | undefined;
  url: string;
  name: string | null | undefined;
  mimeType: string | null | undefined;
  webViewLink: string | null | undefined;
  webContentLink: string | null | undefined;
}

export default function ImageView({images}: {images: Image[]}) {
  const [count, setCount] = useState(12);

  if (images.length === 0) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-6 grid-rows-2 gap-5">
        {Array.from({ length: 12 }).map((_, index) => (
          <Skeleton key={index} className="rounded-lg w-full h-[200px]" />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-6 gap-5">
        {images
          .filter((image) => image.webContentLink !== null && image.webContentLink !== undefined)
          .slice(0, count)
          .map((image) => (
            <div key={image.id}>
              <Image
                src={image.webContentLink ?? image.url}
                alt={`${image.name}`}
                width={196}
                height={200}
                className="rounded-lg w-[196px] h-[200px]"
                loading="lazy"
              />
            </div>
          ))
        } 
      </div>
      <div className={cn('flex justify-center items-center w-full mt-10', count >= images.length ? 'hidden' : '')}>
        <Button
          variant="outline"
          className="border-2 border-black rounded-full"
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
