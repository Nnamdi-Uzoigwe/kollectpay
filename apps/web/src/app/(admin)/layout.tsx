"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import api from "@/shared/lib/axios";

const navItems = [
  {
    label: "Overview",
    href: "/admin",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
        <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
        <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
        <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Messages",
    href: "/admin/messages",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Revenue",
    href: "/admin/revenue",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
  const token = localStorage.getItem("kollectpay_token");
  const storedUser = localStorage.getItem("kollectpay_user");

  if (!token) {
    router.push("/login");
    return;
  }

  if (storedUser) {
    const user = JSON.parse(storedUser);
    if (!user.isAdmin) {
      // Not an admin — kick them to dashboard
      router.push("/dashboard");
      return;
    }
  }
}, [router]);

  const handleLogout = () => {
    localStorage.removeItem("kollectpay_token");
    localStorage.removeItem("kollectpay_user");
    router.push("/login");
  };

  const isActive = (href: string) => pathname === href;

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/8">
        <Link href="/admin" className="flex items-center gap-2.5 no-underline">
          <div className="w-8 h-8 rounded-lg bg-linear-to-br from-[#7C3AED] to-[#9D5CF6] flex items-center justify-center">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#84CC16" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight text-white" style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}>
              KollectPay
            </span>
            <span className="block text-[10px] text-[#84CC16] font-bold uppercase tracking-widest" style={{ fontFamily: "var(--font-inter)" }}>
              Admin Panel
            </span>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4">
        <p className="text-white/25 text-[10px] font-bold uppercase tracking-widest px-3 mb-3" style={{ fontFamily: "var(--font-inter)" }}>
          Admin Menu
        </p>
        <div className="flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileOpen(false)}
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

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-white/8">
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2 mb-3">
          <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
          <span className="text-red-400 text-xs font-semibold" style={{ fontFamily: "var(--font-inter)" }}>
            Admin Access
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/50 hover:text-red-400 hover:bg-white/8 text-sm font-semibold transition-all duration-200 border-none bg-transparent cursor-pointer"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Log Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-60 bg-[#0F0A1E] border-r border-white/8 fixed left-0 top-0 bottom-0 z-40">
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setIsMobileOpen(false)} />
      )}

      {/* Mobile sidebar */}
      <aside className={`fixed left-0 top-0 bottom-0 w-60] bg-[#0F0A1E] border-r border-white/8 z-50 lg:hidden transition-transform duration-300 ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <SidebarContent />
      </aside>

      {/* Main */}
      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-sm">
          <div className="flex items-center justify-between px-6 h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMobileOpen(true)}
                className="lg:hidden flex flex-col gap-1.25 p-2 bg-transparent border-none cursor-pointer"
              >
                <span className="block w-5 h-0.5 bg-gray-600 rounded" />
                <span className="block w-5 h-0.5 bg-gray-600 rounded" />
                <span className="block w-5 h-0.5 bg-gray-600 rounded" />
              </button>
              <div>
                <h1 className="text-[17px] font-extrabold text-gray-900" style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}>
                  Admin Dashboard
                </h1>
                <p className="text-gray-400 text-xs hidden sm:block" style={{ fontFamily: "var(--font-inter)" }}>
                  KollectPay platform management
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="text-[#7C3AED] text-sm font-semibold border border-purple-200 hover:bg-purple-50 px-4 py-2 rounded-lg transition-all no-underline"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                ← User Dashboard
              </Link>
              <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center text-xs font-bold text-red-500" style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}>
                AD
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}