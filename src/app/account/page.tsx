/**
 * /account — Server Component (auth-protected via middleware).
 *
 * Server parent fetches customer data using the session token.
 * Client children (ProfileForm, LogoutButton) handle interactive UI.
 *
 * Token refresh: if the Shopify token expires within 24 hours, we
 * proactively renew it here and overwrite the session cookie.
 */

import { redirect } from "next/navigation";
import Link from "next/link";
import { Package, MapPin, User } from "lucide-react";
import { getSession, setSession, shouldRenewToken, SESSION_7_DAYS } from "@/lib/session";
import { getCustomer } from "@/lib/shopify/queries";
import { customerAccessTokenRenew } from "@/lib/shopify/customer";
import ProfileForm from "./ProfileForm";
import LogoutButton from "./LogoutButton";

export const metadata = { title: "My Account — Brahmi" };

export default async function AccountPage() {
  const session = await getSession();

  // Middleware should have redirected unauthenticated users, but double-check
  if (!session) {
    redirect("/login?reason=session-expired");
  }

  // Proactive token renewal (runs in the background on this request)
  let { customerAccessToken, expiresAt, customerId } = session;
  if (shouldRenewToken(session)) {
    const renewed = await customerAccessTokenRenew(customerAccessToken);
    if (renewed) {
      customerAccessToken = renewed.accessToken;
      expiresAt = renewed.expiresAt;
      await setSession({ customerAccessToken, expiresAt, customerId }, SESSION_7_DAYS);
    }
  }

  const customer = await getCustomer(customerAccessToken);

  if (!customer) {
    // Token may have been invalidated on Shopify's side
    redirect("/login?reason=session-expired");
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12 md:py-20">
        {/* Header */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold font-sans">
              Hello, {customer.firstName ?? customer.displayName} 👋
            </h1>
            <p className="text-sm font-mono text-muted-foreground mt-2">
              {customer.email}
            </p>
          </div>
          <LogoutButton />
        </div>

        {/* Nav tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          <Link
            href="/account/orders"
            className="flex items-center gap-4 p-6 rounded-2xl border border-border/60 bg-background/60
                       hover:border-accent/40 hover:shadow-sm transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center group-hover:bg-accent/10 transition-colors">
              <Package className="h-5 w-5 text-muted-foreground group-hover:text-accent" />
            </div>
            <div>
              <p className="font-sans font-semibold text-sm">My Orders</p>
              <p className="text-xs font-mono text-muted-foreground">
                Track and view past purchases
              </p>
            </div>
          </Link>

          <Link
            href="/account/addresses"
            className="flex items-center gap-4 p-6 rounded-2xl border border-border/60 bg-background/60
                       hover:border-accent/40 hover:shadow-sm transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center group-hover:bg-accent/10 transition-colors">
              <MapPin className="h-5 w-5 text-muted-foreground group-hover:text-accent" />
            </div>
            <div>
              <p className="font-sans font-semibold text-sm">Saved Addresses</p>
              <p className="text-xs font-mono text-muted-foreground">
                Manage delivery addresses
              </p>
            </div>
          </Link>
        </div>

        {/* Profile section — server parent passes customer data to client form */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center">
            <User className="h-4 w-4 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-sans font-semibold">Profile</h2>
        </div>
        <ProfileForm customer={customer} />
      </div>
    </div>
  );
}
