import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Users, LogOut, Moon, Sun, ArrowLeft, Search, Mail, Phone, TrendingUp, TrendingDown, Minus, X, BarChart3, Calendar } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface GradeData {
  month: string;
  grade: number;
}

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  email: string;
  phone: string;
  course: string;
  attendance: number;
  recentGrades: number[];
  riskLevel: "high" | "medium" | "low";
  gpa: number;
  gradeHistory: GradeData[];
  enrollmentDate: string;
  semester: number;
}

export default function FacultyStudents() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDark, setIsDark] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [filterRisk, setFilterRisk] = useState<"all" | "high" | "medium" | "low">("all");

  useEffect(() => {
    if (!user) navigate("/auth");
  }, [user, navigate]);

  useEffect(() => {
    const darkMode = document.documentElement.classList.contains("dark");
    setIsDark(darkMode);
    const handleDarkModeChange = () => setIsDark(document.documentElement.classList.contains("dark"));
    const observer = new MutationObserver(handleDarkModeChange);
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const allStudents: Student[] = [
    {
      id: "1",
      name: "Rajesh Kumar",
      rollNumber: "RV2208A001",
      email: "rajesh.kumar@university.edu",
      phone: "+91-9876543210",
      course: "BCS302",
      attendance: 62,
      recentGrades: [65, 68, 70, 72],
      riskLevel: "high",
      gpa: 2.8,
      gradeHistory: [
        { month: "Aug", grade: 65 },
        { month: "Sep", grade: 68 },
        { month: "Oct", grade: 70 },
        { month: "Nov", grade: 72 },
        { month: "Dec", grade: 74 },
      ],
      enrollmentDate: "2022-08-15",
      semester: 5,
    },
    {
      id: "2",
      name: "Priya Sharma",
      rollNumber: "RV2208A015",
      email: "priya.sharma@university.edu",
      phone: "+91-9876543211",
      course: "BCS305",
      attendance: 68,
      recentGrades: [72, 75, 78, 80],
      riskLevel: "high",
      gpa: 3.1,
      gradeHistory: [
        { month: "Aug", grade: 72 },
        { month: "Sep", grade: 75 },
        { month: "Oct", grade: 78 },
        { month: "Nov", grade: 80 },
        { month: "Dec", grade: 82 },
      ],
      enrollmentDate: "2022-08-15",
      semester: 5,
    },
    {
      id: "3",
      name: "Amit Singh",
      rollNumber: "RV2208A028",
      email: "amit.singh@university.edu",
      phone: "+91-9876543212",
      course: "BCS308",
      attendance: 71,
      recentGrades: [78, 80, 82, 84],
      riskLevel: "medium",
      gpa: 3.2,
      gradeHistory: [
        { month: "Aug", grade: 78 },
        { month: "Sep", grade: 80 },
        { month: "Oct", grade: 82 },
        { month: "Nov", grade: 84 },
        { month: "Dec", grade: 85 },
      ],
      enrollmentDate: "2022-08-15",
      semester: 5,
    },
    {
      id: "4",
      name: "Neha Patel",
      rollNumber: "RV2208A042",
      email: "neha.patel@university.edu",
      phone: "+91-9876543213",
      course: "BCS302",
      attendance: 59,
      recentGrades: [55, 58, 60, 62],
      riskLevel: "high",
      gpa: 2.3,
      gradeHistory: [
        { month: "Aug", grade: 55 },
        { month: "Sep", grade: 58 },
        { month: "Oct", grade: 60 },
        { month: "Nov", grade: 62 },
        { month: "Dec", grade: 65 },
      ],
      enrollmentDate: "2022-08-15",
      semester: 5,
    },
    {
      id: "5",
      name: "Vikram Gupta",
      rollNumber: "RV2208A031",
      email: "vikram.gupta@university.edu",
      phone: "+91-9876543214",
      course: "BCS305",
      attendance: 73,
      recentGrades: [82, 84, 86, 88],
      riskLevel: "low",
      gpa: 3.5,
      gradeHistory: [
        { month: "Aug", grade: 82 },
        { month: "Sep", grade: 84 },
        { month: "Oct", grade: 86 },
        { month: "Nov", grade: 88 },
        { month: "Dec", grade: 89 },
      ],
      enrollmentDate: "2022-08-15",
      semester: 5,
    },
    {
      id: "6",
      name: "Ananya Desai",
      rollNumber: "RV2208A009",
      email: "ananya.desai@university.edu",
      phone: "+91-9876543215",
      course: "BCS308",
      attendance: 65,
      recentGrades: [70, 72, 74, 76],
      riskLevel: "high",
      gpa: 2.9,
      gradeHistory: [
        { month: "Aug", grade: 70 },
        { month: "Sep", grade: 72 },
        { month: "Oct", grade: 74 },
        { month: "Nov", grade: 76 },
        { month: "Dec", grade: 78 },
      ],
      enrollmentDate: "2022-08-15",
      semester: 5,
    },
    {
      id: "7",
      name: "Sahil Reddy",
      rollNumber: "RV2208A019",
      email: "sahil.reddy@university.edu",
      phone: "+91-9876543216",
      course: "BCS302",
      attendance: 61,
      recentGrades: [68, 70, 72, 74],
      riskLevel: "high",
      gpa: 2.7,
      gradeHistory: [
        { month: "Aug", grade: 68 },
        { month: "Sep", grade: 70 },
        { month: "Oct", grade: 72 },
        { month: "Nov", grade: 74 },
        { month: "Dec", grade: 76 },
      ],
      enrollmentDate: "2022-08-15",
      semester: 5,
    },
    {
      id: "8",
      name: "Divya Nair",
      rollNumber: "RV2208A050",
      email: "divya.nair@university.edu",
      phone: "+91-9876543217",
      course: "BCS305",
      attendance: 74,
      recentGrades: [85, 87, 89, 91],
      riskLevel: "low",
      gpa: 3.7,
      gradeHistory: [
        { month: "Aug", grade: 85 },
        { month: "Sep", grade: 87 },
        { month: "Oct", grade: 89 },
        { month: "Nov", grade: 91 },
        { month: "Dec", grade: 92 },
      ],
      enrollmentDate: "2022-08-15",
      semester: 5,
    },
    {
      id: "9",
      name: "Meera Singh",
      rollNumber: "RV2208A017",
      email: "meera.singh@university.edu",
      phone: "+91-9876543218",
      course: "BCS308",
      attendance: 82,
      recentGrades: [88, 89, 90, 91],
      riskLevel: "low",
      gpa: 3.8,
      gradeHistory: [
        { month: "Aug", grade: 88 },
        { month: "Sep", grade: 89 },
        { month: "Oct", grade: 90 },
        { month: "Nov", grade: 91 },
        { month: "Dec", grade: 92 },
      ],
      enrollmentDate: "2022-08-15",
      semester: 5,
    },
    {
      id: "10",
      name: "Rohan Patel",
      rollNumber: "RV2208A026",
      email: "rohan.patel@university.edu",
      phone: "+91-9876543219",
      course: "BCS302",
      attendance: 71,
      recentGrades: [80, 82, 83, 85],
      riskLevel: "medium",
      gpa: 3.3,
      gradeHistory: [
        { month: "Aug", grade: 80 },
        { month: "Sep", grade: 82 },
        { month: "Oct", grade: 83 },
        { month: "Nov", grade: 85 },
        { month: "Dec", grade: 86 },
      ],
      enrollmentDate: "2022-08-15",
      semester: 5,
    },
  ];

  const filteredStudents = useMemo(() => {
    return allStudents.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRisk = filterRisk === "all" || student.riskLevel === filterRisk;
      return matchesSearch && matchesRisk;
    });
  }, [searchQuery, filterRisk]);

  const stats = useMemo(() => {
    return {
      total: allStudents.length,
      highRisk: allStudents.filter((s) => s.riskLevel === "high").length,
      avgAttendance: Math.round(
        allStudents.reduce((sum, s) => sum + s.attendance, 0) / allStudents.length
      ),
    };
  }, []);

  const theme = isDark
    ? {
        bg: "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900",
        card: "bg-slate-800 border-slate-700",
        text: "text-white",
        subtext: "text-slate-400",
        accent: "text-blue-400",
        input: "bg-slate-700 border-slate-600 text-white placeholder-slate-400",
        table: "bg-slate-800 border-slate-700",
        tableRow: "hover:bg-slate-700/50 border-slate-700",
        tableHeader: "bg-slate-900 text-slate-300",
      }
    : {
        bg: "bg-gradient-to-br from-slate-50 via-white to-slate-50",
        card: "bg-white border-slate-200",
        text: "text-slate-900",
        subtext: "text-slate-600",
        accent: "text-blue-600",
        input: "bg-white border-slate-300 text-slate-900 placeholder-slate-400",
        table: "bg-white border-slate-200",
        tableRow: "hover:bg-slate-50 border-slate-200",
        tableHeader: "bg-slate-100 text-slate-900",
      };

  const chartTheme = isDark
    ? {
        tooltipBg: "#1e293b",
        tooltipBorder: "#334155",
        gridColor: "#475569",
        textColor: "#cbd5e1",
      }
    : {
        tooltipBg: "#ffffff",
        tooltipBorder: "#e2e8f0",
        gridColor: "#cbd5e1",
        textColor: "#334155",
      };

  const getRiskColor = (risk: string) => {
    if (risk === "high")
      return {
        bg: isDark ? "bg-red-500/20 border-red-500/30" : "bg-red-100 border-red-300",
        text: "text-red-600",
        label: "HIGH",
      };
    if (risk === "medium")
      return {
        bg: isDark ? "bg-amber-500/20 border-amber-500/30" : "bg-amber-100 border-amber-300",
        text: "text-amber-600",
        label: "MEDIUM",
      };
    return {
      bg: isDark ? "bg-green-500/20 border-green-500/30" : "bg-green-100 border-green-300",
      text: "text-green-600",
      label: "LOW",
    };
  };

  const getGradeTrend = (grades: number[]) => {
    if (grades.length < 2) return "neutral";
    return grades[grades.length - 1] > grades[0]
      ? "up"
      : grades[grades.length - 1] < grades[0]
        ? "down"
        : "neutral";
  };

  const handleToggleTheme = () => {
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

  const handleViewProfile = (student: Student) => {
    setSelectedStudent(student);
    setShowProfileModal(true);
  };

  const handleContactStudent = (email: string) => {
    toast({
      title: "Contact Email",
      description: `Ready to send email to: ${email}`,
    });
  };

  if (!user) return null;

  return (
    <div className={`min-h-screen ${theme.bg} transition-colors duration-300`}>
      {/* Header */}
      <div
        className={`${theme.card} border-b sticky top-0 z-50 transition-colors duration-300`}
      >
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
              <h1 className={`text-2xl font-bold ${theme.text}`}>Student List</h1>
              <p className={`text-sm ${theme.subtext}`}>Manage and track your students</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={handleToggleTheme}
              variant="ghost"
              size="icon"
              className={isDark ? "text-yellow-400" : "text-slate-600"}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className={`gap-2 ${
                isDark
                  ? "border-slate-600 text-slate-300 hover:bg-slate-700"
                  : "border-slate-300 text-slate-700 hover:bg-slate-100"
              }`}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div
            className={`${theme.card} rounded-lg border p-6 transition-all duration-300 hover:shadow-lg`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${theme.subtext} mb-2`}>Total Students</p>
                <p className={`text-4xl font-bold ${theme.accent}`}>{stats.total}</p>
              </div>
              <div className={`${isDark ? "bg-blue-900/30" : "bg-blue-100"} rounded-lg p-4`}>
                <Users className={`w-8 h-8 ${isDark ? "text-blue-400" : "text-blue-600"}`} />
              </div>
            </div>
          </div>

          <div
            className={`${theme.card} rounded-lg border p-6 transition-all duration-300 hover:shadow-lg`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${theme.subtext} mb-2`}>High Risk</p>
                <p className="text-4xl font-bold text-red-600">{stats.highRisk}</p>
              </div>
              <div className={`${isDark ? "bg-red-900/30" : "bg-red-100"} rounded-lg p-4`}>
                <BarChart3 className={`w-8 h-8 ${isDark ? "text-red-400" : "text-red-600"}`} />
              </div>
            </div>
          </div>

          <div
            className={`${theme.card} rounded-lg border p-6 transition-all duration-300 hover:shadow-lg`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${theme.subtext} mb-2`}>Avg. Attendance</p>
                <p className={`text-4xl font-bold ${theme.accent}`}>{stats.avgAttendance}%</p>
              </div>
              <div className={`${isDark ? "bg-green-900/30" : "bg-green-100"} rounded-lg p-4`}>
                <Calendar className={`w-8 h-8 ${isDark ? "text-green-400" : "text-green-600"}`} />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className={`${theme.card} rounded-lg border p-6 mb-6 transition-colors duration-300`}>
          <div className="space-y-4">
            <div className="relative">
              <Search className={`absolute left-3 top-3 w-5 h-5 ${theme.subtext}`} />
              <input
                type="text"
                placeholder="Search by name, roll number, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border ${theme.input} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300`}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilterRisk("all")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
                  filterRisk === "all"
                    ? "bg-blue-600 text-white"
                    : isDark
                      ? "bg-slate-700 text-slate-300 hover:bg-slate-600"
                      : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                }`}
              >
                All ({allStudents.length})
              </button>
              <button
                onClick={() => setFilterRisk("high")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
                  filterRisk === "high"
                    ? "bg-red-600 text-white"
                    : isDark
                      ? "bg-slate-700 text-slate-300 hover:bg-slate-600"
                      : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                }`}
              >
                High ({stats.highRisk})
              </button>
              <button
                onClick={() => setFilterRisk("medium")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
                  filterRisk === "medium"
                    ? "bg-amber-600 text-white"
                    : isDark
                      ? "bg-slate-700 text-slate-300 hover:bg-slate-600"
                      : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                }`}
              >
                Medium ({allStudents.filter((s) => s.riskLevel === "medium").length})
              </button>
              <button
                onClick={() => setFilterRisk("low")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
                  filterRisk === "low"
                    ? "bg-green-600 text-white"
                    : isDark
                      ? "bg-slate-700 text-slate-300 hover:bg-slate-600"
                      : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                }`}
              >
                Low ({allStudents.filter((s) => s.riskLevel === "low").length})
              </button>
            </div>

            <p className={`text-sm ${theme.subtext}`}>
              Showing {filteredStudents.length} of {allStudents.length} students
            </p>
          </div>
        </div>

        {/* Students Table */}
        <div className={`${theme.card} rounded-lg border overflow-hidden transition-colors duration-300`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`${theme.tableHeader} border-b`}>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Student Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Roll Number</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Attendance</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Recent Grades</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Risk Level</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Contact</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => {
                  const riskColor = getRiskColor(student.riskLevel);
                  const gradeTrend = getGradeTrend(student.recentGrades);
                  const latestGrade = student.recentGrades[student.recentGrades.length - 1];

                  return (
                    <tr
                      key={student.id}
                      className={`${theme.tableRow} border-b transition-colors duration-300`}
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className={`font-medium ${theme.text}`}>{student.name}</p>
                          <p className={`text-sm ${theme.subtext}`}>{student.course}</p>
                        </div>
                      </td>
                      <td className={`px-6 py-4 ${theme.text}`}>{student.rollNumber}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-300 dark:bg-gray-600 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                student.attendance < 70
                                  ? "bg-red-500"
                                  : student.attendance < 80
                                    ? "bg-amber-500"
                                    : "bg-green-500"
                              }`}
                              style={{ width: `${student.attendance}%` }}
                            ></div>
                          </div>
                          <span
                            className={`text-sm font-medium ${
                              student.attendance < 70
                                ? "text-red-600"
                                : student.attendance < 80
                                  ? "text-amber-600"
                                  : "text-green-600"
                            }`}
                          >
                            {student.attendance}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`font-medium ${theme.text}`}>{latestGrade}</span>
                          {gradeTrend === "up" && (
                            <TrendingUp className="w-4 h-4 text-green-600" />
                          )}
                          {gradeTrend === "down" && (
                            <TrendingDown className="w-4 h-4 text-red-600" />
                          )}
                          {gradeTrend === "neutral" && (
                            <Minus className="w-4 h-4 text-slate-400" />
                          )}
                          <span className={`text-xs ${theme.subtext}`}>
                            ({student.recentGrades.join(", ")})
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`inline-block px-3 py-1 rounded-full border ${riskColor.bg}`}>
                          <span className={`text-xs font-bold ${riskColor.text}`}>
                            {riskColor.label}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleContactStudent(student.email)}
                            className={`p-2 rounded transition-colors duration-300 ${
                              isDark
                                ? "hover:bg-slate-700 text-slate-400 hover:text-blue-400"
                                : "hover:bg-slate-100 text-slate-600 hover:text-blue-600"
                            }`}
                            title={student.email}
                          >
                            <Mail className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleContactStudent(student.phone)}
                            className={`p-2 rounded transition-colors duration-300 ${
                              isDark
                                ? "hover:bg-slate-700 text-slate-400 hover:text-green-400"
                                : "hover:bg-slate-100 text-slate-600 hover:text-green-600"
                            }`}
                            title={student.phone}
                          >
                            <Phone className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Button
                          onClick={() => handleViewProfile(student)}
                          className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1"
                        >
                          View Profile
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredStudents.length === 0 && (
            <div className={`p-8 text-center ${theme.subtext}`}>
              <p>No students found matching your search criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* Profile Modal */}
      {showProfileModal && selectedStudent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className={`${theme.card} rounded-lg border max-w-4xl w-full my-8`}>
            <div
              className={`${theme.tableHeader} border-b px-6 py-4 flex items-center justify-between`}
            >
              <h2 className={`text-2xl font-bold ${theme.text}`}>{selectedStudent.name}</h2>
              <button
                onClick={() => setShowProfileModal(false)}
                className={`p-1 rounded transition-colors duration-300 ${
                  isDark ? "hover:bg-slate-700" : "hover:bg-slate-200"
                }`}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Student Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className={`text-sm font-medium ${theme.subtext} mb-1`}>Roll Number</p>
                  <p className={`text-lg font-semibold ${theme.text}`}>{selectedStudent.rollNumber}</p>
                </div>
                <div>
                  <p className={`text-sm font-medium ${theme.subtext} mb-1`}>Course</p>
                  <p className={`text-lg font-semibold ${theme.text}`}>{selectedStudent.course}</p>
                </div>
                <div>
                  <p className={`text-sm font-medium ${theme.subtext} mb-1`}>Email</p>
                  <p className={`text-lg font-semibold ${theme.text} break-all`}>
                    {selectedStudent.email}
                  </p>
                </div>
                <div>
                  <p className={`text-sm font-medium ${theme.subtext} mb-1`}>Phone</p>
                  <p className={`text-lg font-semibold ${theme.text}`}>{selectedStudent.phone}</p>
                </div>
                <div>
                  <p className={`text-sm font-medium ${theme.subtext} mb-1`}>GPA</p>
                  <p className={`text-lg font-semibold ${theme.text}`}>
                    {selectedStudent.gpa.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className={`text-sm font-medium ${theme.subtext} mb-1`}>Semester</p>
                  <p className={`text-lg font-semibold ${theme.text}`}>{selectedStudent.semester}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={`${isDark ? "bg-slate-700" : "bg-slate-100"} rounded-lg p-4`}>
                  <p className={`text-sm font-medium ${theme.subtext} mb-2`}>Attendance</p>
                  <p
                    className={`text-2xl font-bold ${
                      selectedStudent.attendance < 70
                        ? "text-red-600"
                        : selectedStudent.attendance < 80
                          ? "text-amber-600"
                          : "text-green-600"
                    }`}
                  >
                    {selectedStudent.attendance}%
                  </p>
                </div>
                <div className={`${isDark ? "bg-slate-700" : "bg-slate-100"} rounded-lg p-4`}>
                  <p className={`text-sm font-medium ${theme.subtext} mb-2`}>Latest Grade</p>
                  <p className={`text-2xl font-bold ${theme.accent}`}>
                    {selectedStudent.recentGrades[selectedStudent.recentGrades.length - 1]}
                  </p>
                </div>
                <div className={`${isDark ? "bg-slate-700" : "bg-slate-100"} rounded-lg p-4`}>
                  <p className={`text-sm font-medium ${theme.subtext} mb-2`}>Risk Status</p>
                  <div
                    className={`inline-block px-3 py-1 rounded-full border ${
                      getRiskColor(selectedStudent.riskLevel).bg
                    }`}
                  >
                    <span
                      className={`text-sm font-bold ${
                        getRiskColor(selectedStudent.riskLevel).text
                      }`}
                    >
                      {getRiskColor(selectedStudent.riskLevel).label}
                    </span>
                  </div>
                </div>
              </div>

              {/* Grade Progression Chart */}
              <div>
                <h3 className={`text-lg font-semibold ${theme.text} mb-4`}>Grade Progression</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={selectedStudent.gradeHistory}>
                      <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.gridColor} />
                      <XAxis
                        dataKey="month"
                        stroke={chartTheme.textColor}
                        fontSize={12}
                      />
                      <YAxis stroke={chartTheme.textColor} fontSize={12} domain={[0, 100]} />
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
                        dataKey="grade"
                        stroke="#10b981"
                        strokeWidth={3}
                        dot={{ fill: "#10b981", r: 4 }}
                        activeDot={{ r: 6 }}
                        name="Grade"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => handleContactStudent(selectedStudent.email)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Send Email
                </Button>
                <Button
                  onClick={() => setShowProfileModal(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
