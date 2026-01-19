import { DashboardSidebar } from "@/components/sidebar-03/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { RequireAuth } from "@/services/auth/auth-provider";
import { Providers } from "../providers";

export default function AppLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    <RequireAuth>
                        <SidebarProvider>
                            <div className="relative flex h-screen w-full">
                                <DashboardSidebar />
                                <SidebarInset className="flex flex-col">
                                    {children}
                                </SidebarInset>
                            </div>
                        </SidebarProvider>
                    </RequireAuth>
                </Providers>
            </body>
        </html>
    );
}
