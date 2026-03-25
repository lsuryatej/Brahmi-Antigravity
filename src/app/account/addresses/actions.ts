"use server";

/**
 * Address server actions — create, update, delete.
 *
 * IDOR protection: customerAccessToken is read from the session cookie.
 * Shopify enforces that the token only grants access to the owning
 * customer's addresses — manipulating an address ID from a different
 * customer returns a Shopify-level error, not our data.
 */

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";
import {
  customerAddressCreate,
  customerAddressUpdate,
  customerAddressDelete,
} from "@/lib/shopify/queries";
import { getSession } from "@/lib/session";
import { rateLimit, getClientIp, RATE_LIMITS } from "@/lib/rateLimit";

// ─── Validation ───────────────────────────────────────────────────────────────

const AddressSchema = z.object({
  firstName: z.string().min(1, "Please enter a first name.").max(50),
  lastName: z.string().min(1, "Please enter a last name.").max(50),
  address1: z.string().min(1, "Please enter your street address.").max(200),
  address2: z.string().optional().default(""),
  city: z.string().min(1, "Please enter your city.").max(100),
  province: z.string().min(1, "Please select a state.").max(100),
  zip: z
    .string()
    .min(6, "Please enter a valid PIN code.")
    .max(10)
    .regex(/^[\d\s-]+$/, "PIN code must contain only numbers."),
  country: z.string().default("India"),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\+?[\d\s\-()]{10,15}$/.test(val),
      "Please enter a valid phone number."
    ),
});

export interface AddressState {
  success?: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
}

// ─── Create ───────────────────────────────────────────────────────────────────

export async function createAddressAction(
  _prev: AddressState,
  formData: FormData
): Promise<AddressState> {
  const session = await getSession();
  if (!session) return { error: "Your session has ended. Please log in again." };

  const requestHeaders = await headers();
  const ip = getClientIp(requestHeaders);
  const rl = rateLimit(`addr:${ip}`, RATE_LIMITS.ACCOUNT_MUTATION.limit, RATE_LIMITS.ACCOUNT_MUTATION.windowMs);
  if (!rl.success) return { error: "Too many requests. Please wait a moment." };

  const parsed = AddressSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    address1: formData.get("address1"),
    address2: formData.get("address2") || "",
    city: formData.get("city"),
    province: formData.get("province"),
    zip: formData.get("zip"),
    country: "India",
    phone: formData.get("phone") || undefined,
  });

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  }

  try {
    const result = await customerAddressCreate(
      session.customerAccessToken,
      parsed.data
    );
    if (result.errorMessage) return { error: result.errorMessage };
  } catch {
    return { error: "We couldn't save your address. Please try again." };
  }

  revalidatePath("/account/addresses");
  return { success: true };
}

// ─── Update ───────────────────────────────────────────────────────────────────

export async function updateAddressAction(
  _prev: AddressState,
  formData: FormData
): Promise<AddressState> {
  const session = await getSession();
  if (!session) return { error: "Your session has ended. Please log in again." };

  // Address ID comes from the form but Shopify validates ownership via the token
  const id = formData.get("addressId") as string;
  if (!id || !id.startsWith("gid://shopify/MailingAddress/")) {
    return { error: "Invalid address." };
  }

  const requestHeaders = await headers();
  const ip = getClientIp(requestHeaders);
  const rl = rateLimit(`addr:${ip}`, RATE_LIMITS.ACCOUNT_MUTATION.limit, RATE_LIMITS.ACCOUNT_MUTATION.windowMs);
  if (!rl.success) return { error: "Too many requests. Please wait a moment." };

  const parsed = AddressSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    address1: formData.get("address1"),
    address2: formData.get("address2") || "",
    city: formData.get("city"),
    province: formData.get("province"),
    zip: formData.get("zip"),
    country: "India",
    phone: formData.get("phone") || undefined,
  });

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  }

  try {
    const result = await customerAddressUpdate(
      session.customerAccessToken,
      id,
      parsed.data
    );
    if (result.errorMessage) return { error: result.errorMessage };
  } catch {
    return { error: "We couldn't update your address. Please try again." };
  }

  revalidatePath("/account/addresses");
  return { success: true };
}

// ─── Delete ───────────────────────────────────────────────────────────────────

export async function deleteAddressAction(
  formData: FormData
): Promise<void> {
  const session = await getSession();
  if (!session) return;

  const id = formData.get("addressId") as string;
  if (!id || !id.startsWith("gid://shopify/MailingAddress/")) return;

  try {
    await customerAddressDelete(session.customerAccessToken, id);
  } catch {
    // Non-fatal on delete — revalidate regardless
  }

  revalidatePath("/account/addresses");
}
