import { NextResponse } from 'next/server';

type GoogleServiceAccount = {
  client_email: string;
  private_key: string;
  token_uri?: string;
};

type DriveFile = {
  id: string;
  name: string;
  mimeType: string;
  webViewLink?: string;
  webContentLink?: string;
  thumbnailLink?: string;
};

export const dynamic = 'force-dynamic';

function decodeBase64ToString(base64: string) {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(base64, 'base64').toString('utf-8');
  }

  const binary = atob(base64);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));

  return new TextDecoder().decode(bytes);
}

function base64UrlEncode(input: string | ArrayBuffer) {
  let bytes: Uint8Array;

  if (typeof input === 'string') {
    bytes = new TextEncoder().encode(input);
  } else {
    bytes = new Uint8Array(input);
  }

  let binary = '';

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

function pemToArrayBuffer(pem: string) {
  const base64 = pem
    .replace('-----BEGIN PRIVATE KEY-----', '')
    .replace('-----END PRIVATE KEY-----', '')
    .replace(/\s/g, '');

  const binary = atob(base64);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));

  return bytes.buffer;
}

function getGoogleCredentials() {
  const serviceAccountBase64 = process.env.GOOGLE_SERVICE_ACCOUNT;

  if (!serviceAccountBase64) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT is not defined');
  }

  const decoded = decodeBase64ToString(serviceAccountBase64);

  return JSON.parse(decoded) as GoogleServiceAccount;
}

async function getGoogleAccessToken(credentials: GoogleServiceAccount) {
  const tokenUri = credentials.token_uri || 'https://oauth2.googleapis.com/token';

  const now = Math.floor(Date.now() / 1000);

  const header = {
    alg: 'RS256',
    typ: 'JWT',
  };

  const payload = {
    iss: credentials.client_email,
    scope: 'https://www.googleapis.com/auth/drive.readonly',
    aud: tokenUri,
    iat: now,
    exp: now + 3600,
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));

  const unsignedToken = `${encodedHeader}.${encodedPayload}`;

  const key = await crypto.subtle.importKey(
    'pkcs8',
    pemToArrayBuffer(credentials.private_key),
    {
      name: 'RSASSA-PKCS1-v1_5',
      hash: 'SHA-256',
    },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    key,
    new TextEncoder().encode(unsignedToken)
  );

  const jwt = `${unsignedToken}.${base64UrlEncode(signature)}`;

  const response = await fetch(tokenUri, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to get Google access token: ${text}`);
  }

  const data = (await response.json()) as {
    access_token?: string;
  };

  if (!data.access_token) {
    throw new Error('Google access token was not returned');
  }

  return data.access_token;
}

export async function GET() {
  try {
    const folderId = process.env.GOOGLE_FOLDER_ID;

    if (!folderId) {
      throw new Error('GOOGLE_FOLDER_ID is not defined');
    }

    const credentials = getGoogleCredentials();
    const accessToken = await getGoogleAccessToken(credentials);

    const url = new URL('https://www.googleapis.com/drive/v3/files');

    url.searchParams.set(
      'q',
      `'${folderId}' in parents and trashed = false and mimeType contains 'image/'`
    );
    url.searchParams.set(
      'fields',
      'files(id, name, mimeType, webViewLink, webContentLink, thumbnailLink)'
    );

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Failed to fetch Drive images: ${text}`);
    }

    const data = (await response.json()) as {
      files?: DriveFile[];
    };

    const images =
      data.files?.map((file) => ({
        id: file.id,
        name: file.name,
        mimeType: file.mimeType,
        url: `https://drive.google.com/uc?id=${file.id}`,
        webViewLink: file.webViewLink,
        webContentLink: file.webContentLink,
        thumbnailLink: file.thumbnailLink,
      })) ?? [];

    return NextResponse.json({ images });
  } catch (error) {

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Failed to load gallery images',
      },
      { status: 500 }
    );
  }
}