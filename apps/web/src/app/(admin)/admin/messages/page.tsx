"use client";

import { useState, useEffect, useCallback } from "react";
import api from "@/shared/lib/axios";

interface AdminMessage {
  id: string;
  channel: "SMS" | "WHATSAPP";
  status: "PENDING" | "SENT" | "DELIVERED" | "FAILED";
  sentAt: string;
  user: {
    businessName: string;
    email: string;
  };
  debtor: {
    name: string;
    phone: string;
  };
}

const statusConfig: Record<string, { label: string; className: string; dot: string }> = {
  SENT: { label: "Sent", className: "bg-blue-50 text-blue-600", dot: "bg-blue-400" },
  DELIVERED: { label: "Delivered", className: "bg-[#84CC16]/15 text-[#65A30D]", dot: "bg-[#84CC16]" },
  FAILED: { label: "Failed", className: "bg-red-50 text-red-600", dot: "bg-red-400" },
  PENDING: { label: "Pending", className: "bg-yellow-50 text-yellow-600", dot: "bg-yellow-400" },
};

const channelConfig: Record<string, { label: string; className: string }> = {
  SMS: { label: "SMS", className: "bg-purple-50 text-[#7C3AED]" },
  WHATSAPP: { label: "WhatsApp", className: "bg-green-50 text-green-600" },
};

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<AdminMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [channelFilter, setChannelFilter] = useState("ALL");

  const fetchMessages = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await api.get("/api/admin/messages");
      setMessages(data.data.messages);
    } catch {
      setError("Failed to load messages.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchMessages(); }, [fetchMessages]);

  const filtered = messages.filter((m) => {
    const matchesSearch =
      m.user.businessName.toLowerCase().includes(search.toLowerCase()) ||
      m.debtor.name.toLowerCase().includes(search.toLowerCase()) ||
      m.debtor.phone.includes(search);
    const matchesStatus = statusFilter === "ALL" || m.status === statusFilter;
    const matchesChannel = channelFilter === "ALL" || m.channel === channelFilter;
    return matchesSearch && matchesStatus && matchesChannel;
  });

  const totalSent = messages.filter((m) => m.status === "SENT" || m.status === "DELIVERED").length;
  const delivered = messages.filter((m) => m.status === "DELIVERED").length;
  const failed = messages.filter((m) => m.status === "FAILED").length;
  const deliveryRate = totalSent > 0 ? Math.round((delivered / totalSent) * 100) : 0;

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-NG", {
      day: "numeric", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });

  return (
    <div className="max-w-7xl mx-auto">

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Messages", value: messages.length.toString(), icon: "📤", color: "text-gray-900" },
          { label: "Delivered", value: delivered.toString(), icon: "✅", color: "text-[#65A30D]" },
          { label: "Failed", value: failed.toString(), icon: "❌", color: "text-red-500" },
          { label: "Delivery Rate", value: `${deliveryRate}%`, icon: "📊", color: "text-[#7C3AED]" },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-2xl px-5 py-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "var(--font-inter)" }}>
                {stat.label}
              </p>
              <span className="text-xl">{stat.icon}</span>
            </div>
            <p className={`text-2xl font-extrabold tracking-tight ${stat.color}`} style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Main card */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Status filter */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
              {["ALL", "SENT", "DELIVERED", "FAILED"].map((f) => (
                <button
                  key={f}
                  onClick={() => setStatusFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 border-none cursor-pointer ${
                    statusFilter === f
                      ? "bg-white text-gray-800 shadow-sm"
                      : "bg-transparent text-gray-400 hover:text-gray-600"
                  }`}
                  style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Channel filter */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
              {["ALL", "SMS", "WHATSAPP"].map((f) => (
                <button
                  key={f}
                  onClick={() => setChannelFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 border-none cursor-pointer ${
                    channelFilter === f
                      ? "bg-white text-gray-800 shadow-sm"
                      : "bg-transparent text-gray-400 hover:text-gray-600"
                  }`}
                  style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-60">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
              <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search business or debtor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10 outline-none text-sm placeholder:text-gray-300 transition-all"
              style={{ fontFamily: "var(--font-inter)" }}
            />
          </div>
        </div>

        {/* Table */}
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
            <span className="text-3xl">📭</span>
            <p className="text-gray-500 font-semibold" style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}>
              No messages found
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  {["Business", "Debtor", "Phone", "Channel", "Status", "Sent At"].map((h) => (
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
                {filtered.map((msg) => {
                  const status = statusConfig[msg.status];
                  const channel = channelConfig[msg.channel];
                  return (
                    <tr key={msg.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-5 py-4">
                        <p className="text-gray-800 font-semibold text-sm" style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}>
                          {msg.user.businessName}
                        </p>
                        <p className="text-gray-400 text-xs" style={{ fontFamily: "var(--font-inter)" }}>
                          {msg.user.email}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-gray-700 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
                          {msg.debtor.name}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-gray-500 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
                          {msg.debtor.phone}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${channel.className}`} style={{ fontFamily: "var(--font-inter)" }}>
                          {channel.label}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full ${status.className}`} style={{ fontFamily: "var(--font-inter)" }}>
                          <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                          {status.label}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-gray-400 text-xs whitespace-nowrap" style={{ fontFamily: "var(--font-inter)" }}>
                          {formatDate(msg.sentAt)}
                        </p>
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