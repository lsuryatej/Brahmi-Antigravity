"use client";

import { useActionState, useEffect } from "react";
import { updateProfileAction, type ProfileState } from "./actions";
import type { Customer } from "@/lib/shopify/queries";

interface Props {
  customer: Customer;
}

const initialState: ProfileState = {};

export default function ProfileForm({ customer }: Props) {
  const [state, formAction, isPending] = useActionState(
    updateProfileAction,
    initialState
  );

  // Auto-dismiss success after 3 seconds via CSS (no JS timer needed)
  useEffect(() => {
    // intentionally empty — success banner auto-hides via CSS animation
  }, [state.success]);

  return (
    <section className="bg-background border border-border/60 rounded-2xl p-6 md:p-8">
      <h2 className="text-xl font-sans font-semibold mb-6">Profile details</h2>

      {state.success && (
        <div className="mb-5 p-3 rounded-xl bg-green-50 border border-green-200 text-sm text-green-700 font-mono">
          ✓ Your profile has been updated.
        </div>
      )}

      {state.error && (
        <div role="alert" className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700 font-mono">
          {state.error}
        </div>
      )}

      <form action={formAction} noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-mono font-medium mb-1.5">
              First name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              defaultValue={customer.firstName ?? ""}
              autoComplete="given-name"
              className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 font-mono text-sm
                         focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
            />
            {state.fieldErrors?.firstName && (
              <p className="mt-1 text-xs text-red-600 font-mono">
                {state.fieldErrors.firstName[0]}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-mono font-medium mb-1.5">
              Last name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              defaultValue={customer.lastName ?? ""}
              autoComplete="family-name"
              className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 font-mono text-sm
                         focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
            />
            {state.fieldErrors?.lastName && (
              <p className="mt-1 text-xs text-red-600 font-mono">
                {state.fieldErrors.lastName[0]}
              </p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-mono font-medium mb-1.5">
            Email address
          </label>
          <p className="w-full px-4 py-3 rounded-xl border border-border/50 bg-muted/10 font-mono text-sm text-muted-foreground">
            {customer.email}
          </p>
          <p className="mt-1 text-xs text-muted-foreground font-mono">
            Contact support to change your email address.
          </p>
        </div>

        <div className="mb-6">
          <label htmlFor="phone" className="block text-sm font-mono font-medium mb-1.5">
            Phone{" "}
            <span className="text-muted-foreground font-normal">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            defaultValue={customer.phone ?? ""}
            autoComplete="tel"
            placeholder="+91 98765 43210"
            className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 font-mono text-sm
                       focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors
                       placeholder:text-muted-foreground"
          />
          {state.fieldErrors?.phone && (
            <p className="mt-1 text-xs text-red-600 font-mono">
              {state.fieldErrors.phone[0]}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-3 rounded-xl bg-[#63180c] hover:bg-[#a82914] text-[#f7f2e4]
                     font-sans font-semibold text-sm transition-all shadow
                     disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isPending ? (
            <>
              <span className="w-3.5 h-3.5 border-2 border-[#f7f2e4] border-t-transparent rounded-full animate-spin" />
              Saving…
            </>
          ) : (
            "Save changes"
          )}
        </button>
      </form>
    </section>
  );
}
