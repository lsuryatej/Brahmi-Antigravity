"use client";

/**
 * Client component that manages the address list UI:
 * - Toggle add-new form
 * - Toggle edit form per address
 * - Delete with optimistic-like confirmation
 * The actual mutations happen server-side via server actions.
 */

import { useState } from "react";
import { MapPin, Plus, Pencil, Trash2 } from "lucide-react";
import { deleteAddressAction } from "./actions";
import AddressForm from "./AddressForm";
import type { MailingAddress } from "@/lib/shopify/queries";

interface Props {
  addresses: MailingAddress[];
}

export default function AddressManager({ addresses }: Props) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Existing addresses */}
      {addresses.map((addr) => (
        <div
          key={addr.id}
          className="rounded-2xl border border-border/60 bg-background/60 p-6"
        >
          {editingId === addr.id ? (
            <>
              <h3 className="font-sans font-semibold text-sm mb-4">Edit address</h3>
              <AddressForm
                address={addr}
                onCancel={() => setEditingId(null)}
              />
            </>
          ) : (
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 min-w-0">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="font-sans font-semibold text-sm">
                    {[addr.firstName, addr.lastName].filter(Boolean).join(" ")}
                  </p>
                  <p className="text-xs font-mono text-muted-foreground mt-1 leading-relaxed">
                    {addr.formatted.join(", ")}
                  </p>
                  {addr.phone && (
                    <p className="text-xs font-mono text-muted-foreground mt-0.5">
                      {addr.phone}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => setEditingId(addr.id)}
                  className="p-2 rounded-lg border border-border hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                  aria-label="Edit address"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <form
                  action={deleteAddressAction}
                  onSubmit={() => setDeletingId(addr.id)}
                >
                  <input type="hidden" name="addressId" value={addr.id} />
                  <button
                    type="submit"
                    disabled={deletingId === addr.id}
                    className="p-2 rounded-lg border border-border hover:bg-red-50 hover:border-red-200
                               transition-colors text-muted-foreground hover:text-red-600
                               disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Delete address"
                  >
                    {deletingId === addr.id ? (
                      <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin block" />
                    ) : (
                      <Trash2 className="h-3.5 w-3.5" />
                    )}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Add new address */}
      {showAddForm ? (
        <div className="rounded-2xl border border-border/60 bg-background/60 p-6">
          <h3 className="font-sans font-semibold text-sm mb-4">New address</h3>
          <AddressForm onCancel={() => setShowAddForm(false)} />
        </div>
      ) : (
        <button
          onClick={() => setShowAddForm(true)}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl
                     border-2 border-dashed border-border/60 text-sm font-mono
                     text-muted-foreground hover:border-accent/40 hover:text-accent
                     transition-all"
        >
          <Plus className="h-4 w-4" />
          Add new address
        </button>
      )}
    </div>
  );
}
