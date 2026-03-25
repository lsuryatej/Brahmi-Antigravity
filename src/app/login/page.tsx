/**
 * /login — Server Component wrapper.
 *
 * Responsibilities:
 * 1. If already authenticated → redirect to /account (or the intended page)
 * 2. Pass session-expired reason to the client form for UX messaging
 * 3. Render the LoginForm client component
 *
 * Follows server-parent / client-child composition pattern:
 * the server fetches auth state; the client handles the interactive form.
 */

import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import LoginForm from "./LoginForm";

interface Props {
  searchParams: Promise<{
    redirect?: string;
    reason?: string;
  }>;
}

export const metadata = { title: "Sign in — Brahmi" };

export default async function LoginPage({ searchParams }: Props) {
  // Already logged in — bounce to account or the intended destination
  const session = await getSession();
  const params = await searchParams;

  if (session) {
    const destination =
      params.redirect && params.redirect.startsWith("/")
        ? params.redirect
        : "/account";
    redirect(destination);
  }

  const sessionExpired = params.reason === "session-expired";

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-16">
      <div className="w-full max-w-md">
        <LoginForm
          redirectTo={params.redirect}
          sessionExpired={sessionExpired}
        />
      </div>
    </div>
  );
}
