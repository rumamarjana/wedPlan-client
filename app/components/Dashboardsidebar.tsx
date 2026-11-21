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
import { auth } from "@/lib/auth";
import { Plus } from "lucide-react"



const menuItemsByRole = {
    customer: [

    ],
    vendor: [

    ],
    admin: [

    ]
}




export function Dashboardsidebar() {
    const { data: session, isPending } = auth.useSession();
    const role = session?.user?.role || 'customer';



    return (
        <Sidebar>
            <SidebarHeader />
            <SidebarContent>
                <SidebarGroup />
                <SidebarGroup />
                <SidebarGroup>
                    <SidebarMenu>
                        {
                            // menuItemsByRole[role].map((item) => (
                            //     <SidebarMenuItem key={item.name}>
                            //         <SidebarMenuButton render={<a href={item.url} />}>
                            //             <item.icon />
                            //             <span>{item.name}</span>
                            //         </SidebarMenuButton>
                            //     </SidebarMenuItem>
                            // ))
                        }
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}