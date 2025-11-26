import React from "react";
import { LucideIcon } from "lucide-react";

interface ThemeProps {
  card: string;
  text: string;
  textMuted: string;
}

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode | LucideIcon;
  accent?: "primary" | "success" | "warning" | "destructive";
  variant?: "default" | "elevated" | "glass";
  trend?: {
    value: number;
    isPositive: boolean;
  };
  theme?: ThemeProps;
  onClick?: () => void;
}

export const StatsCard = ({
  title,
  value,
  subtitle,
  icon,
  accent = "primary",
  variant = "default",
  trend,
  theme,
  onClick
}: StatsCardProps) => {
  // Fallback to dark theme if no theme prop provided
  const currentTheme = theme || {
    card: "bg-slate-900 border-slate-800",
    text: "text-slate-50",
    textMuted: "text-slate-400",
  };

  // Properly handle icon rendering - check if it's a React component or already a React element
  let iconElement: React.ReactNode = null;
  if (icon) {
    if (React.isValidElement(icon)) {
      iconElement = icon;
    } else if (typeof icon === "function") {
      const IconComponent = icon as LucideIcon;
      iconElement = <IconComponent className="h-6 w-6 text-primary" />;
    }
  }

  return (
    <div
      className={`${currentTheme.card} rounded-lg border p-5 flex flex-col justify-between transition-colors duration-300 ${onClick ? "cursor-pointer hover:scale-[1.02] transition-transform" : ""}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className={`${currentTheme.textMuted} text-sm`}>{title}</div>
          <div className={`${currentTheme.text} text-xl font-bold text-primary mt-1`}>{value}</div>
          {subtitle && (
            <div className={`text-sm ${currentTheme.textMuted} mt-1`}>{subtitle}</div>
          )}
          {trend && (
            <div className="flex items-center gap-1 mt-1">
              <span
                className={`text-sm font-medium ${
                  trend.isPositive ? "text-success" : "text-destructive"
                }`}
              >
                {trend.isPositive ? "+" : ""}
                {trend.value}%
              </span>
              <span className={`text-xs ${currentTheme.textMuted}`}>vs last month</span>
            </div>
          )}
        </div>
        {icon && (
          <div className="ml-4">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center shadow-[0_6px_18px_rgba(0,0,0,0.45)]"
              style={{ background: `linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.04))` }}
            >
              {iconElement}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
