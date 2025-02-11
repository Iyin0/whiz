'use client';

import Image from 'next/image';
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { NAV_LINKS } from '@/lib/constants';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { RiMenuFill } from 'react-icons/ri';

export default function Header() {
  const router = useRouter();
  const activeLink = usePathname();

  return (
    <div className="flex justify-between items-center px-4 sm:px-12 py-2 sm:py-4 fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm">
      <Link href="/">
        <Image src="/images/NavLogo.png" alt="Whiz Academy" width={100} height={36} className="min-w-[100px] min-h-[36px]" />
      </Link>
      <NavigationMenu className="hidden sm:flex grow max-w-none">
        <NavigationMenuList className="flex gap-20 items-center justify-between grow">
          {NAV_LINKS.map((link) => (
            <Link href={link.href} key={link.href} legacyBehavior passHref>
              <NavigationMenuLink className={cn(
                navigationMenuTriggerStyle(),
                'text-white/50 hover:text-white/90 hover:bg-transparent data-[active]:text-white text-lg bg-transparent rounded-none px-0 focus:bg-transparent focus:text-white',
                activeLink === link.href && 'text-white border-b border-white'
              )}>{link.label}</NavigationMenuLink>
            </Link>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <Button onClick={() => router.push('/contact#volunteer')} className="text-base hidden sm:block">Join Us</Button>
      <Popover>
        <PopoverTrigger className="sm:hidden">
          <RiMenuFill className="text-white min-w-6 min-h-6" />
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <NavigationMenu className="flex w-full max-w-none justify-start">
            <div className="flex flex-col grow w-full divide-y divide-black/20">
              {[...NAV_LINKS, { href: '/contact#volunteer', label: 'Join Us' }].map((link) => (
                <Link href={link.href} key={link.href} legacyBehavior passHref>
                  <NavigationMenuLink className={cn(
                    navigationMenuTriggerStyle(),
                    'text-black hover:text-white/90 hover:bg-transparent w-full justify-start h-auto px-4 py-2 data-[active]:text-white text-lg bg-transparent rounded-none focus:bg-transparent focus:text-white',
                  )}>{link.label}</NavigationMenuLink>
                </Link>
              ))}
            </div>
          </NavigationMenu>
        </PopoverContent>
      </Popover>
    </div>
  );
}