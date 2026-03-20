"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import api from "@/shared/lib/axios";

interface Stats {
  totalUsers: number;
  totalMessages: number;
  totalDebtors: number;
  activeSubscriptions: number;
  totalRevenue: number;
  planBreakdown: {
    starter: number;
    growth: number;
    pro: number;
  };
}

interface RecentUser {
  id: string;
  businessName: string;
  email: string;
  plan: string;
  createdAt: string;
  debtorCount: number;
  messageCount: number;
  subscription: { status: string } | null;
}

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [statsRes, usersRes] = await Promise.all([
        api.get("/api/admin/stats"),
        api.get("/api/admin/users"),
      ]);
      setStats(statsRes.data.data);
      setRecentUsers(usersRes.data.data.users.slice(0, 5));
    } catch (err: any) {
      setError("Failed to load admin data.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const formatAmount = (amount: number) =>
    `₦${amount.toLocaleString("en-NG")}`;

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-NG", {
      day: "numeric", month: "short", year: "numeric",
    });

  const planColors: Record<string, string> = {
    STARTER: "bg-gray-100 text-gray-600",
    GROWTH: "bg-[#7C3AED]/10 text-[#7C3AED]",
    PRO: "bg-[#84CC16]/15 text-[#65A30D]",
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3">
          <svg className="animate-spin text-[#7C3AED]" width="32" height="32" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeDashoffset="12" />
          </svg>
          <p className="text-gray-400 text-sm" style={{ fontFamily: "var(--font-inter)" }}>Loading platform data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-400 text-sm" style={{ fontFamily: "var(--font-inter)" }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: "Total Businesses",
            value: stats?.totalUsers.toString() || "0",
            icon: "🏢",
            color: "text-[#7C3AED]",
            sub: `${stats?.activeSubscriptions} active subscriptions`,
          },
          {
            label: "Monthly Revenue",
            value: formatAmount(stats?.totalRevenue || 0),
            icon: "💰",
            color: "text-[#65A30D]",
            sub: "Based on active plans",
          },
          {
            label: "Messages Sent",
            value: stats?.totalMessages.toString() || "0",
            icon: "📱",
            color: "text-blue-500",
            sub: "Across all users",
          },
          {
            label: "Total Debtors",
            value: stats?.totalDebtors.toString() || "0",
            icon: "👤",
            color: "text-orange-500",
            sub: "Across all businesses",
          },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-2xl px-5 py-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "var(--font-inter)" }}>
                {stat.label}
              </p>
              <span className="text-xl">{stat.icon}</span>
            </div>
            <p className={`text-2xl font-extrabold tracking-tight mb-1 ${stat.color}`} style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}>
              {stat.value}
            </p>
            <p className="text-gray-400 text-xs" style={{ fontFamily: "var(--font-inter)" }}>
              {stat.sub}
            </p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Recent users */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-900 text-[15px]" style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}>
              Recent Signups
            </h3>
            <Link href="/admin/users" className="text-[#7C3AED] text-xs font-semibold hover:underline no-underline" style={{ fontFamily: "var(--font-inter)" }}>
              View all →
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentUsers.length === 0 ? (
              <div className="flex items-center justify-center py-12">
                <p className="text-gray-400 text-sm" style={{ fontFamily: "var(--font-inter)" }}>No users yet</p>
              </div>
            ) : (
              recentUsers.map((user, i) => (
                <div key={user.id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50/50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-[#7C3AED]/10 flex items-center justify-center text-xs font-bold text-[#7C3AED] shrink-0" style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}>
                    {user.businessName.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-800 font-semibold text-sm truncate" style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}>
                      {user.businessName}
                    </p>
                    <p className="text-gray-400 text-xs truncate" style={{ fontFamily: "var(--font-inter)" }}>
                      {user.email}
                    </p>
                  </div>
                  <div className="hidden sm:flex items-center gap-3">
                    <span className="text-gray-400 text-xs" style={{ fontFamily: "var(--font-inter)" }}>
                      {user.debtorCount} debtors
                    </span>
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${planColors[user.plan] || "bg-gray-100 text-gray-600"}`} style={{ fontFamily: "var(--font-inter)" }}>
                      {user.plan}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs whitespace-nowrap hidden lg:block" style={{ fontFamily: "var(--font-inter)" }}>
                    {formatDate(user.createdAt)}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Plan breakdown + Revenue */}
        <div className="flex flex-col gap-5">

          {/* Plan breakdown */}
          <div className="bg-[#0F0A1E] rounded-2xl p-6">
            <h3 className="font-bold text-white text-[15px] mb-5" style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}>
              Plan Breakdown
            </h3>
            <div className="flex flex-col gap-4">
              {[
                { plan: "Starter", count: stats?.planBreakdown.starter || 0, price: 5000, color: "bg-gray-400" },
                { plan: "Growth", count: stats?.planBreakdown.growth || 0, price: 12000, color: "bg-[#7C3AED]" },
                { plan: "Pro", count: stats?.planBreakdown.pro || 0, price: 25000, color: "bg-[#84CC16]" },
              ].map((item, i) => {
                const total = (stats?.planBreakdown.starter || 0) + (stats?.planBreakdown.growth || 0) + (stats?.planBreakdown.pro || 0);
                const pct = total > 0 ? Math.round((item.count / total) * 100) : 0;
                return (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-white/70 text-sm font-semibold" style={{ fontFamily: "var(--font-inter)" }}>
                        {item.plan}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-white/40 text-xs" style={{ fontFamily: "var(--font-inter)" }}>
                          {item.count} users
                        </span>
                        <span className="text-[#84CC16] text-xs font-bold" style={{ fontFamily: "var(--font-inter)" }}>
                          {formatAmount(item.count * item.price)}/mo
                        </span>
                      </div>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color} rounded-full transition-all duration-500`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-white/40 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
                Total MRR
              </span>
              <span className="text-[#84CC16] text-lg font-extrabold" style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}>
                {formatAmount(stats?.totalRevenue || 0)}
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5">
            <h3 className="font-bold text-gray-900 text-[15px] mb-4" style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}>
              Quick Actions
            </h3>
            <div className="flex flex-col gap-2">
              {[
                { label: "Manage All Users", href: "/admin/users", icon: "👥" },
                { label: "View All Messages", href: "/admin/messages", icon: "📱" },
                { label: "Revenue Report", href: "/admin/revenue", icon: "💰" },
              ].map((action, i) => (
                <Link
                  key={i}
                  href={action.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-100 hover:border-[#7C3AED]/20 hover:bg-purple-50/50 transition-all duration-200 no-underline"
                >
                  <span className="text-base">{action.icon}</span>
                  <span className="text-gray-700 text-sm font-semibold flex-1" style={{ fontFamily: "var(--font-inter)" }}>
                    {action.label}
                  </span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-gray-300">
                    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}