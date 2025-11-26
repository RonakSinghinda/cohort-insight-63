import { useState, useEffect } from "react";
import { Bell, CheckCircle, XCircle, Clock, AlertCircle, Download, ArrowLeft, Calendar, User, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";
import { rechartsDarkTheme } from "@/utils/chartOptions";
import { useAuth } from "@/contexts/AuthContext";

// Mock data for attendance records
const attendanceRecords = [
  { id: "1", date: "2024-04-15", className: "Data Structures", status: "present" as const, timeIn: "09:00 AM", duration: "1h 30m" },
  { id: "2", date: "2024-04-15", className: "Web Development", status: "present" as const, timeIn: "11:15 AM", duration: "1h 30m" },
  { id: "3", date: "2024-04-14", className: "Algorithms", status: "absent" as const, timeIn: "-", duration: "-" },
  { id: "4", date: "2024-04-14", className: "Database Systems", status: "present" as const, timeIn: "02:00 PM", duration: "1h 30m" },
  { id: "5", date: "2024-04-13", className: "Data Structures", status: "late" as const, timeIn: "09:25 AM", duration: "1h 20m" },
  { id: "6", date: "2024-04-13", className: "Python Programming", status: "present" as const, timeIn: "03:00 PM", duration: "1h 30m" },
  { id: "7", date: "2024-04-12", className: "Web Development", status: "present" as const, timeIn: "11:00 AM", duration: "1h 30m" },
  { id: "8", date: "2024-04-12", className: "Algorithms", status: "present" as const, timeIn: "02:00 PM", duration: "1h 30m" },
  { id: "9", date: "2024-04-11", className: "Data Structures", status: "present" as const, timeIn: "09:00 AM", duration: "1h 30m" },
  { id: "10", date: "2024-04-11", className: "Database Systems", status: "excused" as const, timeIn: "-", duration: "-" },
  { id: "11", date: "2024-04-10", className: "Python Programming", status: "present" as const, timeIn: "03:00 PM", duration: "1h 30m" },
  { id: "12", date: "2024-04-10", className: "Web Development", status: "present" as const, timeIn: "11:00 AM", duration: "1h 30m" },
  { id: "13", date: "2024-04-09", className: "Algorithms", status: "present" as const, timeIn: "02:00 PM", duration: "1h 30m" },
  { id: "14", date: "2024-04-09", className: "Data Structures", status: "absent" as const, timeIn: "-", duration: "-" },
  { id: "15", date: "2024-04-08", className: "Database Systems", status: "present" as const, timeIn: "02:00 PM", duration: "1h 30m" },
  { id: "16", date: "2024-04-08", className: "Python Programming", status: "present" as const, timeIn: "03:00 PM", duration: "1h 30m" },
  { id: "17", date: "2024-03-29", className: "Web Development", status: "present" as const, timeIn: "11:00 AM", duration: "1h 30m" },
  { id: "18", date: "2024-03-29", className: "Data Structures", status: "present" as const, timeIn: "09:00 AM", duration: "1h 30m" },
  { id: "19", date: "2024-03-28", className: "Algorithms", status: "late" as const, timeIn: "02:15 PM", duration: "1h 15m" },
  { id: "20", date: "2024-03-28", className: "Database Systems", status: "present" as const, timeIn: "02:00 PM", duration: "1h 30m" },
  { id: "21", date: "2024-03-27", className: "Python Programming", status: "present" as const, timeIn: "03:00 PM", duration: "1h 30m" },
  { id: "22", date: "2024-03-27", className: "Web Development", status: "absent" as const, timeIn: "-", duration: "-" },
  { id: "23", date: "2024-03-26", className: "Data Structures", status: "present" as const, timeIn: "09:00 AM", duration: "1h 30m" },
  { id: "24", date: "2024-03-26", className: "Database Systems", status: "present" as const, timeIn: "02:00 PM", duration: "1h 30m" },
  { id: "25", date: "2024-03-25", className: "Algorithms", status: "present" as const, timeIn: "02:00 PM", duration: "1h 30m" },
  { id: "26", date: "2024-02-20", className: "Web Development", status: "present" as const, timeIn: "11:00 AM", duration: "1h 30m" },
  { id: "27", date: "2024-02-20", className: "Python Programming", status: "present" as const, timeIn: "03:00 PM", duration: "1h 30m" },
  { id: "28", date: "2024-02-19", className: "Data Structures", status: "late" as const, timeIn: "09:20 AM", duration: "1h 25m" },
  { id: "29", date: "2024-02-19", className: "Database Systems", status: "present" as const, timeIn: "02:00 PM", duration: "1h 30m" },
  { id: "30", date: "2024-02-18", className: "Algorithms", status: "present" as const, timeIn: "02:00 PM", duration: "1h 30m" },
  { id: "31", date: "2024-02-18", className: "Web Development", status: "excused" as const, timeIn: "-", duration: "-" },
  { id: "32", date: "2024-02-17", className: "Python Programming", status: "present" as const, timeIn: "03:00 PM", duration: "1h 30m" },
  { id: "33", date: "2024-02-17", className: "Data Structures", status: "present" as const, timeIn: "09:00 AM", duration: "1h 30m" },
  { id: "34", date: "2024-02-16", className: "Database Systems", status: "absent" as const, timeIn: "-", duration: "-" },
  { id: "35", date: "2024-02-16", className: "Algorithms", status: "present" as const, timeIn: "02:00 PM", duration: "1h 30m" },
  { id: "36", date: "2024-01-22", className: "Web Development", status: "present" as const, timeIn: "11:00 AM", duration: "1h 30m" },
  { id: "37", date: "2024-01-22", className: "Python Programming", status: "present" as const, timeIn: "03:00 PM", duration: "1h 30m" },
  { id: "38", date: "2024-01-21", className: "Data Structures", status: "present" as const, timeIn: "09:00 AM", duration: "1h 30m" },
  { id: "39", date: "2024-01-21", className: "Database Systems", status: "present" as const, timeIn: "02:00 PM", duration: "1h 30m" },
  { id: "40", date: "2024-01-20", className: "Algorithms", status: "late" as const, timeIn: "02:10 PM", duration: "1h 20m" },
];

// Monthly attendance data for chart
const monthlyAttendanceData = [
  { month: "Jan", percentage: 88 },
  { month: "Feb", percentage: 85 },
  { month: "Mar", percentage: 82 },
  { month: "Apr", percentage: 84 },
];

interface AttendanceRecord {
  id: string;
  date: string;
  className: string;
  status: "present" | "absent" | "late" | "excused";
  timeIn: string;
  duration: string;
}

const StudentAttendance = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [filterStatus, setFilterStatus] = useState<"all" | "present" | "absent" | "late" | "excused">("all");
  const [isDark, setIsDark] = useState(false);

  // Use auth user data or fallback
  const studentName = user?.name || "Guest User";
  const studentUSN = user?.usn || "RV2208A12";

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Calculate attendance stats
  const totalClasses = attendanceRecords.length;
  const presentCount = attendanceRecords.filter(r => r.status === "present").length;
  const absentCount = attendanceRecords.filter(r => r.status === "absent").length;
  const lateCount = attendanceRecords.filter(r => r.status === "late").length;
  const excusedCount = attendanceRecords.filter(r => r.status === "excused").length;
  const attendancePercentage = Math.round((presentCount / totalClasses) * 100);

  // Filter records based on selected status
  const filteredRecords = filterStatus === "all"
    ? attendanceRecords
    : attendanceRecords.filter(r => r.status === filterStatus);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "absent":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      case "late":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      case "excused":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present":
        return <CheckCircle className="h-4 w-4" />;
      case "absent":
        return <XCircle className="h-4 w-4" />;
      case "late":
        return <Clock className="h-4 w-4" />;
      case "excused":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const isAboveTarget = attendancePercentage >= 75;

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
                    placeholder="Search..."
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
        {/* Header Section */}
        <div className="mb-8 flex items-center gap-4">
          <button
            onClick={() => navigate("/student/dashboard")}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <div>
            <h2 className="text-3xl font-bold text-foreground">Attendance Details</h2>
            <p className="text-muted-foreground mt-1">Your complete attendance record</p>
          </div>
        </div>

        {/* Overview Stats Section */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card className="p-6 border-primary/20">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Overall Attendance</p>
                <p className="text-3xl font-bold text-foreground">{attendancePercentage}%</p>
                <p className={`text-xs mt-2 ${isAboveTarget ? "text-green-400" : "text-yellow-400"}`}>
                  {isAboveTarget ? "✓ Above target (75%)" : "⚠ Below target (75%)"}
                </p>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border-green-500/20">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Present</p>
                <p className="text-3xl font-bold text-green-400">{presentCount}</p>
                <p className="text-xs text-muted-foreground mt-2">classes attended</p>
              </div>
              <div className="p-3 bg-green-500/10 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border-red-500/20">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Absent</p>
                <p className="text-3xl font-bold text-red-400">{absentCount}</p>
                <p className="text-xs text-muted-foreground mt-2">classes missed</p>
              </div>
              <div className="p-3 bg-red-500/10 rounded-lg">
                <XCircle className="h-6 w-6 text-red-400" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border-yellow-500/20">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Late Arrivals</p>
                <p className="text-3xl font-bold text-yellow-400">{lateCount}</p>
                <p className="text-xs text-muted-foreground mt-2">late arrivals</p>
              </div>
              <div className="p-3 bg-yellow-500/10 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-400" />
              </div>
            </div>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          {/* Attendance Trend Chart */}
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Monthly Trend</h3>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={monthlyAttendanceData}>
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
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Attendance Breakdown */}
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Breakdown</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Present</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-700 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(presentCount / totalClasses) * 100}%` }}></div>
                    </div>
                    <span className="text-sm font-medium text-foreground">{Math.round((presentCount / totalClasses) * 100)}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Absent</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-700 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: `${(absentCount / totalClasses) * 100}%` }}></div>
                    </div>
                    <span className="text-sm font-medium text-foreground">{Math.round((absentCount / totalClasses) * 100)}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Late</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-700 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${(lateCount / totalClasses) * 100}%` }}></div>
                    </div>
                    <span className="text-sm font-medium text-foreground">{Math.round((lateCount / totalClasses) * 100)}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Excused</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-700 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(excusedCount / totalClasses) * 100}%` }}></div>
                    </div>
                    <span className="text-sm font-medium text-foreground">{Math.round((excusedCount / totalClasses) * 100)}%</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Detailed Attendance Table */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Detailed Records</h3>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFilterStatus("all")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterStatus === "all"
                    ? "bg-primary/20 text-primary border border-primary/40"
                    : "bg-gray-800 text-muted-foreground hover:bg-gray-700"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterStatus("present")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  filterStatus === "present"
                    ? "bg-green-500/20 text-green-400 border border-green-500/40"
                    : "bg-gray-800 text-muted-foreground hover:bg-gray-700"
                }`}
              >
                <CheckCircle className="h-4 w-4" /> Present ({presentCount})
              </button>
              <button
                onClick={() => setFilterStatus("absent")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  filterStatus === "absent"
                    ? "bg-red-500/20 text-red-400 border border-red-500/40"
                    : "bg-gray-800 text-muted-foreground hover:bg-gray-700"
                }`}
              >
                <XCircle className="h-4 w-4" /> Absent ({absentCount})
              </button>
              <button
                onClick={() => setFilterStatus("late")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  filterStatus === "late"
                    ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/40"
                    : "bg-gray-800 text-muted-foreground hover:bg-gray-700"
                }`}
              >
                <Clock className="h-4 w-4" /> Late ({lateCount})
              </button>
              <button
                onClick={() => setFilterStatus("excused")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  filterStatus === "excused"
                    ? "bg-blue-500/20 text-blue-400 border border-blue-500/40"
                    : "bg-gray-800 text-muted-foreground hover:bg-gray-700"
                }`}
              >
                <AlertCircle className="h-4 w-4" /> Excused ({excusedCount})
              </button>
            </div>

            {/* Attendance Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border/20">
                  <tr className="text-left text-sm">
                    <th className="px-4 py-3 font-semibold text-foreground">Date</th>
                    <th className="px-4 py-3 font-semibold text-foreground">Class Name</th>
                    <th className="px-4 py-3 font-semibold text-foreground">Time In</th>
                    <th className="px-4 py-3 font-semibold text-foreground">Duration</th>
                    <th className="px-4 py-3 font-semibold text-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map((record, index) => (
                    <tr
                      key={record.id}
                      className={`border-b border-border/10 text-sm ${
                        index % 2 === 0 ? "bg-card/30" : "bg-transparent"
                      } hover:bg-card/50 transition-colors`}
                    >
                      <td className="px-4 py-3 text-muted-foreground">
                        {new Date(record.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="px-4 py-3 text-foreground font-medium">{record.className}</td>
                      <td className="px-4 py-3 text-muted-foreground">{record.timeIn}</td>
                      <td className="px-4 py-3 text-muted-foreground">{record.duration}</td>
                      <td className="px-4 py-3">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${getStatusColor(record.status)} text-xs font-medium`}>
                          {getStatusIcon(record.status)}
                          {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-center text-sm text-muted-foreground pt-4">
              Showing {filteredRecords.length} of {totalClasses} records
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default StudentAttendance;
