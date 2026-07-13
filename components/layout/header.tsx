'use client';

import Image from 'next/image';
import { NAV_LINKS } from '@/lib/constants';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { HeartHandshake, Menu, X } from 'lucide-react';

export default function Header() {
  const activeLink = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/60 bg-white/[0.92] shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-8 lg:px-10">
      <Link href="/" className="flex items-center">
        <Image
          src="/images/NavLogo.png"
          alt="Whiz Academy"
          width={116}
          height={42}
          className="h-auto min-w-[108px]"
          priority
        />
      </Link>

      <nav className="hidden items-center gap-2 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              className={cn(
                'rounded-md px-4 py-2 text-sm font-semibold text-foreground/70 transition hover:bg-muted hover:text-foreground',
                (activeLink === link.href ||
                  (link.href !== '/' && activeLink.startsWith(link.href))) &&
                  'bg-primary/10 text-primary'
              )}
            >
              {link.label}
            </Link>
          ))}
      </nav>

      <Button asChild className="hidden h-11 rounded-md px-5 text-sm font-semibold md:inline-flex">
        <Link href="/contact#volunteer">
          <HeartHandshake className="h-4 w-4" />
          Get Involved
        </Link>
      </Button>

      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon" aria-label="Open menu">
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[260px] p-2">
          {[...NAV_LINKS, { href: '/contact#volunteer', label: 'Get Involved' }].map((link) => (
            <DropdownMenuItem key={link.href} onClick={() => setIsOpen(false)} asChild>
                <Link
                  href={link.href}
                  className={cn(
                    'w-full rounded-md px-3 py-3 text-sm font-semibold',
                    (activeLink === link.href ||
                      (link.href !== '/' && activeLink.startsWith(link.href))) &&
                      'bg-primary/10 text-primary'
                  )}
                >
                    {link.label}
                </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      </div>
    </header>
  );
}
