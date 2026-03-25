"use server";

/**
 * Account server actions — profile update.
 *
 * IDOR protection: the customer access token is read from the encrypted
 * HTTP-only session cookie server-side. We never accept a customer ID or
 * token from the request body. Shopify enforces that a token only grants
 * access to the owning customer.
 */

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";
import { customerUpdate } from "@/lib/shopify/customer";
import { getSession } from "@/lib/session";
import { rateLimit, getClientIp, RATE_LIMITS } from "@/lib/rateLimit";

// ─── Validation ───────────────────────────────────────────────────────────────

const ProfileSchema = z.object({
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
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\+?[\d\s\-()]{10,15}$/.test(val),
      "Please enter a valid phone number."
    ),
});

export interface ProfileState {
  success?: boolean;
  error?: string;
  fieldErrors?: {
    firstName?: string[];
    lastName?: string[];
    phone?: string[];
  };
}

export async function updateProfileAction(
  _prev: ProfileState,
  formData: FormData
): Promise<ProfileState> {
  // 1. Auth check
  const session = await getSession();
  if (!session) return { error: "Your session has ended. Please log in again." };

  // 2. Rate limiting
  const requestHeaders = await headers();
  const ip = getClientIp(requestHeaders);
  const rl = rateLimit(
    `profile:${ip}`,
    RATE_LIMITS.ACCOUNT_MUTATION.limit,
    RATE_LIMITS.ACCOUNT_MUTATION.windowMs
  );
  if (!rl.success) {
    return { error: "Too many requests. Please wait a moment." };
  }

  // 3. Validation
  const parsed = ProfileSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    phone: formData.get("phone") || undefined,
  });

  if (!parsed.success) {
    const fe = parsed.error.flatten().fieldErrors;
    return { fieldErrors: { firstName: fe.firstName, lastName: fe.lastName, phone: fe.phone } };
  }

  const { firstName, lastName, phone } = parsed.data;

  // 4. Shopify mutation — token from session, not from client
  try {
    const result = await customerUpdate(session.customerAccessToken, {
      firstName,
      lastName,
      ...(phone !== undefined ? { phone } : {}),
    });

    if (result.errorMessage) {
      return { error: result.errorMessage };
    }
  } catch {
    return { error: "We couldn't save your changes. Please try again." };
  }

  revalidatePath("/account");
  return { success: true };
}
