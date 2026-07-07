import "../globals.css";
import Sidebar from "@/Component/Sidebar/Sidebar";
import { SidebarProvider } from "@/Component/Sidebar/SidebarContext";
import NavbarProfileAccount from "@/Component/Navbar/ProfileAccount";
import { ToastProvider } from "@/Component/Toast/ToastProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <ToastProvider>
        <div className="flex h-screen bg-[#F1F2F3]">
          <Sidebar />

          <div className="flex flex-col flex-1">
            <NavbarProfileAccount />

            <main className="flex-1 overflow-auto relative bg-[#fbfbfb] ">
              {children}
            </main>
          </div>
        </div>
      </ToastProvider>
    </SidebarProvider>
  );
}
