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
                            <div className="relative flex w-full">
                                <DashboardSidebar />
                                <SidebarInset className="rounded-l-md bg-[#FAFAFA] shadow-md border my-2 h-screen">
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
