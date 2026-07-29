import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";

import { Reveal } from "@/components/ui/reveal";
import { DONATION_PRESETS } from "@/lib/donation-options";
import { getPaystackCurrency } from "@/lib/paystack";

import DonationSelector from "./donation-selector";

export const metadata: Metadata = {
  title: "Donate | Whiz Academy",
  description:
    "Support practical digital education and technology access in rural Nigeria.",
};

const otherWaysToGive = ["Bank Transfer", "Equipment Donation"];

function formatAmount(amount: number, currency: string) {
  return new Intl.NumberFormat(currency === "NGN" ? "en-NG" : "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function DonatePage() {
  const currency = getPaystackCurrency();

  return (
    <main className="bg-white pt-16 text-[#0d1117] transition-colors duration-300 dark:bg-[#0d1117] dark:text-white">
      <section className="relative isolate flex min-h-[476px] items-center overflow-hidden bg-[linear-gradient(157deg,#0d1117_0%,#0d2320_100%)] py-20 text-white">
        <Image
          src="/images/donate_hero.jpg"
          alt="Young Nigerians using laptops together"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-center opacity-25"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(157deg,rgba(13,17,23,0.88)_0%,rgba(13,35,32,0.86)_100%)]"
        />

        <Reveal className="mx-auto w-full max-w-[896px] px-6 text-center">
          <p className="inline-flex rounded-full border border-[#a8640f]/25 bg-[#a8640f]/[0.13] px-[13px] py-[7px] text-xs font-semibold leading-4 text-[#c98026]">
            Make a Difference
          </p>
          <h1 className="mx-auto mt-4 max-w-[848px] font-jakarta text-4xl font-extrabold leading-[1.08] tracking-[-0.9px] sm:text-5xl sm:tracking-[-1.2px] lg:text-[60px] lg:leading-[75px] lg:tracking-[-1.5px]">
            Your support fuels the next breakthrough
          </h1>
          <p className="mx-auto mt-6 max-w-[672px] text-base leading-7 text-white/70 sm:text-xl">
            Every naira moves us closer to a digitally literate Nigeria. See
            exactly what your contribution unlocks.
          </p>
        </Reveal>
      </section>

      <section className="bg-white py-20 transition-colors duration-300 dark:bg-[#0d1117] sm:py-24">
        <div className="mx-auto grid max-w-[1152px] gap-12 px-6 lg:grid-cols-[minmax(0,2fr)_333px]">
          <Reveal direction="left">
            <DonationSelector currency={currency} />
          </Reveal>

          <Reveal direction="right" delay={100} className="space-y-6">
            <aside className="rounded-2xl border border-black/[0.08] bg-[#f8fafb] p-6 transition-colors duration-300 dark:border-white/10 dark:bg-[#141d20]">
              <h2 className="font-jakarta text-lg font-extrabold leading-7">
                Your donation at work
              </h2>
              <dl className="mt-5 space-y-4">
                {DONATION_PRESETS.map(({ amount, impact, usdEquivalent }) => (
                  <div
                    key={amount}
                    className="grid grid-cols-[108px_1fr] gap-3"
                  >
                    <dt className="text-right">
                      <span className="block text-sm font-bold leading-5 text-[#04af9f]">
                        {formatAmount(amount, currency)}
                      </span>
                        <span className="mt-0.5 block text-sm font-bold leading-5 text-[#04af9f]">
                          ≈ {formatAmount(usdEquivalent, "USD")}
                        </span>
                    </dt>
                    <dd className="text-sm leading-[22.75px] text-[#6b7280] dark:text-white/60">
                      {impact}
                    </dd>
                  </div>
                ))}
              </dl>
            </aside>

            <aside className="rounded-2xl border border-black/[0.08] bg-[#f8fafb] p-[25px] transition-colors duration-300 dark:border-white/10 dark:bg-[#141d20]">
              <h2 className="font-jakarta text-lg font-extrabold leading-7">
                Other ways to give
              </h2>
              <ul className="mt-4">
                {otherWaysToGive.map((way, index) => (
                  <li
                    key={way}
                    className={[
                      "flex items-center gap-3 text-sm font-semibold leading-5",
                      index === 0
                        ? "pb-[9px] pt-2"
                        : index === otherWaysToGive.length - 1
                          ? "pb-2 pt-5"
                          : "border-b border-black/[0.08] pb-[9px] pt-5 dark:border-white/10",
                      index === 0
                        ? "border-b border-black/[0.08] dark:border-white/10"
                        : "",
                    ].join(" ")}
                  >
                    <span
                      aria-hidden="true"
                      className="size-2 shrink-0 rounded-full bg-[#04af9f]"
                    />
                    {way}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="group mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#04af9f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#04af9f]/40"
              >
                Contact us for details
                <ArrowRight
                  aria-hidden="true"
                  className="size-3 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </aside>

            <aside className="rounded-2xl bg-[linear-gradient(159deg,#04af9f_0%,#028f82_100%)] p-6 text-white">
              <Heart aria-hidden="true" className="size-6" strokeWidth={1.75} />
              <blockquote className="mt-3 text-sm font-semibold leading-[22.75px] text-white/90">
                &quot;The workshop from Whiz Academy changed my life.&quot;{" "}
                Ayomide<span className="font-black">, 16</span>
              </blockquote>
            </aside>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
