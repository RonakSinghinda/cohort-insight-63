import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, ArrowRight } from "lucide-react";

export default function FacultyHome() {
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
  }, []);

  const theme = isDark
    ? {
        bg: "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900",
        card: "bg-slate-800 border-slate-700",
        text: "text-white",
        subtext: "text-slate-400",
        accent: "text-blue-400",
      }
    : {
        bg: "bg-gradient-to-br from-slate-50 via-white to-slate-50",
        card: "bg-white border-slate-200",
        text: "text-slate-900",
        subtext: "text-slate-600",
        accent: "text-blue-600",
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
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="flex justify-between items-center mb-16">
          <div>
            <h1 className={`text-4xl font-bold ${theme.text} mb-2`}>
              Welcome!
            </h1>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className={`gap-2 ${isDark ? "border-slate-600 text-slate-300 hover:bg-slate-700" : "border-slate-300 text-slate-700 hover:bg-slate-100"}`}
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        {/* Main Content Card */}
        <div className={`${theme.card} rounded-lg border p-12 transition-colors duration-300 shadow-lg max-w-2xl mx-auto`}>
          <div className="text-center">
            <div className={`text-6xl mb-4`}>👋</div>
            <p className={`text-xl ${theme.subtext} mb-6`}>You are logged in as</p>
            <h2 className={`text-5xl font-bold ${theme.accent} mb-8`}>
              {user.name}
            </h2>
            <p className={`text-base ${theme.subtext} mb-8`}>
              Ready to manage your courses and students?
            </p>
            <Button
              onClick={() => navigate("/faculty/dashboard")}
              className="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Go to Dashboard <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
