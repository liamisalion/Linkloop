"use client";

interface FilterBarProps {
  filters: string[];
  active: string;
  onChange: (filter: string) => void;
}

export function FilterBar({ filters, active, onChange }: FilterBarProps) {
  return (
    <div className="flex gap-1.5 flex-wrap mb-4">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => onChange(f)}
          className={`px-3.5 py-1.5 rounded-full text-[13px] font-semibold transition-all ${
            active === f
              ? "bg-[var(--blue)] text-white shadow-sm"
              : "bg-white text-[var(--text-secondary)] border border-[var(--border)] hover:border-[var(--blue)] hover:text-[var(--blue)] hover:bg-[var(--blue-pale)]"
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  );
}
