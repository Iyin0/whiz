import { NextResponse, type NextRequest } from 'next/server';

const careersHost = 'careers.whizacademy.org';
const careersPath = '/careers';
const primaryHost = 'whizacademy.org';
const legacyHosts = new Set([
  'simefoundation.org',
  'www.simefoundation.org',
  'whiz.simefoundation.org',
]);

export function middleware(request: NextRequest) {
  const host = request.headers.get('host')?.split(':')[0].toLowerCase();
  const { pathname } = request.nextUrl;

  if (host && legacyHosts.has(host)) {
    const url = request.nextUrl.clone();
    url.protocol = 'https:';
    url.hostname = primaryHost;

    return NextResponse.redirect(url, 308);
  }

  if (host === careersHost) {
    const url = request.nextUrl.clone();
    url.protocol = 'https:';
    url.host = primaryHost;
    url.pathname = pathname === '/' ? careersPath : pathname;

    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}
