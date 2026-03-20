"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Sidebar from "@/features/dashboard/components/Sidebar";



const pageTitles: Record<string, { title: string; subtitle: string }> = {
  "/dashboard": { title: "Dashboard", subtitle: "Welcome back — here's what's happening" },
  "/debtors": { title: "Debtors", subtitle: "Manage everyone who owes you money" },
  "/reminders": { title: "Reminders", subtitle: "Configure your automated reminder schedules" },
  "/messages": { title: "Message Logs", subtitle: "Every message sent on your behalf" },
  "/billing": { title: "Billing", subtitle: "Manage your plan and subscription" },
  "/settings": { title: "Settings", subtitle: "Manage your account and preferences" },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<{ businessName: string; email: string; plan: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("kollectpay_token");
    const storedUser = localStorage.getItem("kollectpay_user");

    if (!token) {
      router.push("/login");
      return;
    }
    if (storedUser) {
    const user = JSON.parse(storedUser);
    setUser(user);
    // Redirect admins to their panel
    if (user.isAdmin) {
      router.push("/admin");
      return;
    }
  }
  }, [router]);

  const currentPage = pageTitles[pathname] || { title: "KollectPay", subtitle: "" };

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* Sidebar */}
      <Sidebar
        isMobileOpen={isMobileMenuOpen}
        onMobileClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Main content area */}
      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">

        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-sm shadow-gray-100/50">
          <div className="flex items-center justify-between px-6 h-16">

            {/* Left — Mobile menu + Page title */}
            <div className="flex items-center gap-4">
              {/* Mobile hamburger */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden flex flex-col gap-1.25 p-2 bg-transparent border-none cursor-pointer"
              >
                <span className="block w-5 h-0.5 bg-gray-600 rounded" />
                <span className="block w-5 h-0.5 bg-gray-600 rounded" />
                <span className="block w-5 h-0.5 bg-gray-600 rounded" />
              </button>

              <div>
                <h1
                  className="text-[17px] font-extrabold text-gray-900 leading-tight"
                  style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                >
                  {currentPage.title}
                </h1>
                <p
                  className="text-gray-400 text-xs hidden sm:block"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {currentPage.subtitle}
                </p>
              </div>
            </div>

            {/* Right — Actions */}
            <div className="flex items-center gap-3">
              {/* Add Debtor quick button */}
              <button
                onClick={() => router.push("/debtors")}
                className="hidden sm:flex items-center gap-1.5 bg-linear-to-r from-[#7C3AED] to-[#9D5CF6] text-white text-sm font-bold px-4 py-2 rounded-lg shadow-md shadow-purple-300/30 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 border-none cursor-pointer"
                style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5v14M5 12h14" stroke="#84CC16" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
                Add Debtor
              </button>

              {/* Notification bell */}
              <button className="relative w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200 border-none cursor-pointer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#84CC16] rounded-full border-2 border-white" />
              </button>

              {/* User avatar */}
              <div className="w-9 h-9 rounded-xl bg-[#7C3AED]/15 flex items-center justify-center text-xs font-bold text-[#7C3AED] cursor-pointer" style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}>
                {user?.businessName?.slice(0, 2).toUpperCase() || "KP"}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          {children}
        </main>

      </div>
    </div>
  );
}