"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import api from "@/shared/lib/axios";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Debtors",
    href: "/debtors",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Reminders",
    href: "/reminders",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Messages",
    href: "/messages",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Billing",
    href: "/billing",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="1" y1="10" x2="23" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
];

const bottomItems = [
  {
    label: "Settings",
    href: "/settings",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
];

const planLimits: Record<string, { debtors: number; messages: number }> = {
  STARTER: { debtors: 20, messages: 100 },
  GROWTH: { debtors: 100, messages: 500 },
  PRO: { debtors: Infinity, messages: Infinity },
};

interface SidebarProps {
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

export default function Sidebar({ isMobileOpen, onMobileClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState<{ businessName: string; email: string; plan: string } | null>(null);
  const [debtorCount, setDebtorCount] = useState<number>(0);

  useEffect(() => {
    // Load user from localStorage
    const stored = localStorage.getItem("kollectpay_user");
    if (stored) setUser(JSON.parse(stored));

    // Fetch real debtor count
    const fetchDebtorCount = async () => {
      try {
        const { data } = await api.get("/api/debtors");
        const active = data.data.debtors.filter(
          (d: { status: string }) => d.status !== "PAID"
        ).length;
        setDebtorCount(active);
      } catch {
        // fail silently
      }
    };

    fetchDebtorCount();
  }, []);

  const isActive = (href: string) => pathname === href;

  const handleLogout = () => {
    localStorage.removeItem("kollectpay_token");
    localStorage.removeItem("kollectpay_user");
    router.push("/login");
  };

  const plan = user?.plan || "STARTER";
  const limits = planLimits[plan] || planLimits.STARTER;
  const initials = user?.businessName?.slice(0, 2).toUpperCase() || "KP";

  const SidebarContent = () => (
    <div className="flex flex-col h-full">

      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/8">
        <Link href="/dashboard" className="flex items-center gap-2.5 no-underline">
          <div className="w-8 h-8 rounded-lg bg-linear-to-br from-[#7C3AED] to-[#9D5CF6] flex items-center justify-center shadow-lg shadow-purple-500/40">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#84CC16" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="font-extrabold text-lg tracking-tight text-white" style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}>
            Kollect<span className="text-[#84CC16]">Pay</span>
          </span>
        </Link>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <p className="text-white/25 text-[10px] font-bold uppercase tracking-widest px-3 mb-3" style={{ fontFamily: "var(--font-inter)" }}>
          Main Menu
        </p>
        <div className="flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onMobileClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 no-underline ${
                isActive(item.href)
                  ? "bg-[#7C3AED] text-white shadow-lg shadow-purple-900/40"
                  : "text-white/50 hover:text-white hover:bg-white/8"
              }`}
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <span className={isActive(item.href) ? "text-white" : "text-white/40"}>
                {item.icon}
              </span>
              {item.label}
              {item.label === "Debtors" && debtorCount > 0 && (
                <span className="ml-auto bg-[#84CC16] text-[#0F0A1E] text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {debtorCount}
                </span>
              )}
            </Link>
          ))}
        </div>

        <p className="text-white/25 text-[10px] font-bold uppercase tracking-widest px-3 mb-3 mt-6" style={{ fontFamily: "var(--font-inter)" }}>
          Account
        </p>
        <div className="flex flex-col gap-1">
          {bottomItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onMobileClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 no-underline ${
                isActive(item.href)
                  ? "bg-[#7C3AED] text-white shadow-lg shadow-purple-900/40"
                  : "text-white/50 hover:text-white hover:bg-white/8"
              }`}
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <span className={isActive(item.href) ? "text-white" : "text-white/40"}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* User + Plan + Logout */}
      <div className="px-3 py-4 border-t border-white/8">
        {/* Plan badge */}
        <div className="flex items-center gap-2 bg-[#84CC16]/10 border border-[#84CC16]/20 rounded-xl px-3 py-2.5 mb-3">
          <div className="w-1.5 h-1.5 rounded-full bg-[#84CC16] animate-pulse" />
          <span className="text-[#84CC16] text-xs font-semibold flex-1" style={{ fontFamily: "var(--font-inter)" }}>
            {plan.charAt(0) + plan.slice(1).toLowerCase()} Plan
          </span>
          {plan !== "PRO" && (
            <Link
              href="/billing"
              className="text-[10px] text-[#84CC16]/70 font-semibold hover:text-[#84CC16] transition-colors no-underline"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Upgrade →
            </Link>
          )}
        </div>

        {/* User info + logout */}
        <div className="flex items-center gap-3 px-1">
          <div className="w-8 h-8 rounded-full bg-[#7C3AED]/30 flex items-center justify-center text-xs font-bold text-[#7C3AED] shrink-0" style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}>
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-semibold truncate" style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}>
              {user?.businessName || "Your Business"}
            </p>
            <p className="text-white/30 text-[11px] truncate" style={{ fontFamily: "var(--font-inter)" }}>
              {user?.email || ""}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="text-white/30 hover:text-red-400 transition-colors bg-transparent border-none cursor-pointer p-1 shrink-0"
            title="Log out"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-60 bg-[#0F0A1E] border-r border-white/8 fixed left-0 top-0 bottom-0 z-40">
        <SidebarContent />
      </aside>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={onMobileClose} />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed left-0 top-0 bottom-0 w-60 bg-[#0F0A1E] border-r border-white/8 z-50 lg:hidden transition-transform duration-300 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent />
      </aside>
    </>
  );
}