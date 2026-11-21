"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { authClient } from "@/lib/auth-client";
import { isUserRole, type UserRole } from "@/lib/roles";
import type { MenuItemsByRole } from "@/types/menu-item";
import {
    ArrowLeftRight,
    CalendarCheck,
    CirclePlus,
    ClipboardList,
    CreditCard,
    LayoutDashboard,
    UserRoundCog,
    UsersRound,
    Wrench,
} from "lucide-react"


const menuItemsByRole: MenuItemsByRole = {
    customer: [
        { name: "Dashboard", url: "/dashboard/customer", icon: LayoutDashboard },
        { name: "My Bookings", url: "/dashboard/customer/bookings", icon: CalendarCheck },
        { name: "Profile Settings", url: "/dashboard/customer/profile", icon: UserRoundCog },
    ],
    vendor: [
        { name: "Overview", url: "/dashboard/vendor", icon: LayoutDashboard },
        { name: "Add Service", url: "/dashboard/vendor/services/new", icon: CirclePlus },
        { name: "My Services", url: "/dashboard/vendor/services", icon: Wrench },
        { name: "Booking Requests", url: "/dashboard/vendor/bookings", icon: ClipboardList },
        { name: "Subscription", url: "/dashboard/vendor/subscription", icon: CreditCard },
        { name: "Profile Settings", url: "/dashboard/vendor/profile", icon: UserRoundCog },
    ],
    admin: [
        { name: "Overview", url: "/dashboard/admin", icon: LayoutDashboard },
        { name: "Manage Users", url: "/dashboard/admin/users", icon: UsersRound },
        { name: "Manage Services", url: "/dashboard/admin/services", icon: Wrench },
        { name: "Transactions", url: "/dashboard/admin/transactions", icon: ArrowLeftRight },
    ],
}

function resolveRole(value: unknown): UserRole {
    if (Array.isArray(value)) {
        return isUserRole(value[0]) ? value[0] : "customer"
    }
    return isUserRole(value) ? value : "customer"
}


export function Dashboardsidebar() {
    const { data: session } = authClient.useSession();
    const role = resolveRole(session?.user?.role);
    const menuItems = menuItemsByRole[role];

    return (
        <Sidebar>
            <SidebarHeader />
            <SidebarContent>
                <SidebarGroup />
                <SidebarGroup />
                <SidebarGroup>
                    <SidebarMenu>
                        {menuItems.map((item) => (
                            <SidebarMenuItem key={item.name}>
                                <SidebarMenuButton render={<a href={item.url} />}>
                                    <item.icon />
                                    <span>{item.name}</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup> 
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}
