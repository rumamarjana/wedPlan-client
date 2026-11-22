 "use client"
import { useEffect, useState } from "react"
import { authClient } from "@/lib/auth-client"
import { API_BASE_URL } from "@/lib/api/client"

export default function AdminDashboardPage() {
  const { data: session } = authClient.useSession()
  const [stats, setStats] = useState<Record<string, number>>({})
  useEffect(() => {
    const token = (session as unknown as { session?: { token?: string } })?.session?.token
    if (!token) return
    fetch(`${API_BASE_URL}/admin/stats`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()).then(d => setStats(d.stats || {})).catch(() => {})
  }, [session])
  const labels: Record<string,string> = { totalUsers:"Total Users",vendors:"Vendors",customers:"Customers",totalServices:"Total Services",pendingServices:"Pending Services",totalTransactions:"Transactions" }
  return <div className="min-h-full bg-[#fdf2f4] p-5 sm:p-8"><h1 className="mb-6 text-2xl font-semibold text-rose-950">Admin Overview</h1><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{Object.entries(labels).map(([key,label]) => <div key={key} className="rounded-2xl border border-rose-100 bg-white p-5 shadow-sm"><p className="text-sm text-rose-900/60">{label}</p><p className="mt-2 text-3xl font-bold text-rose-950">{stats[key] ?? 0}</p></div>)}</div></div>
}