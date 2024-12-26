import { Card } from "@/components/ui/card";
import { Users, MapPin, Briefcase, Palmtree, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface EmployeeStatus {
  status: string;
  count: number;
}

interface LocationCheckIn {
  location: {
    name: string;
  };
  user: {
    first_name: string;
    last_name: string;
  };
  check_in_time: string;
}

const AdminDashboard = () => {
  // Fetch employee status counts
  const { data: statusCounts } = useQuery({
    queryKey: ["employeeStatuses"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("employee_statuses")
        .select("status")
        .eq("check_out_time", null);

      if (error) throw error;

      const counts = {
        working: 0,
        vacation: 0,
        sick_leave: 0,
      };

      data?.forEach((status) => {
        counts[status.status as keyof typeof counts]++;
      });

      return counts;
    },
  });

  // Fetch active check-ins
  const { data: activeCheckIns } = useQuery({
    queryKey: ["activeCheckIns"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("location_check_ins")
        .select(`
          location:locations(name),
          user:profiles(first_name, last_name),
          check_in_time
        `)
        .is("check_out_time", null)
        .order("check_in_time", { ascending: false });

      if (error) throw error;
      return data as LocationCheckIn[];
    },
  });

  return (
    <div className="space-y-8">
      <header className="text-center mb-12">
        <span className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full">
          Панель администратора
        </span>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">
          Управление системой
        </h1>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <Briefcase className="w-8 h-8 text-green-500" />
            <div>
              <h2 className="text-xl font-semibold">На работе</h2>
              <p className="text-3xl font-bold">{statusCounts?.working || 0}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <Palmtree className="w-8 h-8 text-blue-500" />
            <div>
              <h2 className="text-xl font-semibold">В отпуске</h2>
              <p className="text-3xl font-bold">{statusCounts?.vacation || 0}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <Stethoscope className="w-8 h-8 text-red-500" />
            <div>
              <h2 className="text-xl font-semibold">На больничном</h2>
              <p className="text-3xl font-bold">{statusCounts?.sick_leave || 0}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Link to="/admin/users">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center space-x-4">
              <Users className="w-8 h-8 text-primary" />
              <div>
                <h2 className="text-xl font-semibold">Сотрудники</h2>
                <p className="text-muted-foreground">
                  Управление сотрудниками системы
                </p>
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
                <p className="text-muted-foreground">
                  Управление рабочими объектами
                </p>
              </div>
            </div>
          </Card>
        </Link>
      </div>

      {activeCheckIns && activeCheckIns.length > 0 && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Активные отметки</h2>
          <div className="space-y-4">
            {activeCheckIns.map((checkIn, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b last:border-0 pb-2"
              >
                <div>
                  <p className="font-medium">
                    {checkIn.user.first_name} {checkIn.user.last_name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {checkIn.location.name}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {new Date(checkIn.check_in_time).toLocaleTimeString()}
                </p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default AdminDashboard;