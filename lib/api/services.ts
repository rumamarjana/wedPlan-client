import type { ServiceType } from "@/app/dashboard/vendor/services/new/page"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

export type ApiService = ServiceType & {
  _id?: string
  id?: string
}

export const getservices = async (data: ServiceType) => {
  const res = await fetch(`${BASE_URL}/services`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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

export const deleteService = async (id: string) => {
  const res = await fetch(`${BASE_URL}/services/${id}`, {
    method: "DELETE",
  })

  if (!res.ok) throw new Error(`Failed to delete service (${res.status})`)
  return res.json()
}
