const colorMap: Record<string, string> = {
  red: "bg-[var(--red-bg)] text-[var(--red)]",
  yellow: "bg-[var(--yellow-bg)] text-[var(--yellow)]",
  green: "bg-[var(--green-bg)] text-[var(--green)]",
  blue: "bg-[var(--blue-pale)] text-[var(--blue)]",
  purple: "bg-[var(--purple-bg)] text-[var(--purple)]",
  gray: "bg-[#f0efec] text-[var(--text-secondary)]",
};

export function Tag({ children, color = "blue" }: { children: React.ReactNode; color?: string }) {
  return (
    <span className={`inline-flex items-center px-2 py-[2px] rounded-full text-[11px] font-bold whitespace-nowrap leading-4 ${colorMap[color] || colorMap.blue}`}>
      {children}
    </span>
  );
}
