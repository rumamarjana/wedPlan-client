"use client"

import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Dashboardsidebar } from "../components/Dashboardsidebar";
import { Toaster } from "@/components/ui/toast"
import { authClient } from "@/lib/auth-client"
import { isUserRole } from "@/lib/roles"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()
    const pathname = usePathname()
    const { data: session, isPending } = authClient.useSession()

    useEffect(() => {
        if (isPending) return
        if (!session?.user) {
            router.replace(`/sign-in?redirectTo=${encodeURIComponent(pathname)}`)
            return
        }
        const role = isUserRole(session.user.role) ? session.user.role : "customer"
        if (pathname.includes("/dashboard/admin") && role !== "admin") router.replace(`/dashboard/${role}`)
        if (pathname.includes("/dashboard/vendor") && role !== "vendor") router.replace(`/dashboard/${role}`)
        if (pathname.includes("/dashboard/customer") && role !== "customer") router.replace(`/dashboard/${role}`)
    }, [isPending, pathname, router, session])

    if (isPending) return <div className="flex min-h-screen items-center justify-center text-rose-900">Loading dashboard...</div>
    if (!session?.user) return null

    return (
        <SidebarProvider>
            <Dashboardsidebar />
            <main className="min-w-0 flex-1">
                <SidebarTrigger />
                {children}
            </main>
              <Toaster />
        </SidebarProvider>
    )
};

export default DashboardLayout;