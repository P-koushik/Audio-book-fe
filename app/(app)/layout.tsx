import { DashboardSidebar } from "@/components/sidebar-03/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function AppLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <SidebarProvider>
                    <div className="relative flex h-screen w-full">
                        <DashboardSidebar />
                        <SidebarInset className="flex flex-col" />
                    </div>
                    {children}
                </SidebarProvider>

            </body>
        </html>
    );
}