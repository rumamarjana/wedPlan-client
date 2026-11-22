import type { ServiceType } from "@/app/dashboard/vendor/services/new/page"
import { apiRequest } from "@/lib/api/client"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

export type ApiService = ServiceType & {
  _id?: string
  id?: string
}

export type BookingStatus = "Pending" | "Accepted" | "Rejected" | "Cancelled"

export type ApiBooking = {
  _id: string
  serviceId: string
  vendorId?: string
  customerId?: string
  eventDate: string
  eventLocation: string
  message?: string
  status: BookingStatus
  createdAt?: string
  updatedAt?: string
}

export type CreateBookingInput = {
  serviceId: string
  eventDate: string
  eventLocation: string
  message?: string
}

type BookingResponse = {
  success?: boolean
  booking?: ApiBooking
  message?: string
}

export const getservices = async (data: ServiceType, token?: string) => {
  const res = await fetch(`${BASE_URL}/services`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: JSON.stringify(data),
  })

  if (!res.ok) throw new Error(`Failed to add service (${res.status})`)
  return res.json()
}

export const getServices = async (query = ""): Promise<ApiService[]> => {
  const url = query ? `${BASE_URL}/services?${query}` : `${BASE_URL}/services`
  const res = await fetch(url)

  if (!res.ok) throw new Error(`Failed to load services (${res.status})`)

  const data: unknown = await res.json()
  return Array.isArray(data) ? (data as ApiService[]) : []
}

export const getServiceById = async (
  id: string
): Promise<ApiService | null> => {
  try {
    const res = await fetch(`${BASE_URL}/services/${encodeURIComponent(id)}`)

    if (res.status === 404 || res.status === 400) {
      return null
    }

    if (!res.ok) {
      throw new Error(`Failed to fetch service (${res.status})`)
    }

    const data: ApiService = await res.json()

    return data
  } catch (error) {
    console.error("Get Service Details Error:", error)
    throw error
  }
}

export const deleteService = async (id: string, token?: string) => {
  const res = await fetch(`${BASE_URL}/services/${id}`, {
    method: "DELETE",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  })

  if (!res.ok) throw new Error(`Failed to delete service (${res.status})`)
  return res.json()
}

export const updateService = async (id: string, data: Partial<ServiceType>, token?: string) => {
  const res = await fetch(`${BASE_URL}/services/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error(`Failed to update service (${res.status})`)
  return res.json()
}

// ---------------------------------------------------------------------------
// Bookings
//
// The Express API returns `{ success, message, booking }` for writes and a
// plain array for `GET /bookings/my`. `apiRequest` handles the token header,
// JSON parsing and server error messages so callers only deal with the data.
// ---------------------------------------------------------------------------

export const createBooking = async (
  data: CreateBookingInput,
  token?: string
): Promise<ApiBooking> => {
  const result = await apiRequest<BookingResponse>(
    "/bookings",
    { method: "POST", body: JSON.stringify(data) },
    token
  )

  if (!result.booking) {
    throw new Error(result.message || "Booking could not be created")
  }
  return result.booking
}

export const getMyBookings = async (token?: string): Promise<ApiBooking[]> => {
  const data = await apiRequest<unknown>("/bookings/my", {}, token)
  return Array.isArray(data) ? (data as ApiBooking[]) : []
}

export const updateBookingStatus = async (
  id: string,
  status: BookingStatus,
  token?: string
): Promise<ApiBooking> => {
  const result = await apiRequest<BookingResponse>(
    `/bookings/${encodeURIComponent(id)}/status`,
    { method: "PATCH", body: JSON.stringify({ status }) },
    token
  )

  if (!result.booking) {
    throw new Error(result.message || "Booking could not be updated")
  }
  return result.booking
}

export const cancelBooking = (id: string, token?: string) =>
  updateBookingStatus(id, "Cancelled", token)
