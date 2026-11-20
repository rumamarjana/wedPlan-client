import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields } from "better-auth/client/plugins"
import type { auth } from "@/lib/auth"

export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
     baseURL: process.env.BETTER_AUTH_URL,
    // lets the client type/send `user.additionalFields` (e.g. `role`) on sign-up
    plugins: [inferAdditionalFields<typeof auth>()],
})

export const { signIn, signUp, useSession } = createAuthClient({
    plugins: [inferAdditionalFields<typeof auth>()],
})
