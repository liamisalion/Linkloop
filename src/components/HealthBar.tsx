"use client";

export function HealthBar({ score, size = "md" }: { score: number; size?: "sm" | "md" }) {
  const color = score >= 75 ? "bg-[var(--green)]" : score >= 50 ? "bg-[var(--yellow)]" : "bg-[var(--red)]";
  const textColor = score >= 75 ? "text-[var(--green)]" : score >= 50 ? "text-[var(--yellow)]" : "text-[var(--red)]";
  const label = score >= 85 ? "活跃" : score >= 70 ? "良好" : score >= 50 ? "关注" : "冷却";
  const h = size === "sm" ? "h-1" : "h-1.5";

  return (
    <div className="flex items-center gap-2.5">
      <div className={`flex-1 ${h} bg-[#e8e6e1] rounded-full overflow-hidden`}>
        <div
          className={`${h} ${color} rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className={`text-xs font-bold ${textColor} min-w-[24px] text-right tabular-nums`}>{score}</span>
      {size === "md" && <span className="text-[11px] text-[var(--text-tertiary)]">{label}</span>}
    </div>
  );
}
