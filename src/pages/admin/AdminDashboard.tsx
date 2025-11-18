import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { StatsCard } from "@/components/admin/StatsCard";
import { TaskList } from "@/components/admin/TaskList";
import { Button } from "@/components/ui/button";
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
  Bell,
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
import { rechartsDarkTheme } from "@/utils/chartOptions";

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

const taskItems = [
  {
    title: "Review placement applications",
    subtitle: "15 pending reviews",
    badge: "Action",
    status: "action" as const,
    date: "Today",
  },
  {
    title: "Schedule interview rounds",
    badge: "Pending",
    status: "pending" as const,
    date: "Tomorrow",
  },
  {
    title: "Update student profiles",
    subtitle: "Batch 2024",
    badge: "Pending",
    status: "pending" as const,
    date: "Nov 8",
  },
];

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-full bg-background">
      <AdminSidebar />

      <main className="flex-1 overflow-y-auto">
        {/* Top Bar - Clean Navigation */}
        <nav className="w-full border-b border-border/20 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-6 flex-1">
                <div className="flex-shrink-0">
                  <h1 className="text-xl font-bold text-foreground">DeepTech Campus</h1>
                </div>
                <div className="hidden md:flex flex-1 max-w-sm">
                  <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      placeholder="Search jobs, courses..."
                      className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-full text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-full hover:bg-accent transition-colors relative">
                  <Bell className="h-5 w-5 text-foreground" />
                </button>
                <div className="h-8 w-px bg-border mx-2" />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-2 rounded-full hover:bg-accent transition-colors">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          AP
                        </AvatarFallback>
                      </Avatar>
                    </button>
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
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 space-y-6">
              {/* Welcome + stats row */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatsCard
                  title="Total Students"
                  value="1,284"
                  subtitle="+12% from last month"
                  icon={Users}
                  variant="elevated"
                  trend={{ value: 12, isPositive: true }}
                />
                <StatsCard
                  title="Faculty Members"
                  value="156"
                  subtitle="+3 new members"
                  icon={GraduationCap}
                  variant="elevated"
                  trend={{ value: 3, isPositive: true }}
                />
                <StatsCard
                  title="Active Drives"
                  value="8"
                  subtitle="2 ending soon"
                  icon={Briefcase}
                  variant="elevated"
                  trend={{ value: 2, isPositive: true }}
                />
                <StatsCard
                  title="Placement Rate"
                  value="87%"
                  subtitle="+5% improvement"
                  icon={TrendingUp}
                  variant="elevated"
                  trend={{ value: 5, isPositive: true }}
                />
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card-base">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="section-title">
                          Placement Trend This Year
                        </h3>
                        <p className="text-sm text-[rgba(255,255,255,0.6)] mt-1">
                          Monthly placement statistics
                        </p>
                      </div>
                      <TrendingUp className="h-5 w-5 text-success" />
                    </div>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={placementData}>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke={rechartsDarkTheme.gridColor}
                          />
                          <XAxis
                            dataKey="month"
                            stroke={rechartsDarkTheme.textColor}
                            fontSize={12}
                          />
                          <YAxis
                            stroke={rechartsDarkTheme.textColor}
                            fontSize={12}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: rechartsDarkTheme.tooltipBg,
                              border: `1px solid ${rechartsDarkTheme.tooltipBorder}`,
                              borderRadius: "var(--radius)",
                              color: rechartsDarkTheme.textColor,
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
                </div>

                <div className="card-base">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="section-title">Recent Updates</h3>
                        <p className="text-sm text-[rgba(255,255,255,0.6)] mt-1">
                          Latest activity
                        </p>
                      </div>
                      <AlertTriangle className="h-5 w-5 text-warning" />
                    </div>
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
                            <p className="text-xs text-[rgba(255,255,255,0.6)]">
                              {update.subtitle}
                            </p>
                            <p className="text-xs text-[rgba(255,255,255,0.55)]">
                              {update.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommendations / Quick Actions */}
              <div className="card-base">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <h3 className="section-title">Quick Actions</h3>
                  <div className="flex flex-wrap gap-3">
                    <Button
                      className="gap-2 btn-primary"
                      onClick={() => navigate("/admin/placement")}
                    >
                      <Plus className="h-4 w-4" />
                      Add Jobs
                    </Button>
                    <Button
                      variant="outline"
                      className="gap-2"
                      onClick={() => navigate("/admin/analytics")}
                    >
                      <BarChart3 className="h-4 w-4" />
                      View Analytics
                    </Button>
                    <Button
                      variant="outline"
                      className="gap-2"
                      onClick={() => window.location.reload()}
                    >
                      <RefreshCw className="h-4 w-4" />
                      Sync
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <aside className="lg:col-span-4 space-y-6">
              <TaskList items={taskItems} />
              <div className="card-base">
                <h3 className="section-title mb-4">Quick Links</h3>
                <div className="space-y-2">
                  <button className="w-full text-left p-3 rounded-md hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                    <div className="font-medium text-foreground">Student Portal</div>
                    <div className="text-xs text-[rgba(255,255,255,0.6)]">
                      Manage student profiles
                    </div>
                  </button>
                  <button className="w-full text-left p-3 rounded-md hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                    <div className="font-medium text-foreground">Placement Drive</div>
                    <div className="text-xs text-[rgba(255,255,255,0.6)]">
                      Schedule and manage drives
                    </div>
                  </button>
                  <button className="w-full text-left p-3 rounded-md hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                    <div className="font-medium text-foreground">Analytics Dashboard</div>
                    <div className="text-xs text-[rgba(255,255,255,0.6)]">
                      View detailed reports
                    </div>
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
