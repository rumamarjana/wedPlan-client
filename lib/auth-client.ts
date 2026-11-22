import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields } from "better-auth/client/plugins"
import type { auth } from "@/lib/auth"

/**
 * The auth handler is mounted in this Next.js app at `/api/auth`, so the
 * browser must always call the origin that served the page. Resolving the
 * origin at runtime (instead of baking `NEXT_PUBLIC_BETTER_AUTH_URL` into the
 * bundle at build time) keeps sign-in/sign-up working on Vercel production
 * and preview deployments, where the URL is only known at runtime.
 */
function getBaseURL() {
  if (typeof window !== "undefined") return window.location.origin
  return process.env.NEXT_PUBLIC_BETTER_AUTH_URL
}

const baseURL = getBaseURL()

export const authClient = createAuthClient({
  ...(baseURL ? { baseURL } : {}),
  plugins: [inferAdditionalFields<typeof auth>()],
})
