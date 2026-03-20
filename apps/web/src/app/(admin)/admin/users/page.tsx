"use client";

import { useState, useEffect, useCallback } from "react";
import api from "@/shared/lib/axios";

interface AdminUser {
  id: string;
  businessName: string;
  email: string;
  phone: string;
  plan: string;
  isVerified: boolean;
  createdAt: string;
  debtorCount: number;
  messageCount: number;
  subscription: { status: string; currentPeriodEnd: string } | null;
}

const planColors: Record<string, string> = {
  STARTER: "bg-gray-100 text-gray-600",
  GROWTH: "bg-[#7C3AED]/10 text-[#7C3AED]",
  PRO: "bg-[#84CC16]/15 text-[#65A30D]",
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterPlan, setFilterPlan] = useState("ALL");
  const [suspendingId, setSuspendingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const fetchUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await api.get("/api/admin/users");
      setUsers(data.data.users);
    } catch {
      setError("Failed to load users.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const handleSuspend = async (userId: string, suspend: boolean) => {
    setSuspendingId(userId);
    try {
      await api.patch(`/api/admin/users/${userId}/suspend`, { suspend });
      setUsers((prev) =>
        prev.map((u) => u.id === userId ? { ...u, isVerified: !suspend } : u)
      );
    } catch {
      alert("Failed to update user status.");
    } finally {
      setSuspendingId(null);
    }
  };

  const filtered = users.filter((u) => {
    const matchesSearch =
      u.businessName.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchesPlan = filterPlan === "ALL" || u.plan === filterPlan;
    return matchesSearch && matchesPlan;
  });

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-NG", {
      day: "numeric", month: "short", year: "numeric",
    });

  return (
    <div className="max-w-7xl mx-auto">

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-extrabold text-gray-900" style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}>
            All Users
          </h2>
          <p className="text-gray-400 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
            {users.length} registered businesses
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Search */}
          <div className="relative flex-1 sm:w-55">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
              <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10 outline-none text-sm text-gray-700 placeholder:text-gray-300 transition-all"
              style={{ fontFamily: "var(--font-inter)" }}
            />
          </div>

          {/* Plan filter */}
          <select
            value={filterPlan}
            onChange={(e) => setFilterPlan(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-gray-200 focus:border-[#7C3AED] outline-none text-sm text-gray-700 bg-white cursor-pointer"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <option value="ALL">All Plans</option>
            <option value="STARTER">Starter</option>
            <option value="GROWTH">Growth</option>
            <option value="PRO">Pro</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <svg className="animate-spin text-[#7C3AED]" width="32" height="32" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeDashoffset="12" />
            </svg>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-red-400 text-sm" style={{ fontFamily: "var(--font-inter)" }}>{error}</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-2">
            <span className="text-3xl">👥</span>
            <p className="text-gray-500 font-semibold" style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}>
              No users found
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  {["Business", "Email", "Plan", "Debtors", "Messages", "Joined", "Status", "Actions"].map((h) => (
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
                {filtered.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#7C3AED]/10 flex items-center justify-center text-[11px] font-bold text-[#7C3AED] shrink-0" style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}>
                          {user.businessName.slice(0, 2).toUpperCase()}
                        </div>
                        <p className="text-gray-800 font-semibold text-sm" style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}>
                          {user.businessName}
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-gray-500 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
                        {user.email}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${planColors[user.plan]}`} style={{ fontFamily: "var(--font-inter)" }}>
                        {user.plan}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-gray-600 text-sm text-center" style={{ fontFamily: "var(--font-inter)" }}>
                        {user.debtorCount}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-gray-600 text-sm text-center" style={{ fontFamily: "var(--font-inter)" }}>
                        {user.messageCount}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-gray-400 text-sm whitespace-nowrap" style={{ fontFamily: "var(--font-inter)" }}>
                        {formatDate(user.createdAt)}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${user.isVerified ? "bg-[#84CC16]/15 text-[#65A30D]" : "bg-red-100 text-red-500"}`} style={{ fontFamily: "var(--font-inter)" }}>
                        {user.isVerified ? "Active" : "Suspended"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => handleSuspend(user.id, user.isVerified)}
                        disabled={suspendingId === user.id}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-lg border-none cursor-pointer transition-all duration-200 ${
                          user.isVerified
                            ? "bg-red-50 text-red-500 hover:bg-red-100"
                            : "bg-[#84CC16]/10 text-[#65A30D] hover:bg-[#84CC16]/20"
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {suspendingId === user.id
                          ? "..."
                          : user.isVerified
                          ? "Suspend"
                          : "Unsuspend"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}