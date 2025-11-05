import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { StatsCard } from "@/components/admin/StatsCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Users,
  GraduationCap,
  Briefcase,
  Search,
  Plus,
  TrendingUp,
  AlertTriangle,
  Calendar,
  RefreshCw,
  BarChart3,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const placementData = [
  { month: "Jan", placements: 12 },
  { month: "Feb", placements: 19 },
  { month: "Mar", placements: 23 },
  { month: "Apr", placements: 28 },
  { month: "May", placements: 32 },
  { month: "Jun", placements: 38 },
  { month: "Jul", placements: 42 },
  { month: "Aug", placements: 49 },
  { month: "Sep", placements: 56 },
];

const recentUpdates = [
  {
    icon: Briefcase,
    title: "Infosys posted new role",
    subtitle: "Software Intern",
    time: "2 hours ago",
    type: "info",
  },
  {
    icon: AlertTriangle,
    title: "3 students flagged at-risk",
    subtitle: "in CSE Department",
    time: "5 hours ago",
    type: "warning",
  },
  {
    icon: Calendar,
    title: "Placement Drive scheduled",
    subtitle: "on Nov 10",
    time: "1 day ago",
    type: "success",
  },
];

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-full bg-background">
      <AdminSidebar />

      <main className="flex-1 overflow-y-auto">
        {/* Top Bar */}
        <header className="bg-card border-b border-border sticky top-0 z-10">
          <div className="flex items-center justify-between px-8 py-4">
            <div className="flex items-center gap-4 flex-1 max-w-2xl">
              <h1 className="text-xl font-semibold text-foreground hidden md:block">
                DeepTech Campus
              </h1>
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search students, jobs, companies..."
                  className="pl-10"
                />
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      AP
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline">Admin Profile</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/")}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Content */}
        <div className="p-8 space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatsCard
              title="Total Students"
              value="1,284"
              icon={Users}
              trend={{ value: 12, isPositive: true }}
            />
            <StatsCard
              title="Faculty Members"
              value="156"
              icon={GraduationCap}
              trend={{ value: 3, isPositive: true }}
            />
            <StatsCard
              title="Active Drives"
              value="8"
              icon={Briefcase}
              trend={{ value: 2, isPositive: true }}
            />
          </div>

          {/* Charts and Updates */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Placement Trend Chart */}
            <Card className="p-6 lg:col-span-2">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      Placement Trend This Year
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Monthly placement statistics
                    </p>
                  </div>
                  <TrendingUp className="h-5 w-5 text-success" />
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={placementData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis
                        dataKey="month"
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                      />
                      <YAxis
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "var(--radius)",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="placements"
                        stroke="hsl(var(--primary))"
                        strokeWidth={3}
                        dot={{ fill: "hsl(var(--primary))", r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>

            {/* Recent Updates */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Recent Updates
              </h3>
              <div className="space-y-4">
                {recentUpdates.map((update, index) => (
                  <div key={index} className="flex gap-3">
                    <div
                      className={`p-2 rounded-lg flex-shrink-0 h-fit ${
                        update.type === "warning"
                          ? "bg-warning/10"
                          : update.type === "success"
                          ? "bg-success/10"
                          : "bg-primary/10"
                      }`}
                    >
                      <update.icon
                        className={`h-4 w-4 ${
                          update.type === "warning"
                            ? "text-warning"
                            : update.type === "success"
                            ? "text-success"
                            : "text-primary"
                        }`}
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium text-foreground">
                        {update.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {update.subtitle}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {update.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h3 className="text-lg font-semibold text-foreground">
                Quick Actions
              </h3>
              <div className="flex flex-wrap gap-3">
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Jobs
                </Button>
                <Button variant="outline" className="gap-2">
                  <BarChart3 className="h-4 w-4" />
                  View Analytics
                </Button>
                <Button variant="outline" className="gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Sync
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
