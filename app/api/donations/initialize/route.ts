import { NextResponse } from "next/server";
import { z } from "zod";

import {
  DONATION_PROJECT_OPTIONS,
  MAX_DONATION_AMOUNT,
} from "@/lib/donation-options";
import {
  getMonthlyPlanCode,
  getPaystackCurrency,
  initializePaystackTransaction,
  PaystackApiError,
  PaystackConfigurationError,
} from "@/lib/paystack";

const donationSchema = z.object({
  frequency: z.enum(["one-time", "monthly"]),
  amount: z
    .number()
    .finite()
    .min(100)
    .max(MAX_DONATION_AMOUNT)
    .refine(
      (amount) => Number.isInteger(amount * 100),
      "Donation amount can have no more than two decimal places.",
    ),
  project: z.union([z.literal(""), z.enum(DONATION_PROJECT_OPTIONS)]),
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
});

function createReference() {
  return `WHA-${Date.now()}-${crypto.randomUUID().replaceAll("-", "").slice(0, 12)}`;
}

export async function POST(request: Request) {
  try {
    const donation = donationSchema.parse(await request.json());
    const baseAmountInSubunit = Math.round(donation.amount * 100);
    const currency = getPaystackCurrency();
    const reference = createReference();
    const requestOrigin = new URL(request.url).origin;
    const callbackUrl = new URL("/donate/status", requestOrigin).toString();
    const planCode =
      donation.frequency === "monthly"
        ? getMonthlyPlanCode(baseAmountInSubunit)
        : undefined;

    const transaction = await initializePaystackTransaction({
      email: donation.email,
      amountInSubunit: baseAmountInSubunit,
      reference,
      callbackUrl,
      currency,
      planCode,
      metadata: {
        source: "whiz-academy-website",
        donation_frequency: donation.frequency,
        directed_project: donation.project || null,
        donor_name: donation.fullName,
        base_amount_subunit: baseAmountInSubunit,
        fee_handling: "paystack",
        currency,
      },
    });

    return NextResponse.json({
      authorizationUrl: transaction.authorization_url,
      reference: transaction.reference,
      baseAmountSubunit: baseAmountInSubunit,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Please review your donation details and try again.",
          fields: error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    if (error instanceof PaystackConfigurationError) {
      return NextResponse.json({ error: error.message }, { status: 503 });
    }

    if (error instanceof PaystackApiError) {
      if (error.code === "unsupported_currency") {
        return NextResponse.json(
          {
            error: `${getPaystackCurrency()} checkout is not enabled on the connected Paystack account yet.`,
          },
          { status: 503 },
        );
      }

      return NextResponse.json(
        { error: "Secure checkout could not be started. Please try again." },
        { status: error.statusCode >= 500 ? 502 : 400 },
      );
    }

    // eslint-disable-next-line no-console
    console.error("Failed to initialize Paystack donation", error);
    return NextResponse.json(
      { error: "Secure checkout could not be started. Please try again." },
      { status: 500 },
    );
  }
}
