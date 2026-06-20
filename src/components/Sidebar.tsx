"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navGroups = [
  {
    label: "",
    items: [
      { icon: "📊", label: "今日行动中心", href: "/" },
      { icon: "📥", label: "收件箱", href: "/inbox" },
      { icon: "👤", label: "联系人", href: "/contacts" },
      { icon: "🪪", label: "我的名片", href: "/profile" },
    ],
  },
  {
    label: "跟进管理",
    items: [
      { icon: "⏳", label: "谁在等我", href: "/waiting" },
      { icon: "📋", label: "承诺清单", href: "/commitments" },
      { icon: "🌐", label: "社媒动态", href: "/social" },
      { icon: "📈", label: "周报", href: "/weekly" },
    ],
  },
  {
    label: "工具",
    items: [
      { icon: "🤖", label: "AI 分析", href: "/ai" },
      { icon: "📤", label: "数据导入", href: "/import" },
      { icon: "🔌", label: "数据源", href: "/connections" },
      { icon: "🔗", label: "Link 用户", href: "/link" },
      { icon: "⚙️", label: "设置", href: "/settings" },
    ],
  },
];

interface AIStatus {
  configured: boolean;
  model: string | null;
  provider: string | null;
  status: string;
  message: string;
}

export function Sidebar() {
  const pathname = usePathname();
  const [aiStatus, setAiStatus] = useState<AIStatus | null>(null);

  useEffect(() => {
    fetch("/api/ai/status")
      .then((r) => r.json())
      .then(setAiStatus)
      .catch(() => setAiStatus({ configured: false, model: null, provider: null, status: "未知", message: "" }));
  }, []);

  const statusColor = aiStatus?.status === "已连接"
    ? "bg-green-500"
    : aiStatus?.status === "已配置"
      ? "bg-yellow-500"
      : aiStatus?.status === "Key 无效"
        ? "bg-red-500"
        : "bg-gray-400";

  return (
    <aside className="fixed left-0 top-14 bottom-0 w-56 bg-white border-r border-[var(--border)] flex flex-col overflow-y-auto">
      <nav className="flex-1 py-2">
        {navGroups.map((group, gi) => (
          <div key={gi}>
            {group.label && (
              <div className="px-4 pt-4 pb-1.5 text-[11px] font-bold text-[var(--text-tertiary)] uppercase tracking-wider">
                {group.label}
              </div>
            )}
            {group.items.map((item) => {
              const isActive = item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2.5 mx-2 px-3 py-2 rounded-md text-[13px] transition-all relative ${
                    isActive
                      ? "bg-[var(--blue-pale)] text-[var(--blue)] font-semibold"
                      : "text-[var(--text-secondary)] hover:bg-[var(--hover)] hover:text-[var(--text)]"
                  }`}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[var(--blue)] rounded-r-full" />
                  )}
                  <span className="text-sm">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
            {gi < navGroups.length - 1 && (
              <div className="mx-4 my-2 border-t border-[var(--border)]" />
            )}
          </div>
        ))}
      </nav>

      {aiStatus && (
        <Link href="/settings" className="block mx-2 mb-2 px-3 py-2 rounded-md bg-[#f8f8f6] hover:bg-[var(--hover)] transition-colors">
          <div className="flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${statusColor} shrink-0`} />
            <span className="text-[11px] font-semibold text-[var(--text-secondary)]">AI {aiStatus.status}</span>
          </div>
          {aiStatus.model && (
            <div className="text-[10px] text-[var(--text-tertiary)] pl-3.5 mt-0.5">
              {aiStatus.provider} / {aiStatus.model}
            </div>
          )}
        </Link>
      )}
    </aside>
  );
}
