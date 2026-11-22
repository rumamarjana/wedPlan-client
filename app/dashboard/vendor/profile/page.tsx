"use client"
import { useEffect, useState } from "react"
import { useApiToken } from "@/lib/api/auth-token"
import { API_BASE_URL } from "@/lib/api/client"
import { toast } from "@/components/ui/toast"
export default function ProfilePage(){
 const {token,session}=useApiToken()
 const [name,setName]=useState(""); const [businessName,setBusinessName]=useState(""); const [image,setImage]=useState("")
 useEffect(()=>{setName(session?.user?.name||""); if(!token)return;fetch(`${API_BASE_URL}/users/me`,{headers:{Authorization:`Bearer ${token}`}}).then(r=>r.json()).then(d=>{setBusinessName(d.user?.businessName||"");setImage(d.user?.image||"")})},[session,token])
 async function save(e:React.FormEvent){e.preventDefault();const r=await fetch(`${API_BASE_URL}/users/me`,{method:"PATCH",headers:{Authorization:`Bearer ${token}`,"Content-Type":"application/json"},body:JSON.stringify({name,businessName,image})});const d=await r.json().catch(()=>({}));if(!r.ok){toast.add({type:"error",title:"Profile update failed",description:d.message});return}toast.add({type:"success",title:"Profile updated"})}
 return <div className="min-h-full bg-[#fdf2f4] p-5 sm:p-8"><h1 className="mb-6 text-2xl font-semibold text-rose-950">Profile Settings</h1><form onSubmit={save} className="max-w-xl space-y-4 rounded-2xl border border-rose-100 bg-white p-5"><label className="block text-sm font-medium">Name<input required value={name} onChange={e=>setName(e.target.value)} className="mt-1 w-full rounded-lg border p-2"/></label><label className="block text-sm font-medium">Business Name<input value={businessName} onChange={e=>setBusinessName(e.target.value)} className="mt-1 w-full rounded-lg border p-2"/></label><label className="block text-sm font-medium">Profile Image URL<input value={image} onChange={e=>setImage(e.target.value)} className="mt-1 w-full rounded-lg border p-2"/></label><button className="rounded-lg bg-rose-900 px-5 py-2.5 text-sm font-semibold text-white">Save Changes</button></form></div>
}
