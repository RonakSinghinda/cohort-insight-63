import { useState, useEffect } from "react";
import {
  Bell, LogOut, TrendingUp, AlertTriangle, BookOpen,
  Download, Edit, Users, Clock, Award, Target, Zap, FileText,
  Lightbulb, Moon, Sun, User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from "recharts";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

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

const defaultStudentProfile = {
  name: "Guest User",
  usn: "RV2208A12",
  course: "B.Tech",
  branch: "Computer Science & Engineering",
  semester: 4,
  section: "A",
  gpa: 7.9,
  attendance: 84,
  lastUpdated: new Date().toLocaleDateString(),
  photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Guest"
};

const courses = [
  { code: "BCS302", name: "Logic Design & Computer Organization", cie: 28, attendance: 88 },
  { code: "BCS303", name: "Operating Systems", cie: 32, attendance: 92 },
  { code: "BCS304", name: "Data Structures & Applications", cie: 35, attendance: 95 },
  { code: "BCSL305", name: "Data Structures Lab", cie: 30, attendance: 85 },
  { code: "BSCK307", name: "Social Connect & Responsibility", cie: 25, attendance: 71 },
  { code: "BCS301", name: "Discrete Math", cie: 33, attendance: 88 },
  { code: "BCS306A", name: "Java Programming", cie: 29, attendance: 75 },
  { code: "BCIL358C", name: "AI Tools & Applications", cie: 36, attendance: 98 },
];

const gradeTrendData = [
  { month: "Jan", gpa: 7.2 },
  { month: "Feb", gpa: 7.3 },
  { month: "Mar", gpa: 7.6 },
  { month: "Apr", gpa: 7.9 },
];

const attendanceTrendData = [
  { month: "Jan", percentage: 80 },
  { month: "Feb", percentage: 82 },
  { month: "Mar", percentage: 83 },
  { month: "Apr", percentage: 84 },
];

const lmsEngagementData = [
  { week: "W1", engagement: 65 },
  { week: "W2", engagement: 72 },
  { week: "W3", engagement: 78 },
  { week: "W4", engagement: 85 },
];

const difficultyPerformanceData = [
  { course: "BCS302", difficulty: 65, performance: 88 },
  { course: "BCS303", difficulty: 72, performance: 92 },
  { course: "BCS304", difficulty: 85, performance: 95 },
  { course: "BCSL305", difficulty: 55, performance: 85 },
  { course: "BSCK307", difficulty: 40, performance: 71 },
  { course: "BCS301", difficulty: 80, performance: 88 },
  { course: "BCS306A", difficulty: 70, performance: 75 },
  { course: "BCIL358C", difficulty: 90, performance: 98 },
];

const cieMarksData = courses.map(c => ({
  code: c.code,
  marks: c.cie,
}));

const tasks = [
  { id: 1, title: "Database Systems - Exam", date: "Nov 15", type: "exam", priority: "high" },
  { id: 2, title: "Web Dev Assignment - Due", date: "Nov 8", type: "assignment", priority: "high" },
  { id: 3, title: "Fee Payment Deadline", date: "Nov 30", type: "fee", priority: "medium" },
  { id: 4, title: "Infosys Interview - Round 2", date: "Nov 12", type: "interview", priority: "high" },
];

const placementData = {
  resumeScore: 7.8,
  skillMatchPercentage: 78,
  recommendedJobs: [
    { company: "TCS", role: "Software Developer", match: 85 },
    { company: "Infosys", role: "Systems Engineer", match: 82 },
    { company: "Wipro", role: "Associate Software Engineer", match: 79 },
  ],
  missingSkills: ["Advanced React", "AWS", "Docker", "Kubernetes"],
};

const aiRecommendations = [
  { category: "Study", text: "Focus on Operating Systems - gradual improvement needed", icon: BookOpen },
  { category: "Skills", text: "Strengthen cloud computing skills (AWS/Azure)", icon: Zap },
  { category: "Learning", text: "Complete 3 micro-courses on system design", icon: Target },
  { category: "Mentor", text: "Request guidance from Prof. Sharma for OS concepts", icon: Users },
  { category: "Habits", text: "Increase LMS engagement - aim for 90% weekly", icon: Award },
  { category: "Resource", text: "Practice coding on LeetCode - Medium level problems", icon: Lightbulb },
];

const atRiskAlerts = [
  {
    type: "attendance",
    severity: "medium",
    title: "Low Attendance Alert",
    message: "BSCK307 attendance is at 71% - Below 80% target",
    icon: AlertTriangle,
  },
  {
    type: "grades",
    severity: "low",
    title: "Gradual Grade Improvement",
    message: "Your grades show positive trend - Keep up the momentum!",
    icon: TrendingUp,
  },
  {
    type: "engagement",
    severity: "medium",
    title: "LMS Activity Low",
    message: "LMS engagement needs improvement - Target 90% weekly",
    icon: Zap,
  },
];

// ==================== COMPONENT ====================

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isDark, setIsDark] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Use auth user data or fallback to default
  const studentProfile = user ? { ...user, gpa: 7.9, attendance: 84, lastUpdated: new Date().toLocaleDateString() } : defaultStudentProfile;

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

  const calculateRiskScore = () => {
    let score = 100;
    score -= (studentProfile.gpa * 8);
    score -= studentProfile.attendance;
    score -= 5;
    return Math.max(0, Math.min(100, score));
  };

  const riskScore = calculateRiskScore();

  const getRiskColor = (score: number) => {
    if (score < 30) return isDark ? "text-emerald-400" : "text-emerald-600";
    if (score < 60) return isDark ? "text-amber-400" : "text-amber-600";
    return isDark ? "text-red-400" : "text-red-600";
  };

  const getRiskBgColor = (score: number) => {
    if (score < 30) return isDark ? "bg-emerald-500/10 border-emerald-500/20" : "bg-emerald-100 border-emerald-300";
    if (score < 60) return isDark ? "bg-amber-500/10 border-amber-500/20" : "bg-amber-100 border-amber-300";
    return isDark ? "bg-red-500/10 border-red-500/20" : "bg-red-100 border-red-300";
  };

  const getRiskStatus = (score: number) => {
    if (score < 30) return "Low Risk";
    if (score < 60) return "Medium Risk";
    return "High Risk";
  };

  const belowTargetCount = courses.filter(c => c.attendance < 80).length;

  return (
    <div className={`min-h-screen ${theme.background} transition-colors duration-300`}>
      {/* ==================== TOP NAVIGATION ====================*/}
      <nav className={`${theme.nav} border-b ${theme.textMuted} sticky top-0 z-50 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8 flex-1">
              <h1 className={`text-lg font-semibold ${theme.text}`}>DeepTech Campus</h1>
              <div className="hidden md:flex gap-6 text-sm">
                {[
                  { label: "HOME", route: "/student/home" },
                  { label: "COUNSELLING", route: "/student/counselling" },
                  { label: "FEE", route: "/student/fee" },
                  { label: "TIME TABLE", route: "/student/timetable" },
                  { label: "EXAM", route: "/student/exam" },
                  { label: "FEEDBACK", route: "/student/feedback" }
                ].map((item) => (
                  <button
                    key={item.label}
                    className={`${theme.textMuted} hover:${theme.text} transition-colors duration-200`}
                    onClick={() => navigate(item.route)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsDark(!isDark)}
                className={`p-2 rounded-lg ${theme.hover} transition-colors duration-200`}
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <button className={`p-2 rounded-lg ${theme.hover} transition-colors duration-200`}>
                <Bell className="h-5 w-5" />
              </button>
              <div className={`h-8 w-px ${isDark ? "bg-slate-700" : "bg-slate-300"} mx-2`} />
              <button className={`p-2 rounded-lg ${theme.hover} transition-colors duration-200`}>
                <User className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ==================== MAIN CONTENT ====================*/}
      <main className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 transition-colors duration-300`}>

        {/* STUDENT HEADER SECTION */}
        <Card className={`${theme.card} p-6 border transition-colors duration-300`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex gap-6 items-start">
              <img
                src={studentProfile.photo}
                alt={studentProfile.name}
                className={`w-20 h-20 rounded-full ${isDark ? "border-2 border-slate-700" : "border-2 border-slate-300"}`}
              />
              <div>
                <h2 className={`text-2xl font-bold ${theme.text} mb-4`}>{studentProfile.name}</h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className={`${theme.textMuted} text-xs font-medium mb-1`}>USN</p>
                    <p className={`${theme.text} font-semibold`}>{studentProfile.usn}</p>
                  </div>
                  <div>
                    <p className={`${theme.textMuted} text-xs font-medium mb-1`}>COURSE</p>
                    <p className={`${theme.text} font-semibold`}>{studentProfile.course}</p>
                  </div>
                  <div>
                    <p className={`${theme.textMuted} text-xs font-medium mb-1`}>BRANCH</p>
                    <p className={`${theme.text} font-semibold`}>{studentProfile.branch.split(" ")[0]}...</p>
                  </div>
                  <div>
                    <p className={`${theme.textMuted} text-xs font-medium mb-1`}>SEMESTER</p>
                    <p className={`${theme.text} font-semibold`}>{studentProfile.semester}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={`text-right text-sm ${theme.textMuted}`}>
              <p className="text-xs">Last Updated</p>
              <p className={`${theme.text} font-semibold`}>{studentProfile.lastUpdated}</p>
            </div>
          </div>
        </Card>

        {/* ACADEMIC ANALYTICS - SUMMARY CARDS */}
        <div>
          <h3 className={`text-lg font-semibold ${theme.text} mb-4`}>Academic Overview</h3>
          <div className="grid gap-4 md:grid-cols-5">
            {/* Predicted GPA */}
            <Card className={`${theme.card} p-4 border transition-colors duration-300`}>
              <div className="space-y-2">
                <p className={`text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}>Predicted GPA</p>
                <div className="flex items-baseline gap-2">
                  <p className={`text-3xl font-bold text-blue-600 ${isDark ? "text-blue-400" : ""}`}>{studentProfile.gpa}</p>
                </div>
                <p className="text-xs text-emerald-600 dark:text-emerald-400">↑ +0.3 this month</p>
              </div>
            </Card>

            {/* Attendance */}
            <Card className={`${theme.card} p-4 border transition-colors duration-300 cursor-pointer hover:shadow-md`} onClick={() => navigate("/student/attendance")}>
              <div className="space-y-2">
                <p className={`text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}>Attendance</p>
                <div className="flex items-baseline gap-2">
                  <p className={`text-3xl font-bold text-amber-600 ${isDark ? "text-amber-400" : ""}`}>{studentProfile.attendance}%</p>
                </div>
                <p className="text-xs text-amber-600 dark:text-amber-400">View Details →</p>
              </div>
            </Card>

            {/* Risk Score */}
            <Card className={`${theme.card} p-4 border ${getRiskBgColor(riskScore)} transition-colors duration-300`}>
              <div className="space-y-2">
                <p className={`text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}>AI Risk Score</p>
                <div className="flex items-baseline gap-2">
                  <p className={`text-3xl font-bold ${getRiskColor(riskScore)}`}>{riskScore}</p>
                </div>
                <p className={`text-xs ${getRiskColor(riskScore)}`}>{getRiskStatus(riskScore)}</p>
              </div>
            </Card>

            {/* Placement Readiness */}
            <Card className={`${theme.card} p-4 border transition-colors duration-300`}>
              <div className="space-y-2">
                <p className={`text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}>Placement Ready</p>
                <div className="flex items-baseline gap-2">
                  <p className={`text-3xl font-bold text-cyan-600 ${isDark ? "text-cyan-400" : ""}`}>92%</p>
                </div>
                <p className="text-xs text-cyan-600 dark:text-cyan-400">Excellent</p>
              </div>
            </Card>

            {/* Semester Progress */}
            <Card className={`${theme.card} p-4 border transition-colors duration-300`}>
              <div className="space-y-2">
                <p className={`text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}>Progress</p>
                <div className="flex items-baseline gap-2">
                  <p className={`text-3xl font-bold text-emerald-600 ${isDark ? "text-emerald-400" : ""}`}>65%</p>
                </div>
                <p className="text-xs text-emerald-600 dark:text-emerald-400">On Track</p>
              </div>
            </Card>
          </div>
        </div>

        {/* CHARTS SECTION */}
        <div>
          <h3 className={`text-lg font-semibold ${theme.text} mb-4`}>Performance Analytics</h3>
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Grade Trend */}
            <Card className={`${theme.card} p-6 border transition-colors duration-300`}>
              <h4 className={`text-sm font-semibold ${theme.text} mb-4`}>GPA Progression</h4>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={gradeTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.gridColor} />
                  <XAxis dataKey="month" stroke={chartTheme.textColor} fontSize={12} />
                  <YAxis domain={[7, 8.2]} stroke={chartTheme.textColor} fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: chartTheme.tooltipBg, border: `1px solid ${chartTheme.tooltipBorder}`, borderRadius: "6px" }} />
                  <Line type="monotone" dataKey="gpa" stroke="#2563eb" strokeWidth={2} dot={{ fill: "#2563eb", r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Attendance Trend */}
            <Card className={`${theme.card} p-6 border transition-colors duration-300`}>
              <h4 className={`text-sm font-semibold ${theme.text} mb-4`}>Attendance Progress</h4>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={attendanceTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.gridColor} />
                  <XAxis dataKey="month" stroke={chartTheme.textColor} fontSize={12} />
                  <YAxis domain={[75, 100]} stroke={chartTheme.textColor} fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: chartTheme.tooltipBg, border: `1px solid ${chartTheme.tooltipBorder}`, borderRadius: "6px" }} />
                  <Line type="monotone" dataKey="percentage" stroke="#f59e0b" strokeWidth={2} dot={{ fill: "#f59e0b", r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Course Difficulty vs Performance */}
            <Card className={`${theme.card} p-6 border transition-colors duration-300`}>
              <h4 className={`text-sm font-semibold ${theme.text} mb-4`}>Performance vs Difficulty</h4>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={difficultyPerformanceData.slice(0, 4)}>
                  <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.gridColor} />
                  <XAxis dataKey="course" stroke={chartTheme.textColor} fontSize={11} />
                  <YAxis stroke={chartTheme.textColor} fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: chartTheme.tooltipBg, border: `1px solid ${chartTheme.tooltipBorder}`, borderRadius: "6px" }} />
                  <Bar dataKey="difficulty" fill="#f97316" />
                  <Bar dataKey="performance" fill="#2563eb" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* LMS Engagement */}
            <Card className={`${theme.card} p-6 border transition-colors duration-300`}>
              <h4 className={`text-sm font-semibold ${theme.text} mb-4`}>Learning Engagement</h4>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={lmsEngagementData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.gridColor} />
                  <XAxis dataKey="week" stroke={chartTheme.textColor} fontSize={12} />
                  <YAxis domain={[0, 100]} stroke={chartTheme.textColor} fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: chartTheme.tooltipBg, border: `1px solid ${chartTheme.tooltipBorder}`, borderRadius: "6px" }} />
                  <Area type="monotone" dataKey="engagement" fill="#10b981" stroke="#10b981" />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </div>

        {/* CIE MARKS SECTION */}
        <div>
          <h3 className={`text-lg font-semibold ${theme.text} mb-4`}>Course Assessment (CIE)</h3>
          <Card className={`${theme.card} p-6 border transition-colors duration-300`}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={cieMarksData}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.gridColor} />
                <XAxis dataKey="code" stroke={chartTheme.textColor} fontSize={10} angle={-45} textAnchor="end" height={80} />
                <YAxis domain={[0, 50]} stroke={chartTheme.textColor} fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: chartTheme.tooltipBg, border: `1px solid ${chartTheme.tooltipBorder}`, borderRadius: "6px" }} />
                <Bar dataKey="marks" fill="#2563eb" radius={[8, 8, 0, 0]}>
                  {cieMarksData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.marks >= 32 ? "#10b981" : entry.marks >= 28 ? "#2563eb" : "#ef4444"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* ATTENDANCE BY SUBJECT */}
        <div>
          <h3 className={`text-lg font-semibold ${theme.text} mb-4`}>Subject-wise Attendance</h3>
          <Card className={`${theme.card} p-6 border transition-colors duration-300`}>
            {belowTargetCount > 0 && (
              <div className={`px-3 py-1 ${isDark ? "bg-red-500/10 border-red-500/20" : "bg-red-100 border-red-300"} border rounded-full text-xs font-medium ${isDark ? "text-red-400" : "text-red-600"} mb-4 inline-block`}>
                ⚠ {belowTargetCount} Below 80%
              </div>
            )}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {courses.map((course) => (
                <div key={course.code} className={`${theme.card} p-4 rounded-lg border transition-colors duration-300 ${isDark ? "hover:bg-slate-800" : "hover:bg-slate-100"}`}>
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-2">{course.code}</p>
                  <p className={`text-2xl font-bold ${course.attendance >= 80 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>
                    {course.attendance}%
                  </p>
                  <p className={`text-xs ${theme.textMuted} mt-2`}>
                    {course.attendance >= 80 ? "✓ On Target" : "⚠ Below Target"}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* AI RECOMMENDATIONS */}
        <div>
          <h3 className={`text-lg font-semibold ${theme.text} mb-4`}>Personalized Recommendations</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {aiRecommendations.map((rec, idx) => {
              const Icon = rec.icon;
              return (
                <Card key={idx} className={`${theme.card} p-5 border transition-colors duration-300 ${isDark ? "hover:bg-slate-800" : "hover:bg-slate-100"}`}>
                  <div className="flex items-start gap-3">
                    <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1 uppercase tracking-wide">{rec.category}</p>
                      <p className={`text-sm ${theme.text}`}>{rec.text}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* AT-RISK ALERTS */}
        <div>
          <h3 className={`text-lg font-semibold ${theme.text} mb-4`}>System Alerts</h3>
          <div className="space-y-3">
            {atRiskAlerts.map((alert, idx) => {
              const Icon = alert.icon;
              const colors = {
                high: isDark ? "bg-red-500/10 border-red-500/30" : "bg-red-50 border-red-300",
                medium: isDark ? "bg-amber-500/10 border-amber-500/30" : "bg-amber-50 border-amber-300",
                low: isDark ? "bg-emerald-500/10 border-emerald-500/30" : "bg-emerald-50 border-emerald-300",
              };
              const textColors = {
                high: isDark ? "text-red-400" : "text-red-700",
                medium: isDark ? "text-amber-400" : "text-amber-700",
                low: isDark ? "text-emerald-400" : "text-emerald-700",
              };
              return (
                <Card key={idx} className={`${theme.card} p-4 border ${colors[alert.severity as keyof typeof colors]} transition-colors duration-300`}>
                  <div className="flex gap-4">
                    <Icon className={`h-5 w-5 ${textColors[alert.severity as keyof typeof textColors]} flex-shrink-0 mt-1`} />
                    <div>
                      <p className={`font-semibold ${theme.text} text-sm`}>{alert.title}</p>
                      <p className={`text-sm ${theme.textMuted} mt-1`}>{alert.message}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* COURSE REGISTRATION TABLE */}
        <div>
          <h3 className={`text-lg font-semibold ${theme.text} mb-4`}>Enrolled Courses</h3>
          <Card className={`${theme.card} p-6 border transition-colors duration-300 overflow-x-auto`}>
            <table className="w-full text-sm">
              <thead className={`${isDark ? "border-slate-700" : "border-slate-200"} border-b`}>
                <tr>
                  <th className={`text-left px-4 py-3 font-semibold ${theme.text} text-xs uppercase tracking-wide`}>Code</th>
                  <th className={`text-left px-4 py-3 font-semibold ${theme.text} text-xs uppercase tracking-wide`}>Course</th>
                  <th className={`text-center px-4 py-3 font-semibold ${theme.text} text-xs uppercase tracking-wide`}>CIE</th>
                  <th className={`text-center px-4 py-3 font-semibold ${theme.text} text-xs uppercase tracking-wide`}>Attendance</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, idx) => (
                  <tr key={idx} className={`${idx % 2 === 0 ? (isDark ? "bg-slate-800/50" : "bg-slate-100") : ""} ${isDark ? "hover:bg-slate-800" : "hover:bg-slate-100"} transition-colors duration-200`}>
                    <td className={`px-4 py-3 ${theme.text} font-semibold`}>{course.code}</td>
                    <td className={`px-4 py-3 ${theme.text}`}>{course.name}</td>
                    <td className={`px-4 py-3 text-center ${theme.text} font-medium`}>{course.cie}/40</td>
                    <td className={`px-4 py-3 text-center`}>
                      <Button variant="ghost" size="sm" className="text-xs" onClick={() => navigate("/student/attendance")}>
                        {course.attendance}%
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>

        {/* PLACEMENT SECTION */}
        <div>
          <h3 className={`text-lg font-semibold ${theme.text} mb-4`}>Career Readiness</h3>
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Stats */}
            <Card className={`${theme.card} p-6 border transition-colors duration-300`}>
              <h4 className={`font-semibold ${theme.text} mb-4 text-sm`}>Your Profile</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-sm ${theme.textMuted}`}>Resume Score</span>
                    <span className={`font-bold ${theme.text}`}>7.8/10</span>
                  </div>
                  <div className={`w-full ${isDark ? "bg-slate-700" : "bg-slate-300"} rounded-full h-2`}>
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "78%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-sm ${theme.textMuted}`}>Skill Match</span>
                    <span className={`font-bold ${theme.text}`}>78%</span>
                  </div>
                  <div className={`w-full ${isDark ? "bg-slate-700" : "bg-slate-300"} rounded-full h-2`}>
                    <div className="bg-emerald-600 h-2 rounded-full" style={{ width: "78%" }}></div>
                  </div>
                </div>
              </div>
              <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white text-sm">Update Resume</Button>
            </Card>

            {/* Jobs */}
            <Card className={`${theme.card} p-6 border transition-colors duration-300`}>
              <h4 className={`font-semibold ${theme.text} mb-4 text-sm`}>Top Opportunities</h4>
              <div className="space-y-3">
                {placementData.recommendedJobs.map((job, idx) => (
                  <div key={idx} className={`${isDark ? "bg-slate-800" : "bg-slate-100"} p-3 rounded-lg transition-colors duration-200`}>
                    <p className={`text-sm font-semibold ${theme.text}`}>{job.role}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className={`text-xs ${theme.textMuted}`}>{job.company}</span>
                      <span className="text-xs bg-emerald-600 dark:bg-emerald-500/20 text-white dark:text-emerald-400 px-2 py-1 rounded">{job.match}%</span>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white text-sm">Explore All</Button>
            </Card>

            {/* Skills */}
            <Card className={`${theme.card} p-6 border transition-colors duration-300`}>
              <h4 className={`font-semibold ${theme.text} mb-4 text-sm`}>Skills to Develop</h4>
              <div className="space-y-2 mb-4">
                {placementData.missingSkills.map((skill, idx) => (
                  <div key={idx} className={`text-sm ${theme.textMuted} flex items-center gap-2`}>
                    <span className="text-amber-600 dark:text-amber-400">•</span> {skill}
                  </div>
                ))}
              </div>
              <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white text-sm">Learning Path</Button>
            </Card>
          </div>
        </div>

        {/* TASKS & QUICK ACTIONS */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <h3 className={`text-lg font-semibold ${theme.text} mb-4`}>Upcoming Tasks</h3>
            <div className="space-y-2">
              {tasks.map((task) => (
                <Card key={task.id} className={`${theme.card} p-4 border transition-colors duration-300`}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className={`font-medium ${theme.text} text-sm`}>{task.title}</p>
                      <p className={`text-xs ${theme.textMuted} mt-1`}>Due: {task.date}</p>
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded ${task.priority === "high" ? (isDark ? "bg-red-500/20 text-red-400" : "bg-red-100 text-red-700") : (isDark ? "bg-amber-500/20 text-amber-400" : "bg-amber-100 text-amber-700")}`}>
                      {task.priority.toUpperCase()}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3 className={`text-lg font-semibold ${theme.text} mb-4`}>Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-6 flex items-center justify-center gap-2">
                <Download className="h-4 w-4" /> Report
              </Button>
              <Button className="bg-cyan-600 hover:bg-cyan-700 text-white text-sm py-6 flex items-center justify-center gap-2">
                <Edit className="h-4 w-4" /> Resume
              </Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm py-6 flex items-center justify-center gap-2">
                <FileText className="h-4 w-4" /> History
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white text-sm py-6 flex items-center justify-center gap-2">
                <Users className="h-4 w-4" /> Mentor
              </Button>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default StudentDashboard;
