"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRightIcon, HeartIcon } from "lucide-react"

import { authClient } from "@/lib/auth-client"
import { cn } from "@/lib/utils"
import { toast } from "@/components/ui/toast"
import { API_BASE_URL } from "@/lib/api/client"

export function BookingBar({
  serviceName,
  serviceId,
}: {
  serviceName: string
  serviceId: string
}) {
  const [isFavorite, setIsFavorite] = useState(false)
  const router = useRouter()
  const { data: session } = authClient.useSession()

  async function handleBooking() {
    if (!session?.user) {
      const redirectTo = `/browse-services/${serviceId}`
      router.push(`/sign-in?redirectTo=${encodeURIComponent(redirectTo)}`)
      return
    }
    const eventDate = window.prompt("Event date (YYYY-MM-DD)")
    if (!eventDate) return
    const eventLocation = window.prompt("Event location")
    if (!eventLocation) return
    const message = window.prompt("Additional message") || ""
    const token = (session as unknown as { session?: { token?: string } })?.session?.token
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: JSON.stringify({ serviceId, eventDate, eventLocation, message }),
    })
    const data = await response.json().catch(() => ({}))
    if (!response.ok) {
      toast.add({ type: "error", title: "Booking failed", description: data.message || "Please try again." })
      return
    }
    toast.add({ type: "success", title: "Booking request sent", description: "The vendor can now review your request." })
  }

  return (
    <aside className="fixed inset-x-0 bottom-0 z-40 border-t border-rose-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-3">
        <button
          type="button"
          onClick={handleBooking}
          aria-label={`Book ${serviceName}`}
          className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-rose-900 px-6 text-sm font-semibold text-white transition-colors hover:bg-rose-950"
        >
          Book This Service
          <ArrowRightIcon className="size-4" />
        </button>

        <button
          type="button"
          onClick={() => setIsFavorite((value) => !value)}
          aria-label={isFavorite ? "Remove from favorites" : "Save service"}
          aria-pressed={isFavorite}
          className="flex size-11 shrink-0 items-center justify-center rounded-full border border-rose-200 text-rose-500 transition-colors hover:bg-rose-50"
        >
          <HeartIcon
            className={cn("size-5", isFavorite && "fill-rose-500 text-rose-500")}
          />
        </button>
      </div>
    </aside>
  )
}
