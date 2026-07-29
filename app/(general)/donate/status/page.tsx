import type { Metadata } from 'next';
import Link from 'next/link';
import {
  CheckCircle2,
  Clock3,
  Heart,
  RotateCcw,
  ShieldAlert,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  parsePaystackMetadata,
  PaystackConfigurationError,
  verifyPaystackTransaction,
} from '@/lib/paystack';

export const metadata: Metadata = {
  title: 'Donation Status | Whiz Academy',
  description: 'Check the status of your Whiz Academy donation.',
};

export const dynamic = 'force-dynamic';

type DonationStatusPageProps = {
  searchParams: Promise<{
    reference?: string;
    trxref?: string;
  }>;
};

type StatusContent = {
  tone: 'success' | 'pending' | 'error';
  title: string;
  description: string;
  reference?: string;
  amount?: string;
  baseAmount?: string;
  processingFee?: string;
};

function formatAmount(amountInSubunit: number, currency: string) {
  const locale = currency === 'NGN' ? 'en-NG' : 'en-US';

  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      maximumFractionDigits: 2,
    }).format(amountInSubunit / 100);
  } catch {
    return `${currency} ${(amountInSubunit / 100).toLocaleString(locale)}`;
  }
}

async function getStatusContent(reference?: string): Promise<StatusContent> {
  if (
    !reference ||
    reference.length > 100 ||
    !reference.startsWith('WHA-') ||
    !/^[A-Za-z0-9.=-]+$/.test(reference)
  ) {
    return {
      tone: 'error',
      title: 'We could not find that donation',
      description:
        'The payment reference is missing or invalid. Return to the donation page to try again.',
    };
  }

  try {
    const transaction = await verifyPaystackTransaction(reference);
    const metadata = parsePaystackMetadata(transaction.metadata);
    const baseAmount = Number(metadata.base_amount_subunit);
    const metadataCurrency =
      typeof metadata.currency === 'string'
        ? metadata.currency.toUpperCase()
        : transaction.currency;
    const amountMatches =
      Number.isFinite(baseAmount) &&
      baseAmount > 0 &&
      transaction.amount >= baseAmount &&
      metadataCurrency === transaction.currency.toUpperCase();
    const processingFee = amountMatches
      ? transaction.amount - baseAmount
      : Number.NaN;

    if (transaction.status === 'success' && amountMatches) {
      return {
        tone: 'success',
        title: 'Thank you for supporting the mission',
        description:
          metadata.donation_frequency === 'monthly'
            ? 'Your first donation was confirmed and your monthly support has been activated.'
            : 'Your donation was confirmed successfully. Your support helps expand practical digital education.',
        reference: transaction.reference,
        amount: formatAmount(transaction.amount, transaction.currency),
        baseAmount: formatAmount(baseAmount, transaction.currency),
        processingFee: formatAmount(processingFee, transaction.currency),
      };
    }

    if (transaction.status === 'success' && !amountMatches) {
      return {
        tone: 'error',
        title: 'Your payment needs review',
        description:
          'The confirmed amount did not match the donation request. No action is needed from you; please contact us with the reference below.',
        reference: transaction.reference,
      };
    }

    if (
      ['ongoing', 'pending', 'processing', 'queued'].includes(
        transaction.status,
      )
    ) {
      return {
        tone: 'pending',
        title: 'Your donation is still processing',
        description:
          'Paystack has not confirmed the payment yet. You can check again shortly using the button below.',
        reference: transaction.reference,
      };
    }

    return {
      tone: 'error',
      title: 'The donation was not completed',
      description:
        'No successful payment was confirmed. You can safely return to the donation page and try again.',
      reference: transaction.reference,
    };
  } catch (error) {
    return {
      tone: error instanceof PaystackConfigurationError ? 'pending' : 'error',
      title:
        error instanceof PaystackConfigurationError
          ? 'Payment verification is being configured'
          : 'We could not verify the donation',
      description:
        'Please try checking again. If the issue continues, contact us and include your payment reference.',
      reference,
    };
  }
}

export default async function DonationStatusPage({
  searchParams,
}: DonationStatusPageProps) {
  const params = await searchParams;
  const reference = params.reference || params.trxref;
  const status = await getStatusContent(reference);
  const isSuccess = status.tone === 'success';
  const isPending = status.tone === 'pending';
  const Icon = isSuccess ? CheckCircle2 : isPending ? Clock3 : ShieldAlert;

  return (
    <main className="bg-white pt-16 text-[#0d1117] transition-colors duration-300 dark:bg-[#0d1117] dark:text-white">
      <section className="flex min-h-[72svh] items-center px-6 py-20 sm:py-24">
        <div className="mx-auto w-full max-w-[680px] rounded-3xl border border-black/[0.08] bg-[#f8fafb] p-7 text-center shadow-[0_24px_70px_rgba(13,17,23,0.08)] dark:border-white/10 dark:bg-[#141d20] sm:p-12">
          <span
            className={`mx-auto flex size-16 items-center justify-center rounded-full ${
              isSuccess
                ? 'bg-[#04af9f]/10 text-[#04af9f]'
                : isPending
                  ? 'bg-[#a8640f]/10 text-[#c98026]'
                  : 'bg-red-500/10 text-red-600 dark:text-red-400'
            }`}
          >
            <Icon aria-hidden="true" className="size-8" />
          </span>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.15em] text-[#04af9f]">
            Paystack payment status
          </p>
          <h1 className="mt-3 font-jakarta text-3xl font-extrabold sm:text-4xl">
            {status.title}
          </h1>
          <p className="mx-auto mt-4 max-w-[540px] text-base leading-7 text-[#6b7280] dark:text-white/60">
            {status.description}
          </p>

          {status.amount ? (
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6b7280] dark:text-white/45">
                Total charged
              </p>
              <p className="mt-1 font-jakarta text-3xl font-extrabold text-[#04af9f]">
                {status.amount}
              </p>
            </div>
          ) : null}

          {status.baseAmount && status.processingFee ? (
            <dl className="mx-auto mt-5 max-w-[480px] space-y-2 rounded-xl border border-black/[0.07] bg-white px-4 py-3 text-sm dark:border-white/10 dark:bg-white/[0.04]">
              <div className="flex justify-between gap-4">
                <dt className="text-[#6b7280] dark:text-white/50">
                  Donation amount
                </dt>
                <dd className="font-semibold">{status.baseAmount}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-[#6b7280] dark:text-white/50">
                  Paystack processing fee
                </dt>
                <dd className="font-semibold">{status.processingFee}</dd>
              </div>
            </dl>
          ) : null}

          {status.reference ? (
            <div className="mx-auto mt-6 max-w-[480px] rounded-xl border border-black/[0.07] bg-white px-4 py-3 text-left dark:border-white/10 dark:bg-white/[0.04]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6b7280] dark:text-white/45">
                Payment reference
              </p>
              <p className="mt-1 break-all font-mono text-xs font-semibold">
                {status.reference}
              </p>
            </div>
          ) : null}

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            {isPending && status.reference ? (
              <Button
                asChild
                className="h-12 rounded-xl bg-[#04af9f] px-6 font-bold text-white shadow-none hover:bg-[#039b8d] hover:text-white"
              >
                <Link href={`/donate/status?reference=${status.reference}`}>
                  <RotateCcw aria-hidden="true" className="size-4" />
                  Check again
                </Link>
              </Button>
            ) : (
              <Button
                asChild
                className="h-12 rounded-xl bg-[#04af9f] px-6 font-bold text-white shadow-none hover:bg-[#039b8d] hover:text-white"
              >
                <Link href={isSuccess ? '/' : '/donate'}>
                  {isSuccess ? (
                    <Heart aria-hidden="true" className="size-4" />
                  ) : (
                    <RotateCcw aria-hidden="true" className="size-4" />
                  )}
                  {isSuccess ? 'Return home' : 'Try again'}
                </Link>
              </Button>
            )}
            <Button
              asChild
              variant="outline"
              className="h-12 rounded-xl border-black/[0.08] bg-transparent px-6 font-bold shadow-none hover:border-[#04af9f]/35 hover:bg-[#04af9f]/[0.06] dark:border-white/10 dark:hover:bg-[#04af9f]/10"
            >
              <Link href="/contact">Contact support</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
