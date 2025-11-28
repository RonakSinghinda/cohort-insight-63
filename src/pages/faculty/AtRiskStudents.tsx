import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  AlertTriangle,
  TrendingDown,
  Users,
  LogOut,
  Moon,
  Sun,
  MessageSquare,
  CheckCircle,
  Clock,
  ArrowLeft,
} from "lucide-react";

interface AtRiskStudent {
  id: string;
  name: string;
  rollNumber: string;
  attendance: number;
  gradeTrend: "declining" | "stable" | "improving";
  currentGpa: number;
  riskScore: number;
  flaggedReasons: string[];
  course: string;
}

export default function AtRiskStudents() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
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

  // Mock data for at-risk students
  const atRiskStudents: AtRiskStudent[] = [
    {
      id: "1",
      name: "Rajesh Kumar",
      rollNumber: "RV2208A001",
      attendance: 62,
      gradeTrend: "declining",
      currentGpa: 2.1,
      riskScore: 82,
      flaggedReasons: ["Low attendance", "Failing grade trend", "Missing assignments"],
      course: "BCS302",
    },
    {
      id: "2",
      name: "Priya Sharma",
      rollNumber: "RV2208A015",
      attendance: 68,
      gradeTrend: "declining",
      currentGpa: 2.5,
      riskScore: 75,
      flaggedReasons: ["Attendance below 70%", "Declining performance"],
      course: "BCS305",
    },
    {
      id: "3",
      name: "Amit Singh",
      rollNumber: "RV2208A028",
      attendance: 71,
      gradeTrend: "stable",
      currentGpa: 2.3,
      riskScore: 65,
      flaggedReasons: ["Low GPA", "Borderline attendance"],
      course: "BCS308",
    },
    {
      id: "4",
      name: "Neha Patel",
      rollNumber: "RV2208A042",
      attendance: 59,
      gradeTrend: "declining",
      currentGpa: 1.8,
      riskScore: 88,
      flaggedReasons: ["Critical attendance", "Failing grades", "No submissions"],
      course: "BCS302",
    },
    {
      id: "5",
      name: "Vikram Gupta",
      rollNumber: "RV2208A031",
      attendance: 73,
      gradeTrend: "stable",
      currentGpa: 2.4,
      riskScore: 58,
      flaggedReasons: ["Attendance concerns", "Below average performance"],
      course: "BCS305",
    },
    {
      id: "6",
      name: "Ananya Desai",
      rollNumber: "RV2208A009",
      attendance: 65,
      gradeTrend: "declining",
      currentGpa: 2.2,
      riskScore: 72,
      flaggedReasons: ["Low attendance", "Failing trend", "Disengaged"],
      course: "BCS308",
    },
    {
      id: "7",
      name: "Sahil Reddy",
      rollNumber: "RV2208A019",
      attendance: 61,
      gradeTrend: "declining",
      currentGpa: 1.9,
      riskScore: 85,
      flaggedReasons: ["Critical attendance", "Declining grades"],
      course: "BCS302",
    },
    {
      id: "8",
      name: "Divya Nair",
      rollNumber: "RV2208A050",
      attendance: 74,
      gradeTrend: "stable",
      currentGpa: 2.6,
      riskScore: 48,
      flaggedReasons: ["Borderline attendance", "Needs monitoring"],
      course: "BCS305",
    },
  ];

  const theme = isDark
    ? {
        bg: "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900",
        card: "bg-slate-800 border-slate-700",
        text: "text-white",
        subtext: "text-slate-400",
        accent: "text-blue-400",
        alertCard: "bg-slate-700 border-slate-600",
      }
    : {
        bg: "bg-gradient-to-br from-slate-50 via-white to-slate-50",
        card: "bg-white border-slate-200",
        text: "text-slate-900",
        subtext: "text-slate-600",
        accent: "text-blue-600",
        alertCard: "bg-slate-50 border-slate-300",
      };

  const getRiskColor = (score: number) => {
    if (score >= 70) return { bg: isDark ? "bg-red-500/20 border-red-500/30" : "bg-red-100 border-red-300", text: "text-red-600", label: "HIGH" };
    if (score >= 50) return { bg: isDark ? "bg-amber-500/20 border-amber-500/30" : "bg-amber-100 border-amber-300", text: "text-amber-600", label: "MEDIUM" };
    return { bg: isDark ? "bg-green-500/20 border-green-500/30" : "bg-green-100 border-green-300", text: "text-green-600", label: "LOW" };
  };

  const getGradeTrendColor = (trend: string) => {
    if (trend === "declining") return "text-red-600 dark:text-red-400";
    if (trend === "improving") return "text-green-600 dark:text-green-400";
    return "text-amber-600 dark:text-amber-400";
  };

  const getGradeTrendIcon = (trend: string) => {
    if (trend === "declining") return "↓ Declining";
    if (trend === "improving") return "↑ Improving";
    return "→ Stable";
  };

  const handleMeetStudent = (studentName: string) => {
    toast({
      title: "Meeting Scheduled",
      description: `Meeting with ${studentName} has been scheduled for tomorrow at 2:00 PM`,
    });
  };

  const handleAssignTask = (studentName: string) => {
    toast({
      title: "Task Assigned",
      description: `Remedial assignment sent to ${studentName}`,
    });
  };

  const handleSendReminder = (studentName: string) => {
    toast({
      title: "Reminder Sent",
      description: `Attendance and performance reminder sent to ${studentName}`,
    });
  };

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  if (!user) {
    return null;
  }

  return (
    <div className={`min-h-screen ${theme.bg} transition-colors duration-300`}>
      {/* Navigation Bar */}
      <div className={`${theme.card} border-b sticky top-0 z-50 transition-colors duration-300`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate("/faculty/dashboard")}
              variant="ghost"
              size="icon"
              className={isDark ? "text-slate-300 hover:bg-slate-700" : "text-slate-700 hover:bg-slate-100"}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className={`text-2xl font-bold ${theme.text}`}>
                At-Risk Students Alert
              </h1>
              <p className={`text-sm ${theme.subtext}`}>Monitor and support struggling students</p>
            </div>
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
        {/* At-Risk Count Stat Card */}
        <div className="mb-8">
          <div className={`${theme.card} rounded-lg border p-6 transition-all duration-300 hover:shadow-lg`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${theme.subtext} mb-2`}>
                  Students at Risk
                </p>
                <p className={`text-4xl font-bold text-red-600`}>
                  {atRiskStudents.length}
                </p>
                <p className={`text-xs ${theme.subtext} mt-2`}>
                  Requiring immediate intervention
                </p>
              </div>
              <div className="bg-red-100 dark:bg-red-900/30 rounded-lg p-4">
                <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Risk Level Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className={`${theme.card} rounded-lg border p-4 transition-colors duration-300`}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-red-600"></div>
              <p className={`text-sm font-medium ${theme.text}`}>High Risk</p>
            </div>
            <p className={`text-2xl font-bold text-red-600`}>
              {atRiskStudents.filter((s) => s.riskScore >= 70).length}
            </p>
          </div>
          <div className={`${theme.card} rounded-lg border p-4 transition-colors duration-300`}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-amber-600"></div>
              <p className={`text-sm font-medium ${theme.text}`}>Medium Risk</p>
            </div>
            <p className={`text-2xl font-bold text-amber-600`}>
              {atRiskStudents.filter((s) => s.riskScore >= 50 && s.riskScore < 70).length}
            </p>
          </div>
          <div className={`${theme.card} rounded-lg border p-4 transition-colors duration-300`}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-green-600"></div>
              <p className={`text-sm font-medium ${theme.text}`}>Low Risk</p>
            </div>
            <p className={`text-2xl font-bold text-green-600`}>
              {atRiskStudents.filter((s) => s.riskScore < 50).length}
            </p>
          </div>
        </div>

        {/* At-Risk Students List */}
        <div className="space-y-4">
          {atRiskStudents.map((student) => {
            const riskColor = getRiskColor(student.riskScore);
            return (
              <div
                key={student.id}
                className={`${theme.card} rounded-lg border p-6 transition-all duration-300 hover:shadow-md`}
              >
                {/* Student Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div>
                        <h3 className={`text-lg font-semibold ${theme.text}`}>
                          {student.name}
                        </h3>
                        <p className={`text-sm ${theme.subtext}`}>
                          {student.rollNumber} • {student.course}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full border ${riskColor.bg}`}>
                    <p className={`text-xs font-bold ${riskColor.text}`}>
                      {riskColor.label} RISK
                    </p>
                  </div>
                </div>

                {/* Risk Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  {/* Attendance */}
                  <div className={`${theme.alertCard} rounded-lg border p-3`}>
                    <p className={`text-xs font-medium ${theme.subtext} mb-1`}>
                      Attendance
                    </p>
                    <p className={`text-xl font-bold ${
                      student.attendance < 70 ? "text-red-600" : student.attendance < 80 ? "text-amber-600" : "text-green-600"
                    }`}>
                      {student.attendance}%
                    </p>
                  </div>

                  {/* Grade Trend */}
                  <div className={`${theme.alertCard} rounded-lg border p-3`}>
                    <p className={`text-xs font-medium ${theme.subtext} mb-1`}>
                      Grade Trend
                    </p>
                    <p className={`text-sm font-bold ${getGradeTrendColor(student.gradeTrend)}`}>
                      {getGradeTrendIcon(student.gradeTrend)}
                    </p>
                  </div>

                  {/* Current GPA */}
                  <div className={`${theme.alertCard} rounded-lg border p-3`}>
                    <p className={`text-xs font-medium ${theme.subtext} mb-1`}>
                      Current GPA
                    </p>
                    <p className={`text-xl font-bold ${theme.text}`}>
                      {student.currentGpa.toFixed(2)}
                    </p>
                  </div>

                  {/* Risk Score */}
                  <div className={`${riskColor.bg} rounded-lg border p-3`}>
                    <p className={`text-xs font-medium ${theme.subtext} mb-1`}>
                      Risk Score
                    </p>
                    <p className={`text-xl font-bold ${riskColor.text}`}>
                      {student.riskScore}/100
                    </p>
                  </div>
                </div>

                {/* Flagged Reasons */}
                <div className="mb-4">
                  <p className={`text-xs font-semibold ${theme.subtext} mb-2`}>
                    Reasons Flagged:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {student.flaggedReasons.map((reason, idx) => (
                      <span
                        key={idx}
                        className={`text-xs px-2 py-1 rounded ${
                          isDark
                            ? "bg-slate-700 text-slate-300"
                            : "bg-slate-200 text-slate-700"
                        }`}
                      >
                        {reason}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Button
                    onClick={() => handleMeetStudent(student.name)}
                    className="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Meet Student
                  </Button>
                  <Button
                    onClick={() => handleAssignTask(student.name)}
                    className="gap-2 bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Assign Task
                  </Button>
                  <Button
                    onClick={() => handleSendReminder(student.name)}
                    className="gap-2 bg-orange-600 hover:bg-orange-700 text-white"
                  >
                    <Clock className="w-4 h-4" />
                    Send Reminder
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
