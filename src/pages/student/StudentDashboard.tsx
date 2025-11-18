import { Bell, Search, User, TrendingUp, Calendar, BookOpen, Briefcase, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";
import { TaskList } from "@/components/admin/TaskList";
import { rechartsDarkTheme } from "@/utils/chartOptions";

// Mock data for charts
const gradeData = [
  { month: "Jan", gpa: 7.2 },
  { month: "Feb", gpa: 7.5 },
  { month: "Mar", gpa: 7.8 },
  { month: "Apr", gpa: 7.9 },
];

const attendanceData = [
  { month: "Jan", percentage: 88 },
  { month: "Feb", percentage: 85 },
  { month: "Mar", percentage: 82 },
  { month: "Apr", percentage: 84 },
];

const skillData = [
  { skill: "DSA", coverage: 85 },
  { skill: "Web Dev", coverage: 90 },
  { skill: "Python", coverage: 75 },
  { skill: "SQL", coverage: 80 },
];

const taskItems = [
  {
    title: "Submit Assignment 3",
    subtitle: "Data Structures - Due in 2 days",
    badge: "Nov 8",
    status: "pending" as const,
    date: "Nov 8",
  },
  {
    title: "Infosys Round 1 Interview",
    subtitle: "Technical round - Prepare DSA",
    badge: "Nov 10",
    status: "pending" as const,
    date: "Nov 10",
  },
  {
    title: "Low Attendance Alert",
    subtitle: "Algorithms - Attendance below 75%",
    badge: "Action",
    status: "action" as const,
    date: "Urgent",
  },
  {
    title: "Complete Resume Upload",
    subtitle: "Required for placement eligibility",
    badge: "Pending",
    status: "pending" as const,
    date: "Pending",
  },
];

const StudentDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation Bar */}
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
              <button
                className="p-2 rounded-full hover:bg-accent transition-colors relative"
                onClick={() => navigate("/student/notifications")}
              >
                <Bell className="h-5 w-5 text-foreground" />
                <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-destructive animate-pulse" />
              </button>
              <div className="h-8 w-px bg-border mx-2" />
              <button
                className="p-2 rounded-full hover:bg-accent transition-colors"
                onClick={() => navigate("/student/profile")}
              >
                <User className="h-5 w-5 text-foreground" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Welcome Section */}
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-foreground">
                👋 Welcome back, Ronak Singh!
              </h2>
              <p className="text-muted-foreground">
                Here's your academic and placement overview.
              </p>
            </div>

            {/* Stats Cards Grid */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-primary/20 hover:border-primary/40" onClick={() => navigate("/student/grades")}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Predicted GPA</p>
                    <p className="text-3xl font-bold text-foreground">7.9</p>
                    <p className="text-xs text-muted-foreground mt-2">+0.3 from last semester</p>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-warning/20 hover:border-warning/40" onClick={() => navigate("/student/attendance")}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Attendance</p>
                    <p className="text-3xl font-bold text-foreground">84%</p>
                    <p className="text-xs text-muted-foreground mt-2">16% below target</p>
                  </div>
                  <div className="p-3 bg-warning/10 rounded-lg">
                    <Calendar className="h-6 w-6 text-warning" />
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-primary/20 hover:border-primary/40" onClick={() => navigate("/student/placement-readiness")}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Placement Readiness</p>
                    <p className="text-3xl font-bold text-foreground">92%</p>
                    <p className="text-xs text-muted-foreground mt-2">Excellent progress</p>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-destructive/20 hover:border-destructive/40" onClick={() => navigate("/student/alerts")}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">At-Risk Alerts</p>
                    <p className="text-3xl font-bold text-foreground">1</p>
                    <p className="text-xs text-muted-foreground mt-2">Low Assignment Activity</p>
                  </div>
                  <div className="p-3 bg-destructive/10 rounded-lg">
                    <AlertTriangle className="h-6 w-6 text-destructive" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Charts Section */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Grade Trend This Semester</h3>
                  </div>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={gradeData}>
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
                        domain={[6, 10]}
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
                        dataKey="gpa"
                        stroke="hsl(var(--primary))"
                        strokeWidth={3}
                        dot={{ fill: "hsl(var(--primary))", r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-warning/10 rounded-lg">
                      <Calendar className="h-5 w-5 text-warning" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Attendance Over Time</h3>
                  </div>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={attendanceData}>
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
                        domain={[70, 100]}
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
                        dataKey="percentage"
                        stroke="hsl(var(--warning))"
                        strokeWidth={3}
                        dot={{ fill: "hsl(var(--warning))", r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            {/* Skill Coverage Chart */}
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Skill Coverage</h3>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={skillData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={rechartsDarkTheme.gridColor}
                    />
                    <XAxis
                      dataKey="skill"
                      stroke={rechartsDarkTheme.textColor}
                      fontSize={12}
                    />
                    <YAxis
                      domain={[0, 100]}
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
                    <Bar
                      dataKey="coverage"
                      fill="hsl(var(--primary))"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Recommendations Section */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <span>🎯</span> Recommendations
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-4 rounded-lg border border-border hover:border-primary/50 transition-all bg-card/50">
                  <BookOpen className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-medium text-sm text-foreground">
                      Revise Module: Data Structures
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Low quiz scores detected
                    </p>
                    <Button
                      variant="link"
                      className="h-auto p-0 text-xs mt-2"
                      onClick={() => navigate("/student/courses/data-structures")}
                    >
                      View Module →
                    </Button>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg border border-border hover:border-primary/50 transition-all bg-card/50">
                  <User className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-medium text-sm text-foreground">
                      Meet Your Mentor
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Schedule a session this week
                    </p>
                    <Button
                      variant="link"
                      className="h-auto p-0 text-xs mt-2"
                      onClick={() => navigate("/student/mentor")}
                    >
                      Schedule →
                    </Button>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg border border-border hover:border-primary/50 transition-all bg-card/50">
                  <Briefcase className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-medium text-sm text-foreground">
                      Recommended Job: Software Intern at Infosys
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      92% match based on your skills
                    </p>
                    <Button
                      variant="link"
                      className="h-auto p-0 text-xs mt-2"
                      onClick={() => navigate("/student/jobs/infosys-intern")}
                    >
                      Apply Now →
                    </Button>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg border border-border hover:border-primary/50 transition-all bg-card/50">
                  <TrendingUp className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-medium text-sm text-foreground">
                      Improve Resume
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Add 2 more projects to increase readiness
                    </p>
                    <Button
                      variant="link"
                      className="h-auto p-0 text-xs mt-2"
                      onClick={() => navigate("/student/resume")}
                    >
                      Edit Resume →
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Sidebar - Tasks */}
          <aside className="lg:col-span-1">
            <TaskList items={taskItems} />
          </aside>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
