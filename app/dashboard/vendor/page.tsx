 "use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { authClient } from "@/lib/auth-client"
import { API_BASE_URL } from "@/lib/api/client"

export default function VendorDashboardPage() {
  const { data: session } = authClient.useSession()
  const [stats, setStats] = useState({ services: 0, active: 0, pending: 0, accepted: 0 })
  useEffect(() => {
    const token = (session as unknown as { session?: { token?: string } })?.session?.token
    if (!token) return
    Promise.all([
      fetch(`${API_BASE_URL}/services`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
      fetch(`${API_BASE_URL}/bookings/my`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
    ]).then(([services, bookings]) => setStats({
      services: services.length,
      active: services.filter((s: {active:boolean}) => s.active).length,
      pending: bookings.filter((b: {status:string}) => b.status === "Pending").length,
      accepted: bookings.filter((b: {status:string}) => b.status === "Accepted").length,
    })).catch(() => {})
  }, [session])
  const cards = [["Total Services", stats.services], ["Active Services", stats.active], ["Pending Requests", stats.pending], ["Accepted Bookings", stats.accepted]]
  return <div className="min-h-full bg-[#fdf2f4] p-5 sm:p-8">
    <h1 className="mb-6 text-2xl font-semibold text-rose-950">Vendor Overview</h1>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{cards.map(([label,value]) => <div key={String(label)} className="rounded-2xl border border-rose-100 bg-white p-5 shadow-sm"><p className="text-sm text-rose-900/60">{label}</p><p className="mt-2 text-3xl font-bold text-rose-950">{value}</p></div>)}</div>
    <div className="mt-6 flex flex-wrap gap-3"><Link href="/dashboard/vendor/services/new" className="rounded-lg bg-rose-900 px-5 py-2.5 text-sm font-semibold text-white">Add Service</Link><Link href="/dashboard/vendor/bookings" className="rounded-lg border border-rose-300 px-5 py-2.5 text-sm font-semibold text-rose-900">Booking Requests</Link></div>
  </div>
}