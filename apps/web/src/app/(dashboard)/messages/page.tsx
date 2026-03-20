"use client";

import { useState, useEffect, useCallback } from "react";
import api from "@/shared/lib/axios";

interface MessageLog {
  id: string;
  channel: "SMS" | "WHATSAPP";
  status: "PENDING" | "SENT" | "DELIVERED" | "FAILED";
  body: string;
  sentAt: string;
  debtor: {
    id: string;
    name: string;
    phone: string;
  };
}

type FilterStatus = "ALL" | "SENT" | "DELIVERED" | "FAILED";
type FilterChannel = "ALL" | "SMS" | "WHATSAPP";

const statusConfig: Record<string, { label: string; className: string; dot: string }> = {
  SENT: { label: "Sent", className: "bg-blue-50 text-blue-600", dot: "bg-blue-400" },
  DELIVERED: { label: "Delivered", className: "bg-[#84CC16]/15 text-[#65A30D]", dot: "bg-[#84CC16]" },
  FAILED: { label: "Failed", className: "bg-red-50 text-red-600", dot: "bg-red-400" },
  PENDING: { label: "Pending", className: "bg-yellow-50 text-yellow-600", dot: "bg-yellow-400" },
};

const channelConfig: Record<string, { label: string; className: string; icon: React.ReactNode }> = {
  SMS: {
    label: "SMS",
    className: "bg-purple-50 text-[#7C3AED]",
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.01 1.17 2 2 0 012 .01h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  WHATSAPP: {
    label: "WhatsApp",
    className: "bg-green-50 text-green-600",
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
};

const avatarColors = [
  "bg-red-100 text-red-500",
  "bg-blue-100 text-blue-500",
  "bg-green-100 text-green-600",
  "bg-purple-100 text-purple-500",
  "bg-orange-100 text-orange-500",
  "bg-pink-100 text-pink-500",
];

export default function MessagesPage() {
  const [messageLogs, setMessageLogs] = useState<MessageLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("ALL");
  const [channelFilter, setChannelFilter] = useState<FilterChannel>("ALL");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchMessages = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await api.get("/api/messages");
      setMessageLogs(data.data.messages);
    } catch (err: any) {
      setError("Failed to load message logs. Please refresh.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  // Stats
  const totalSent = messageLogs.filter((m) => m.status === "SENT" || m.status === "DELIVERED").length;
  const delivered = messageLogs.filter((m) => m.status === "DELIVERED").length;
  const failed = messageLogs.filter((m) => m.status === "FAILED").length;
  const smsCount = messageLogs.filter((m) => m.channel === "SMS").length;

  // Filter
  const filtered = messageLogs.filter((m) => {
    const matchesStatus = statusFilter === "ALL" || m.status === statusFilter;
    const matchesChannel = channelFilter === "ALL" || m.channel === channelFilter;
    const matchesSearch =
      m.debtor.name.toLowerCase().includes(search.toLowerCase()) ||
      m.debtor.phone.includes(search);
    return matchesStatus && matchesChannel && matchesSearch;
  });

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const getAvatar = (name: string, index: number) => ({
    initials: name.slice(0, 2).toUpperCase(),
    color: avatarColors[index % avatarColors.length],
  });

  return (
    <div className="max-w-7xl mx-auto">

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Sent", value: totalSent.toString(), color: "text-gray-900", icon: "📤" },
          { label: "Delivered", value: delivered.toString(), color: "text-[#65A30D]", icon: "✅" },
          { label: "Failed", value: failed.toString(), color: "text-red-500", icon: "❌" },
          { label: "SMS Messages", value: smsCount.toString(), color: "text-[#7C3AED]", icon: "📱" },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-2xl px-5 py-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "var(--font-inter)" }}>
                {stat.label}
              </p>
              <span className="text-lg">{stat.icon}</span>
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
        <div className="flex flex-col gap-4 px-6 py-4 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

            {/* Filters */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Status filter */}
              <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
                {(["ALL", "SENT", "DELIVERED", "FAILED"] as FilterStatus[]).map((f) => (
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
                    {f === "ALL" ? `All (${messageLogs.length})` : f}
                  </button>
                ))}
              </div>

              {/* Channel filter */}
              <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
                {(["ALL", "SMS", "WHATSAPP"] as FilterChannel[]).map((f) => (
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
            <div className="relative w-full sm:w-55">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300">
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
                <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                placeholder="Search by name or phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10 outline-none text-sm text-gray-700 placeholder:text-gray-300 transition-all"
                style={{ fontFamily: "var(--font-inter)" }}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-3">
              <svg className="animate-spin text-[#7C3AED]" width="32" height="32" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeDashoffset="12" />
              </svg>
              <p className="text-gray-400 text-sm" style={{ fontFamily: "var(--font-inter)" }}>Loading message logs...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-red-400 text-sm" style={{ fontFamily: "var(--font-inter)" }}>{error}</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center text-2xl">
              📭
            </div>
            <p className="text-gray-700 font-semibold text-base" style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}>
              {search ? "No messages found" : "No messages sent yet"}
            </p>
            <p className="text-gray-400 text-sm text-center max-w-xs" style={{ fontFamily: "var(--font-inter)" }}>
              {search
                ? "Try a different name or phone number"
                : "Once your reminders start sending, all message logs will appear here"}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {filtered.map((msg, i) => {
              const { initials, color } = getAvatar(msg.debtor.name, i);
              const isExpanded = expandedId === msg.id;
              const channel = channelConfig[msg.channel];
              const status = statusConfig[msg.status];

              return (
                <div key={msg.id} className="hover:bg-gray-50/50 transition-colors duration-150">
                  <div
                    className="flex items-center gap-4 px-6 py-4 cursor-pointer"
                    onClick={() => setExpandedId(isExpanded ? null : msg.id)}
                  >
                    {/* Avatar */}
                    <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center text-xs font-bold shrink-0`} style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}>
                      {initials}
                    </div>

                    {/* Name & phone */}
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-800 font-semibold text-sm" style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}>
                        {msg.debtor.name}
                      </p>
                      <p className="text-gray-400 text-xs" style={{ fontFamily: "var(--font-inter)" }}>
                        {msg.debtor.phone}
                      </p>
                    </div>

                    {/* Channel */}
                    <div className={`hidden sm:flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full ${channel.className}`} style={{ fontFamily: "var(--font-inter)" }}>
                      {channel.icon}
                      {channel.label}
                    </div>

                    {/* Status */}
                    <div className={`flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full ${status.className}`} style={{ fontFamily: "var(--font-inter)" }}>
                      <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                      {status.label}
                    </div>

                    {/* Date */}
                    <p className="text-gray-400 text-xs hidden lg:block whitespace-nowrap" style={{ fontFamily: "var(--font-inter)" }}>
                      {formatDate(msg.sentAt)}
                    </p>

                    {/* Expand chevron */}
                    <svg
                      width="14" height="14" viewBox="0 0 24 24" fill="none"
                      className={`text-gray-300 shrink-0 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                    >
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  {/* Expanded message body */}
                  {isExpanded && (
                    <div className="px-6 pb-5 ml-14">
                      <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-inter)" }}>
                          Message Content
                        </p>
                        <p className="text-gray-700 text-sm leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                          {msg.body}
                        </p>
                        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100">
                          <p className="text-gray-400 text-xs" style={{ fontFamily: "var(--font-inter)" }}>
                            Sent: {formatDate(msg.sentAt)}
                          </p>
                          <p className="text-gray-400 text-xs" style={{ fontFamily: "var(--font-inter)" }}>
                            Channel: {msg.channel}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}