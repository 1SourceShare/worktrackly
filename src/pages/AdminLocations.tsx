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
import { MapPin, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const AdminLocations = () => {
  const { toast } = useToast();
  const [locations] = useState([
    { id: 1, name: "Объект A", address: "ул. Примерная, 1", status: "Активен" },
    { id: 2, name: "Объект B", address: "ул. Тестовая, 2", status: "Активен" },
  ]);

  const handleDeleteLocation = (locationId: number) => {
    toast({
      title: "Объект удален",
      description: "Объект был успешно удален из системы",
    });
  };

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold">Объекты</h1>
          <p className="text-muted-foreground">Управление рабочими объектами</p>
        </div>
        <Button>
          <MapPin className="mr-2 h-4 w-4" />
          Добавить объект
        </Button>
      </header>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Название</TableHead>
              <TableHead>Адрес</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead className="text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {locations.map((location) => (
              <TableRow key={location.id}>
                <TableCell>{location.name}</TableCell>
                <TableCell>{location.address}</TableCell>
                <TableCell>{location.status}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="mr-2">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteLocation(location.id)}
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

export default AdminLocations;