import { Bell, Search, User, TrendingUp, Calendar, BookOpen, Briefcase, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";

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

const StudentDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 border-b bg-white/80 dark:bg-slate-800/80 backdrop-blur-md shadow-sm">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <h1 className="text-xl font-bold text-primary">DeepTech Campus</h1>
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search jobs or courses..."
                className="w-80 pl-10"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative" onClick={() => navigate('/student/notifications')}>
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-destructive" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => navigate('/student/profile')}>
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-6 space-y-6 bg-gradient-to-b from-transparent via-blue-50/30 to-slate-50 dark:via-slate-800/10 dark:to-slate-900 rounded-lg">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-foreground">👋 Welcome back, Ronak Singh!</h2>
          <p className="text-muted-foreground">Here's your academic and placement overview.</p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/student/grades')}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Predicted GPA</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-700 dark:text-green-300">7.9</div>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                +0.3 from last semester
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900 border-yellow-200 dark:border-yellow-800 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/student/attendance')}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attendance</CardTitle>
              <Calendar className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-700 dark:text-yellow-300">84%</div>
              <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                16% below target
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/student/placement-readiness')}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Placement Readiness</CardTitle>
              <Briefcase className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-700 dark:text-blue-300">92%</div>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                Excellent progress
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 border-red-200 dark:border-red-800 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/student/alerts')}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">At-Risk Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-sm font-bold text-red-700 dark:text-red-300">Low Assignment Activity</div>
              <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                Action required
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Grade Trend This Semester
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={gradeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[6, 10]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="gpa" stroke="hsl(var(--primary))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Attendance Over Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[70, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="percentage" stroke="hsl(var(--warning))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Skill Coverage Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Skill Coverage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={skillData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="skill" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="coverage" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recommendations and Tasks */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Recommendations Section */}
          <Card>
            <CardHeader>
              <CardTitle>🎯 Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <BookOpen className="h-5 w-5 text-primary mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-sm">Revise Module: Data Structures</p>
                  <p className="text-xs text-muted-foreground">Low quiz scores detected</p>
                  <Button variant="link" className="h-auto p-0 text-xs mt-1" onClick={() => navigate('/student/courses/data-structures')}>View Module →</Button>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <User className="h-5 w-5 text-primary mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-sm">Meet Your Mentor</p>
                  <p className="text-xs text-muted-foreground">Schedule a session this week</p>
                  <Button variant="link" className="h-auto p-0 text-xs mt-1" onClick={() => navigate('/student/mentor')}>Schedule →</Button>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <Briefcase className="h-5 w-5 text-primary mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-sm">Recommended Job: Software Intern at Infosys</p>
                  <p className="text-xs text-muted-foreground">92% match based on your skills</p>
                  <Button variant="link" className="h-auto p-0 text-xs mt-1" onClick={() => navigate('/student/jobs/infosys-intern')}>Apply Now →</Button>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-sm">Improve Resume</p>
                  <p className="text-xs text-muted-foreground">Add 2 more projects to increase readiness</p>
                  <Button variant="link" className="h-auto p-0 text-xs mt-1" onClick={() => navigate('/student/resume')}>Edit Resume →</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Tasks Section */}
          <Card>
            <CardHeader>
              <CardTitle>📅 Upcoming Tasks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg border border-border hover:border-primary/50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-sm">Submit Assignment 3</p>
                    <Badge variant="outline">Nov 8</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Data Structures - Due in 2 days</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg border border-border hover:border-primary/50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-sm">Infosys Round 1 Interview</p>
                    <Badge variant="outline">Nov 10</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Technical round - Prepare DSA</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg border border-destructive/50 bg-destructive/5 hover:border-destructive transition-colors">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-sm">Low Attendance Alert</p>
                    <Badge variant="destructive">Action Required</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Algorithms - Attendance below 75%</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg border border-border hover:border-primary/50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-sm">Complete Resume Upload</p>
                    <Badge variant="outline">Pending</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Required for placement eligibility</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm py-6 mt-12">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          © 2025 DeepTech Campus. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default StudentDashboard;
