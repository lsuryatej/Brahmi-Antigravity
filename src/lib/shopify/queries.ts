/**
 * Shopify Storefront API — Customer data queries + address mutations.
 * All functions are server-side only.
 *
 * IDOR protection: every operation passes the customerAccessToken directly
 * to Shopify. Shopify's API enforces that the token only grants access to
 * the owning customer's data — it is impossible to read/modify another
 * customer's orders or addresses with a mismatched token.
 */

import { shopifyFetch } from "./client";
import { mapShopifyError, type CustomerUserError } from "./customer";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Customer {
  id: string;
  firstName: string | null;
  lastName: string | null;
  displayName: string;
  email: string;
  phone: string | null;
}

export interface OrderLineItem {
  title: string;
  quantity: number;
  variant: {
    price: { amount: string; currencyCode: string };
    image: { url: string } | null;
  } | null;
}

export interface Order {
  id: string;
  name: string; // e.g. "#1001"
  processedAt: string;
  financialStatus: string;
  fulfillmentStatus: string;
  totalPriceV2: { amount: string; currencyCode: string };
  lineItems: { edges: { node: OrderLineItem }[] };
}

export interface MailingAddress {
  id: string;
  firstName: string | null;
  lastName: string | null;
  company: string | null;
  address1: string | null;
  address2: string | null;
  city: string | null;
  province: string | null;
  zip: string | null;
  country: string | null;
  phone: string | null;
  formatted: string[];
}

export type MailingAddressInput = Omit<MailingAddress, "id" | "formatted">;

// ─── Customer profile ─────────────────────────────────────────────────────────

export async function getCustomer(
  customerAccessToken: string
): Promise<Customer | null> {
  const query = /* GraphQL */ `
    query getCustomer($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        id
        firstName
        lastName
        displayName
        email
        phone
      }
    }
  `;

  try {
    const data = await shopifyFetch<{ customer: Customer | null }>(query, {
      customerAccessToken,
    });
    return data.customer;
  } catch {
    return null;
  }
}

// ─── Orders ──────────────────────────────────────────────────────────────────

export async function getCustomerOrders(
  customerAccessToken: string
): Promise<Order[]> {
  const query = /* GraphQL */ `
    query getCustomerOrders($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        orders(first: 20, sortKey: PROCESSED_AT, reverse: true) {
          edges {
            node {
              id
              name
              processedAt
              financialStatus
              fulfillmentStatus
              totalPriceV2 {
                amount
                currencyCode
              }
              lineItems(first: 5) {
                edges {
                  node {
                    title
                    quantity
                    variant {
                      price {
                        amount
                        currencyCode
                      }
                      image {
                        url
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch<{
      customer: {
        orders: { edges: { node: Order }[] };
      } | null;
    }>(query, { customerAccessToken });

    return data.customer?.orders.edges.map((e) => e.node) ?? [];
  } catch {
    return [];
  }
}

// ─── Addresses ───────────────────────────────────────────────────────────────

export async function getCustomerAddresses(
  customerAccessToken: string
): Promise<MailingAddress[]> {
  const query = /* GraphQL */ `
    query getCustomerAddresses($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        addresses(first: 10) {
          edges {
            node {
              id
              firstName
              lastName
              company
              address1
              address2
              city
              province
              zip
              country
              phone
              formatted
            }
          }
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch<{
      customer: { addresses: { edges: { node: MailingAddress }[] } } | null;
    }>(query, { customerAccessToken });

    return data.customer?.addresses.edges.map((e) => e.node) ?? [];
  } catch {
    return [];
  }
}

export async function customerAddressCreate(
  customerAccessToken: string,
  address: MailingAddressInput
): Promise<{ id: string | null; errorMessage: string }> {
  const mutation = /* GraphQL */ `
    mutation customerAddressCreate($customerAccessToken: String!, $address: MailingAddressInput!) {
      customerAddressCreate(customerAccessToken: $customerAccessToken, address: $address) {
        customerAddress {
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
    customerAddressCreate: {
      customerAddress: { id: string } | null;
      customerUserErrors: CustomerUserError[];
    };
  }>(mutation, { customerAccessToken, address });

  const errors = data.customerAddressCreate.customerUserErrors;
  return {
    id: data.customerAddressCreate.customerAddress?.id ?? null,
    errorMessage: mapShopifyError(errors),
  };
}

export async function customerAddressUpdate(
  customerAccessToken: string,
  id: string,
  address: MailingAddressInput
): Promise<{ errorMessage: string }> {
  const mutation = /* GraphQL */ `
    mutation customerAddressUpdate(
      $customerAccessToken: String!
      $id: ID!
      $address: MailingAddressInput!
    ) {
      customerAddressUpdate(
        customerAccessToken: $customerAccessToken
        id: $id
        address: $address
      ) {
        customerAddress {
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
    customerAddressUpdate: {
      customerAddress: { id: string } | null;
      customerUserErrors: CustomerUserError[];
    };
  }>(mutation, { customerAccessToken, id, address });

  const errors = data.customerAddressUpdate.customerUserErrors;
  return { errorMessage: mapShopifyError(errors) };
}

export async function customerAddressDelete(
  customerAccessToken: string,
  id: string
): Promise<{ errorMessage: string }> {
  const mutation = /* GraphQL */ `
    mutation customerAddressDelete($customerAccessToken: String!, $id: ID!) {
      customerAddressDelete(customerAccessToken: $customerAccessToken, id: $id) {
        deletedCustomerAddressId
        customerUserErrors {
          field
          message
          code
        }
      }
    }
  `;

  const data = await shopifyFetch<{
    customerAddressDelete: {
      deletedCustomerAddressId: string | null;
      customerUserErrors: CustomerUserError[];
    };
  }>(mutation, { customerAccessToken, id });

  const errors = data.customerAddressDelete.customerUserErrors;
  return { errorMessage: mapShopifyError(errors) };
}

// ─── Cart ↔ Customer association ─────────────────────────────────────────────

/**
 * Links an anonymous cart to the logged-in customer.
 * Call this after login or when the cart page detects a logged-in session.
 * The customer access token is read from the HTTP-only cookie server-side;
 * it is never passed from the client.
 */
export async function cartBuyerIdentityUpdate(
  cartId: string,
  customerAccessToken: string
): Promise<void> {
  const mutation = /* GraphQL */ `
    mutation cartBuyerIdentityUpdate($cartId: ID!, $buyerIdentity: CartBuyerIdentityInput!) {
      cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) {
        cart {
          id
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  try {
    await shopifyFetch(mutation, {
      cartId,
      buyerIdentity: { customerAccessToken },
    });
  } catch (err) {
    // Non-fatal — cart continues to work anonymously
    console.error("[queries] cartBuyerIdentityUpdate failed:", err);
  }
}
