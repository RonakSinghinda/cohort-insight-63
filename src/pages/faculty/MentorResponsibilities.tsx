import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Users,
  LogOut,
  Moon,
  Sun,
  Calendar,
  FileText,
  AlertCircle,
  TrendingDown,
  ArrowLeft,
  X,
} from "lucide-react";

interface Mentee {
  id: string;
  name: string;
  rollNumber: string;
  course: string;
  attendance: number;
  gpa: number;
  riskStatus: "high" | "medium" | "low";
  interventions: string[];
  notes: MentorNote[];
}

interface MentorNote {
  id: string;
  date: string;
  content: string;
}

export default function MentorResponsibilities() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDark, setIsDark] = useState(false);
  const [selectedMentee, setSelectedMentee] = useState<Mentee | null>(null);
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  const [meetingDate, setMeetingDate] = useState("");
  const [meetingTime, setMeetingTime] = useState("");

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

  // Mock data for mentees
  const mentees: Mentee[] = [
    {
      id: "1",
      name: "Arjun Verma",
      rollNumber: "RV2208A003",
      course: "BCS302",
      attendance: 65,
      gpa: 2.8,
      riskStatus: "high",
      interventions: ["Improve attendance", "Tutoring sessions", "Assignment support"],
      notes: [
        { id: "n1", date: "2025-11-20", content: "Discussed attendance concerns. Student agreed to improve." },
      ],
    },
    {
      id: "2",
      name: "Meera Singh",
      rollNumber: "RV2208A017",
      course: "BCS305",
      attendance: 82,
      gpa: 3.4,
      riskStatus: "low",
      interventions: ["Maintain current pace"],
      notes: [],
    },
    {
      id: "3",
      name: "Rohan Patel",
      rollNumber: "RV2208A026",
      course: "BCS308",
      attendance: 71,
      gpa: 2.9,
      riskStatus: "medium",
      interventions: ["Encourage participation", "Study group formation", "Extra problem sets"],
      notes: [
        { id: "n2", date: "2025-11-15", content: "Good progress. Recommend joining study group." },
      ],
    },
    {
      id: "4",
      name: "Anjali Deshmukh",
      rollNumber: "RV2208A011",
      course: "BCS302",
      attendance: 88,
      gpa: 3.6,
      riskStatus: "low",
      interventions: ["Consider as TA"],
      notes: [],
    },
    {
      id: "5",
      name: "Vivek Kumar",
      rollNumber: "RV2208A035",
      course: "BCS305",
      attendance: 58,
      gpa: 2.2,
      riskStatus: "high",
      interventions: ["Urgent attention", "Weekly check-ins", "Parent communication"],
      notes: [
        { id: "n3", date: "2025-11-18", content: "Critical situation. Scheduled parent meeting." },
      ],
    },
    {
      id: "6",
      name: "Priyanka Jain",
      rollNumber: "RV2208A022",
      course: "BCS308",
      attendance: 76,
      gpa: 3.1,
      riskStatus: "medium",
      interventions: ["Consistent progress tracking", "Monthly meetings"],
      notes: [],
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
        modal: "bg-slate-800 border-slate-700",
        input: "bg-slate-700 border-slate-600 text-white placeholder-slate-400",
      }
    : {
        bg: "bg-gradient-to-br from-slate-50 via-white to-slate-50",
        card: "bg-white border-slate-200",
        text: "text-slate-900",
        subtext: "text-slate-600",
        accent: "text-blue-600",
        alertCard: "bg-slate-50 border-slate-300",
        modal: "bg-white border-slate-200",
        input: "bg-white border-slate-300 text-slate-900 placeholder-slate-400",
      };

  const getRiskColor = (status: string) => {
    if (status === "high") return { bg: isDark ? "bg-red-500/20 border-red-500/30" : "bg-red-100 border-red-300", text: "text-red-600", label: "HIGH RISK" };
    if (status === "medium") return { bg: isDark ? "bg-amber-500/20 border-amber-500/30" : "bg-amber-100 border-amber-300", text: "text-amber-600", label: "MEDIUM RISK" };
    return { bg: isDark ? "bg-green-500/20 border-green-500/30" : "bg-green-100 border-green-300", text: "text-green-600", label: "LOW RISK" };
  };

  const handleScheduleMeeting = () => {
    if (!meetingDate || !meetingTime) {
      toast({
        title: "Error",
        description: "Please select both date and time",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Meeting Scheduled",
      description: `Meeting with ${selectedMentee?.name} scheduled for ${meetingDate} at ${meetingTime}`,
    });
    setShowMeetingModal(false);
    setMeetingDate("");
    setMeetingTime("");
  };

  const handleAddNote = () => {
    if (!noteContent.trim()) {
      toast({
        title: "Error",
        description: "Please enter a note",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Note Added",
      description: `Mentor note added for ${selectedMentee?.name}`,
    });
    setShowNoteModal(false);
    setNoteContent("");
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
                Mentor Responsibilities
              </h1>
              <p className={`text-sm ${theme.subtext}`}>Manage your mentee relationships</p>
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
        {/* Mentor Stat Card */}
        <div className="mb-8">
          <div className={`${theme.card} rounded-lg border p-6 transition-all duration-300 hover:shadow-lg`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${theme.subtext} mb-2`}>
                  Total Mentees
                </p>
                <p className={`text-4xl font-bold ${theme.accent}`}>
                  {mentees.length}
                </p>
                <p className={`text-xs ${theme.subtext} mt-2`}>
                  {mentees.filter((m) => m.riskStatus === "high").length} at high risk
                </p>
              </div>
              <div className={`${isDark ? "bg-blue-900/30" : "bg-blue-100"} rounded-lg p-4`}>
                <Users className={`w-8 h-8 ${isDark ? "text-blue-400" : "text-blue-600"}`} />
              </div>
            </div>
          </div>
        </div>

        {/* Mentee Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mentees.map((mentee) => {
            const riskColor = getRiskColor(mentee.riskStatus);
            return (
              <div
                key={mentee.id}
                className={`${theme.card} rounded-lg border p-6 transition-all duration-300 hover:shadow-md`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className={`text-lg font-semibold ${theme.text}`}>
                      {mentee.name}
                    </h3>
                    <p className={`text-sm ${theme.subtext}`}>
                      {mentee.rollNumber} • {mentee.course}
                    </p>
                  </div>
                  <div className={`px-3 py-1 rounded-full border ${riskColor.bg}`}>
                    <p className={`text-xs font-bold ${riskColor.text}`}>
                      {riskColor.label}
                    </p>
                  </div>
                </div>

                {/* Academic Status */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className={`${theme.alertCard} rounded-lg border p-3`}>
                    <p className={`text-xs font-medium ${theme.subtext} mb-1`}>
                      Attendance
                    </p>
                    <p className={`text-lg font-bold ${
                      mentee.attendance < 70 ? "text-red-600" : mentee.attendance < 80 ? "text-amber-600" : "text-green-600"
                    }`}>
                      {mentee.attendance}%
                    </p>
                  </div>
                  <div className={`${theme.alertCard} rounded-lg border p-3`}>
                    <p className={`text-xs font-medium ${theme.subtext} mb-1`}>
                      Current GPA
                    </p>
                    <p className={`text-lg font-bold ${theme.text}`}>
                      {mentee.gpa.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Recommended Interventions */}
                <div className="mb-4">
                  <p className={`text-xs font-semibold ${theme.subtext} mb-2`}>
                    Recommended Interventions:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {mentee.interventions.map((intervention, idx) => (
                      <span
                        key={idx}
                        className={`text-xs px-2 py-1 rounded ${
                          isDark
                            ? "bg-slate-700 text-slate-300"
                            : "bg-slate-200 text-slate-700"
                        }`}
                      >
                        {intervention}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recent Notes */}
                {mentee.notes.length > 0 && (
                  <div className="mb-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <p className={`text-xs font-semibold ${theme.subtext} mb-2`}>
                      Recent Notes:
                    </p>
                    {mentee.notes.slice(-1).map((note) => (
                      <p key={note.id} className={`text-xs ${theme.subtext}`}>
                        <span className="font-medium">{note.date}:</span> {note.content}
                      </p>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={() => {
                      setSelectedMentee(mentee);
                      setShowMeetingModal(true);
                    }}
                    className="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Calendar className="w-4 h-4" />
                    Schedule
                  </Button>
                  <Button
                    onClick={() => {
                      setSelectedMentee(mentee);
                      setShowNoteModal(true);
                    }}
                    className="gap-2 bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    <FileText className="w-4 h-4" />
                    Add Note
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Schedule Meeting Modal */}
      {showMeetingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`${theme.modal} rounded-lg border max-w-md w-full p-6`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-xl font-bold ${theme.text}`}>
                Schedule Meeting
              </h2>
              <Button
                onClick={() => setShowMeetingModal(false)}
                variant="ghost"
                size="icon"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <p className={`text-sm ${theme.subtext} mb-4`}>
              Meeting with <span className="font-semibold">{selectedMentee?.name}</span>
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <label className={`text-sm font-medium ${theme.text} block mb-2`}>
                  Date
                </label>
                <input
                  type="date"
                  value={meetingDate}
                  onChange={(e) => setMeetingDate(e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border ${theme.input} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>

              <div>
                <label className={`text-sm font-medium ${theme.text} block mb-2`}>
                  Time
                </label>
                <input
                  type="time"
                  value={meetingTime}
                  onChange={(e) => setMeetingTime(e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border ${theme.input} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => setShowMeetingModal(false)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleScheduleMeeting}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Schedule
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Add Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`${theme.modal} rounded-lg border max-w-md w-full p-6`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-xl font-bold ${theme.text}`}>
                Add Mentor Note
              </h2>
              <Button
                onClick={() => setShowNoteModal(false)}
                variant="ghost"
                size="icon"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <p className={`text-sm ${theme.subtext} mb-4`}>
              For <span className="font-semibold">{selectedMentee?.name}</span>
            </p>

            <div className="mb-6">
              <label className={`text-sm font-medium ${theme.text} block mb-2`}>
                Note
              </label>
              <textarea
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                placeholder="Enter your mentor note..."
                className={`w-full px-3 py-2 rounded-lg border ${theme.input} focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none h-24`}
              />
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => setShowNoteModal(false)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddNote}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
              >
                Add Note
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
