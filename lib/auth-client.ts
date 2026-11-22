import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields } from "better-auth/client/plugins"
import type { auth } from "@/lib/auth"


function getBaseURL() {
  if (typeof window !== "undefined") return window.location.origin
  return process.env.NEXT_PUBLIC_BETTER_AUTH_URL
}

const baseURL = getBaseURL()

export const authClient = createAuthClient({
  ...(baseURL ? { baseURL } : {}),
  plugins: [inferAdditionalFields<typeof auth>()],
})
