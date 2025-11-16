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
    <div className="flex h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <AdminSidebar />

      <main className="flex-1 overflow-y-auto">
        {/* Top Bar - Thin Navbar with Blur */}
        <nav
          className="w-full py-3 px-4 fixed top-0 left-0 right-0 z-40"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.02))",
            backdropFilter: "blur(6px)",
          }}
        >
          <div className="app-container flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-lg font-bold text-[hsl(var(--primary))]">
                DeepTech Campus
              </div>
              <div className="flex items-center bg-[hsl(var(--card))] border border-[rgba(255,255,255,0.03)] rounded-full px-4 py-2 shadow-sm">
                <Search className="w-5 h-5 text-[rgba(255,255,255,0.55)]" />
                <input
                  placeholder="Search jobs or courses..."
                  className="bg-transparent ml-3 outline-none placeholder:text-[rgba(255,255,255,0.45)] text-sm"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 rounded-full hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                <Bell className="w-5 h-5 text-[rgba(255,255,255,0.75)]" />
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-2 rounded-full hover:bg-[rgba(255,255,255,0.02)] transition-colors">
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
        </nav>

        {/* Main Content */}
        <div className="pt-20 app-container grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
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
      </main>
    </div>
  );
};

export default AdminDashboard;
