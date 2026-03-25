"use client";

/**
 * Login form — client component.
 * Handles interactive state: loading spinner, error display, retry UX.
 * All auth logic lives in the server action (actions.ts).
 *
 * India UX considerations:
 * - Generous loading state with spinner (10s+ requests on slow 4G)
 * - Retry message after failure rather than immediate hard error
 * - Plain English throughout — no HTTP codes
 */

import { useActionState, useEffect, useRef } from "react";
import Link from "next/link";
import { loginAction, type LoginState } from "./actions";

interface Props {
  redirectTo?: string;
  sessionExpired?: boolean;
}

const initialState: LoginState = {};

export default function LoginForm({ redirectTo, sessionExpired }: Props) {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);
  const emailRef = useRef<HTMLInputElement>(null);

  // Focus the email field on mount
  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  return (
    <div className="bg-background border border-border/60 rounded-2xl shadow-sm p-8 md:p-10">
      {/* Logo / Brand */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold font-sans tracking-tight">
          Welcome back
        </h1>
        <p className="text-sm text-muted-foreground font-mono mt-2">
          Sign in to your Brahmi account
        </p>
      </div>

      {/* Session-expired banner (from middleware redirect) */}
      {sessionExpired && (
        <div className="mb-5 p-3 rounded-xl bg-amber-50 border border-amber-200 text-sm text-amber-800 font-mono">
          Your session has ended. Please log in again to continue.
        </div>
      )}

      {/* Global error */}
      {state.error && (
        <div
          role="alert"
          className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700 font-mono"
        >
          {state.error}
        </div>
      )}

      <form action={formAction} noValidate>
        {/* Hidden redirect target */}
        {redirectTo && (
          <input type="hidden" name="redirectTo" value={redirectTo} />
        )}

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-mono font-medium mb-1.5"
          >
            Email address
          </label>
          <input
            ref={emailRef}
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            aria-describedby={
              state.fieldErrors?.email ? "email-error" : undefined
            }
            className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 font-mono text-sm
                       focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent
                       transition-colors placeholder:text-muted-foreground"
            placeholder="you@example.com"
          />
          {state.fieldErrors?.email && (
            <p id="email-error" className="mt-1.5 text-xs text-red-600 font-mono">
              {state.fieldErrors.email[0]}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="password"
              className="block text-sm font-mono font-medium"
            >
              Password
            </label>
            {/* TODO: Add forgot-password route when Shopify customer recovery is wired */}
            <span className="text-xs text-muted-foreground font-mono">
              Forgot password?{" "}
              <a
                href={`mailto:hello@wearbrahmi.com?subject=Password reset request`}
                className="underline hover:text-accent transition-colors"
              >
                Contact us
              </a>
            </span>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            aria-describedby={
              state.fieldErrors?.password ? "password-error" : undefined
            }
            className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 font-mono text-sm
                       focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent
                       transition-colors placeholder:text-muted-foreground"
            placeholder="••••••••"
          />
          {state.fieldErrors?.password && (
            <p id="password-error" className="mt-1.5 text-xs text-red-600 font-mono">
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
              Signing in…
            </>
          ) : (
            "Sign in"
          )}
        </button>

        {/* Slow-network reassurance */}
        {isPending && (
          <p className="mt-3 text-center text-xs text-muted-foreground font-mono">
            This may take a moment on slower connections…
          </p>
        )}
      </form>

      {/* Divider + signup link */}
      <div className="mt-8 pt-6 border-t border-border/50 text-center">
        <p className="text-sm font-mono text-muted-foreground">
          New to Brahmi?{" "}
          <Link
            href="/signup"
            className="text-accent underline hover:no-underline transition-all"
          >
            Create an account
          </Link>
        </p>
      </div>

      {/* Guest checkout note */}
      <p className="mt-4 text-center text-xs text-muted-foreground font-mono">
        You don&apos;t need an account to shop.{" "}
        <Link href="/collections/sutr" className="underline hover:text-accent">
          Continue as guest
        </Link>
      </p>
    </div>
  );
}
