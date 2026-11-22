"use client"

import { useEffect, useState } from "react"

import { authClient } from "@/lib/auth-client"
import { API_BASE_URL } from "@/lib/api/client"

/**
 * Better Auth and the Express API are two separate services with two separate
 * user stores. The Express API does not accept Better Auth session tokens
 * directly - it expects its own JWT, issued by `POST /auth/token`. That
 * endpoint also copies the Better Auth user into the API's `users` collection
 * on first use, so every authenticated request has an account to resolve.
 */

type AuthSession = {
  session?: { token?: string }
  user?: {
    id?: string
    name?: string | null
    email?: string
    image?: string | null
    role?: string | null
  }
}

let cachedSessionToken: string | undefined
let cachedApiToken: string | undefined
let pendingExchange: Promise<string | undefined> | null = null

export async function getApiToken(session: AuthSession | null | undefined): Promise<string | undefined> {
  const sessionToken = session?.session?.token
  if (!sessionToken) return undefined

  if (cachedSessionToken === sessionToken && cachedApiToken) return cachedApiToken
  if (pendingExchange) return pendingExchange

  pendingExchange = (async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionToken,
          user: session?.user
            ? {
                id: session.user.id,
                name: session.user.name,
                email: session.user.email,
                image: session.user.image,
                role: session.user.role,
              }
            : undefined,
        }),
      })

      const data = await response.json().catch(() => ({}))
      if (!response.ok || !data.token) {
        throw new Error(data.message || `Token exchange failed (${response.status})`)
      }

      cachedSessionToken = sessionToken
      cachedApiToken = data.token as string
      return cachedApiToken
    } catch (error) {
      console.error("Could not obtain API token:", error)
      return undefined
    } finally {
      pendingExchange = null
    }
  })()

  return pendingExchange
}

/**
 * Returns an API-ready JWT for the signed-in Better Auth user. It is `undefined`
 * while the session or the exchange is still loading, so callers can simply
 * wait for it instead of sending an unauthenticated request.
 */
export function useApiToken() {
  const { data: session, isPending } = authClient.useSession()
  const [token, setToken] = useState<string | undefined>(() =>
    cachedSessionToken === session?.session?.token ? cachedApiToken : undefined,
  )

  const sessionToken = session?.session?.token

  useEffect(() => {
    let active = true

    const sync = async () => {
      if (!session) {
        setToken(undefined)
        return
      }

      if (cachedSessionToken === sessionToken && cachedApiToken) {
        setToken(cachedApiToken)
        return
      }

      const value = await getApiToken(session)
      if (active) setToken(value)
    }

    void sync()

    return () => {
      active = false
    }
  }, [session, sessionToken])

  return { token, session, isPending }
}
