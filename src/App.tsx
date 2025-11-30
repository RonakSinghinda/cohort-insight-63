import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Students from "./pages/admin/Students";
import Analytics from "./pages/admin/Analytics";
import Placement from "./pages/admin/Placement";
import Settings from "./pages/admin/Settings";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentAttendance from "./pages/student/StudentAttendance";
import StudentHome from "./pages/student/StudentHome";
import FacultyHome from "./pages/faculty/FacultyHome";
import FacultyDashboard from "./pages/faculty/FacultyDashboard";
import AtRiskStudents from "./pages/faculty/AtRiskStudents";
import MentorResponsibilities from "./pages/faculty/MentorResponsibilities";
import FacultyStudents from "./pages/faculty/Students";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/students" element={<Students />} />
            <Route path="/admin/analytics" element={<Analytics />} />
            <Route path="/admin/placement" element={<Placement />} />
            <Route path="/admin/settings" element={<Settings />} />
            <Route path="/student/home" element={<StudentHome />} />
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/student/attendance" element={<StudentAttendance />} />
            <Route path="/faculty/home" element={<FacultyHome />} />
            <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
            <Route path="/faculty/students" element={<FacultyStudents />} />
            <Route path="/faculty/at-risk" element={<AtRiskStudents />} />
            <Route path="/faculty/mentor" element={<MentorResponsibilities />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
