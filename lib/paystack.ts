const PAYSTACK_API_BASE_URL = "https://api.paystack.co";

type PaystackApiResponse<T> = {
  status: boolean;
  message: string;
  data?: T;
  code?: string;
};

type InitializeTransactionInput = {
  email: string;
  amountInSubunit: number;
  reference: string;
  callbackUrl: string;
  currency: string;
  metadata: Record<string, unknown>;
  planCode?: string;
};

export type PaystackInitialization = {
  authorization_url: string;
  access_code: string;
  reference: string;
};

export type PaystackTransaction = {
  domain?: "test" | "live";
  status:
    | "abandoned"
    | "failed"
    | "ongoing"
    | "pending"
    | "processing"
    | "queued"
    | "reversed"
    | "success";
  reference: string;
  amount: number;
  currency: string;
  paid_at?: string | null;
  channel?: string | null;
  metadata?: Record<string, unknown> | string | null;
  customer?: {
    email?: string | null;
  } | null;
};

export class PaystackConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PaystackConfigurationError";
  }
}

export class PaystackApiError extends Error {
  statusCode: number;
  code?: string;

  constructor(message: string, statusCode = 502, code?: string) {
    super(message);
    this.name = "PaystackApiError";
    this.statusCode = statusCode;
    this.code = code;
  }
}

function getSecretKey() {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;

  if (!secretKey) {
    throw new PaystackConfigurationError(
      "Paystack checkout is not configured yet.",
    );
  }

  return secretKey;
}

async function requestPaystack<T>(path: string, init?: RequestInit) {
  const response = await fetch(`${PAYSTACK_API_BASE_URL}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${getSecretKey()}`,
      "Content-Type": "application/json",
      ...init?.headers,
    },
    cache: "no-store",
  });

  const result = (await response
    .json()
    .catch(() => null)) as PaystackApiResponse<T> | null;

  if (!response.ok || !result?.status || !result.data) {
    throw new PaystackApiError(
      result?.message || "Paystack could not process the request.",
      response.status || 502,
      result?.code,
    );
  }

  return result.data;
}

export function getPaystackCurrency() {
  return (process.env.PAYSTACK_CURRENCY || "NGN").trim().toUpperCase();
}

export function getMonthlyPlanCode(amountInSubunit: number) {
  const configuredPlans = process.env.PAYSTACK_MONTHLY_PLAN_CODES;

  if (!configuredPlans) {
    throw new PaystackConfigurationError(
      "Monthly donations are not configured yet.",
    );
  }

  try {
    const plans = JSON.parse(configuredPlans) as Record<string, unknown>;
    const amountInMajorUnit = amountInSubunit / 100;
    const planCode =
      plans[String(amountInMajorUnit)] ?? plans[String(amountInSubunit)];

    if (typeof planCode !== "string" || !planCode.startsWith("PLN_")) {
      throw new PaystackConfigurationError(
        "This monthly donation amount is not configured yet.",
      );
    }

    return planCode;
  } catch (error) {
    if (error instanceof PaystackConfigurationError) throw error;

    throw new PaystackConfigurationError(
      "Monthly donation plans are not configured correctly.",
    );
  }
}

export function parsePaystackMetadata(
  metadata: PaystackTransaction["metadata"],
): Record<string, unknown> {
  if (!metadata) return {};
  if (typeof metadata === "object") return metadata as Record<string, unknown>;

  try {
    const parsed = JSON.parse(metadata) as unknown;
    return typeof parsed === "object" && parsed !== null
      ? (parsed as Record<string, unknown>)
      : {};
  } catch {
    return {};
  }
}

export function initializePaystackTransaction({
  email,
  amountInSubunit,
  reference,
  callbackUrl,
  currency,
  metadata,
  planCode,
}: InitializeTransactionInput) {
  return requestPaystack<PaystackInitialization>("/transaction/initialize", {
    method: "POST",
    body: JSON.stringify({
      email,
      amount: String(amountInSubunit),
      reference,
      callback_url: callbackUrl,
      currency,
      metadata: JSON.stringify(metadata),
      ...(planCode ? { plan: planCode } : {}),
    }),
  });
}

export function verifyPaystackTransaction(reference: string) {
  return requestPaystack<PaystackTransaction>(
    `/transaction/verify/${encodeURIComponent(reference)}`,
    { method: "GET" },
  );
}
