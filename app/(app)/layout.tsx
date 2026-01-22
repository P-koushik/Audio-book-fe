import { DashboardSidebar } from "@/components/sidebar-03/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Panel, PanelProvider } from "@/components/ui/panel";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
<<<<<<< Updated upstream
    return (
        <SidebarProvider>
            <div className="relative flex h-screen w-full">
                <DashboardSidebar />
<<<<<<< HEAD
                <SidebarInset className="h-screen py-2 pr-2">
                    <PanelProvider>
                        <div className="flex h-full min-h-0 w-full">
                            <div className="min-w-0 flex-1">{children}</div>
                            <Panel />
                        </div>
                    </PanelProvider>
                </SidebarInset>
=======
                <SidebarInset className="py-2 h-screen">{children}</SidebarInset>
=======
  return (
    <SidebarProvider>
      <div className="relative flex h-screen w-full">
        <DashboardSidebar />
        <SidebarInset className="h-screen py-2 pr-2">
          <PanelProvider>
            <div className="flex h-full min-h-0 w-full">
              <div className="min-w-0 flex-1">{children}</div>
              <Panel />
>>>>>>> Stashed changes
>>>>>>> d2ca8fadbde81a3c5a8fbb5f0743a7b65d19c913
            </div>
          </PanelProvider>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
