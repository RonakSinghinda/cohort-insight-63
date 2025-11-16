import React from "react";
import { LucideIcon } from "lucide-react";

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
}

export const StatsCard = ({ 
  title, 
  value, 
  subtitle, 
  icon, 
  accent = "primary",
  variant = "default",
  trend 
}: StatsCardProps) => {
  const IconComponent = typeof icon === "function" ? icon : null;
  const iconElement = IconComponent ? <IconComponent className="h-6 w-6 text-primary" /> : icon;

  const cardClasses = variant === "glass" 
    ? "card-base card-glass" 
    : variant === "elevated" 
    ? "card-base card-elevated" 
    : "card-base";

  return (
    <div className={`${cardClasses} flex flex-col justify-between`}>
      <div className="flex items-start justify-between">
        <div>
          <div className="stat-title">{title}</div>
          <div className="stat-value">{value}</div>
          {subtitle && (
            <div className="text-sm text-[rgba(255,255,255,0.6)] mt-1">{subtitle}</div>
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
              <span className="text-xs text-muted-foreground">vs last month</span>
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
