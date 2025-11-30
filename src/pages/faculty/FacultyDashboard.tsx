import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Users, BarChart3, CheckSquare, LogOut, Moon, Sun, TrendingUp, AlertCircle, AlertTriangle, UserCheck, BookOpen, FileText, Upload, Megaphone, Download, Settings, Bell, Clock, X } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";

interface Course {
  code: string;
  name: string;
  students: number;
  attendance: number[];
}

interface TeachingTask {
  id: string;
  title: string;
  subtitle?: string;
  badge: string;
  status: "action" | "pending";
  date: string;
}

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: React.ComponentType<{ className?: string }>;
  type: "at-risk" | "deadline" | "info";
}

export default function FacultyDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDark, setIsDark] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "At-Risk Student Alert",
      message: "Rajesh Kumar - Low attendance in Data Structures (65%)",
      time: "2 hours ago",
      read: false,
      icon: AlertTriangle,
      type: "at-risk",
    },
    {
      id: 2,
      title: "Grade Upload Deadline",
      message: "Deadline for submitting marks for Midterm Exam - Due today by 5 PM",
      time: "3 hours ago",
      read: false,
      icon: Clock,
      type: "deadline",
    },
    {
      id: 3,
      title: "At-Risk Student Alert",
      message: "Priya Sharma - Consistent low performance in Web Development",
      time: "5 hours ago",
      read: true,
      icon: AlertTriangle,
      type: "at-risk",
    },
    {
      id: 4,
      title: "Attendance Submission Deadline",
      message: "Submit attendance for Week 6 - Due by 6 PM tomorrow",
      time: "1 day ago",
      read: true,
      icon: Clock,
      type: "deadline",
    },
    {
      id: 5,
      title: "System Update",
      message: "New feature: Student Performance Analytics now available",
      time: "2 days ago",
      read: true,
      icon: FileText,
      type: "info",
    },
  ]);
  const [openNotifications, setOpenNotifications] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  useEffect(() => {
    const darkMode = document.documentElement.classList.contains("dark");
    setIsDark(darkMode);

    const handleDarkModeChange = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    const observer = new MutationObserver(handleDarkModeChange);
    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  // Mock data for courses
  const courses: Course[] = [
    {
      code: "BCS302",
      name: "Data Structures",
      students: 45,
      attendance: [85, 87, 88, 86, 89, 90, 88, 91, 89],
    },
    {
      code: "BCS305",
      name: "Database Management",
      students: 38,
      attendance: [82, 84, 86, 85, 87, 88, 86, 89, 87],
    },
    {
      code: "BCS308",
      name: "Web Development",
      students: 42,
      attendance: [88, 89, 87, 90, 91, 89, 92, 90, 91],
    },
  ];

  // Mock data for teaching tasks
  const teachingTasks: TeachingTask[] = [
    {
      id: "1",
      title: "Grade Assignment 3",
      subtitle: "Data Structures - 45 submissions",
      badge: "Action",
      status: "action",
      date: "Today",
    },
    {
      id: "2",
      title: "Prepare Lecture Notes",
      subtitle: "Chapter 8 - Advanced Topics",
      badge: "Pending",
      status: "pending",
      date: "Tomorrow",
    },
    {
      id: "3",
      title: "Mid-Semester Exam Review",
      subtitle: "Database Management Course",
      badge: "Pending",
      status: "pending",
      date: "Nov 30",
    },
    {
      id: "4",
      title: "Student Counseling Session",
      subtitle: "3 students scheduled",
      badge: "Action",
      status: "action",
      date: "Nov 28",
    },
  ];

  // Quick Actions for common faculty tasks
  interface QuickAction {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    bgColor: string;
    iconColor: string;
    action: string;
  }

  const quickActions: QuickAction[] = [
    {
      id: "1",
      title: "View Student Analytics",
      description: "Track performance metrics",
      icon: <BarChart3 className="w-6 h-6" />,
      bgColor: isDark ? "bg-blue-900/30 border-blue-500/30" : "bg-blue-100 border-blue-300",
      iconColor: isDark ? "text-blue-400" : "text-blue-600",
      action: "analytics",
    },
    {
      id: "2",
      title: "Upload / Update Marks",
      description: "Enter student grades",
      icon: <Upload className="w-6 h-6" />,
      bgColor: isDark ? "bg-green-900/30 border-green-500/30" : "bg-green-100 border-green-300",
      iconColor: isDark ? "text-green-400" : "text-green-600",
      action: "marks",
    },
    {
      id: "3",
      title: "Upload Attendance",
      description: "Record class attendance",
      icon: <Users className="w-6 h-6" />,
      bgColor: isDark ? "bg-purple-900/30 border-purple-500/30" : "bg-purple-100 border-purple-300",
      iconColor: isDark ? "text-purple-400" : "text-purple-600",
      action: "attendance",
    },
    {
      id: "4",
      title: "Send Announcement",
      description: "Notify your class",
      icon: <Megaphone className="w-6 h-6" />,
      bgColor: isDark ? "bg-orange-900/30 border-orange-500/30" : "bg-orange-100 border-orange-300",
      iconColor: isDark ? "text-orange-400" : "text-orange-600",
      action: "announcement",
    },
    {
      id: "5",
      title: "Download Reports",
      description: "Export grades & attendance",
      icon: <Download className="w-6 h-6" />,
      bgColor: isDark ? "bg-indigo-900/30 border-indigo-500/30" : "bg-indigo-100 border-indigo-300",
      iconColor: isDark ? "text-indigo-400" : "text-indigo-600",
      action: "reports",
    },
  ];

  // Chart data - Grade Trend (average marks improving/declining over time)
  const gradeTrendData = [
    { month: "Aug", avgMarks: 68 },
    { month: "Sep", avgMarks: 71 },
    { month: "Oct", avgMarks: 75 },
    { month: "Nov", avgMarks: 78 },
    { month: "Dec", avgMarks: 82 },
    { month: "Jan", avgMarks: 85 },
  ];

  // Chart data - Course Difficulty Index (which subjects students struggle with)
  const difficultyIndexData = [
    { course: "Data Structures", difficulty: 65, avgScore: 78 },
    { course: "Database", difficulty: 72, avgScore: 75 },
    { course: "Web Dev", difficulty: 58, avgScore: 82 },
    { course: "Algorithms", difficulty: 78, avgScore: 72 },
    { course: "OOP", difficulty: 62, avgScore: 80 },
  ];

  // Chart data - Attendance Trend (daily/weekly attendance)
  const attendanceTrendData = [
    { week: "Week 1", percentage: 85 },
    { week: "Week 2", percentage: 87 },
    { week: "Week 3", percentage: 84 },
    { week: "Week 4", percentage: 89 },
    { week: "Week 5", percentage: 91 },
    { week: "Week 6", percentage: 88 },
  ];

  // Chart data - Comparison Chart (compare sections/batches)
  const comparisonData = [
    { section: "Section A", average: 82, attendance: 88, taskCompletion: 92 },
    { section: "Section B", average: 79, attendance: 85, taskCompletion: 88 },
    { section: "Section C", average: 85, attendance: 91, taskCompletion: 95 },
    { section: "Section D", average: 78, attendance: 82, taskCompletion: 85 },
  ];

  // Calculate statistics
  const totalStudents = courses.reduce((sum, course) => sum + course.students, 0);

  const averageAttendance = (() => {
    const allAttendanceRecords = courses.flatMap((course) => course.attendance);
    const avg =
      allAttendanceRecords.reduce((sum, att) => sum + att, 0) /
      allAttendanceRecords.length;
    return Math.round(avg);
  })();

  const upcomingTasks = teachingTasks.filter((task) => task.status === "action")
    .length;

  const theme = isDark
    ? {
        bg: "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900",
        card: "bg-slate-800 border-slate-700",
        text: "text-white",
        subtext: "text-slate-400",
        accent: "text-blue-400",
        statCard: "bg-slate-700 border-slate-600",
        badge: {
          action: "bg-red-500/20 text-red-400 border-red-400/30",
          pending: "bg-gray-500/20 text-gray-400 border-gray-400/30",
        },
      }
    : {
        bg: "bg-gradient-to-br from-slate-50 via-white to-slate-50",
        card: "bg-white border-slate-200",
        text: "text-slate-900",
        subtext: "text-slate-600",
        accent: "text-blue-600",
        statCard: "bg-slate-100 border-slate-300",
        badge: {
          action: "bg-red-100 text-red-700 border-red-300",
          pending: "bg-gray-100 text-gray-700 border-gray-300",
        },
      };

  const chartTheme = isDark
    ? {
        tooltipBg: "#1e293b",
        tooltipBorder: "#334155",
        gridColor: "#475569",
        textColor: "#cbd5e1",
        lineColor: "hsl(var(--primary))",
      }
    : {
        tooltipBg: "#ffffff",
        tooltipBorder: "#e2e8f0",
        gridColor: "#cbd5e1",
        textColor: "#334155",
        lineColor: "hsl(var(--primary))",
      };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const handleDismissNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    toast({
      description: "Notification dismissed",
    });
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, read: true }))
    );
    toast({
      title: "All notifications marked as read",
    });
  };

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  const handleQuickAction = (action: string) => {
    const messages: Record<string, { title: string; description: string }> = {
      analytics: {
        title: "Analytics View",
        description: "Opening student analytics dashboard...",
      },
      marks: {
        title: "Upload Marks",
        description: "Redirecting to marks entry form...",
      },
      attendance: {
        title: "Attendance Upload",
        description: "Opening attendance sheet manager...",
      },
      announcement: {
        title: "Send Announcement",
        description: "Opening announcement composer...",
      },
      reports: {
        title: "Download Reports",
        description: "Generating and downloading reports...",
      },
    };

    const msg = messages[action];
    if (msg) {
      toast({
        title: msg.title,
        description: msg.description,
      });
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className={`min-h-screen ${theme.bg} transition-colors duration-300`}>
      {/* Navigation Bar */}
      <div
        className={`${theme.card} border-b sticky top-0 z-50 transition-colors duration-300`}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className={`text-2xl font-bold ${theme.text}`}>
              Faculty Dashboard
            </h1>
            <p className={`text-sm ${theme.subtext}`}>{user.name}</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={toggleTheme}
              variant="ghost"
              size="icon"
              className={`${isDark ? "text-yellow-400" : "text-slate-600"}`}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>

            {/* Notifications Button */}
            <Popover open={openNotifications} onOpenChange={setOpenNotifications}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`relative ${isDark ? "text-slate-300 hover:bg-slate-700" : "text-slate-600 hover:bg-slate-100"}`}
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className={`w-96 p-0 ${isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}>
                <div className={`border-b ${isDark ? "border-slate-700" : "border-slate-200"}`}>
                  <div className="p-4 flex items-center justify-between">
                    <h3 className={`font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
                      Notifications
                    </h3>
                    {unreadCount > 0 && (
                      <button
                        onClick={handleMarkAllAsRead}
                        className={`text-xs font-medium ${isDark ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"} transition-colors`}
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>
                </div>

                {notifications.length > 0 ? (
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notif) => {
                      const Icon = notif.icon;
                      const bgColor =
                        notif.type === "at-risk"
                          ? isDark
                            ? "bg-red-900/20"
                            : "bg-red-100"
                          : notif.type === "deadline"
                          ? isDark
                            ? "bg-amber-900/20"
                            : "bg-amber-100"
                          : isDark
                          ? "bg-blue-900/20"
                          : "bg-blue-100";
                      const iconColor =
                        notif.type === "at-risk"
                          ? isDark
                            ? "text-red-400"
                            : "text-red-600"
                          : notif.type === "deadline"
                          ? isDark
                            ? "text-amber-400"
                            : "text-amber-600"
                          : isDark
                          ? "text-blue-400"
                          : "text-blue-600";

                      return (
                        <div
                          key={notif.id}
                          onClick={() => handleMarkAsRead(notif.id)}
                          className={`border-b p-4 transition-colors cursor-pointer ${
                            notif.read
                              ? isDark
                                ? "bg-slate-800 border-slate-700 hover:bg-slate-750"
                                : "bg-white border-slate-200 hover:bg-slate-50"
                              : isDark
                              ? "bg-slate-700/50 border-slate-600 hover:bg-slate-700"
                              : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`${bgColor} rounded-lg p-2 flex-shrink-0 mt-1`}>
                              <Icon className={`w-4 h-4 ${iconColor}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1">
                                  <p className={`font-medium text-sm ${isDark ? "text-white" : "text-slate-900"}`}>
                                    {notif.title}
                                  </p>
                                  <p className={`text-sm mt-1 line-clamp-2 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                                    {notif.message}
                                  </p>
                                  <p className={`text-xs mt-2 ${isDark ? "text-slate-500" : "text-slate-500"}`}>
                                    {notif.time}
                                  </p>
                                </div>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDismissNotification(notif.id);
                                  }}
                                  className={`flex-shrink-0 p-1 rounded hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors`}
                                >
                                  <X className="w-4 h-4 text-slate-400" />
                                </button>
                              </div>
                            </div>
                            {!notif.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1.5" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className={`p-8 text-center ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                    <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No notifications</p>
                  </div>
                )}
              </PopoverContent>
            </Popover>

            <Button
              onClick={handleLogout}
              variant="outline"
              className={`gap-2 ${isDark ? "border-slate-600 text-slate-300 hover:bg-slate-700" : "border-slate-300 text-slate-700 hover:bg-slate-100"}`}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          {/* Total Students Card */}
          <div
            className={`${theme.card} rounded-lg border p-6 transition-all duration-300 hover:shadow-lg`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${theme.subtext} mb-2`}>
                  Total Students
                </p>
                <p className={`text-4xl font-bold ${theme.accent}`}>
                  {totalStudents}
                </p>
                <p className={`text-xs ${theme.subtext} mt-2`}>
                  Across {courses.length} courses
                </p>
              </div>
              <div
                className={`${isDark ? "bg-blue-900/30" : "bg-blue-100"} rounded-lg p-4`}
              >
                <Users
                  className={`w-8 h-8 ${isDark ? "text-blue-400" : "text-blue-600"}`}
                />
              </div>
            </div>
          </div>

          {/* Average Attendance Card */}
          <div
            className={`${theme.card} rounded-lg border p-6 transition-all duration-300 hover:shadow-lg`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${theme.subtext} mb-2`}>
                  Average Attendance
                </p>
                <p className={`text-4xl font-bold ${theme.accent}`}>
                  {averageAttendance}%
                </p>
                <p className={`text-xs ${theme.subtext} mt-2`}>
                  Across all courses
                </p>
              </div>
              <div
                className={`${isDark ? "bg-green-900/30" : "bg-green-100"} rounded-lg p-4`}
              >
                <BarChart3
                  className={`w-8 h-8 ${isDark ? "text-green-400" : "text-green-600"}`}
                />
              </div>
            </div>
          </div>

          {/* Urgent Tasks Card */}
          <div
            className={`${theme.card} rounded-lg border p-6 transition-all duration-300 hover:shadow-lg`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${theme.subtext} mb-2`}>
                  Urgent Tasks
                </p>
                <p className={`text-4xl font-bold ${theme.accent}`}>
                  {upcomingTasks}
                </p>
                <p className={`text-xs ${theme.subtext} mt-2`}>
                  Pending actions required
                </p>
              </div>
              <div
                className={`${isDark ? "bg-orange-900/30" : "bg-orange-100"} rounded-lg p-4`}
              >
                <CheckSquare
                  className={`w-8 h-8 ${isDark ? "text-orange-400" : "text-orange-600"}`}
                />
              </div>
            </div>
          </div>

          {/* At-Risk Students Card */}
          <div
            className={`${theme.card} rounded-lg border p-6 transition-all duration-300 hover:shadow-lg cursor-pointer`}
            onClick={() => navigate("/faculty/at-risk")}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${theme.subtext} mb-2`}>
                  At-Risk Students
                </p>
                <p className={`text-4xl font-bold text-red-600`}>
                  8
                </p>
                <p className={`text-xs ${theme.subtext} mt-2`}>
                  Needs intervention
                </p>
              </div>
              <div
                className={`${isDark ? "bg-red-900/30" : "bg-red-100"} rounded-lg p-4`}
              >
                <AlertTriangle
                  className={`w-8 h-8 ${isDark ? "text-red-400" : "text-red-600"}`}
                />
              </div>
            </div>
          </div>

          {/* Mentor Responsibilities Card */}
          <div
            className={`${theme.card} rounded-lg border p-6 transition-all duration-300 hover:shadow-lg cursor-pointer`}
            onClick={() => navigate("/faculty/mentor")}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${theme.subtext} mb-2`}>
                  Mentor Responsibilities
                </p>
                <p className={`text-4xl font-bold ${isDark ? "text-purple-400" : "text-purple-600"}`}>
                  6
                </p>
                <p className={`text-xs ${theme.subtext} mt-2`}>
                  Active mentees
                </p>
              </div>
              <div
                className={`${isDark ? "bg-purple-900/30" : "bg-purple-100"} rounded-lg p-4`}
              >
                <UserCheck
                  className={`w-8 h-8 ${isDark ? "text-purple-400" : "text-purple-600"}`}
                />
              </div>
            </div>
          </div>

          {/* Student List Card */}
          <div
            className={`${theme.card} rounded-lg border p-6 transition-all duration-300 hover:shadow-lg cursor-pointer`}
            onClick={() => navigate("/faculty/students")}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${theme.subtext} mb-2`}>
                  Student List
                </p>
                <p className={`text-4xl font-bold ${isDark ? "text-teal-400" : "text-teal-600"}`}>
                  10
                </p>
                <p className={`text-xs ${theme.subtext} mt-2`}>
                  Total students
                </p>
              </div>
              <div
                className={`${isDark ? "bg-teal-900/30" : "bg-teal-100"} rounded-lg p-4`}
              >
                <BookOpen
                  className={`w-8 h-8 ${isDark ? "text-teal-400" : "text-teal-600"}`}
                />
              </div>
            </div>
          </div>

          {/* Settings Card */}
          <div
            className={`${theme.card} rounded-lg border p-6 transition-all duration-300 hover:shadow-lg cursor-pointer`}
            onClick={() => navigate("/faculty/settings")}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${theme.subtext} mb-2`}>
                  Settings
                </p>
                <p className={`text-sm font-semibold ${theme.text} truncate`}>
                  {user?.email || "Account Settings"}
                </p>
                <p className={`text-xs ${theme.subtext} mt-2`}>
                  Manage account
                </p>
              </div>
              <div
                className={`${isDark ? "bg-slate-700/30" : "bg-slate-100"} rounded-lg p-4`}
              >
                <Settings
                  className={`w-8 h-8 ${isDark ? "text-slate-400" : "text-slate-600"}`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="mb-8">
          <h2 className={`text-xl font-bold ${theme.text} mb-4`}>Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {quickActions.map((action) => (
              <div
                key={action.id}
                onClick={() => handleQuickAction(action.action)}
                className={`${theme.card} rounded-lg border p-5 transition-all duration-300 hover:shadow-lg cursor-pointer hover:-translate-y-1`}
              >
                <div className={`${action.bgColor} rounded-lg p-3 mb-4 w-fit border transition-colors duration-300`}>
                  <div className={action.iconColor}>{action.icon}</div>
                </div>
                <h3 className={`font-semibold ${theme.text} mb-1`}>{action.title}</h3>
                <p className={`text-sm ${theme.subtext}`}>{action.description}</p>
                <button className={`mt-4 text-sm font-medium ${theme.accent} hover:opacity-80 transition-opacity`}>
                  Open →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Charts Section - Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Grade Trend Chart */}
          <div className={`${theme.card} rounded-lg border p-6 transition-colors duration-300`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`font-bold text-lg ${theme.text}`}>
                Grade Trend
              </h3>
              <TrendingUp className={`h-5 w-5 ${isDark ? "text-green-400" : "text-green-600"}`} />
            </div>
            <p className={`text-xs ${theme.subtext} mb-4`}>
              Average marks progression over time
            </p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={gradeTrendData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={chartTheme.gridColor}
                  />
                  <XAxis
                    dataKey="month"
                    stroke={chartTheme.textColor}
                    fontSize={12}
                  />
                  <YAxis stroke={chartTheme.textColor} fontSize={12} />
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
                    dataKey="avgMarks"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ fill: "#10b981", r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Avg Marks"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Course Difficulty Index Chart */}
          <div className={`${theme.card} rounded-lg border p-6 transition-colors duration-300`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`font-bold text-lg ${theme.text}`}>
                Course Difficulty Index
              </h3>
              <AlertCircle className={`h-5 w-5 ${isDark ? "text-orange-400" : "text-orange-600"}`} />
            </div>
            <p className={`text-xs ${theme.subtext} mb-4`}>
              Difficulty level vs student performance
            </p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={difficultyIndexData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={chartTheme.gridColor}
                  />
                  <XAxis
                    dataKey="course"
                    stroke={chartTheme.textColor}
                    fontSize={12}
                    angle={-45}
                    textAnchor="end"
                    height={100}
                  />
                  <YAxis stroke={chartTheme.textColor} fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: chartTheme.tooltipBg,
                      border: `1px solid ${chartTheme.tooltipBorder}`,
                      borderRadius: "var(--radius)",
                      color: chartTheme.textColor,
                    }}
                  />
                  <Legend />
                  <Bar dataKey="difficulty" fill="#ef4444" name="Difficulty" radius={[8, 8, 0, 0]}>
                    {difficultyIndexData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          entry.difficulty > 70
                            ? "#ef4444"
                            : entry.difficulty > 60
                            ? "#f59e0b"
                            : "#10b981"
                        }
                      />
                    ))}
                  </Bar>
                  <Bar dataKey="avgScore" fill="#3b82f6" name="Avg Score" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Charts Section - Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Attendance Trend Chart */}
          <div className={`${theme.card} rounded-lg border p-6 transition-colors duration-300`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`font-bold text-lg ${theme.text}`}>
                Attendance Trend
              </h3>
              <TrendingUp className={`h-5 w-5 ${isDark ? "text-blue-400" : "text-blue-600"}`} />
            </div>
            <p className={`text-xs ${theme.subtext} mb-4`}>
              Weekly attendance percentage
            </p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={attendanceTrendData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={chartTheme.gridColor}
                  />
                  <XAxis
                    dataKey="week"
                    stroke={chartTheme.textColor}
                    fontSize={12}
                  />
                  <YAxis stroke={chartTheme.textColor} fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: chartTheme.tooltipBg,
                      border: `1px solid ${chartTheme.tooltipBorder}`,
                      borderRadius: "var(--radius)",
                      color: chartTheme.textColor,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="percentage"
                    fill="#3b82f6"
                    fillOpacity={0.6}
                    stroke="#3b82f6"
                    strokeWidth={2}
                    name="Attendance %"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Comparison Chart (Sections/Batches) */}
          <div className={`${theme.card} rounded-lg border p-6 transition-colors duration-300`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`font-bold text-lg ${theme.text}`}>
                Section Performance Comparison
              </h3>
              <BarChart3 className={`h-5 w-5 ${isDark ? "text-purple-400" : "text-purple-600"}`} />
            </div>
            <p className={`text-xs ${theme.subtext} mb-4`}>
              Compare metrics across all sections
            </p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={chartTheme.gridColor}
                  />
                  <XAxis
                    dataKey="section"
                    stroke={chartTheme.textColor}
                    fontSize={12}
                  />
                  <YAxis stroke={chartTheme.textColor} fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: chartTheme.tooltipBg,
                      border: `1px solid ${chartTheme.tooltipBorder}`,
                      borderRadius: "var(--radius)",
                      color: chartTheme.textColor,
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="average"
                    fill="#3b82f6"
                    name="Avg Marks"
                    radius={[8, 8, 0, 0]}
                  />
                  <Bar
                    dataKey="attendance"
                    fill="#10b981"
                    name="Attendance %"
                    radius={[8, 8, 0, 0]}
                  />
                  <Bar
                    dataKey="taskCompletion"
                    fill="#f59e0b"
                    name="Task Completion %"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Courses Overview */}
          <div className="lg:col-span-2">
            <div className={`${theme.card} rounded-lg border p-6 transition-colors duration-300`}>
              <h2 className={`text-lg font-semibold ${theme.text} mb-4`}>
                Courses Overview
              </h2>
              <div className="space-y-4">
                {courses.map((course) => (
                  <div
                    key={course.code}
                    className={`${theme.statCard} rounded-lg border p-4 transition-colors duration-300`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className={`font-medium ${theme.text}`}>{course.name}</p>
                        <p className={`text-sm ${theme.subtext}`}>{course.code}</p>
                      </div>
                      <div className="text-right">
                        <p className={`text-lg font-semibold ${theme.accent}`}>
                          {course.students}
                        </p>
                        <p className={`text-xs ${theme.subtext}`}>Students</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-300 dark:bg-gray-600 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{
                            width: `${
                              course.attendance[course.attendance.length - 1]
                            }%`,
                          }}
                        ></div>
                      </div>
                      <p className={`text-sm font-medium ${theme.subtext}`}>
                        {course.attendance[course.attendance.length - 1]}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Tasks Sidebar */}
          <div className="lg:col-span-1">
            <div className={`${theme.card} rounded-lg border p-6 transition-colors duration-300`}>
              <h2 className={`text-lg font-semibold ${theme.text} mb-4`}>
                Upcoming Tasks
              </h2>
              {teachingTasks.length > 0 ? (
                <div className="space-y-3">
                  {teachingTasks.map((task) => (
                    <div
                      key={task.id}
                      className={`${theme.statCard} rounded-lg border p-3 transition-colors duration-300`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <p className={`text-sm font-medium ${theme.text}`}>
                            {task.title}
                          </p>
                          {task.subtitle && (
                            <p className={`text-xs ${theme.subtext} mt-1`}>
                              {task.subtitle}
                            </p>
                          )}
                          <p className={`text-xs ${theme.subtext} mt-2`}>
                            {task.date}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium border ${
                            task.status === "action"
                              ? theme.badge.action
                              : theme.badge.pending
                          }`}
                        >
                          {task.badge}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className={`text-sm ${theme.subtext} text-center py-8`}>
                  No upcoming tasks
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
