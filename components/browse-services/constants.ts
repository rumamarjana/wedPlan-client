import type { FilterOption } from "./types"

// Values match the category/location/feature fields returned by the API.
export const CATEGORY_OPTIONS: FilterOption[] = [
  { value: "Wedding Decoration", label: "Decoration" },
  { value: "Photography", label: "Photography" },
  { value: "Catering", label: "Catering" },
  { value: "Makeup", label: "Makeup" },
  { value: "Other", label: "Other" },
]

export const LOCATION_OPTIONS: FilterOption[] = [
  { value: "Dhaka", label: "Dhaka" },
  { value: "Chattogram", label: "Chattogram" },
  { value: "Sylhet", label: "Sylhet" },
  { value: "Rajshahi", label: "Rajshahi" },
  { value: "Khulna", label: "Khulna" },
  { value: "Barishal", label: "Barishal" },
  { value: "Rangpur", label: "Rangpur" },
  { value: "Cumilla", label: "Cumilla" },
  { value: "Gazipur", label: "Gazipur" },
  { value: "Cox's Bazar", label: "Cox's Bazar" },
  { value: "Mymensingh", label: "Mymensingh" },
]

export const BENEFIT_OPTIONS: FilterOption[] = [
  { value: "consultation", label: "Free consultation" },
  { value: "custom", label: "Custom packages" },
  { value: "onsite", label: "On-site support" },
]

export const SORT_OPTIONS: FilterOption[] = [
  { value: "newest", label: "Newest First" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
]

export const MAX_PRICE = 60_000

export function formatPrice(value?: string | number): string {
  const amount = Number(String(value ?? 0).replace(/,/g, ""))
  return Number.isFinite(amount) ? amount.toLocaleString("en-US") : "0"
}
