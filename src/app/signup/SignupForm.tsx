"use client";

import { useActionState, useEffect, useRef } from "react";
import Link from "next/link";
import { signupAction, type SignupState } from "./actions";

const initialState: SignupState = {};

export default function SignupForm() {
  const [state, formAction, isPending] = useActionState(signupAction, initialState);
  const firstNameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    firstNameRef.current?.focus();
  }, []);

  return (
    <div className="bg-background border border-border/60 rounded-2xl shadow-sm p-8 md:p-10">
      <div className="mb-8 text-center">
        <h1 className="text-xl font-bold font-sans tracking-tight">
          Create account
        </h1>
        <p className="text-sm text-muted-foreground font-mono mt-2">
          Join Brahmi — no spam, just orders and updates
        </p>
      </div>

      {/* Global error */}
      {state.error && (
        <div role="alert" className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700 font-mono">
          {state.error}
        </div>
      )}

      {/* India email caveat */}
      <div className="mb-5 p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-700 font-mono">
        📧 After signing up, Shopify may send a welcome email. If you use a BSNL,
        Rediffmail, or government email address, it may take a few minutes and
        could land in spam.
      </div>

      <form action={formAction} noValidate>
        {/* Name row */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-mono font-medium mb-1.5">
              First name
            </label>
            <input
              ref={firstNameRef}
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="given-name"
              required
              className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 font-mono text-sm
                         focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent
                         transition-colors placeholder:text-muted-foreground"
              placeholder="Priya"
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
              autoComplete="family-name"
              required
              className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 font-mono text-sm
                         focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent
                         transition-colors placeholder:text-muted-foreground"
              placeholder="Sharma"
            />
            {state.fieldErrors?.lastName && (
              <p className="mt-1 text-xs text-red-600 font-mono">
                {state.fieldErrors.lastName[0]}
              </p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-mono font-medium mb-1.5">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 font-mono text-sm
                       focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent
                       transition-colors placeholder:text-muted-foreground"
            placeholder="you@gmail.com"
          />
          {state.fieldErrors?.email && (
            <p className="mt-1.5 text-xs text-red-600 font-mono">
              {state.fieldErrors.email[0]}
            </p>
          )}
        </div>

        {/* Phone (optional) */}
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-mono font-medium mb-1.5">
            Phone{" "}
            <span className="text-muted-foreground font-normal">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 font-mono text-sm
                       focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent
                       transition-colors placeholder:text-muted-foreground"
            placeholder="+91 98765 43210"
          />
          {state.fieldErrors?.phone && (
            <p className="mt-1.5 text-xs text-red-600 font-mono">
              {state.fieldErrors.phone[0]}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-mono font-medium mb-1.5">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 font-mono text-sm
                       focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent
                       transition-colors placeholder:text-muted-foreground"
            placeholder="At least 8 characters"
          />
          {state.fieldErrors?.password && (
            <p className="mt-1.5 text-xs text-red-600 font-mono">
              {state.fieldErrors.password[0]}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full py-3.5 rounded-xl bg-[#63180c] hover:bg-[#a82914] text-[#f7f2e4]
                     font-sans font-semibold text-base transition-all shadow
                     disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isPending ? (
            <>
              <span className="w-4 h-4 border-2 border-[#f7f2e4] border-t-transparent rounded-full animate-spin" />
              Creating account…
            </>
          ) : (
            "Create account"
          )}
        </button>

        {isPending && (
          <p className="mt-3 text-center text-xs text-muted-foreground font-mono">
            This may take a moment on slower connections…
          </p>
        )}
      </form>

      <div className="mt-8 pt-6 border-t border-border/50 text-center">
        <p className="text-sm font-mono text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-accent underline hover:no-underline">
            Sign in
          </Link>
        </p>
      </div>

      <p className="mt-4 text-center text-xs text-muted-foreground font-mono">
        No account needed to shop.{" "}
        <Link href="/collections/sutr" className="underline hover:text-accent">
          Continue as guest
        </Link>
      </p>
    </div>
  );
}
