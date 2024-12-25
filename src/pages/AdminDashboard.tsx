import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="space-y-8">
      <header className="text-center mb-12">
        <span className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full">
          Панель администратора
        </span>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">Управление системой</h1>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        <Link to="/admin/users">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center space-x-4">
              <Users className="w-8 h-8 text-primary" />
              <div>
                <h2 className="text-xl font-semibold">Пользователи</h2>
                <p className="text-muted-foreground">Управление пользователями системы</p>
              </div>
            </div>
          </Card>
        </Link>

        <Link to="/admin/locations">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center space-x-4">
              <MapPin className="w-8 h-8 text-primary" />
              <div>
                <h2 className="text-xl font-semibold">Объекты</h2>
                <p className="text-muted-foreground">Управление рабочими объектами</p>
              </div>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;