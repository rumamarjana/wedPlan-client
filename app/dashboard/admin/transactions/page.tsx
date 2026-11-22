"use client"
import { useEffect,useState } from "react"
import {useApiToken} from "@/lib/api/auth-token";import {API_BASE_URL} from "@/lib/api/client"
type Tx={_id:string;vendorId:string;plan:string;amount:number;currency:string;status:string;createdAt:string}
export default function TransactionsPage(){const {token}=useApiToken();const [items,setItems]=useState<Tx[]>([])
 useEffect(()=>{if(!token)return;fetch(`${API_BASE_URL}/admin/transactions`,{headers:{Authorization:`Bearer ${token}`}}).then(r=>r.json()).then(d=>setItems(Array.isArray(d)?d:[]))},[token])
 return <div className="min-h-full bg-[#fdf2f4] p-5 sm:p-8"><h1 className="mb-6 text-2xl font-semibold text-rose-950">Transactions</h1><div className="overflow-x-auto rounded-2xl border border-rose-100 bg-white"><table className="w-full text-left text-sm"><thead><tr className="border-b"><th className="p-3">Vendor</th><th>Plan</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead><tbody>{items.map(t=><tr key={t._id} className="border-b last:border-0"><td className="p-3">{t.vendorId}</td><td>{t.plan}</td><td>{(t.amount/100).toFixed(2)} {t.currency?.toUpperCase()}</td><td>{t.status}</td><td>{t.createdAt?new Date(t.createdAt).toLocaleDateString(): "-"}</td></tr>)}</tbody></table></div></div>}
