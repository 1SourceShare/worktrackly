import { ReactNode } from "react";
import { useLocation, Link } from "react-router-dom";
import { SidebarProvider, Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Home, Users, MapPin } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  const menuItems = isAdmin
    ? [
        { icon: Home, label: "Главная", path: "/admin" },
        { icon: Users, label: "Пользователи", path: "/admin/users" },
        { icon: MapPin, label: "Объекты", path: "/admin/locations" },
      ]
    : [
        { icon: Home, label: "Главная", path: "/" },
      ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-gray-50 to-gray-100">
        <Sidebar>
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <Link to={item.path}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <div className="flex-1">
          <div className="container mx-auto px-4 py-8 animate-fadeIn">
            {children}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};