import { DashboardSidebar } from "@/components/sidebar-03/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { RequireAuth } from "@/providers/auth/require-auth";

export default function AppLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <RequireAuth>
            <SidebarProvider>
                <div className="relative flex h-screen w-full">
                    <DashboardSidebar />
                    <SidebarInset className="py-2 h-screen">{children}</SidebarInset>
                </div>
            </SidebarProvider>
        </RequireAuth>
    );
}
