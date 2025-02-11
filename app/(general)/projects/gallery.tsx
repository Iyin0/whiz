import ImageView from './image-view';
import { fetchDriveImages } from '@/lib/googleDrive';

export default async function Gallery() {
  const folderId = process.env.GOOGLE_FOLDER_ID;

  if (!folderId) {
    throw new Error('GOOGLE_FOLDER_ID is not defined');
  }

  const images = await fetchDriveImages(folderId);
 

  return (
    <div className="mt-10">
      <ImageView images={images} />
    </div>
  );
}