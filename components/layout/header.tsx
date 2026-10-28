"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 20;

export default function Header() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isHomePage = pathname === "/";
  const isTransparent = isHomePage && !isScrolled;
  const isDark = isMounted && resolvedTheme === "dark";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isHomePage) {
      setIsScrolled(false);
      return;
    }

    const updateHeader = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    return () => window.removeEventListener("scroll", updateHeader);
  }, [isHomePage]);

  const isActiveLink = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
        isTransparent
          ? "bg-transparent"
          : "border-b border-black/[0.08] bg-white/95 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-[#0d1117]/95",
      )}
    >
      <div className="mx-auto flex h-16  items-center justify-between px-6">
        <Link href="/" aria-label="Whiz Academy home">
          <Logo textColor={isTransparent ? "white" : "theme"} />
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-8 lg:flex"
        >
          {NAV_LINKS.map((link) => {
            const isActive = isActiveLink(link.href);

            return (
              <Link
                href={link.href}
                key={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative rounded-md px-1 py-2 text-sm font-medium transition-colors duration-200 after:absolute after:inset-x-1 after:bottom-0 after:h-0.5 after:origin-left after:rounded-full after:bg-[#04af9f] after:transition-transform after:duration-200 focus-visible:outline-none motion-reduce:transition-none motion-reduce:after:transition-none",
                  isActive
                    ? "text-[#04af9f] after:scale-x-100 dark:text-[#43d8ca]"
                    : isTransparent
                      ? "text-white/70 after:scale-x-0 hover:text-white hover:after:scale-x-100"
                      : "text-[#6b7280] after:scale-x-0 hover:text-[#0d1117] hover:after:scale-x-100 dark:text-white/60 dark:hover:text-white",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            aria-label={
              isDark ? "Switch to light theme" : "Switch to dark theme"
            }
            aria-pressed={isDark}
            title={isDark ? "Switch to light theme" : "Switch to dark theme"}
            className={cn(
              "h-9 w-9 rounded-lg shadow-none transition-all duration-200 hover:bg-transparent active:border-[#04af9f]/60",
              isTransparent
                ? "border-white/30 bg-black/20 text-white/90 backdrop-blur-sm hover:border-white/50 hover:bg-white/10 hover:text-white"
                : "border-black/[0.08] bg-white/80 text-[#6b7280] hover:border-[#04af9f]/40 hover:bg-white hover:text-[#0d1117] dark:border-white/10 dark:bg-white/[0.04] dark:text-white/60 dark:hover:bg-white/[0.08] dark:hover:text-white",
            )}
          >
            <span className="relative size-4" aria-hidden="true">
              <Sun
                className={cn(
                  "absolute inset-0 size-4 transition-all duration-300",
                  isDark
                    ? "rotate-0 scale-100 opacity-100"
                    : "-rotate-90 scale-0 opacity-0",
                )}
              />
              <Moon
                className={cn(
                  "absolute inset-0 size-4 transition-all duration-300",
                  isDark
                    ? "rotate-90 scale-0 opacity-0"
                    : "rotate-0 scale-100 opacity-100",
                )}
              />
            </span>
          </Button>

          <Button
            asChild
            className="hidden h-9 rounded-xl bg-[#04af9f] px-4 text-sm font-semibold text-white shadow-none transition-all hover:bg-[#039b8d] hover:text-white hover:shadow-lg sm:inline-flex"
          >
            <Link href="/donate">Donate Now</Link>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setIsOpen((current) => !current)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            className={cn(
              "h-9 w-9 rounded-lg shadow-none hover:bg-transparent active:border-[#04af9f]/60 lg:hidden [&_svg]:size-[18px]",
              isTransparent
                ? "border-white/30 bg-black/20 text-white backdrop-blur-sm hover:border-white/50 hover:bg-white/10"
                : "border-black/[0.08] bg-white/80 text-[#0d1117] hover:border-[#04af9f]/40 hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08]",
            )}
          >
            {isOpen ? (
              <X className="h-[18px] w-[18px]" />
            ) : (
              <Menu className="h-[18px] w-[18px]" />
            )}
          </Button>
        </div>
      </div>

      {isOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="border-b border-black/[0.08] bg-white/[0.98] px-6 pb-6 pt-2 backdrop-blur-md dark:border-white/10 dark:bg-[#0d1117]/[0.98] lg:hidden"
        >
          {NAV_LINKS.map((link) => {
            const isActive = isActiveLink(link.href);

            return (
              <Link
                href={link.href}
                key={link.href}
                onClick={() => setIsOpen(false)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "block rounded-lg border-b border-black/[0.08] px-3 py-3 text-sm font-medium transition-[color,background-color] duration-200 last:border-0 hover:bg-[#04af9f]/[0.06] hover:text-[#047e74] focus-visible:outline-none dark:border-white/10 dark:hover:bg-[#04af9f]/10 dark:hover:text-[#43d8ca] motion-reduce:transition-none",
                  isActive
                    ? "bg-[#04af9f]/10 font-semibold text-[#047e74] dark:bg-[#04af9f]/15 dark:text-[#43d8ca]"
                    : "text-[#6b7280] dark:text-white/60",
                )}
              >
                {link.label}
              </Link>
            );
          })}

          <Button
            asChild
            className="mt-4 h-11 w-full rounded-xl bg-[#04af9f] text-sm font-semibold text-white shadow-none hover:bg-[#039b8d] hover:text-white"
          >
            <Link href="/donate" onClick={() => setIsOpen(false)}>
              Donate Now
            </Link>
          </Button>
        </nav>
      )}
    </header>
  );
}
