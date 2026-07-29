import { render } from "@react-email/components";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

import DonationNotificationEmail from "@/emails/donation-notification";
import {
  parsePaystackMetadata,
  verifyPaystackTransaction,
} from "@/lib/paystack";

const paystackEventSchema = z.object({
  event: z.string(),
  data: z.unknown(),
});

const paystackChargeDataSchema = z
  .object({
    reference: z.string().min(1).max(100),
  })
  .passthrough();

function constantTimeEqual(first: string, second: string) {
  if (first.length !== second.length) return false;

  let mismatch = 0;
  for (let index = 0; index < first.length; index += 1) {
    mismatch |= first.charCodeAt(index) ^ second.charCodeAt(index);
  }

  return mismatch === 0;
}

async function createSignature(payload: string, secret: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-512" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payload),
  );

  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function formatAmount(amountInSubunit: number, currency: string) {
  const locale = currency === "NGN" ? "en-NG" : "en-US";

  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(amountInSubunit / 100);
  } catch {
    return `${currency} ${(amountInSubunit / 100).toLocaleString(locale)}`;
  }
}

function getMetadataText(
  metadata: Record<string, unknown>,
  key: string,
  fallback: string,
) {
  const value = metadata[key];
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

export async function POST(request: Request) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;

  if (!secretKey) {
    return NextResponse.json(
      { error: "Paystack webhook is not configured." },
      { status: 503 },
    );
  }

  const payload = await request.text();
  const suppliedSignature = request.headers.get("x-paystack-signature") || "";
  const expectedSignature = await createSignature(payload, secretKey);

  if (!constantTimeEqual(suppliedSignature, expectedSignature)) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
  }

  try {
    const event = paystackEventSchema.parse(JSON.parse(payload));

    if (event.event !== "charge.success") {
      return NextResponse.json({ received: true });
    }

    const charge = paystackChargeDataSchema.parse(event.data);
    const reference = charge.reference;
    if (!reference.startsWith("WHA-")) {
      return NextResponse.json({ received: true });
    }

    const transaction = await verifyPaystackTransaction(reference);
    if (transaction.status !== "success") {
      throw new Error(
        `Transaction ${reference} is not confirmed as successful.`,
      );
    }

    const metadata = parsePaystackMetadata(transaction.metadata);
    const baseAmountInSubunit = Number(metadata.base_amount_subunit);
    const metadataCurrency =
      typeof metadata.currency === "string"
        ? metadata.currency.toUpperCase()
        : transaction.currency;
    const requiresReview =
      !Number.isFinite(baseAmountInSubunit) ||
      baseAmountInSubunit <= 0 ||
      transaction.amount < baseAmountInSubunit ||
      metadataCurrency !== transaction.currency.toUpperCase();
    const processingFeeInSubunit = requiresReview
      ? Number.NaN
      : transaction.amount - baseAmountInSubunit;
    const donorName = getMetadataText(metadata, "donor_name", "Not provided");
    const donorEmail = transaction.customer?.email?.trim() || "Not provided";
    const frequency = getMetadataText(
      metadata,
      "donation_frequency",
      "one-time",
    );
    const project = getMetadataText(
      metadata,
      "directed_project",
      "Not directed to a specific project",
    );
    const totalAmount = formatAmount(transaction.amount, transaction.currency);
    const baseAmount = Number.isFinite(baseAmountInSubunit)
      ? formatAmount(baseAmountInSubunit, transaction.currency)
      : "Not recorded";
    const processingFee = Number.isFinite(processingFeeInSubunit)
      ? formatAmount(processingFeeInSubunit, transaction.currency)
      : "Not recorded";
    const paidAt = transaction.paid_at
      ? new Date(transaction.paid_at).toLocaleString("en-GB", {
          dateStyle: "medium",
          timeStyle: "short",
          timeZone: "UTC",
        })
      : "Not provided";
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      throw new Error("RESEND_API_KEY is missing.");
    }

    const emailHtml = await render(
      DonationNotificationEmail({
        donorName,
        donorEmail,
        baseAmount,
        processingFee,
        totalAmount,
        frequency,
        project,
        reference,
        paidAt: `${paidAt} UTC`,
        channel: transaction.channel || "Not provided",
        environment: transaction.domain || "Not provided",
        requiresReview,
      }),
    );
    const emailPayload = {
      from:
        process.env.DONATION_FROM_EMAIL ||
        "Whiz Academy Donations <donations@whizacademy.org>",
      to:
        process.env.DONATION_NOTIFICATION_EMAIL || "whizacademy4all@gmail.com",
      subject: requiresReview
        ? `Donation needs review - ${totalAmount} - ${reference}`
        : `New successful donation - ${totalAmount} - ${donorName}`,
      html: emailHtml,
      ...(z.string().email().safeParse(donorEmail).success
        ? { replyTo: donorEmail }
        : {}),
      tags: [
        { name: "source", value: "paystack_webhook" },
        {
          name: "environment",
          value: transaction.domain || "unknown",
        },
      ],
    };
    const emailResponse = await new Resend(apiKey).emails.send(emailPayload, {
      idempotencyKey: `paystack-charge-success/${reference}`,
    });

    if (emailResponse.error) {
      throw new Error(emailResponse.error.message);
    }

    return NextResponse.json({
      received: true,
      notificationSent: true,
    });
  } catch (error) {
    // Returning a non-2xx response allows Paystack to retry the webhook.
    // eslint-disable-next-line no-console
    console.error("Failed to process Paystack webhook notification", error);
    return NextResponse.json(
      { error: "Webhook processing failed." },
      { status: 500 },
    );
  }
}
