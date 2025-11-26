import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Briefcase,
  Settings,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
  { icon: Users, label: "Students", path: "/admin/students" },
  { icon: BarChart3, label: "Analytics", path: "/admin/analytics" },
  { icon: Briefcase, label: "Placement", path: "/admin/placement" },
  { icon: Settings, label: "Settings", path: "/admin/settings" },
];

interface ThemeProps {
  card: string;
  text: string;
  textMuted: string;
  hover: string;
}

interface AdminSidebarProps {
  theme?: ThemeProps;
}

export const AdminSidebar = ({ theme }: AdminSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Fallback to dark theme if no theme prop provided
  const currentTheme = theme || {
    card: "bg-slate-900 border-slate-800",
    text: "text-slate-50",
    textMuted: "text-slate-400",
    hover: "hover:bg-slate-800",
  };

  return (
    <aside
      className={cn(
        `${currentTheme.card} border-r transition-all duration-300 flex flex-col`,
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Header */}
      <div className={`p-4 border-b ${currentTheme.card.split("border-")[1]} flex items-center justify-between`}>
        {!isCollapsed && (
          <div className="space-y-1">
            <h2 className={`text-lg font-semibold ${currentTheme.text}`}>Admin Details</h2>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`${currentTheme.textMuted} hover:${currentTheme.text}`}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                isActive ? "bg-primary text-primary-foreground hover:bg-primary/90" : `${currentTheme.hover}`,
                isCollapsed && "justify-center"
              )
            }
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && (
              <span className="text-sm font-medium">{item.label}</span>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
