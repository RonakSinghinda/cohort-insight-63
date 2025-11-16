import React from "react";

interface TaskItem {
  title: string;
  subtitle?: string;
  badge: string;
  status: "action" | "pending";
  date: string;
}

interface TaskListProps {
  items?: TaskItem[];
}

export const TaskList = ({ items = [] }: TaskListProps) => {
  return (
    <div className="card-base card-elevated">
      <div className="section-title">Upcoming Tasks</div>
      <div className="mt-4 space-y-3">
        {items.length === 0 ? (
          <div className="text-sm text-[rgba(255,255,255,0.6)] py-4">
            No upcoming tasks
          </div>
        ) : (
          items.map((t, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 rounded-md border border-[rgba(255,255,255,0.03)] bg-[hsl(var(--card))]"
            >
              <div>
                <div className="font-semibold text-[hsl(var(--foreground))]">
                  {t.title}
                </div>
                {t.subtitle && (
                  <div className="text-xs text-[rgba(255,255,255,0.6)] mt-1">
                    {t.subtitle}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3">
                <div
                  className={`pill ${
                    t.status === "action" ? "pill-warning" : "pill-pending"
                  }`}
                >
                  {t.badge}
                </div>
                <div className="text-xs text-[rgba(255,255,255,0.55)]">
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

