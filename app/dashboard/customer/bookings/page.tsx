"use client"
import { useEffect, useState } from "react"
import { useApiToken } from "@/lib/api/auth-token"
import { cancelBooking, getMyBookings, type ApiBooking } from "@/lib/api/services"
import { toast } from "@/components/ui/toast"

export default function CustomerBookingsPage() {
  const { token } = useApiToken()
  const [items, setItems] = useState<ApiBooking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!token) return

    let active = true
    getMyBookings(token)
      .then((bookings) => {
        if (active) setItems(bookings)
      })
      .catch((error: unknown) => {
        if (!active) return
        toast.add({
          type: "error",
          title: "Could not load bookings",
          description: error instanceof Error ? error.message : "Please try again.",
        })
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [token])

  async function cancel(id: string) {
    if (!token) return
    try {
      await cancelBooking(id, token)
      setItems((current) =>
        current.map((booking) =>
          booking._id === id ? { ...booking, status: "Cancelled" } : booking
        )
      )
      toast.add({ type: "success", title: "Booking cancelled" })
    } catch (error) {
      toast.add({
        type: "error",
        title: "Could not cancel",
        description: error instanceof Error ? error.message : "Please try again.",
      })
    }
  }

  return (
    <div className="min-h-full bg-[#fdf2f4] p-5 sm:p-8">
      <h1 className="mb-6 text-2xl font-semibold text-rose-950">My Bookings</h1>
      {loading ? (
        <p>Loading bookings...</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-rose-900/60">No booking requests yet.</p>
      ) : (
        <div className="space-y-3">
          {items.map((booking) => (
            <article
              key={booking._id}
              className="rounded-2xl border border-rose-100 bg-white p-4"
            >
              <div className="flex flex-wrap justify-between gap-3">
                <div>
                  <p className="font-semibold text-rose-950">{booking.eventLocation}</p>
                  <p className="text-sm text-rose-900/60">{booking.eventDate}</p>
                  <p className="mt-2 text-sm">
                    {booking.message || "No additional message"}
                  </p>
                </div>
                <div className="text-right">
                  <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-800">
                    {booking.status}
                  </span>
                  {booking.status === "Pending" && (
                    <button
                      onClick={() => cancel(booking._id)}
                      className="mt-3 block rounded-lg border border-rose-300 px-3 py-2 text-xs font-semibold text-rose-900"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
