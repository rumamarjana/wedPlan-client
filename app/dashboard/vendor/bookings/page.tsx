"use client"
import { useEffect, useState } from "react"
import { authClient } from "@/lib/auth-client"
import { API_BASE_URL } from "@/lib/api/client"
import { toast } from "@/components/ui/toast"
type Booking={_id:string;eventDate:string;eventLocation:string;message:string;status:string}
export default function VendorBookingsPage(){
 const {data:session}=authClient.useSession(); const [items,setItems]=useState<Booking[]>([]); const [loading,setLoading]=useState(true)
 const token=(session as unknown as {session?:{token?:string}})?.session?.token
 async function load(){if(!token)return;setLoading(true);const r=await fetch(`${API_BASE_URL}/bookings/my`,{headers:{Authorization:`Bearer ${token}`}});const d=await r.json();setItems(Array.isArray(d)?d:[]);setLoading(false)}
 useEffect(()=>{load()},[token])
 async function update(id:string,status:string){const r=await fetch(`${API_BASE_URL}/bookings/${id}/status`,{method:"PATCH",headers:{Authorization:`Bearer ${token}`,"Content-Type":"application/json"},body:JSON.stringify({status})});const d=await r.json().catch(()=>({}));if(!r.ok){toast.add({type:"error",title:"Action failed",description:d.message});return}toast.add({type:"success",title:`Booking ${status.toLowerCase()}`});load()}
 return <div className="min-h-full bg-[#fdf2f4] p-5 sm:p-8"><h1 className="mb-6 text-2xl font-semibold text-rose-950">Booking Requests</h1>{loading?<p>Loading requests...</p>:items.length===0?<p>No booking requests.</p>:<div className="space-y-3">{items.map(b=><article key={b._id} className="rounded-2xl border border-rose-100 bg-white p-4"><div className="flex flex-wrap justify-between gap-4"><div><p className="font-semibold text-rose-950">{b.eventLocation}</p><p className="text-sm text-rose-900/60">{b.eventDate}</p><p className="mt-2 text-sm">{b.message||"No message"}</p></div><div className="flex items-end gap-2">{b.status==="Pending"&&<><button onClick={()=>update(b._id,"Accepted")} className="rounded-lg bg-rose-900 px-3 py-2 text-xs font-semibold text-white">Accept</button><button onClick={()=>update(b._id,"Rejected")} className="rounded-lg border border-rose-300 px-3 py-2 text-xs font-semibold text-rose-900">Reject</button></>}<span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-800">{b.status}</span></div></div></article>)}</div>}</div>
}
