"use client"
import { useEffect, useState } from "react"
import { useApiToken } from "@/lib/api/auth-token"
import { API_BASE_URL } from "@/lib/api/client"
import { toast } from "@/components/ui/toast"
type Service={_id:string;serviceName:string;category:string;status:string;active:boolean}
export default function AdminServicesPage(){
 const {token}=useApiToken()
 const [items,setItems]=useState<Service[]>([]);const [search,setSearch]=useState("")
 async function load(){if(!token)return;const r=await fetch(`${API_BASE_URL}/services?search=${encodeURIComponent(search)}`,{headers:{Authorization:`Bearer ${token}`}});const d=await r.json();setItems(Array.isArray(d)?d:[])}
 useEffect(()=>{load()},[token])
 async function action(id:string,status:string){const r=await fetch(`${API_BASE_URL}/services/${id}`,{method:"PATCH",headers:{Authorization:`Bearer ${token}`,"Content-Type":"application/json"},body:JSON.stringify({status})});if(!r.ok){toast.add({type:"error",title:"Update failed"});return}toast.add({type:"success",title:`Service ${status}`});load()}
 async function remove(id:string){if(!window.confirm("Delete this service?"))return;const r=await fetch(`${API_BASE_URL}/services/${id}`,{method:"DELETE",headers:{Authorization:`Bearer ${token}`}});if(r.ok){toast.add({type:"success",title:"Service deleted"});load()}else toast.add({type:"error",title:"Delete failed"})}
 return <div className="min-h-full bg-[#fdf2f4] p-5 sm:p-8"><h1 className="mb-6 text-2xl font-semibold text-rose-950">Manage Services</h1><div className="mb-4 flex gap-2"><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search services" className="rounded-lg border bg-white px-3 py-2 text-sm"/><button onClick={load} className="rounded-lg bg-rose-900 px-4 py-2 text-sm font-semibold text-white">Search</button></div><div className="grid gap-3 sm:grid-cols-2">{items.map(s=><article key={s._id} className="rounded-2xl border border-rose-100 bg-white p-4"><p className="font-semibold text-rose-950">{s.serviceName}</p><p className="text-sm text-rose-900/60">{s.category} · {s.status}</p><div className="mt-3 flex flex-wrap gap-2">{s.status!=="approved"&&<button onClick={()=>action(s._id,"approved")} className="rounded-lg bg-rose-900 px-3 py-2 text-xs font-semibold text-white">Approve</button>}{s.status!=="rejected"&&<button onClick={()=>action(s._id,"rejected")} className="rounded-lg border px-3 py-2 text-xs">Reject</button>}<button onClick={()=>remove(s._id)} className="ml-auto text-xs text-rose-700">Delete</button></div></article>)}</div></div>
}
