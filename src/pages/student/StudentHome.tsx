import { useState, useEffect } from "react";
import {
  Bell, Search, User, LogOut, Home, Users, DollarSign, Calendar, FileText,
  MessageSquare, Lightbulb, Moon, Sun, ArrowRight, Clock, AlertCircle,
  CheckCircle, BookOpen, Briefcase, Award, Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
  hoverCard: "hover:bg-slate-100",
};

const darkTheme = {
  background: "bg-slate-950",
  card: "bg-slate-900 border-slate-800",
  text: "text-slate-50",
  textMuted: "text-slate-400",
  nav: "bg-slate-900 border-slate-800",
  hover: "hover:bg-slate-800",
  hoverCard: "hover:bg-slate-800",
};

// ==================== MOCK DATA ====================

// Default student profile (fallback if not logged in)
const defaultStudentProfile = {
  name: "Guest User",
  usn: "RV2208A12",
  course: "B.Tech",
  branch: "Computer Science & Engineering",
  semester: 4,
  section: "A",
  photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Guest"
};

const navigationSections = [
  {
    id: "home",
    title: "HOME",
    icon: Home,
    description: "View your dashboard with academic metrics and analytics",
    color: "from-blue-500 to-blue-600",
    textColor: "text-blue-600",
    bgColor: "bg-blue-50",
    darkBgColor: "dark:bg-blue-950",
    route: "/student/dashboard",
    stats: { label: "Overall Performance", value: "7.9 GPA" }
  },
  {
    id: "counselling",
    title: "COUNSELLING",
    icon: Users,
    description: "Connect with mentors and academic advisors for guidance",
    color: "from-purple-500 to-purple-600",
    textColor: "text-purple-600",
    bgColor: "bg-purple-50",
    darkBgColor: "dark:bg-purple-950",
    route: "/student/counselling",
    stats: { label: "Available Mentors", value: "12" }
  },
  {
    id: "fee",
    title: "FEE",
    icon: DollarSign,
    description: "Manage your fees, payments, and financial records",
    color: "from-emerald-500 to-emerald-600",
    textColor: "text-emerald-600",
    bgColor: "bg-emerald-50",
    darkBgColor: "dark:bg-emerald-950",
    route: "/student/fee",
    stats: { label: "Total Due", value: "₹ 0" }
  },
  {
    id: "timetable",
    title: "TIME TABLE",
    icon: Calendar,
    description: "Check your class schedule and important dates",
    color: "from-amber-500 to-amber-600",
    textColor: "text-amber-600",
    bgColor: "bg-amber-50",
    darkBgColor: "dark:bg-amber-950",
    route: "/student/timetable",
    stats: { label: "Classes This Week", value: "24" }
  },
  {
    id: "exam",
    title: "EXAM",
    icon: FileText,
    description: "Access exam schedules, results, and study materials",
    color: "from-red-500 to-red-600",
    textColor: "text-red-600",
    bgColor: "bg-red-50",
    darkBgColor: "dark:bg-red-950",
    route: "/student/exam",
    stats: { label: "Upcoming Exams", value: "5" }
  },
  {
    id: "feedback",
    title: "FEEDBACK",
    icon: MessageSquare,
    description: "Share your feedback and suggestions with the institution",
    color: "from-cyan-500 to-cyan-600",
    textColor: "text-cyan-600",
    bgColor: "bg-cyan-50",
    darkBgColor: "dark:bg-cyan-950",
    route: "/student/feedback",
    stats: { label: "Pending Surveys", value: "2" }
  }
];

const recentNotifications = [
  {
    id: 1,
    title: "Assignment Due",
    message: "Data Structures assignment is due tomorrow at 5 PM",
    time: "2 hours ago",
    read: false,
    icon: Clock,
    color: "text-amber-600"
  },
  {
    id: 2,
    title: "Exam Result",
    message: "Your mid-semester exam results are now available",
    time: "1 day ago",
    read: false,
    icon: CheckCircle,
    color: "text-emerald-600"
  },
  {
    id: 3,
    title: "Fee Reminder",
    message: "Your semester fee payment is due by 15th December",
    time: "3 days ago",
    read: true,
    icon: AlertCircle,
    color: "text-red-600"
  }
];

// ==================== COMPONENT ====================

export default function StudentHome() {
  const [isDark, setIsDark] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const theme = isDark ? darkTheme : lightTheme;

  // Use auth user data or fallback to default
  const studentProfile = user || defaultStudentProfile;

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className={`min-h-screen ${theme.background} transition-colors duration-300`}>
      {/* ==================== NAVIGATION BAR ==================== */}
      <nav className={`${theme.nav} border-b ${theme.card.split('border-')[1]} sticky top-0 z-50 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/student/home')}>
              <Lightbulb className={`w-8 h-8 ${theme.text}`} />
              <span className={`text-xl font-bold ${theme.text}`}>DeepTech Campus</span>
            </div>

            {/* Right side - Actions */}
            <div className="flex items-center gap-4">
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsDark(!isDark)}
                className={`${theme.text}`}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>

              {/* Notifications */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`${theme.text} relative`}
                >
                  <Bell className="w-5 h-5" />
                  {recentNotifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </Button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className={`absolute right-0 mt-2 w-80 ${theme.card} border rounded-lg shadow-lg p-0 transition-colors duration-300`}>
                    <div className={`${theme.text} font-bold p-4 border-b ${theme.card.split('border-')[1]}`}>
                      Notifications
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {recentNotifications.map((notif) => {
                        const Icon = notif.icon;
                        return (
                          <div key={notif.id} className={`p-4 border-b ${theme.card.split('border-')[1]} last:border-b-0 hover:${theme.hoverCard} transition-colors`}>
                            <div className="flex gap-3">
                              <Icon className={`w-5 h-5 mt-1 ${notif.color} flex-shrink-0`} />
                              <div className="flex-1">
                                <h4 className={`${theme.text} font-semibold text-sm`}>{notif.title}</h4>
                                <p className={`${theme.textMuted} text-sm mt-1`}>{notif.message}</p>
                                <span className={`${theme.textMuted} text-xs mt-2 block`}>{notif.time}</span>
                              </div>
                              {!notif.read && <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* User Profile */}
              <Button
                variant="ghost"
                size="sm"
                className={`${theme.text} flex items-center gap-2`}
              >
                <img
                  src={studentProfile.photo}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border border-slate-300"
                />
                <span className="hidden sm:inline text-sm font-medium">{studentProfile.name.split(' ')[0]}</span>
              </Button>

              {/* Logout */}
              <Button
                variant="ghost"
                size="sm"
                className={`${theme.text}`}
                onClick={() => navigate('/auth')}
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* ==================== MAIN CONTENT ==================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className={`${theme.card} rounded-xl p-8 mb-12 border transition-colors duration-300`}>
          <div className="flex items-start justify-between">
            <div>
              <h1 className={`${theme.text} text-4xl font-bold mb-2`}>
                Welcome, {studentProfile.name}!
              </h1>
              <p className={`${theme.textMuted} text-lg mb-4`}>
                {studentProfile.usn} | {studentProfile.course} - {studentProfile.branch}
              </p>
              <div className="flex gap-6 flex-wrap">
                <div>
                  <span className={`${theme.textMuted} text-sm`}>Semester</span>
                  <p className={`${theme.text} text-xl font-semibold`}>{studentProfile.semester}</p>
                </div>
                <div>
                  <span className={`${theme.textMuted} text-sm`}>Section</span>
                  <p className={`${theme.text} text-xl font-semibold`}>{studentProfile.section}</p>
                </div>
              </div>
            </div>
            <img
              src={studentProfile.photo}
              alt="Profile"
              className="w-32 h-32 rounded-xl border-4 border-blue-500 shadow-lg"
            />
          </div>
        </div>

        {/* Navigation Sections Grid */}
        <div className="mb-12">
          <h2 className={`${theme.text} text-2xl font-bold mb-8`}>Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {navigationSections.map((section) => {
              const Icon = section.icon;
              return (
                <Card
                  key={section.id}
                  onClick={() => navigate(section.route)}
                  className={`${theme.card} border cursor-pointer transform transition-all duration-300 hover:shadow-lg hover:scale-105 overflow-hidden`}
                >
                  <div className={`h-2 bg-gradient-to-r ${section.color}`}></div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-lg ${section.bgColor} ${section.darkBgColor}`}>
                        <Icon className={`w-6 h-6 ${section.textColor}`} />
                      </div>
                      <ArrowRight className={`w-5 h-5 ${theme.textMuted} group-hover:translate-x-1 transition-transform`} />
                    </div>
                    <h3 className={`${theme.text} text-xl font-bold mb-2`}>
                      {section.title}
                    </h3>
                    <p className={`${theme.textMuted} text-sm mb-4`}>
                      {section.description}
                    </p>
                    <div className={`${theme.card.split('bg-')[1].split(' ')[0]} p-3 rounded-lg flex items-center justify-between`}>
                      <span className={`${theme.textMuted} text-xs`}>
                        {section.stats.label}
                      </span>
                      <span className={`${theme.text} font-bold`}>
                        {section.stats.value}
                      </span>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Recent Notifications Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className={`${theme.text} text-2xl font-bold`}>Recent Updates</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowNotifications(!showNotifications)}
              className={`${theme.text}`}
            >
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentNotifications.map((notif) => {
              const Icon = notif.icon;
              return (
                <Card
                  key={notif.id}
                  className={`${theme.card} border p-6 transition-colors duration-300`}
                >
                  <div className="flex gap-4">
                    <div className={`p-3 rounded-lg ${notif.color} opacity-20 w-fit`}>
                      <Icon className={`w-6 h-6 ${notif.color}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className={`${theme.text} font-bold mb-1`}>{notif.title}</h4>
                      <p className={`${theme.textMuted} text-sm mb-3`}>{notif.message}</p>
                      <span className={`${theme.textMuted} text-xs`}>{notif.time}</span>
                    </div>
                    {!notif.read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className={`${theme.card} border p-6 transition-colors duration-300`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`${theme.textMuted} text-sm`}>Current Semester</p>
                <p className={`${theme.text} text-2xl font-bold mt-2`}>{studentProfile.semester}</p>
              </div>
              <BookOpen className={`w-8 h-8 text-blue-500 opacity-20`} />
            </div>
          </Card>

          <Card className={`${theme.card} border p-6 transition-colors duration-300`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`${theme.textMuted} text-sm`}>Registered Courses</p>
                <p className={`${theme.text} text-2xl font-bold mt-2`}>8</p>
              </div>
              <Award className={`w-8 h-8 text-emerald-500 opacity-20`} />
            </div>
          </Card>

          <Card className={`${theme.card} border p-6 transition-colors duration-300`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`${theme.textMuted} text-sm`}>Overall GPA</p>
                <p className={`${theme.text} text-2xl font-bold mt-2`}>7.9</p>
              </div>
              <Briefcase className={`w-8 h-8 text-purple-500 opacity-20`} />
            </div>
          </Card>

          <Card className={`${theme.card} border p-6 transition-colors duration-300`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`${theme.textMuted} text-sm`}>Attendance</p>
                <p className={`${theme.text} text-2xl font-bold mt-2`}>84%</p>
              </div>
              <Mail className={`w-8 h-8 text-cyan-500 opacity-20`} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
