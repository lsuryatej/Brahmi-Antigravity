/**
 * Shopify Storefront API — Customer auth mutations.
 * All functions run server-side only.
 * Customer access tokens never touch client-side JavaScript.
 */

import { shopifyFetch } from "./client";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CustomerAccessToken {
  accessToken: string;
  expiresAt: string; // ISO-8601
}

export interface CustomerUserError {
  field: string[] | null;
  message: string;
  code: string;
}

export interface CustomerCreateInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  acceptsMarketing?: boolean;
}

// ─── Friendly error map ───────────────────────────────────────────────────────
// Shopify error codes → plain-English messages for Indian users

const SHOPIFY_ERROR_MESSAGES: Record<string, string> = {
  UNIDENTIFIED_CUSTOMER:
    "We couldn't log you in. Please check your email and password.",
  CUSTOMER_DISABLED:
    "Your account has been disabled. Please contact us for help.",
  TOO_MANY_ATTEMPTS_FORGOT_PASSWORD:
    "Too many attempts. Please wait a few minutes before trying again.",
  TOKEN_INVALID: "Your session has ended. Please log in again.",
  TOKEN_EXPIRED: "Your session has ended. Please log in again.",
  ALREADY_ENABLED:
    "An account with this email already exists. Please log in instead.",
  BAD_DOMAIN: "Please enter a valid email address.",
  INVALID: "Some information looks incorrect. Please check and try again.",
  TAKEN: "An account with this email already exists. Please log in instead.",
  BLANK: "This field cannot be empty.",
  TOO_SHORT: "This field is too short.",
  TOO_LONG: "This field is too long.",
  INVALID_MULTIPASS_REQUEST: "Invalid request. Please try again.",
  NOT_FOUND: "No account found with that email address.",
  CUSTOMER_NOT_FOUND: "No account found with that email address.",
};

export function mapShopifyError(errors: CustomerUserError[]): string {
  if (!errors.length) return "";
  const first = errors[0];
  return (
    SHOPIFY_ERROR_MESSAGES[first.code] ??
    "Something went wrong. Please try again."
  );
}

// ─── Mutations ────────────────────────────────────────────────────────────────

/**
 * Authenticate a customer with email + password.
 * Returns the access token on success, or user-friendly errors on failure.
 */
export async function customerAccessTokenCreate(
  email: string,
  password: string
): Promise<{
  accessToken: CustomerAccessToken | null;
  errors: CustomerUserError[];
  errorMessage: string;
}> {
  const mutation = /* GraphQL */ `
    mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        customerUserErrors {
          field
          message
          code
        }
      }
    }
  `;

  const data = await shopifyFetch<{
    customerAccessTokenCreate: {
      customerAccessToken: CustomerAccessToken | null;
      customerUserErrors: CustomerUserError[];
    };
  }>(mutation, { input: { email, password } });

  const errors = data.customerAccessTokenCreate.customerUserErrors;
  return {
    accessToken: data.customerAccessTokenCreate.customerAccessToken,
    errors,
    errorMessage: mapShopifyError(errors),
  };
}

/**
 * Create a new customer account.
 */
export async function customerCreate(input: CustomerCreateInput): Promise<{
  customerId: string | null;
  errors: CustomerUserError[];
  errorMessage: string;
}> {
  const mutation = /* GraphQL */ `
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer {
          id
        }
        customerUserErrors {
          field
          message
          code
        }
      }
    }
  `;

  const data = await shopifyFetch<{
    customerCreate: {
      customer: { id: string } | null;
      customerUserErrors: CustomerUserError[];
    };
  }>(mutation, { input });

  const errors = data.customerCreate.customerUserErrors;
  return {
    customerId: data.customerCreate.customer?.id ?? null,
    errors,
    errorMessage: mapShopifyError(errors),
  };
}

/**
 * Renew an existing customer access token before it expires.
 * Shopify issues a new token with a fresh expiry.
 */
export async function customerAccessTokenRenew(
  customerAccessToken: string
): Promise<CustomerAccessToken | null> {
  const mutation = /* GraphQL */ `
    mutation customerAccessTokenRenew($customerAccessToken: String!) {
      customerAccessTokenRenew(customerAccessToken: $customerAccessToken) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch<{
      customerAccessTokenRenew: {
        customerAccessToken: CustomerAccessToken | null;
        userErrors: { field: string[]; message: string }[];
      };
    }>(mutation, { customerAccessToken });

    return data.customerAccessTokenRenew.customerAccessToken;
  } catch {
    return null; // Renewal failure is non-fatal — session will just expire naturally
  }
}

/**
 * Invalidate a customer access token on logout.
 * Called server-side before clearing the session cookie.
 */
export async function customerAccessTokenDelete(
  customerAccessToken: string
): Promise<void> {
  const mutation = /* GraphQL */ `
    mutation customerAccessTokenDelete($customerAccessToken: String!) {
      customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
        deletedAccessToken
        userErrors {
          field
          message
        }
      }
    }
  `;

  try {
    await shopifyFetch(mutation, { customerAccessToken });
  } catch {
    // Log but don't throw — we still clear the local session cookie
    console.error("[customer] customerAccessTokenDelete failed — proceeding with local logout");
  }
}

/**
 * Update customer profile fields (name, phone).
 * Email and password changes use 24-hour sessions (sensitive operations).
 */
export async function customerUpdate(
  customerAccessToken: string,
  customer: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    password?: string;
  }
): Promise<{ errors: CustomerUserError[]; errorMessage: string }> {
  const mutation = /* GraphQL */ `
    mutation customerUpdate($customerAccessToken: String!, $customer: CustomerUpdateInput!) {
      customerUpdate(customerAccessToken: $customerAccessToken, customer: $customer) {
        customer {
          id
        }
        customerUserErrors {
          field
          message
          code
        }
      }
    }
  `;

  const data = await shopifyFetch<{
    customerUpdate: {
      customer: { id: string } | null;
      customerUserErrors: CustomerUserError[];
    };
  }>(mutation, { customerAccessToken, customer });

  const errors = data.customerUpdate.customerUserErrors;
  return { errors, errorMessage: mapShopifyError(errors) };
}
