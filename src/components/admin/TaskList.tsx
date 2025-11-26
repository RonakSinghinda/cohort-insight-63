import React from "react";

interface TaskItem {
  title: string;
  subtitle?: string;
  badge: string;
  status: "action" | "pending";
  date: string;
}

interface ThemeProps {
  card: string;
  text: string;
  textMuted: string;
}

interface TaskListProps {
  items?: TaskItem[];
  theme?: ThemeProps;
}

export const TaskList = ({ items = [], theme }: TaskListProps) => {
  // Fallback to dark theme if no theme prop provided
  const currentTheme = theme || {
    card: "bg-slate-900 border-slate-800",
    text: "text-slate-50",
    textMuted: "text-slate-400",
  };

  return (
    <div className={`${currentTheme.card} rounded-lg border p-5 transition-colors duration-300`}>
      <div className={`font-bold text-lg ${currentTheme.text}`}>Upcoming Tasks</div>
      <div className="mt-4 space-y-3">
        {items.length === 0 ? (
          <div className={`text-sm ${currentTheme.textMuted} py-4`}>
            No upcoming tasks
          </div>
        ) : (
          items.map((t, i) => (
            <div
              key={i}
              className={`flex items-center justify-between p-3 rounded-md border ${currentTheme.card.split("border-")[1]} ${currentTheme.card.split("bg-")[1].split(" ")[0]}`}
            >
              <div>
                <div className={`font-semibold ${currentTheme.text}`}>
                  {t.title}
                </div>
                {t.subtitle && (
                  <div className={`text-xs ${currentTheme.textMuted} mt-1`}>
                    {t.subtitle}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3">
                <div
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    t.status === "action"
                      ? "bg-red-500/20 text-red-600 border border-red-500/20"
                      : "bg-slate-700/40 text-slate-300 border border-slate-700/40"
                  }`}
                >
                  {t.badge}
                </div>
                <div className={`text-xs ${currentTheme.textMuted} opacity-75`}>
                  {t.date}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

