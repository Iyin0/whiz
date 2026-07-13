import { NextResponse, type NextRequest } from 'next/server';

const careersHost = 'careers.whizacademy.org';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host')?.split(':')[0].toLowerCase();

  if (host !== careersHost || request.nextUrl.pathname !== '/') {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = '/careers';

  return NextResponse.rewrite(url);
}
