import { ReactNode } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { SidebarProvider, Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Home, Users, MapPin, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdmin = location.pathname.startsWith("/admin");

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/login");
      toast({
        title: "Выход выполнен успешно",
        description: "Вы успешно вышли из системы",
      });
    } catch (error) {
      console.error("Error logging out:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось выйти из системы",
        variant: "destructive",
      });
    }
  };

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
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                  <span>Выйти</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
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