import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock, MapPin, Upload } from "lucide-react";

export const UserDashboard = () => {
  const [isClockIn, setIsClockIn] = useState(false);

  const handleClockInOut = () => {
    setIsClockIn(!isClockIn);
  };

  return (
    <div className="space-y-8">
      <header className="text-center mb-12">
        <span className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full">
          Employee Dashboard
        </span>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">Welcome back, User</h1>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="glass-card p-6 hover-card">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Time Tracking</h2>
            </div>
            <Button
              onClick={handleClockInOut}
              variant={isClockIn ? "destructive" : "default"}
              className="transition-all duration-300"
            >
              {isClockIn ? "Clock Out" : "Clock In"}
            </Button>
          </div>
          <div className="text-sm text-muted-foreground">
            {isClockIn ? "Currently working" : "Not clocked in"}
          </div>
        </Card>

        <Card className="glass-card p-6 hover-card">
          <div className="flex items-center space-x-2 mb-6">
            <MapPin className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Work Location</h2>
          </div>
          <select className="w-full p-2 rounded-md border border-input bg-background">
            <option>Select location...</option>
            <option>Office A</option>
            <option>Office B</option>
            <option>Remote</option>
          </select>
        </Card>

        <Card className="glass-card p-6 hover-card md:col-span-2">
          <div className="flex items-center space-x-2 mb-6">
            <Upload className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Photo Upload</h2>
          </div>
          <div className="border-2 border-dashed border-input rounded-lg p-8 text-center">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="photo-upload"
            />
            <label
              htmlFor="photo-upload"
              className="cursor-pointer text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Click to upload or drag and drop
            </label>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;