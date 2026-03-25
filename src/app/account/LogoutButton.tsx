"use client";

/**
 * Logout button — client component.
 * Posts to the /auth/logout route handler which invalidates the session
 * server-side (calls customerAccessTokenDelete on Shopify, then clears cookie).
 */

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function handleLogout() {
    setIsPending(true);
    try {
      const response = await fetch("/auth/logout", { method: "POST" });
      if (response.redirected) {
        // Follow the server redirect to /login
        router.push(new URL(response.url).pathname);
        router.refresh();
      } else {
        router.push("/login");
        router.refresh();
      }
    } catch {
      // Even on network failure, push to login — the session will expire naturally
      router.push("/login");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground
                 hover:text-red-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {isPending ? (
        <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <LogOut className="h-3.5 w-3.5" />
      )}
      {isPending ? "Signing out…" : "Sign out"}
    </button>
  );
}
