"use client";

import { useState, useEffect, useCallback } from "react";
import api from "@/shared/lib/axios";

interface Stats {
  totalUsers: number;
  activeSubscriptions: number;
  totalRevenue: number;
  planBreakdown: {
    starter: number;
    growth: number;
    pro: number;
  };
}

interface AdminUser {
  id: string;
  businessName: string;
  email: string;
  plan: string;
  createdAt: string;
  subscription: {
    status: string;
    currentPeriodStart: string;
    currentPeriodEnd: string;
  } | null;
}

const planConfig = {
  STARTER: { price: 5000, color: "bg-gray-100 text-gray-600", bar: "bg-gray-400" },
  GROWTH: { price: 12000, color: "bg-[#7C3AED]/10 text-[#7C3AED]", bar: "bg-[#7C3AED]" },
  PRO: { price: 25000, color: "bg-[#84CC16]/15 text-[#65A30D]", bar: "bg-[#84CC16]" },
};

export default function AdminRevenuePage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
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
      setUsers(usersRes.data.data.users.filter((u: AdminUser) => u.subscription));
    } catch {
      setError("Failed to load revenue data.");
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

  const starterRevenue = (stats?.planBreakdown.starter || 0) * 5000;
  const growthRevenue = (stats?.planBreakdown.growth || 0) * 12000;
  const proRevenue = (stats?.planBreakdown.pro || 0) * 25000;
  const totalMRR = starterRevenue + growthRevenue + proRevenue;
  const totalARR = totalMRR * 12;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <svg className="animate-spin text-[#7C3AED]" width="32" height="32" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeDashoffset="12" />
        </svg>
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
    <div className="max-w-6xl mx-auto">

      {/* Top revenue cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Monthly Revenue (MRR)", value: formatAmount(totalMRR), icon: "💰", color: "text-[#65A30D]", sub: "Based on active plans" },
          { label: "Annual Revenue (ARR)", value: formatAmount(totalARR), icon: "📈", color: "text-[#7C3AED]", sub: "MRR × 12 months" },
          { label: "Paying Customers", value: (stats?.activeSubscriptions || 0).toString(), icon: "👥", color: "text-gray-900", sub: `of ${stats?.totalUsers} total users` },
          { label: "Avg Revenue / User", value: formatAmount(stats?.activeSubscriptions ? Math.round(totalMRR / stats.activeSubscriptions) : 0), icon: "📊", color: "text-orange-500", sub: "Per active subscription" },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-2xl px-5 py-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider leading-tight" style={{ fontFamily: "var(--font-inter)" }}>
                {stat.label}
              </p>
              <span className="text-xl shrink-0">{stat.icon}</span>
            </div>
            <p className={`text-xl font-extrabold tracking-tight mb-1 ${stat.color}`} style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}>
              {stat.value}
            </p>
            <p className="text-gray-400 text-xs" style={{ fontFamily: "var(--font-inter)" }}>
              {stat.sub}
            </p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">

        {/* Revenue by plan */}
        <div className="bg-[#0F0A1E] rounded-2xl p-6">
          <h3
            className="font-bold text-white text-[15px] mb-6"
            style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
          >
            Revenue by Plan
          </h3>

          <div className="flex flex-col gap-5">
            {[
              { plan: "Starter", count: stats?.planBreakdown.starter || 0, revenue: starterRevenue, ...planConfig.STARTER },
              { plan: "Growth", count: stats?.planBreakdown.growth || 0, revenue: growthRevenue, ...planConfig.GROWTH },
              { plan: "Pro", count: stats?.planBreakdown.pro || 0, revenue: proRevenue, ...planConfig.PRO },
            ].map((item, i) => {
              const pct = totalMRR > 0 ? Math.round((item.revenue / totalMRR) * 100) : 0;
              return (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-full ${item.color}`}
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {item.plan}
                      </span>
                      <span className="text-white/40 text-xs" style={{ fontFamily: "var(--font-inter)" }}>
                        {item.count} users × {formatAmount(item.price)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-white/40 text-xs" style={{ fontFamily: "var(--font-inter)" }}>
                        {pct}%
                      </span>
                      <span
                        className="text-[#84CC16] text-sm font-extrabold"
                        style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                      >
                        {formatAmount(item.revenue)}
                      </span>
                    </div>
                  </div>
                  <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.bar} rounded-full transition-all duration-700`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-2 gap-4">
            <div>
              <p className="text-white/40 text-xs mb-1" style={{ fontFamily: "var(--font-inter)" }}>
                Total MRR
              </p>
              <p className="text-[#84CC16] text-2xl font-extrabold" style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}>
                {formatAmount(totalMRR)}
              </p>
            </div>
            <div>
              <p className="text-white/40 text-xs mb-1" style={{ fontFamily: "var(--font-inter)" }}>
                Total ARR
              </p>
              <p className="text-white text-2xl font-extrabold" style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}>
                {formatAmount(totalARR)}
              </p>
            </div>
          </div>
        </div>

        {/* Conversion funnel */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6">
          <h3
            className="font-bold text-gray-900 text-[15px] mb-6"
            style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
          >
            User Conversion
          </h3>

          <div className="flex flex-col gap-4">
            {[
              {
                label: "Total Registered",
                value: stats?.totalUsers || 0,
                color: "bg-gray-100",
                textColor: "text-gray-700",
                pct: 100,
              },
              {
                label: "Active Subscriptions",
                value: stats?.activeSubscriptions || 0,
                color: "bg-[#7C3AED]",
                textColor: "text-[#7C3AED]",
                pct: stats?.totalUsers
                  ? Math.round(((stats?.activeSubscriptions || 0) / stats.totalUsers) * 100)
                  : 0,
              },
              {
                label: "On Growth or Pro",
                value: (stats?.planBreakdown.growth || 0) + (stats?.planBreakdown.pro || 0),
                color: "bg-[#84CC16]",
                textColor: "text-[#65A30D]",
                pct: stats?.totalUsers
                  ? Math.round(
                      (((stats?.planBreakdown.growth || 0) + (stats?.planBreakdown.pro || 0)) /
                        stats.totalUsers) *
                        100
                    )
                  : 0,
              },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-gray-500 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
                    {item.label}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-xs" style={{ fontFamily: "var(--font-inter)" }}>
                      {item.pct}%
                    </span>
                    <span
                      className={`font-extrabold text-base ${item.textColor}`}
                      style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                    >
                      {item.value}
                    </span>
                  </div>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full transition-all duration-700`}
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-5 border-t border-gray-100">
            <p className="text-gray-400 text-xs mb-3" style={{ fontFamily: "var(--font-inter)" }}>
              Conversion rate (free → paid)
            </p>
            <p
              className="text-3xl font-extrabold text-gray-900"
              style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
            >
              {stats?.totalUsers
                ? `${Math.round(((stats?.activeSubscriptions || 0) / stats.totalUsers) * 100)}%`
                : "0%"}
            </p>
          </div>
        </div>
      </div>

      {/* Paying customers table */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3
            className="font-bold text-gray-900 text-[15px]"
            style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
          >
            Paying Customers
          </h3>
          <p className="text-gray-400 text-xs mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>
            All users with active subscriptions
          </p>
        </div>

        {users.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-2">
            <span className="text-3xl">💰</span>
            <p className="text-gray-500 font-semibold" style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}>
              No paying customers yet
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  {["Business", "Plan", "Monthly Value", "Period Start", "Period End", "Status"].map((h) => (
                    <th
                      key={h}
                      className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.map((user) => {
                  const config = planConfig[user.plan as keyof typeof planConfig];
                  return (
                    <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-8 h-8 rounded-full bg-[#7C3AED]/10 flex items-center justify-center text-[11px] font-bold text-[#7C3AED]"
                            style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                          >
                            {user.businessName.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-gray-800 font-semibold text-sm" style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}>
                              {user.businessName}
                            </p>
                            <p className="text-gray-400 text-xs" style={{ fontFamily: "var(--font-inter)" }}>
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${config?.color || "bg-gray-100 text-gray-600"}`}
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          {user.plan}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <p
                          className="text-[#65A30D] font-bold text-sm"
                          style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                        >
                          {formatAmount(config?.price || 0)}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-gray-500 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
                          {user.subscription ? formatDate(user.subscription.currentPeriodStart) : "—"}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-gray-500 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
                          {user.subscription ? formatDate(user.subscription.currentPeriodEnd) : "—"}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                            user.subscription?.status === "ACTIVE"
                              ? "bg-[#84CC16]/15 text-[#65A30D]"
                              : "bg-red-100 text-red-500"
                          }`}
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          {user.subscription?.status || "INACTIVE"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}