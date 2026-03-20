"use client";

import { useState, useEffect, useCallback } from "react";
import api from "@/shared/lib/axios";

interface Debtor {
  id: string;
  name: string;
  phone: string;
  amount: number;
  status: "PENDING" | "OVERDUE" | "PAID";
}

interface ReminderSetting {
  id: string;
  debtorId: string;
  frequency: string;
  channel: "SMS" | "WHATSAPP";
  isActive: boolean;
  lastSentAt: string | null;
  reminderCount: string;
}

interface DebtorWithReminder extends Debtor {
  reminder: ReminderSetting | null;
}

const frequencyOptions = [
  { value: "DAILY", label: "Daily" },
  { value: "EVERY_2_DAYS", label: "Every 2 Days" },
  { value: "WEEKLY", label: "Weekly" },
];

const channelOptions = [
  {
    value: "SMS",
    label: "SMS",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path
          d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.01 1.17 2 2 0 012 .01h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    value: "WHATSAPP",
    label: "WhatsApp",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
];

const avatarColors = [
  "bg-red-100 text-red-500",
  "bg-blue-100 text-blue-500",
  "bg-green-100 text-green-600",
  "bg-purple-100 text-purple-500",
  "bg-orange-100 text-orange-500",
  "bg-pink-100 text-pink-500",
];

const statusConfig: Record<string, string> = {
  OVERDUE: "bg-red-100 text-red-600",
  PENDING: "bg-yellow-100 text-yellow-600",
  PAID: "bg-[#84CC16]/15 text-[#65A30D]",
};

// ─── DebtorReminderRow ────────────────────────────────────────────────────────

interface RowProps {
  debtor: DebtorWithReminder;
  index: number;
  onSave: (
    id: string,
    frequency: string,
    channel: "SMS" | "WHATSAPP",
    isActive: boolean
  ) => Promise<void>;
  savingId: string | null;
  savedId: string | null;
}

function DebtorReminderRow({ debtor, index, onSave, savingId, savedId }: RowProps) {
  const [frequency, setFrequency] = useState(debtor.reminder?.frequency || "DAILY");
  const [channel, setChannel] = useState<"SMS" | "WHATSAPP">(
    debtor.reminder?.channel || "SMS"
  );

  const isPaid = debtor.status === "PAID";
  const reminder = debtor.reminder;

  const formatDate = (date: string | null) => {
    if (!date) return "Never";
    return new Date(date).toLocaleDateString("en-NG", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatAmount = (amount: number) =>
    `₦${amount.toLocaleString("en-NG")}`;

  return (
    <div className={`px-6 py-5 ${isPaid ? "opacity-50" : ""}`}>
      <div className="flex flex-col lg:flex-row lg:items-center gap-5">

        {/* Debtor info */}
        <div className="flex items-center gap-3 lg:w-55 shrink-0">
          <div
            className={`w-10 h-10 rounded-full ${avatarColors[index % avatarColors.length]} flex items-center justify-center text-xs font-bold shrink-0`}
            style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
          >
            {debtor.name.slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p
              className="text-gray-800 font-semibold text-sm truncate"
              style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
            >
              {debtor.name}
            </p>
            <p
              className="text-gray-400 text-xs"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {formatAmount(debtor.amount)}
            </p>
          </div>
        </div>

        {/* Status badge */}
        <span
          className={`text-[11px] font-bold px-2.5 py-1 rounded-full self-start lg:self-auto ${statusConfig[debtor.status]}`}
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {debtor.status}
        </span>

        {/* Controls */}
        {!isPaid ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1">

            {/* Frequency */}
            <div className="flex-1 min-w-0">
              <label
                className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Frequency
              </label>
              <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
                {frequencyOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setFrequency(opt.value)}
                    className={`flex-1 px-2 py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-200 border-none cursor-pointer whitespace-nowrap ${
                      frequency === opt.value
                        ? "bg-white text-gray-800 shadow-sm"
                        : "bg-transparent text-gray-400 hover:text-gray-600"
                    }`}
                    style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Channel */}
            <div>
              <label
                className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Channel
              </label>
              <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
                {channelOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setChannel(opt.value as "SMS" | "WHATSAPP")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-200 border-none cursor-pointer ${
                      channel === opt.value
                        ? "bg-white text-gray-800 shadow-sm"
                        : "bg-transparent text-gray-400 hover:text-gray-600"
                    }`}
                    style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                  >
                    {opt.icon}
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Last sent + Save */}
            <div className="flex flex-col items-end gap-1.5">
              <p
                className="text-gray-400 text-[11px] whitespace-nowrap"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Last sent: {formatDate(reminder?.lastSentAt || null)}
              </p>
              <button
                onClick={() => onSave(debtor.id, frequency, channel, true)}
                disabled={savingId === debtor.id}
                className={`flex items-center gap-1.5 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all duration-200 border-none cursor-pointer whitespace-nowrap ${
                  savedId === debtor.id
                    ? "bg-[#84CC16]"
                    : savingId === debtor.id
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-linear-to-r from-[#7C3AED] to-[#9D5CF6] hover:-translate-y-0.5 shadow-md shadow-purple-300/30"
                }`}
                style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
              >
                {savingId === debtor.id ? (
                  <>
                    <svg className="animate-spin" width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeDashoffset="12" />
                    </svg>
                    Saving...
                  </>
                ) : savedId === debtor.id ? (
                  <>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Saved!
                  </>
                ) : (
                  <>
                    {reminder ? "Update" : "Activate"}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M12 5l7 7-7 7" stroke="#84CC16" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center">
            <span
              className="text-gray-300 text-sm italic"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Reminders stopped — debtor has paid ✓
            </span>
          </div>
        )}
      </div>

      {/* Reminder count badge */}
      {reminder && parseInt(reminder.reminderCount) > 0 && (
        <div className="mt-3 ml-13] flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-[#7C3AED]/8 border border-[#7C3AED]/15 rounded-full px-3 py-1">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
                stroke="#7C3AED"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              className="text-[#7C3AED] text-[11px] font-semibold"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {reminder.reminderCount} reminder
              {parseInt(reminder.reminderCount) !== 1 ? "s" : ""} sent
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── RemindersPage ────────────────────────────────────────────────────────────

export default function RemindersPage() {
  const [debtors, setDebtors] = useState<DebtorWithReminder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data: debtorData } = await api.get("/api/debtors");
      const allDebtors: Debtor[] = debtorData.data.debtors;

      const debtorsWithReminders: DebtorWithReminder[] = await Promise.all(
        allDebtors.map(async (debtor) => {
          try {
            const { data: reminderData } = await api.get(
              `/api/reminders/${debtor.id}`
            );
            return { ...debtor, reminder: reminderData.data.setting };
          } catch {
            return { ...debtor, reminder: null };
          }
        })
      );

      setDebtors(debtorsWithReminders);
    } catch {
      setError("Failed to load reminders. Please refresh.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSave = async (
    debtorId: string,
    frequency: string,
    channel: "SMS" | "WHATSAPP",
    isActive: boolean
  ) => {
    setSavingId(debtorId);
    try {
      await api.post("/api/reminders", { debtorId, frequency, channel });

      setDebtors((prev) =>
        prev.map((d) =>
          d.id === debtorId
            ? {
                ...d,
                reminder: d.reminder
                  ? { ...d.reminder, frequency, channel, isActive }
                  : {
                      id: "",
                      debtorId,
                      frequency,
                      channel,
                      isActive,
                      lastSentAt: null,
                      reminderCount: "0",
                    },
              }
            : d
        )
      );

      setSavedId(debtorId);
      setTimeout(() => setSavedId(null), 2000);
    } catch {
      setError("Failed to save reminder settings.");
    } finally {
      setSavingId(null);
    }
  };

  const activeReminders = debtors.filter((d) => d.reminder?.isActive).length;
  const pendingDebtors = debtors.filter((d) => d.status !== "PAID").length;
  const totalReminders = debtors.reduce(
    (sum, d) => sum + parseInt(d.reminder?.reminderCount || "0"),
    0
  );

  return (
    <div className="max-w-6xl mx-auto">

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {[
          { label: "Active Reminders", value: activeReminders.toString(), icon: "🔔", color: "text-[#7C3AED]" },
          { label: "Debtors Pending", value: pendingDebtors.toString(), icon: "👤", color: "text-orange-500" },
          { label: "Total Reminders Sent", value: totalReminders.toString(), icon: "📤", color: "text-[#65A30D]" },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-2xl px-5 py-4">
            <div className="flex items-center justify-between mb-2">
              <p
                className="text-gray-400 text-xs font-semibold uppercase tracking-wider"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {stat.label}
              </p>
              <span className="text-xl">{stat.icon}</span>
            </div>
            <p
              className={`text-2xl font-extrabold tracking-tight ${stat.color}`}
              style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Info banner */}
      <div className="bg-[#7C3AED]/5 border border-[#7C3AED]/15 rounded-2xl px-5 py-4 mb-6 flex items-start gap-3">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#7C3AED] shrink-0 mt-0.5">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <p
          className="text-[#7C3AED] text-sm leading-relaxed"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Reminders run automatically every day at <strong>9AM WAT</strong>.
          Configure each debtor's reminder schedule below. Reminders stop
          automatically when a debtor is marked as paid.
        </p>
      </div>

      {/* Main card */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3
            className="font-bold text-gray-900 text-[15px]"
            style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
          >
            Reminder Settings per Debtor
          </h3>
          <p
            className="text-gray-400 text-xs mt-0.5"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Configure how often and via which channel each debtor receives
            reminders
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-3">
              <svg className="animate-spin text-[#7C3AED]" width="32" height="32" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeDashoffset="12" />
              </svg>
              <p className="text-gray-400 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
                Loading reminders...
              </p>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-red-400 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
              {error}
            </p>
          </div>
        ) : debtors.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center text-2xl">
              🔔
            </div>
            <p
              className="text-gray-700 font-semibold"
              style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
            >
              No debtors yet
            </p>
            <p
              className="text-gray-400 text-sm text-center max-w-xs"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Add debtors first, then come back here to configure their reminder
              schedules
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {debtors.map((debtor, i) => (
              <DebtorReminderRow
                key={debtor.id}
                debtor={debtor}
                index={i}
                onSave={handleSave}
                savingId={savingId}
                savedId={savedId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}