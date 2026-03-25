"use server";

/**
 * Signup server action.
 *
 * Flow:
 * 1. Zod validation (server-side only)
 * 2. Rate limiting (3 per hour per IP)
 * 3. customerCreate mutation → new Shopify customer
 * 4. customerAccessTokenCreate → log them in immediately
 * 5. Write encrypted session cookie
 * 6. Redirect to /account
 *
 * Email-verification note (India):
 * Shopify may send a confirmation email. We warn users that Indian ISP
 * email addresses (BSNL, Rediffmail, etc.) can be slow or land in spam.
 * The account is usable immediately after sign-up.
 */

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { z } from "zod";
import { customerCreate, customerAccessTokenCreate } from "@/lib/shopify/customer";
import { getCustomer } from "@/lib/shopify/queries";
import { setSession, SESSION_7_DAYS } from "@/lib/session";
import { rateLimit, getClientIp, RATE_LIMITS } from "@/lib/rateLimit";

// ─── Validation schema ───────────────────────────────────────────────────────

const SignupSchema = z.object({
  firstName: z
    .string()
    .min(1, "Please enter your first name.")
    .max(50, "First name is too long.")
    .regex(/^[\p{L}\s'-]+$/u, "Please enter a valid first name."),
  lastName: z
    .string()
    .min(1, "Please enter your last name.")
    .max(50, "Last name is too long.")
    .regex(/^[\p{L}\s'-]+$/u, "Please enter a valid last name."),
  email: z
    .string()
    .min(1, "Please enter your email address.")
    .email("Please enter a valid email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(128, "Password is too long."),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\+?[\d\s\-()]{10,15}$/.test(val),
      "Please enter a valid phone number (10–15 digits)."
    ),
});

export interface SignupState {
  error?: string;
  fieldErrors?: {
    firstName?: string[];
    lastName?: string[];
    email?: string[];
    password?: string[];
    phone?: string[];
  };
  emailWarning?: boolean; // Show India ISP email-delivery caveat
}

export async function signupAction(
  _prev: SignupState,
  formData: FormData
): Promise<SignupState> {
  // 1. Rate limiting
  const requestHeaders = await headers();
  const ip = getClientIp(requestHeaders);
  const rl = rateLimit(
    `signup:${ip}`,
    RATE_LIMITS.SIGNUP.limit,
    RATE_LIMITS.SIGNUP.windowMs
  );

  if (!rl.success) {
    return {
      error: `Too many sign-up attempts. Please wait ${Math.ceil(rl.retryAfterSeconds / 60)} minute(s) before trying again.`,
    };
  }

  // 2. Validation
  const parsed = SignupSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
    phone: formData.get("phone") || undefined,
  });

  if (!parsed.success) {
    const fe = parsed.error.flatten().fieldErrors;
    return {
      fieldErrors: {
        firstName: fe.firstName,
        lastName: fe.lastName,
        email: fe.email,
        password: fe.password,
        phone: fe.phone,
      },
    };
  }

  const { firstName, lastName, email, password, phone } = parsed.data;

  // 3. Create customer
  let createResult: Awaited<ReturnType<typeof customerCreate>>;
  try {
    createResult = await customerCreate({
      firstName,
      lastName,
      email,
      password,
      ...(phone ? { phone } : {}),
      acceptsMarketing: false,
    });
  } catch {
    return {
      error:
        "We couldn't reach the server. Please check your connection and try again.",
    };
  }

  if (!createResult.customerId) {
    return { error: createResult.errorMessage };
  }

  // 4. Auto-login after signup
  let accessToken: { accessToken: string; expiresAt: string } | null = null;
  try {
    const loginResult = await customerAccessTokenCreate(email, password);
    accessToken = loginResult.accessToken;
  } catch {
    // Non-fatal — account created, ask them to log in
    return {
      error:
        "Your account was created! Please sign in with your new credentials.",
    };
  }

  if (!accessToken) {
    return {
      error:
        "Your account was created! Please sign in with your new credentials.",
    };
  }

  // 5. Fetch customer GID
  let customerId = "";
  try {
    const customer = await getCustomer(accessToken.accessToken);
    customerId = customer?.id ?? "";
  } catch {
    // Non-fatal
  }

  // 6. Write session cookie
  await setSession(
    {
      customerAccessToken: accessToken.accessToken,
      expiresAt: accessToken.expiresAt,
      customerId,
    },
    SESSION_7_DAYS
  );

  // 7. Redirect to account
  redirect("/account");
}
