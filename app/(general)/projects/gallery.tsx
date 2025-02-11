import { fetchDriveImages } from '@/lib/googleDrive';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';

export default async function Gallery() {
  const folderId = process.env.GOOGLE_FOLDER_ID;

  if (!folderId) {
    throw new Error('GOOGLE_FOLDER_ID is not defined');
  }

  const images = await fetchDriveImages(folderId);

  if (images.length === 0) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-6 grid-rows-2 gap-5 mt-10">
        {Array.from({ length: 12 }).map((_, index) => (
          <Skeleton key={index} className="rounded-lg w-full h-[200px]" />
        ))}
      </div>
    );
  }

  return (
    <div className="mt-10">
      <div className="grid grid-cols-2 sm:grid-cols-6 gap-5">
        {images.slice(0, 12).map((image) => (
          <div key={image.id}>
            <Image
              src={image.webContentLink ?? ''}
              alt={`${image.id}`}
              width={196}
              height={200}
              className="rounded-lg w-[196px] h-[200px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}