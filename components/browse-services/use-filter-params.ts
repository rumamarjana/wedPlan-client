"use client"

import { useCallback } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

/**
 * Keeps browse filters in the URL so the Server Component page can re-run
 * `getServices` with the new query string whenever a filter changes.
 */
export function useFilterParams() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const setParams = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString())

      Object.entries(updates).forEach(([name, value]) => {
        if (value) params.set(name, value)
        else params.delete(name)
      })

      const query = params.toString()
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      })
    },
    [pathname, router, searchParams]
  )

  const setParam = useCallback(
    (name: string, value: string) => setParams({ [name]: value }),
    [setParams]
  )

  const toggleParam = useCallback(
    (name: string, value: string) => {
      setParam(name, searchParams.get(name) === value ? "" : value)
    },
    [searchParams, setParam]
  )

  return { searchParams, setParam, setParams, toggleParam }
}
