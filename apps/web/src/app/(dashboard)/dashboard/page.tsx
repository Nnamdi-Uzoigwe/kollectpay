"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import api from "@/shared/lib/axios";

interface User {
  businessName: string;
  email: string;
  plan: string;
}

interface Debtor {
  id: string;
  name: string;
  phone: string;
  amount: number;
  dueDate: string;
  status: "PENDING" | "OVERDUE" | "PAID";
  notes?: string;
}

interface Message {
  id: string;
  status: string;
  sentAt: string;
}

const planLimits: Record<string, { debtors: number; messages: number }> = {
  STARTER: { debtors: 20, messages: 100 },
  GROWTH: { debtors: 100, messages: 500 },
  PRO: { debtors: Infinity, messages: Infinity },
};

const statusConfig: Record<string, { label: string; className: string }> = {
  OVERDUE: { label: "Overdue", className: "bg-red-100 text-red-600" },
  PENDING: { label: "Pending", className: "bg-yellow-100 text-yellow-600" },
  PAID: { label: "Paid ✓", className: "bg-[#84CC16]/15 text-[#65A30D]" },
};

const avatarColors = [
  "bg-red-100 text-red-500",
  "bg-blue-100 text-blue-500",
  "bg-green-100 text-green-600",
  "bg-purple-100 text-purple-500",
  "bg-orange-100 text-orange-500",
  "bg-pink-100 text-pink-500",
];

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [debtors, setDebtors] = useState<Debtor[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [greeting, setGreeting] = useState("Good morning");

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [debtorsRes, messagesRes] = await Promise.all([
        api.get("/api/debtors"),
        api.get("/api/messages"),
      ]);
      setDebtors(debtorsRes.data.data.debtors);
      setMessages(messagesRes.data.data.messages);
    } catch {
      // fail silently — show zeros
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("kollectpay_user");
    if (stored) setUser(JSON.parse(stored));

    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 17) setGreeting("Good afternoon");
    else setGreeting("Good evening");

    fetchData();
  }, [fetchData]);

  // Computed stats
  const activeDebtors = debtors.filter((d) => d.status !== "PAID");
  const totalOwed = activeDebtors.reduce((sum, d) => sum + d.amount, 0);

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const recoveredThisMonth = debtors
    .filter((d) => d.status === "PAID" && new Date(d.dueDate) >= startOfMonth)
    .reduce((sum, d) => sum + d.amount, 0);

  const overdueCount = debtors.filter((d) => d.status === "OVERDUE").length;
  const totalMessages = messages.length;

  const plan = user?.plan || "STARTER";
  const limits = planLimits[plan] || planLimits.STARTER;
  const messagesThisWeek = messages.filter((m) => {
    const sentAt = new Date(m.sentAt);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return sentAt >= weekAgo;
  }).length;

  const formatAmount = (amount: number) =>
    `₦${amount.toLocaleString("en-NG")}`;

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-NG", {
      day: "numeric", month: "short", year: "numeric",
    });

  const stats = [
    {
      label: "Total Owed",
      value: isLoading ? "..." : formatAmount(totalOwed),
      change: `${activeDebtors.length} active debtor${activeDebtors.length !== 1 ? "s" : ""}`,
      changePositive: false,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      iconBg: "bg-red-50 text-red-400",
      valueColor: "text-red-500",
    },
    {
      label: "Active Debtors",
      value: isLoading ? "..." : activeDebtors.length.toString(),
      change: overdueCount > 0 ? `${overdueCount} overdue` : "All on track",
      changePositive: overdueCount === 0,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
          <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      iconBg: "bg-orange-50 text-orange-400",
      valueColor: "text-gray-900",
    },
    {
      label: "Recovered This Month",
      value: isLoading ? "..." : formatAmount(recoveredThisMonth),
      change: recoveredThisMonth > 0 ? "Great progress!" : "No payments yet",
      changePositive: recoveredThisMonth > 0,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      iconBg: "bg-[#84CC16]/10 text-[#65A30D]",
      valueColor: "text-[#65A30D]",
    },
    {
      label: "Messages Sent",
      value: isLoading ? "..." : totalMessages.toString(),
      change: `${messagesThisWeek} this week`,
      changePositive: true,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      iconBg: "bg-[#7C3AED]/10 text-[#7C3AED]",
      valueColor: "text-gray-900",
    },
  ];

  const recentDebtors = debtors.slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto">

      {/* Greeting */}
      <div className="mb-8">
        <h2
          className="text-2xl font-extrabold text-gray-900 tracking-tight"
          style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
        >
          {greeting}, {user?.businessName || "there"} 👋
        </h2>
        <p className="text-gray-400 text-sm mt-1" style={{ fontFamily: "var(--font-inter)" }}>
          Here's what's happening with your collections today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:shadow-gray-100 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <p
                className="text-gray-500 text-xs font-semibold uppercase tracking-wider"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {stat.label}
              </p>
              <div className={`w-9 h-9 rounded-xl ${stat.iconBg} flex items-center justify-center`}>
                {stat.icon}
              </div>
            </div>
            <p
              className={`text-2xl font-extrabold tracking-tight mb-1 ${stat.valueColor}`}
              style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
            >
              {stat.value}
            </p>
            <p
              className={`text-xs font-medium ${stat.changePositive ? "text-[#65A30D]" : "text-gray-400"}`}
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* Recent Debtors */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h3
              className="font-bold text-gray-900 text-[15px]"
              style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
            >
              Recent Debtors
            </h3>
            <Link
              href="/debtors"
              className="text-[#7C3AED] text-xs font-semibold hover:underline no-underline"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              View all →
            </Link>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <svg className="animate-spin text-[#7C3AED]" width="28" height="28" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeDashoffset="12" />
              </svg>
            </div>
          ) : recentDebtors.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <span className="text-3xl">👤</span>
              <p className="text-gray-500 font-semibold text-sm" style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}>
                No debtors yet
              </p>
              <Link
                href="/debtors"
                className="text-[#7C3AED] text-sm font-semibold hover:underline no-underline"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Add your first debtor →
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {recentDebtors.map((debtor, i) => (
                <div
                  key={debtor.id}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50/50 transition-colors duration-150"
                >
                  <div
                    className={`w-10 h-10 rounded-full ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-xs font-bold shrink-0`}
                    style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                  >
                    {debtor.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-800 font-semibold text-sm truncate" style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}>
                      {debtor.name}
                    </p>
                    <p className="text-gray-400 text-xs" style={{ fontFamily: "var(--font-inter)" }}>
                      {debtor.phone}
                    </p>
                  </div>
                  <div className="text-right hidden sm:block">
                    <p className="text-gray-900 font-bold text-sm" style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}>
                      {formatAmount(debtor.amount)}
                    </p>
                    <p className="text-gray-400 text-xs" style={{ fontFamily: "var(--font-inter)" }}>
                      Due {formatDate(debtor.dueDate)}
                    </p>
                  </div>
                  <span
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${statusConfig[debtor.status].className}`}
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {statusConfig[debtor.status].label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6">

          {/* Quick actions */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6">
            <h3 className="font-bold text-gray-900 text-[15px] mb-4" style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}>
              Quick Actions
            </h3>
            <div className="flex flex-col gap-2">
              {[
                { label: "Add New Debtor", href: "/debtors", icon: "👤", color: "hover:bg-[#7C3AED]/5 hover:border-[#7C3AED]/20" },
                { label: "View Message Logs", href: "/messages", icon: "📱", color: "hover:bg-blue-50 hover:border-blue-200" },
                { label: "Upgrade Plan", href: "/billing", icon: "⚡", color: "hover:bg-[#84CC16]/5 hover:border-[#84CC16]/20" },
              ].map((action, i) => (
                <Link
                  key={i}
                  href={action.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-100 transition-all duration-200 no-underline ${action.color}`}
                >
                  <span className="text-lg">{action.icon}</span>
                  <span className="text-gray-700 text-sm font-semibold" style={{ fontFamily: "var(--font-inter)" }}>
                    {action.label}
                  </span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="ml-auto text-gray-300">
                    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>

          {/* Plan usage */}
          <div className="bg-[#0F0A1E] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-white text-[15px]" style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}>
                Plan Usage
              </h3>
              <span className="text-[#84CC16] text-xs font-semibold bg-[#84CC16]/10 px-2.5 py-1 rounded-full" style={{ fontFamily: "var(--font-inter)" }}>
                {plan.charAt(0) + plan.slice(1).toLowerCase()}
              </span>
            </div>

            {/* Messages quota */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-white/50 text-xs" style={{ fontFamily: "var(--font-inter)" }}>
                  Messages this week
                </p>
                <p className="text-white text-xs font-semibold" style={{ fontFamily: "var(--font-inter)" }}>
                  {messagesThisWeek} / {limits.messages === Infinity ? "∞" : limits.messages}
                </p>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-[#7C3AED] to-[#84CC16] rounded-full transition-all duration-500"
                  style={{
                    width: limits.messages === Infinity
                      ? "30%"
                      : `${Math.min((messagesThisWeek / limits.messages) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>

            {/* Debtors quota */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <p className="text-white/50 text-xs" style={{ fontFamily: "var(--font-inter)" }}>
                  Debtors
                </p>
                <p className="text-white text-xs font-semibold" style={{ fontFamily: "var(--font-inter)" }}>
                  {debtors.length} / {limits.debtors === Infinity ? "∞" : limits.debtors}
                </p>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-[#7C3AED] to-[#84CC16] rounded-full"
                  style={{
                    width: limits.debtors === Infinity
                      ? "20%"
                      : `${Math.min((debtors.length / limits.debtors) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>

            {plan !== "PRO" && (
              <Link
                href="/billing"
                className="flex items-center justify-center gap-2 w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-sm font-bold py-2.5 rounded-xl transition-colors duration-200 no-underline"
                style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
              >
                Upgrade for More
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="#84CC16" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}