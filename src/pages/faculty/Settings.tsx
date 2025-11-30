import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { LogOut, Moon, Sun, ArrowLeft, Lock, Bell, User, Mail, Phone, Building2 } from "lucide-react";

export default function FacultySettings() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDark, setIsDark] = useState(false);

  // Profile Form State
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "+91-9876543210",
    department: "Computer Science & Engineering",
  });

  // Password Form State
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Notification Preferences State
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    classAnnouncements: true,
    assignmentReminders: true,
    attendanceAlerts: true,
  });

  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  useEffect(() => {
    if (!user) navigate("/auth");
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

  const theme = isDark
    ? {
        bg: "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900",
        card: "bg-slate-800 border-slate-700",
        text: "text-white",
        subtext: "text-slate-400",
        accent: "text-blue-400",
        input: "bg-slate-700 border-slate-600 text-white placeholder-slate-400",
        inputFocus: "focus:ring-blue-500 focus:border-blue-500",
      }
    : {
        bg: "bg-gradient-to-br from-slate-50 via-white to-slate-50",
        card: "bg-white border-slate-200",
        text: "text-slate-900",
        subtext: "text-slate-600",
        accent: "text-blue-600",
        input: "bg-white border-slate-300 text-slate-900 placeholder-slate-500",
        inputFocus: "focus:ring-blue-500 focus:border-blue-500",
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

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key],
    });
  };

  const handleSaveProfile = async () => {
    setIsSavingProfile(true);
    // Simulate API call
    setTimeout(() => {
      setIsSavingProfile(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
    }, 800);
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match.",
      });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long.",
      });
      return;
    }

    setIsSavingPassword(true);
    // Simulate API call
    setTimeout(() => {
      setIsSavingPassword(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      toast({
        title: "Password Changed",
        description: "Your password has been changed successfully.",
      });
    }, 800);
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Preferences Updated",
      description: "Your notification preferences have been saved.",
    });
  };

  if (!user) return null;

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
              <h1 className={`text-2xl font-bold ${theme.text}`}>Settings & Profile</h1>
              <p className={`text-sm ${theme.subtext}`}>Manage your account preferences</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={toggleTheme}
              variant="ghost"
              size="icon"
              className={isDark ? "text-yellow-400" : "text-slate-600"}
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar Navigation */}
          <div className={`lg:col-span-1`}>
            <div className={`${theme.card} rounded-lg border p-4 transition-colors duration-300 sticky top-24`}>
              <h3 className={`font-semibold ${theme.text} mb-4`}>Settings Menu</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-2 rounded-lg bg-blue-600 text-white flex items-center gap-2 transition-all duration-300">
                  <User className="w-4 h-4" />
                  Profile
                </button>
                <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-slate-700 text-slate-300 flex items-center gap-2 transition-all duration-300">
                  <Lock className="w-4 h-4" />
                  Security
                </button>
                <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-slate-700 text-slate-300 flex items-center gap-2 transition-all duration-300">
                  <Bell className="w-4 h-4" />
                  Notifications
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Update Profile Section */}
            <div className={`${theme.card} rounded-lg border p-6 transition-colors duration-300`}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`${isDark ? "bg-blue-900/30" : "bg-blue-100"} rounded-lg p-3`}>
                  <User className={`w-6 h-6 ${isDark ? "text-blue-400" : "text-blue-600"}`} />
                </div>
                <div>
                  <h2 className={`text-xl font-bold ${theme.text}`}>Update Profile</h2>
                  <p className={`text-sm ${theme.subtext}`}>Manage your personal information</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium ${theme.text} mb-2`}>Full Name</label>
                    <Input
                      type="text"
                      name="name"
                      value={profileData.name}
                      onChange={handleProfileChange}
                      placeholder="Enter your full name"
                      className={`${theme.input} border rounded-lg py-2 px-3 ${theme.inputFocus} transition-colors`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${theme.text} mb-2`}>Email Address</label>
                    <Input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                      placeholder="Enter your email"
                      className={`${theme.input} border rounded-lg py-2 px-3 ${theme.inputFocus} transition-colors`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${theme.text} mb-2 flex items-center gap-2`}>
                      <Phone className="w-4 h-4" />
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleProfileChange}
                      placeholder="Enter your phone number"
                      className={`${theme.input} border rounded-lg py-2 px-3 ${theme.inputFocus} transition-colors`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${theme.text} mb-2 flex items-center gap-2`}>
                      <Building2 className="w-4 h-4" />
                      Department
                    </label>
                    <Input
                      type="text"
                      name="department"
                      value={profileData.department}
                      onChange={handleProfileChange}
                      placeholder="Enter your department"
                      className={`${theme.input} border rounded-lg py-2 px-3 ${theme.inputFocus} transition-colors`}
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <Button
                    onClick={handleSaveProfile}
                    disabled={isSavingProfile}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-300"
                  >
                    {isSavingProfile ? "Saving..." : "Save Profile"}
                  </Button>
                </div>
              </div>
            </div>

            {/* Change Password Section */}
            <div className={`${theme.card} rounded-lg border p-6 transition-colors duration-300`}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`${isDark ? "bg-purple-900/30" : "bg-purple-100"} rounded-lg p-3`}>
                  <Lock className={`w-6 h-6 ${isDark ? "text-purple-400" : "text-purple-600"}`} />
                </div>
                <div>
                  <h2 className={`text-xl font-bold ${theme.text}`}>Change Password</h2>
                  <p className={`text-sm ${theme.subtext}`}>Update your security credentials</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium ${theme.text} mb-2`}>Current Password</label>
                  <Input
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter current password"
                    className={`${theme.input} border rounded-lg py-2 px-3 ${theme.inputFocus} transition-colors`}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium ${theme.text} mb-2`}>New Password</label>
                    <Input
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      placeholder="Enter new password"
                      className={`${theme.input} border rounded-lg py-2 px-3 ${theme.inputFocus} transition-colors`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${theme.text} mb-2`}>Confirm Password</label>
                    <Input
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      placeholder="Confirm new password"
                      className={`${theme.input} border rounded-lg py-2 px-3 ${theme.inputFocus} transition-colors`}
                    />
                  </div>
                </div>

                <p className={`text-xs ${theme.subtext}`}>
                  Password must be at least 6 characters long and include uppercase, lowercase, and numbers.
                </p>

                <div className="pt-4 flex justify-end">
                  <Button
                    onClick={handleChangePassword}
                    disabled={isSavingPassword}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-all duration-300"
                  >
                    {isSavingPassword ? "Updating..." : "Update Password"}
                  </Button>
                </div>
              </div>
            </div>

            {/* Notification Preferences Section */}
            <div className={`${theme.card} rounded-lg border p-6 transition-colors duration-300`}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`${isDark ? "bg-orange-900/30" : "bg-orange-100"} rounded-lg p-3`}>
                  <Bell className={`w-6 h-6 ${isDark ? "text-orange-400" : "text-orange-600"}`} />
                </div>
                <div>
                  <h2 className={`text-xl font-bold ${theme.text}`}>Notification Preferences</h2>
                  <p className={`text-sm ${theme.subtext}`}>Choose how you want to be notified</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Notification Channels */}
                <div>
                  <h3 className={`text-sm font-semibold ${theme.text} mb-4`}>Notification Channels</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-700/50 transition-colors">
                      <div>
                        <p className={`font-medium ${theme.text}`}>Email Notifications</p>
                        <p className={`text-xs ${theme.subtext}`}>Receive updates via email</p>
                      </div>
                      <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications.emailNotifications ? "bg-blue-600" : isDark ? "bg-slate-600" : "bg-slate-300"}`}>
                        <button
                          onClick={() => handleNotificationChange("emailNotifications")}
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications.emailNotifications ? "translate-x-6" : "translate-x-1"}`}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-700/50 transition-colors">
                      <div>
                        <p className={`font-medium ${theme.text}`}>SMS Notifications</p>
                        <p className={`text-xs ${theme.subtext}`}>Receive updates via SMS</p>
                      </div>
                      <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications.smsNotifications ? "bg-blue-600" : isDark ? "bg-slate-600" : "bg-slate-300"}`}>
                        <button
                          onClick={() => handleNotificationChange("smsNotifications")}
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications.smsNotifications ? "translate-x-6" : "translate-x-1"}`}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-700/50 transition-colors">
                      <div>
                        <p className={`font-medium ${theme.text}`}>Push Notifications</p>
                        <p className={`text-xs ${theme.subtext}`}>Receive push notifications in browser</p>
                      </div>
                      <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications.pushNotifications ? "bg-blue-600" : isDark ? "bg-slate-600" : "bg-slate-300"}`}>
                        <button
                          onClick={() => handleNotificationChange("pushNotifications")}
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications.pushNotifications ? "translate-x-6" : "translate-x-1"}`}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notification Types */}
                <div>
                  <h3 className={`text-sm font-semibold ${theme.text} mb-4`}>What to notify me about</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-700/50 transition-colors">
                      <div>
                        <p className={`font-medium ${theme.text}`}>Class Announcements</p>
                        <p className={`text-xs ${theme.subtext}`}>Important class-related updates</p>
                      </div>
                      <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications.classAnnouncements ? "bg-blue-600" : isDark ? "bg-slate-600" : "bg-slate-300"}`}>
                        <button
                          onClick={() => handleNotificationChange("classAnnouncements")}
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications.classAnnouncements ? "translate-x-6" : "translate-x-1"}`}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-700/50 transition-colors">
                      <div>
                        <p className={`font-medium ${theme.text}`}>Assignment Reminders</p>
                        <p className={`text-xs ${theme.subtext}`}>Reminders about pending assignments</p>
                      </div>
                      <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications.assignmentReminders ? "bg-blue-600" : isDark ? "bg-slate-600" : "bg-slate-300"}`}>
                        <button
                          onClick={() => handleNotificationChange("assignmentReminders")}
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications.assignmentReminders ? "translate-x-6" : "translate-x-1"}`}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-700/50 transition-colors">
                      <div>
                        <p className={`font-medium ${theme.text}`}>Attendance Alerts</p>
                        <p className={`text-xs ${theme.subtext}`}>Alerts about low attendance</p>
                      </div>
                      <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications.attendanceAlerts ? "bg-blue-600" : isDark ? "bg-slate-600" : "bg-slate-300"}`}>
                        <button
                          onClick={() => handleNotificationChange("attendanceAlerts")}
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications.attendanceAlerts ? "translate-x-6" : "translate-x-1"}`}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <Button
                    onClick={handleSaveNotifications}
                    className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg transition-all duration-300"
                  >
                    Save Preferences
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
