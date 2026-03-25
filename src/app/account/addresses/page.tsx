/**
 * /account/addresses — Server Component.
 * Fetches saved addresses from Shopify via session token.
 * Client child (AddressManager) handles interactive add/edit/delete UI.
 */

import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import { getSession } from "@/lib/session";
import { getCustomerAddresses } from "@/lib/shopify/queries";
import AddressManager from "./AddressManager";

export const metadata = { title: "My Addresses — Brahmi" };

export default async function AddressesPage() {
  const session = await getSession();
  if (!session) redirect("/login?reason=session-expired");

  const addresses = await getCustomerAddresses(session.customerAccessToken);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-12 md:py-20">
        <Link
          href="/account"
          className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground
                     hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to account
        </Link>

        <div className="flex items-center gap-4 mb-8">
          <MapPin className="h-8 w-8 text-accent" />
          <div>
            <h1 className="text-xl md:text-2xl font-bold font-sans">
              Saved Addresses
            </h1>
            <p className="text-sm font-mono text-muted-foreground mt-1">
              {addresses.length === 0
                ? "No addresses saved yet"
                : `${addresses.length} address${addresses.length !== 1 ? "es" : ""} saved`}
            </p>
          </div>
        </div>

        {/* Server fetches addresses; client manages the interactive list */}
        <AddressManager addresses={addresses} />
      </div>
    </div>
  );
}
