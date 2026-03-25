import type { NextConfig } from "next";

const SHOPIFY_DOMAIN =
  process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN ?? "wxbq05-r4.myshopify.com";

const nextConfig: NextConfig = {
  // ─── Security headers ────────────────────────────────────────────────────────
  // Applied to every response.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevent clickjacking
          { key: "X-Frame-Options", value: "DENY" },

          // Prevent MIME-type sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },

          // HSTS — 2 years, including subdomains
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },

          // Referrer: send origin only on cross-origin requests
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },

          // Permissions policy — disable features not used
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },

          // Content Security Policy
          // - default-src 'self'
          // - scripts: self + Next.js inline scripts + Vercel
          // - styles: self + unsafe-inline (required for Tailwind runtime injection)
          // - images: self + Shopify CDN
          // - connect: self + Shopify Storefront API + Vercel analytics
          // - frame-ancestors: none (belt-and-suspenders with X-Frame-Options)
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // Next.js App Router requires 'unsafe-inline' and 'unsafe-eval' in dev;
              // in production only nonce-based inline scripts are needed — for simplicity
              // we allow 'unsafe-inline' and restrict by host.
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              `img-src 'self' data: blob: https://cdn.shopify.com https://${SHOPIFY_DOMAIN}`,
              `connect-src 'self' https://${SHOPIFY_DOMAIN} https://cdn.shopify.com`,
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },

  // ─── Images ──────────────────────────────────────────────────────────────────
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
      {
        protocol: "https",
        hostname: SHOPIFY_DOMAIN,
      },
    ],
  },
};

export default nextConfig;
