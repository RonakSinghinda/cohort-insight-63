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

export const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "bg-card border-r border-border transition-all duration-300 flex flex-col",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        {!isCollapsed && (
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-foreground">Admin Details</h2>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-muted-foreground hover:text-foreground"
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
                "hover:bg-accent hover:text-accent-foreground",
                isActive && "bg-primary text-primary-foreground hover:bg-primary/90",
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
