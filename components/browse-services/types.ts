import type { ApiService } from "@/lib/api/services"

/** Service shape used by the browse UI. API records can be partial, so fields
 * are optional and the card falls back gracefully when data is missing. */
export type BrowseService = Partial<ApiService> & {
  rating?: number
  reviews?: number
}

export type FilterOption = {
  value: string
  label: string
}
