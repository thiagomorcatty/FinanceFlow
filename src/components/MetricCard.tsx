import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
}

export default function MetricCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  iconColor = "text-active",
  iconBg = "bg-active/10",
}: MetricCardProps) {
  const changeColors = {
    positive: "text-emerald-600 bg-emerald-50",
    negative: "text-red-600 bg-red-50",
    neutral: "text-muted-foreground bg-cards",
  };

  return (
    <div className="bg-white rounded-xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
          {change && (
            <span
              className={`inline-block mt-2 text-xs font-medium px-2 py-0.5 rounded-full ${changeColors[changeType]}`}
            >
              {change}
            </span>
          )}
        </div>
        <div className={`p-3 rounded-xl ${iconBg}`}>
          <Icon size={22} className={iconColor} />
        </div>
      </div>
    </div>
  );
}
