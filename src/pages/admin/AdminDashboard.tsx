import { useState, useEffect } from "react";
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
  Moon,
  Sun,
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

// ==================== THEME CONFIGURATION ====================

const lightTheme = {
  background: "bg-slate-50",
  card: "bg-white border-slate-200",
  text: "text-slate-900",
  textMuted: "text-slate-600",
  nav: "bg-white border-slate-200",
  hover: "hover:bg-slate-100",
  tooltipBg: "#ffffff",
  tooltipBorder: "#e2e8f0",
  gridColor: "#cbd5e1",
  textColor: "#334155",
};

const darkTheme = {
  background: "bg-slate-950",
  card: "bg-slate-900 border-slate-800",
  text: "text-slate-50",
  textMuted: "text-slate-400",
  nav: "bg-slate-900 border-slate-800",
  hover: "hover:bg-slate-800",
  tooltipBg: "#1e293b",
  tooltipBorder: "#334155",
  gridColor: "#475569",
  textColor: "#cbd5e1",
};

const chartThemes = {
  light: {
    tooltipBg: "#ffffff",
    tooltipBorder: "#e2e8f0",
    gridColor: "#cbd5e1",
    textColor: "#334155",
  },
  dark: {
    tooltipBg: "#1e293b",
    tooltipBorder: "#334155",
    gridColor: "#475569",
    textColor: "#cbd5e1",
  }
};

// ==================== MOCK DATA ====================

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
  const [isDark, setIsDark] = useState(false);

  const theme = isDark ? darkTheme : lightTheme;
  const chartTheme = isDark ? chartThemes.dark : chartThemes.light;

  // Apply theme to document
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className={`flex h-screen w-full ${theme.background} transition-colors duration-300`}>
      <AdminSidebar theme={theme} />

      <main className="flex-1 overflow-y-auto">
        {/* Top Bar - Clean Navigation */}
        <nav className={`${theme.nav} border-b ${theme.card.split('border-')[1]} sticky top-0 z-50 transition-colors duration-300`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-6 flex-1">
                <div className="flex-shrink-0">
                  <h1 className={`text-xl font-bold ${theme.text}`}>DeepTech Campus</h1>
                </div>
                <div className="hidden md:flex flex-1 max-w-sm">
                  <div className="relative w-full">
                    <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${theme.textMuted}`} />
                    <input
                      placeholder="Search jobs, courses..."
                      className={`w-full pl-10 pr-4 py-2 ${theme.background} border ${theme.card.split('border-')[1]} rounded-full text-sm ${theme.textMuted} focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className={`p-2 rounded-full ${theme.hover} transition-colors relative`}>
                  <Bell className={`h-5 w-5 ${theme.text}`} />
                </button>
                <button
                  onClick={() => setIsDark(!isDark)}
                  className={`p-2 rounded-full ${theme.hover} transition-colors`}
                  title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                >
                  {isDark ? <Sun className={`h-5 w-5 ${theme.text}`} /> : <Moon className={`h-5 w-5 ${theme.text}`} />}
                </button>
                <div className={`h-8 w-px ${isDark ? "bg-slate-700" : "bg-slate-300"} mx-2`} />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className={`p-2 rounded-full ${theme.hover} transition-colors`}>
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
                  theme={theme}
                />
                <StatsCard
                  title="Faculty Members"
                  value="156"
                  subtitle="+3 new members"
                  icon={GraduationCap}
                  variant="elevated"
                  trend={{ value: 3, isPositive: true }}
                  theme={theme}
                />
                <StatsCard
                  title="Active Drives"
                  value="8"
                  subtitle="2 ending soon"
                  icon={Briefcase}
                  variant="elevated"
                  trend={{ value: 2, isPositive: true }}
                  theme={theme}
                />
                <StatsCard
                  title="Placement Rate"
                  value="87%"
                  subtitle="+5% improvement"
                  icon={TrendingUp}
                  variant="elevated"
                  trend={{ value: 5, isPositive: true }}
                  theme={theme}
                />
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`${theme.card} rounded-lg border p-5 space-y-4 transition-colors duration-300`}>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className={`font-bold text-lg ${theme.text}`}>
                          Placement Trend This Year
                        </h3>
                        <p className={`text-sm ${theme.textMuted} mt-1`}>
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
                            stroke={chartTheme.gridColor}
                          />
                          <XAxis
                            dataKey="month"
                            stroke={chartTheme.textColor}
                            fontSize={12}
                          />
                          <YAxis
                            stroke={chartTheme.textColor}
                            fontSize={12}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: chartTheme.tooltipBg,
                              border: `1px solid ${chartTheme.tooltipBorder}`,
                              borderRadius: "var(--radius)",
                              color: chartTheme.textColor,
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

                <div className={`${theme.card} rounded-lg border p-5 space-y-4 transition-colors duration-300`}>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className={`font-bold text-lg ${theme.text}`}>Recent Updates</h3>
                        <p className={`text-sm ${theme.textMuted} mt-1`}>
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
                            <p className={`text-sm font-medium ${theme.text}`}>
                              {update.title}
                            </p>
                            <p className={`text-xs ${theme.textMuted}`}>
                              {update.subtitle}
                            </p>
                            <p className={`text-xs ${theme.textMuted} opacity-75`}>
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
              <div className={`${theme.card} rounded-lg border p-5 transition-colors duration-300`}>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <h3 className={`font-bold text-lg ${theme.text}`}>Quick Actions</h3>
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
              <TaskList items={taskItems} theme={theme} />
              <div className={`${theme.card} rounded-lg border p-5 transition-colors duration-300`}>
                <h3 className={`font-bold text-lg ${theme.text} mb-4`}>Quick Links</h3>
                <div className="space-y-2">
                  <button className={`w-full text-left p-3 rounded-md ${theme.hover} transition-colors`}>
                    <div className={`font-medium ${theme.text}`}>Student Portal</div>
                    <div className={`text-xs ${theme.textMuted}`}>
                      Manage student profiles
                    </div>
                  </button>
                  <button className={`w-full text-left p-3 rounded-md ${theme.hover} transition-colors`}>
                    <div className={`font-medium ${theme.text}`}>Placement Drive</div>
                    <div className={`text-xs ${theme.textMuted}`}>
                      Schedule and manage drives
                    </div>
                  </button>
                  <button className={`w-full text-left p-3 rounded-md ${theme.hover} transition-colors`}>
                    <div className={`font-medium ${theme.text}`}>Analytics Dashboard</div>
                    <div className={`text-xs ${theme.textMuted}`}>
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
