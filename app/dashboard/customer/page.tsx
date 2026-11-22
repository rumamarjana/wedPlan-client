 "use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { authClient } from "@/lib/auth-client"
import { API_BASE_URL } from "@/lib/api/client"

export default function CustomerDashboardPage() {
  const { data: session } = authClient.useSession()
  const [counts, setCounts] = useState({ total: 0, Pending: 0, Accepted: 0, Rejected: 0 })
  useEffect(() => {
    const token = (session as unknown as { session?: { token?: string } })?.session?.token
    if (!token) return
    fetch(`${API_BASE_URL}/bookings/my`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json()).then((items) => setCounts({
        total: items.length,
        Pending: items.filter((item: {status:string}) => item.status === "Pending").length,
        Accepted: items.filter((item: {status:string}) => item.status === "Accepted").length,
        Rejected: items.filter((item: {status:string}) => item.status === "Rejected").length,
      })).catch(() => {})
  }, [session])
  const cards = [["Total Requests", counts.total], ["Pending", counts.Pending], ["Accepted", counts.Accepted], ["Rejected", counts.Rejected]]
  return <div className="min-h-full bg-[#fdf2f4] p-5 sm:p-8">
    <h1 className="mb-6 text-2xl font-semibold text-rose-950">Customer Overview</h1>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map(([label, value]) => <div key={String(label)} className="rounded-2xl border border-rose-100 bg-white p-5 shadow-sm"><p className="text-sm text-rose-900/60">{label}</p><p className="mt-2 text-3xl font-bold text-rose-950">{value}</p></div>)}
    </div>
    <Link href="/dashboard/customer/bookings" className="mt-6 inline-block rounded-lg bg-rose-900 px-5 py-2.5 text-sm font-semibold text-white">View My Bookings</Link>
  </div>
}