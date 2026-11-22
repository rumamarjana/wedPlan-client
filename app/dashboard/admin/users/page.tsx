"use client"
import { useEffect, useState } from "react"
import { authClient } from "@/lib/auth-client"
import { API_BASE_URL } from "@/lib/api/client"
import { toast } from "@/components/ui/toast"
type User={id:string;name:string;email:string;role:string;isBlocked:boolean}
export default function AdminUsersPage(){
 const {data:session}=authClient.useSession();const token=(session as unknown as {session?:{token?:string}})?.session?.token
 const [users,setUsers]=useState<User[]>([]);const [search,setSearch]=useState("");const [role,setRole]=useState("")
 async function load(){if(!token)return;const query=new URLSearchParams();if(search)query.set("search",search);if(role)query.set("role",role);const r=await fetch(`${API_BASE_URL}/admin/users?${query}`,{headers:{Authorization:`Bearer ${token}`}});const d=await r.json();setUsers(Array.isArray(d)?d:[])}
 useEffect(()=>{load()},[token,role])
 async function toggle(u:User){const r=await fetch(`${API_BASE_URL}/admin/users/${u.id}/block`,{method:"PATCH",headers:{Authorization:`Bearer ${token}`,"Content-Type":"application/json"},body:JSON.stringify({isBlocked:!u.isBlocked})});if(!r.ok){toast.add({type:"error",title:"Update failed"});return}toast.add({type:"success",title:u.isBlocked?"User unblocked":"User blocked"});load()}
 return <div className="min-h-full bg-[#fdf2f4] p-5 sm:p-8"><h1 className="mb-6 text-2xl font-semibold text-rose-950">Manage Users</h1><div className="mb-4 flex flex-wrap gap-2"><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search name or email" className="rounded-lg border bg-white px-3 py-2 text-sm"/><select value={role} onChange={e=>setRole(e.target.value)} className="rounded-lg border bg-white px-3 py-2 text-sm"><option value="">All roles</option><option value="customer">Customer</option><option value="vendor">Vendor</option><option value="admin">Admin</option></select><button onClick={load} className="rounded-lg bg-rose-900 px-4 py-2 text-sm font-semibold text-white">Search</button></div><div className="overflow-x-auto rounded-2xl border border-rose-100 bg-white"><table className="w-full text-left text-sm"><thead><tr className="border-b"><th className="p-3">Name</th><th>Email</th><th>Role</th><th>Status</th><th></th></tr></thead><tbody>{users.map(u=><tr key={u.id} className="border-b last:border-0"><td className="p-3">{u.name}</td><td>{u.email}</td><td>{u.role}</td><td>{u.isBlocked?"Blocked":"Active"}</td><td className="p-3"><button onClick={()=>toggle(u)} className="rounded-lg border px-3 py-1.5">{u.isBlocked?"Unblock":"Block"}</button></td></tr>)}</tbody></table></div></div>
}
