import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserPlus, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const AdminUsers = () => {
  const { toast } = useToast();
  const [users] = useState([
    { id: 1, name: "Иван Иванов", email: "ivan@example.com", role: "Сотрудник" },
    { id: 2, name: "Петр Петров", email: "petr@example.com", role: "Сотрудник" },
  ]);

  const handleDeleteUser = (userId: number) => {
    toast({
      title: "Пользователь удален",
      description: "Пользователь был успешно удален из системы",
    });
  };

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold">Пользователи</h1>
          <p className="text-muted-foreground">Управление пользователями системы</p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Добавить пользователя
        </Button>
      </header>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Имя</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Роль</TableHead>
              <TableHead className="text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="mr-2">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default AdminUsers;