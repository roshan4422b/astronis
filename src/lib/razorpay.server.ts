import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";

export type RazorpayConfig = {
  keyId: string;
  keySecret: string;
  webhookSecret: string;
  amount: number;
  currency: string;
};

export type RazorpayEntity = {
  id: string;
  amount: number;
  currency: string;
  status: string;
  order_id?: string;
  method?: string;
  bank?: string;
  card?: { network?: string; last4?: string };
  captured?: boolean;
  error_code?: string;
  error_description?: string;
};

export class RazorpayConfigurationError extends Error {
  constructor() {
    super("Razorpay payment configuration is incomplete or invalid.");
    this.name = "RazorpayConfigurationError";
  }
}

function configuredAmount() {
  const raw = process.env.RAZORPAY_CONSULTATION_FEE_SUBUNITS || "100000";
  const amount = Number(raw);
  if (!Number.isSafeInteger(amount) || amount < 100 || amount > 2_147_483_647) throw new RazorpayConfigurationError();
  return amount;
}

function configuredCurrency() {
  const currency = (process.env.RAZORPAY_CURRENCY || "INR").trim().toUpperCase();
  if (!/^[A-Z]{3}$/.test(currency)) throw new RazorpayConfigurationError();
  try {
    new Intl.NumberFormat("en-IN", { style: "currency", currency }).format(0);
  } catch {
    throw new RazorpayConfigurationError();
  }
  return currency;
}

export function getPublicRazorpayConfig() {
  const mode = (process.env.RAZORPAY_MODE || "test").trim().toLowerCase();
  const keyId = process.env.RAZORPAY_KEY_ID?.trim() || "";
  const keySecret = process.env.RAZORPAY_KEY_SECRET?.trim() || "";
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET?.trim() || "";
  const expectedPrefix = mode === "test"
    ? "rzp_test_"
    : mode === "live" && process.env.RAZORPAY_LIVE_PAYMENTS_ENABLED === "true"
      ? "rzp_live_"
      : "";
  const amount = configuredAmount();
  const currency = configuredCurrency();
  const configured = Boolean(expectedPrefix && keyId.startsWith(expectedPrefix) && keySecret && webhookSecret);

  return {
    amount,
    currency,
    keyId: configured ? keyId : null,
    configured,
  };
}

export function getRazorpayConfig(): RazorpayConfig {
  const publicConfig = getPublicRazorpayConfig();
  const keySecret = process.env.RAZORPAY_KEY_SECRET?.trim() || "";
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET?.trim() || "";
  if (!publicConfig.configured || !publicConfig.keyId) throw new RazorpayConfigurationError();
  return {
    keyId: publicConfig.keyId,
    keySecret,
    webhookSecret,
    amount: publicConfig.amount,
    currency: publicConfig.currency,
  };
}

function authorization(config: RazorpayConfig) {
  return `Basic ${Buffer.from(`${config.keyId}:${config.keySecret}`).toString("base64")}`;
}

async function razorpayRequest<T>(config: RazorpayConfig, path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`https://api.razorpay.com/v1/${path}`, {
    ...init,
    headers: {
      Authorization: authorization(config),
      "Content-Type": "application/json",
      ...init?.headers,
    },
    signal: AbortSignal.timeout(12_000),
    cache: "no-store",
  });
  if (!response.ok) {
    console.error("[schedule-meeting] Razorpay API request failed", { status: response.status, path });
    throw new Error("The payment service could not process this request.");
  }
  return response.json() as Promise<T>;
}

export function createRazorpayOrder(config: RazorpayConfig, bookingReference: string, amount = config.amount, currency = config.currency) {
  return razorpayRequest<RazorpayEntity>(config, "orders", {
    method: "POST",
    body: JSON.stringify({
      amount,
      currency,
      receipt: bookingReference,
      notes: { booking_reference: bookingReference },
    }),
  });
}

export function fetchRazorpayPayment(config: RazorpayConfig, paymentId: string) {
  return razorpayRequest<RazorpayEntity>(config, `payments/${encodeURIComponent(paymentId)}`, { method: "GET" });
}

export function fetchRazorpayOrder(config: RazorpayConfig, orderId: string) {
  return razorpayRequest<RazorpayEntity>(config, `orders/${encodeURIComponent(orderId)}`, { method: "GET" });
}

function validHmac(candidate: string, secret: string, content: string) {
  if (!/^[a-f\d]{64}$/i.test(candidate)) return false;
  const expected = createHmac("sha256", secret).update(content).digest();
  const supplied = Buffer.from(candidate, "hex");
  return supplied.length === expected.length && timingSafeEqual(supplied, expected);
}

export function verifyRazorpayCheckoutSignature(orderId: string, paymentId: string, signature: string, secret: string) {
  return validHmac(signature, secret, `${orderId}|${paymentId}`);
}

export function verifyRazorpayWebhookSignature(body: string, signature: string, secret: string) {
  return validHmac(signature, secret, body);
}
