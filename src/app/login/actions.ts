"use server";

/**
 * Login server action.
 *
 * Security properties:
 * - Zod validation before any Shopify call
 * - Rate-limited per IP (5 attempts / 15 min)
 * - Customer access token stored in AES-256-GCM encrypted HTTP-only cookie
 * - Token never returned to the client
 * - Plain-English error messages — no Shopify codes or stack traces exposed
 *
 * Next.js Server Actions inherit CSRF protection automatically:
 * the framework enforces the correct Content-Type and Origin headers,
 * making cross-origin POST forgery impossible without additional tokens.
 */

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { z } from "zod";
import { customerAccessTokenCreate } from "@/lib/shopify/customer";
import { getCustomer } from "@/lib/shopify/queries";
import { setSession, SESSION_7_DAYS } from "@/lib/session";
import { rateLimit, getClientIp, RATE_LIMITS } from "@/lib/rateLimit";

// ─── Validation schema ───────────────────────────────────────────────────────

const LoginSchema = z.object({
  email: z
    .string()
    .min(1, "Please enter your email address.")
    .email("Please enter a valid email address."),
  password: z.string().min(1, "Please enter your password."),
  redirectTo: z.string().optional(),
});

// ─── Action state ─────────────────────────────────────────────────────────────

export interface LoginState {
  error?: string;
  fieldErrors?: { email?: string[]; password?: string[] };
}

// ─── Server Action ────────────────────────────────────────────────────────────

export async function loginAction(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  // 1. Rate limiting
  const requestHeaders = await headers();
  const ip = getClientIp(requestHeaders);
  const rl = rateLimit(
    `login:${ip}`,
    RATE_LIMITS.LOGIN.limit,
    RATE_LIMITS.LOGIN.windowMs
  );

  if (!rl.success) {
    return {
      error: `Too many login attempts. Please wait ${Math.ceil(rl.retryAfterSeconds / 60)} minute(s) before trying again.`,
    };
  }

  // 2. Input validation
  const parsed = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    redirectTo: formData.get("redirectTo"),
  });

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return {
      fieldErrors: {
        email: fieldErrors.email,
        password: fieldErrors.password,
      },
    };
  }

  const { email, password, redirectTo } = parsed.data;

  // 3. Shopify authentication
  let accessToken: { accessToken: string; expiresAt: string } | null = null;
  let errorMessage = "";

  try {
    const result = await customerAccessTokenCreate(email, password);
    accessToken = result.accessToken;
    errorMessage = result.errorMessage;
  } catch {
    return {
      error:
        "We couldn't reach the server. Please check your connection and try again.",
    };
  }

  if (!accessToken) {
    return { error: errorMessage || "We couldn't log you in. Please check your email and password." };
  }

  // 4. Fetch customer ID (needed for IDOR checks in account actions)
  let customerId = "";
  try {
    const customer = await getCustomer(accessToken.accessToken);
    customerId = customer?.id ?? "";
  } catch {
    // Non-fatal — proceed with empty customerId; account pages will refetch
  }

  // 5. Write encrypted session cookie
  await setSession(
    {
      customerAccessToken: accessToken.accessToken,
      expiresAt: accessToken.expiresAt,
      customerId,
    },
    SESSION_7_DAYS
  );

  // 6. Redirect (must happen outside try/catch — redirect() throws internally)
  redirect(redirectTo && redirectTo.startsWith("/") ? redirectTo : "/account");
}
