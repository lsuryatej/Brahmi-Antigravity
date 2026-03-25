/**
 * /account/orders — Server Component.
 * Fetches order history from Shopify using the session token.
 * Auth is enforced by middleware.
 */

import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Package, ShoppingBag } from "lucide-react";
import { getSession } from "@/lib/session";
import { getCustomerOrders } from "@/lib/shopify/queries";

export const metadata = { title: "My Orders — Brahmi" };

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatPrice(amount: string, currencyCode: string): string {
  const num = parseFloat(amount);
  if (currencyCode === "INR") {
    return `₹${num.toLocaleString("en-IN")}`;
  }
  return `${currencyCode} ${num.toLocaleString()}`;
}

function statusBadge(status: string): string {
  const map: Record<string, string> = {
    PAID: "bg-green-100 text-green-700",
    PENDING: "bg-amber-100 text-amber-700",
    REFUNDED: "bg-gray-100 text-gray-600",
    PARTIALLY_REFUNDED: "bg-orange-100 text-orange-700",
    FULFILLED: "bg-blue-100 text-blue-700",
    UNFULFILLED: "bg-yellow-100 text-yellow-700",
    IN_PROGRESS: "bg-purple-100 text-purple-700",
  };
  return map[status] ?? "bg-gray-100 text-gray-600";
}

export default async function OrdersPage() {
  const session = await getSession();
  if (!session) redirect("/login?reason=session-expired");

  const orders = await getCustomerOrders(session.customerAccessToken);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12 md:py-20">
        {/* Back */}
        <Link
          href="/account"
          className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground
                     hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to account
        </Link>

        <div className="flex items-center gap-4 mb-8">
          <Package className="h-8 w-8 text-accent" />
          <h1 className="text-3xl md:text-4xl font-bold font-sans">My Orders</h1>
        </div>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground/40 mb-4" />
            <h2 className="text-xl font-sans font-semibold mb-2">No orders yet</h2>
            <p className="text-sm font-mono text-muted-foreground mb-6">
              When you place an order, it will appear here.
            </p>
            <Link
              href="/collections/sutr"
              className="px-6 py-3 rounded-xl bg-[#63180c] text-[#f7f2e4] font-sans font-semibold text-sm
                         hover:bg-[#a82914] transition-colors shadow"
            >
              Shop now
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-2xl border border-border/60 bg-background/60 overflow-hidden"
              >
                {/* Order header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 border-b border-border/40">
                  <div>
                    <p className="font-sans font-semibold">{order.name}</p>
                    <p className="text-xs font-mono text-muted-foreground mt-0.5">
                      {formatDate(order.processedAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-mono font-medium ${statusBadge(order.financialStatus)}`}
                    >
                      {order.financialStatus.replace(/_/g, " ")}
                    </span>
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-mono font-medium ${statusBadge(order.fulfillmentStatus)}`}
                    >
                      {order.fulfillmentStatus.replace(/_/g, " ")}
                    </span>
                    <span className="text-sm font-mono font-semibold ml-1">
                      {formatPrice(
                        order.totalPriceV2.amount,
                        order.totalPriceV2.currencyCode
                      )}
                    </span>
                  </div>
                </div>

                {/* Line items */}
                <div className="px-6 py-4 space-y-3">
                  {order.lineItems.edges.map(({ node }, i) => (
                    <div key={i} className="flex items-center gap-4">
                      {node.variant?.image?.url ? (
                        <img
                          src={node.variant.image.url}
                          alt={node.title}
                          className="w-12 h-14 object-cover rounded-lg border border-border/40 flex-shrink-0"
                        />
                      ) : (
                        <div className="w-12 h-14 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                          <Package className="h-5 w-5 text-muted-foreground/40" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-sans font-medium truncate">
                          {node.title}
                        </p>
                        <p className="text-xs font-mono text-muted-foreground">
                          Qty: {node.quantity}
                          {node.variant?.price && (
                            <>
                              {" "}·{" "}
                              {formatPrice(
                                node.variant.price.amount,
                                node.variant.price.currencyCode
                              )}
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
