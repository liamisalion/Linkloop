interface MetricCardProps {
  value: string | number;
  label: string;
  trend?: string;
  trendUp?: boolean;
  icon?: string;
}

export function MetricCard({ value, label, trend, trendUp, icon }: MetricCardProps) {
  return (
    <div className="bg-white rounded-lg p-5 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <div className="text-3xl font-extrabold text-[var(--blue)] animate-countUp">{value}</div>
        {icon && (
          <div className="w-10 h-10 rounded-full bg-[var(--blue-pale)] flex items-center justify-center text-lg">
            {icon}
          </div>
        )}
      </div>
      <div className="text-[var(--text-secondary)] text-sm font-medium">{label}</div>
      {trend && (
        <div className={`text-xs font-semibold mt-2 ${trendUp ? "text-[var(--green)]" : "text-[var(--red)]"}`}>
          {trend}
        </div>
      )}
    </div>
  );
}
