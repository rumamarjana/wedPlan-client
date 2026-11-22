"use client"
import { useEffect, useState } from "react"
import { authClient } from "@/lib/auth-client"
import { API_BASE_URL } from "@/lib/api/client"
import { toast } from "@/components/ui/toast"

type Booking = {_id:string;eventDate:string;eventLocation:string;message:string;status:string;createdAt:string}

export default function CustomerBookingsPage() {
  const { data: session } = authClient.useSession()
  const [items,setItems] = useState<Booking[]>([])
  const [loading,setLoading] = useState(true)
  const token = (session as unknown as {session?:{token?:string}})?.session?.token
  async function load() {
    if (!token) return
    setLoading(true)
    const r=await fetch(`${API_BASE_URL}/bookings/my`,{headers:{Authorization:`Bearer ${token}`}})
    const data=await r.json()
    setItems(Array.isArray(data)?data:[])
    setLoading(false)
  }
  useEffect(()=>{load()},[token])
  async function cancel(id:string) {
    const r=await fetch(`${API_BASE_URL}/bookings/${id}/status`,{method:"PATCH",headers:{Authorization:`Bearer ${token}`,"Content-Type":"application/json"},body:JSON.stringify({status:"Cancelled"})})
    const data=await r.json().catch(()=>({}))
    if(!r.ok){toast.add({type:"error",title:"Could not cancel",description:data.message});return}
    toast.add({type:"success",title:"Booking cancelled"})
    load()
  }
  return <div className="min-h-full bg-[#fdf2f4] p-5 sm:p-8"><h1 className="mb-6 text-2xl font-semibold text-rose-950">My Bookings</h1>{loading?<p>Loading bookings...</p>:items.length===0?<p className="text-sm text-rose-900/60">No booking requests yet.</p>:<div className="space-y-3">{items.map(b=><article key={b._id} className="rounded-2xl border border-rose-100 bg-white p-4"><div className="flex flex-wrap justify-between gap-3"><div><p className="font-semibold text-rose-950">{b.eventLocation}</p><p className="text-sm text-rose-900/60">{b.eventDate}</p><p className="mt-2 text-sm">{b.message||"No additional message"}</p></div><div className="text-right"><span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-800">{b.status}</span>{b.status==="Pending"&&<button onClick={()=>cancel(b._id)} className="mt-3 block rounded-lg border border-rose-300 px-3 py-2 text-xs font-semibold text-rose-900">Cancel</button>}</div></div></article>)}</div>}</div>
}
