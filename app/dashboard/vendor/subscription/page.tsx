"use client"
import { useState } from "react"
import { authClient } from "@/lib/auth-client"
import { API_BASE_URL } from "@/lib/api/client"
import { toast } from "@/components/ui/toast"
export default function SubscriptionPage(){
 const {data:session}=authClient.useSession();const [loading,setLoading]=useState(false)
 async function upgrade(){const token=(session as unknown as {session?:{token?:string}})?.session?.token;if(!token)return;setLoading(true);const r=await fetch(`${API_BASE_URL}/subscriptions/checkout`,{method:"POST",headers:{Authorization:`Bearer ${token}`}});const d=await r.json().catch(()=>({}));setLoading(false);if(!r.ok){toast.add({type:"error",title:"Checkout failed",description:d.message});return}if(d.url)window.location.assign(d.url)}
 return <div className="min-h-full bg-[#fdf2f4] p-5 sm:p-8"><h1 className="mb-6 text-2xl font-semibold text-rose-950">Subscription</h1><div className="grid max-w-4xl gap-5 md:grid-cols-2"><article className="rounded-2xl border border-rose-100 bg-white p-6"><h2 className="text-xl font-semibold text-rose-950">Free</h2><p className="mt-2 text-3xl font-bold text-rose-950">$0</p><ul className="mt-4 space-y-2 text-sm text-rose-900/70"><li>Up to 3 active services</li><li>Booking management</li><li>Vendor dashboard</li></ul></article><article className="rounded-2xl border border-rose-300 bg-gradient-to-br from-white to-rose-50 p-6"><h2 className="text-xl font-semibold text-rose-950">Premium</h2><p className="mt-2 text-3xl font-bold text-rose-950">Monthly</p><ul className="mt-4 space-y-2 text-sm text-rose-900/70"><li>Unlimited active services</li><li>Premium vendor badge</li><li>All free features</li></ul><button disabled={loading} onClick={upgrade} className="mt-5 w-full rounded-lg bg-rose-900 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60">{loading?"Creating checkout...":"Upgrade to Premium"}</button></article></div></div>
}
