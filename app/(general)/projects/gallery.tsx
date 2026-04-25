'use client';

import { useEffect, useState } from 'react';
import ImageView, { ImageType } from './image-view';

export default function GalleryClient() {
  const [images, setImages] = useState<ImageType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isActive = true;

    async function loadImages() {
      try {
        const response = await fetch('/api/gallery', {
          method: 'GET',
          cache: 'no-store',
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Failed to load gallery images');
        }

        if (isActive) {
          setImages(result.images ?? []);
        }
      } catch (error) {
        if (isActive) {
          setError(
            error instanceof Error
              ? error.message
              : 'Failed to load gallery images'
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

  if (isLoading) {
    return <p className="mt-10 px-4">Loading gallery...</p>;
  }

  if (error) {
    return <p className="mt-10 px-4">Gallery could not be loaded right now.</p>;
  }

  return (
    <div className="mt-10">
      <ImageView images={images} />
    </div>
  );
}