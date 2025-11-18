import { Bell, Search, User, TrendingUp, Calendar, BookOpen, Briefcase, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";
import { StatsCard } from "@/components/admin/StatsCard";
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
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
            <button
              className="p-2 rounded-full hover:bg-[rgba(255,255,255,0.02)] transition-colors relative"
              onClick={() => navigate("/student/notifications")}
            >
              <Bell className="w-5 h-5 text-[rgba(255,255,255,0.75)]" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-destructive" />
            </button>
            <button
              className="p-2 rounded-full hover:bg-[rgba(255,255,255,0.02)] transition-colors"
              onClick={() => navigate("/student/profile")}
            >
              <User className="w-5 h-5 text-[rgba(255,255,255,0.75)]" />
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-20 app-container grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
        <div className="lg:col-span-8 space-y-6">
          {/* Welcome Section */}
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-foreground">
              👋 Welcome back, Ronak Singh!
            </h2>
            <p className="text-[rgba(255,255,255,0.75)]">
              Here's your academic and placement overview.
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              title="Predicted GPA"
              value="7.9"
              subtitle="+0.3 from last semester"
              icon={TrendingUp}
              variant="elevated"
              onClick={() => navigate("/student/grades")}
            />
            <StatsCard
              title="Attendance"
              value="84%"
              subtitle="16% below target"
              icon={Calendar}
              variant="elevated"
              onClick={() => navigate("/student/attendance")}
            />
            <StatsCard
              title="Placement Readiness"
              value="92%"
              subtitle="Excellent progress"
              icon={Briefcase}
              variant="elevated"
              onClick={() => navigate("/student/placement-readiness")}
            />
            <StatsCard
              title="At-Risk Alerts"
              value="1"
              subtitle="Low Assignment Activity"
              icon={AlertTriangle}
              variant="elevated"
              onClick={() => navigate("/student/alerts")}
            />
          </div>

          {/* Charts Section */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="card-base">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <h3 className="section-title">Grade Trend This Semester</h3>
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
            </div>

            <div className="card-base">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <h3 className="section-title">Attendance Over Time</h3>
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
            </div>
          </div>

          {/* Skill Coverage Chart */}
          <div className="card-base">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <h3 className="section-title">Skill Coverage</h3>
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
          </div>

          {/* Recommendations Section */}
          <div className="card-base">
            <h3 className="section-title mb-4">🎯 Recommendations</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.04)] transition-colors border border-[rgba(255,255,255,0.03)]">
                <BookOpen className="h-5 w-5 text-primary mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-sm text-foreground">
                    Revise Module: Data Structures
                  </p>
                  <p className="text-xs text-[rgba(255,255,255,0.6)]">
                    Low quiz scores detected
                  </p>
                  <Button
                    variant="link"
                    className="h-auto p-0 text-xs mt-1"
                    onClick={() => navigate("/student/courses/data-structures")}
                  >
                    View Module →
                  </Button>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.04)] transition-colors border border-[rgba(255,255,255,0.03)]">
                <User className="h-5 w-5 text-primary mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-sm text-foreground">
                    Meet Your Mentor
                  </p>
                  <p className="text-xs text-[rgba(255,255,255,0.6)]">
                    Schedule a session this week
                  </p>
                  <Button
                    variant="link"
                    className="h-auto p-0 text-xs mt-1"
                    onClick={() => navigate("/student/mentor")}
                  >
                    Schedule →
                  </Button>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.04)] transition-colors border border-[rgba(255,255,255,0.03)]">
                <Briefcase className="h-5 w-5 text-primary mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-sm text-foreground">
                    Recommended Job: Software Intern at Infosys
                  </p>
                  <p className="text-xs text-[rgba(255,255,255,0.6)]">
                    92% match based on your skills
                  </p>
                  <Button
                    variant="link"
                    className="h-auto p-0 text-xs mt-1"
                    onClick={() => navigate("/student/jobs/infosys-intern")}
                  >
                    Apply Now →
                  </Button>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.04)] transition-colors border border-[rgba(255,255,255,0.03)]">
                <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-sm text-foreground">
                    Improve Resume
                  </p>
                  <p className="text-xs text-[rgba(255,255,255,0.6)]">
                    Add 2 more projects to increase readiness
                  </p>
                  <Button
                    variant="link"
                    className="h-auto p-0 text-xs mt-1"
                    onClick={() => navigate("/student/resume")}
                  >
                    Edit Resume →
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside className="lg:col-span-4 space-y-6">
          <TaskList items={taskItems} />
        </aside>
      </main>

    </div>
  );
};

export default StudentDashboard;
