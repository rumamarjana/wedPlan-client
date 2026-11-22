"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRightIcon, HeartIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { toast } from "@/components/ui/toast"
import { createBooking } from "@/lib/api/services"
import { useApiToken } from "@/lib/api/auth-token"

export function BookingBar({
  serviceName,
  serviceId,
}: {
  serviceName: string
  serviceId: string
}) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()
  const { token, session } = useApiToken()

  async function handleBooking() {
    if (!session?.user) {
      const redirectTo = `/browse-services/${serviceId}`
      router.push(`/sign-in?redirectTo=${encodeURIComponent(redirectTo)}`)
      return
    }

    if (!token) {
      toast.add({
        type: "error",
        title: "Please try again in a moment",
        description: "We are still setting up your session.",
      })
      return
    }

    const eventDate = window.prompt("Event date (YYYY-MM-DD)")
    if (!eventDate) return
    const eventLocation = window.prompt("Event location")
    if (!eventLocation) return
    const message = window.prompt("Additional message") || ""

    setSubmitting(true)
    try {
      await createBooking(
        { serviceId, eventDate, eventLocation, message },
        token
      )
      toast.add({
        type: "success",
        title: "Booking request sent",
        description: "The vendor can now review your request.",
      })
    } catch (error) {
      toast.add({
        type: "error",
        title: "Booking failed",
        description:
          error instanceof Error
            ? error.message
            : "Could not reach the server. Please try again.",
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <aside className="fixed inset-x-0 bottom-0 z-40 border-t border-rose-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-3">
        <button
          type="button"
          onClick={handleBooking}
          disabled={submitting}
          aria-label={`Book ${serviceName}`}
          className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-rose-900 px-6 text-sm font-semibold text-white transition-colors hover:bg-rose-950 disabled:opacity-60"
        >
          {submitting ? "Sending request..." : "Book This Service"}
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
