import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, BarChart3, CheckSquare, LogOut, Moon, Sun } from "lucide-react";

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

export default function FacultyDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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

          {/* Upcoming Teaching Tasks Card */}
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
        </div>

        {/* Courses and Tasks Section */}
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
