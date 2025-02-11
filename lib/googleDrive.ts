import { google } from 'googleapis';

const serviceAccountBase64 = process.env.GOOGLE_SERVICE_ACCOUNT;

if (!serviceAccountBase64) {
  throw new Error('Missing GOOGLE_SERVICE_ACCOUNT environment variable');
}

// Decode the JSON
const credentials = JSON.parse(Buffer.from(serviceAccountBase64, 'base64').toString('utf-8'));

export async function fetchDriveImages(folderId: string) {
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  });

  const drive = google.drive({ version: 'v3', auth });

  const response = await drive.files.list({
    q: `'${folderId}' in parents`,
    fields: 'files(id, name, mimeType, webViewLink, webContentLink)',
  });

  return response.data.files?.map(file => ({
    id: file.id,
    url: `https://drive.google.com/uc?id=${file.id}`,
    name: file.name,
    mimeType: file.mimeType,
    webViewLink: file.webViewLink,
    webContentLink: file.webContentLink,
  })) ?? [];
}
