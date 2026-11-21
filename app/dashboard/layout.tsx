import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Dashboardsidebar } from "../components/Dashboardsidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <Dashboardsidebar />
            <main className="min-w-0 flex-1">
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    )
};

export default DashboardLayout;