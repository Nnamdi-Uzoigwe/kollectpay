"use client";

import { useState, useEffect, useCallback } from "react";
import api from "@/shared/lib/axios";
import AddDebtorModal, { type Debtor } from "@/features/debtors/components/AddDebtorModal";

type FilterStatus = "ALL" | "PENDING" | "OVERDUE" | "PAID";

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

export default function DebtorsPage() {
  const [debtors, setDebtors] = useState<Debtor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<FilterStatus>("ALL");
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editDebtor, setEditDebtor] = useState<Debtor | null>(null);
  const [markingPaid, setMarkingPaid] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const fetchDebtors = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await api.get("/api/debtors");
      setDebtors(data.data.debtors);
    } catch (err: any) {
      setError("Failed to load debtors. Please refresh.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDebtors();
  }, [fetchDebtors]);

  const handleMarkPaid = async (id: string) => {
    setMarkingPaid(id);
    try {
      await api.patch(`/api/debtors/${id}/pay`);
      setDebtors((prev) =>
        prev.map((d) => (d.id === id ? { ...d, status: "PAID" } : d))
      );
    } catch {
      alert("Failed to mark as paid. Try again.");
    } finally {
      setMarkingPaid(null);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await api.delete(`/api/debtors/${id}`);
      setDebtors((prev) => prev.filter((d) => d.id !== id));
      setConfirmDeleteId(null);
    } catch {
      alert("Failed to delete debtor. Try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (debtor: Debtor) => {
    setEditDebtor(debtor);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditDebtor(null);
  };

  // Stats
  const totalOwed = debtors
    .filter((d) => d.status !== "PAID")
    .reduce((sum, d) => sum + d.amount, 0);
  const pendingCount = debtors.filter((d) => d.status === "PENDING").length;
  const overdueCount = debtors.filter((d) => d.status === "OVERDUE").length;
  const paidCount = debtors.filter((d) => d.status === "PAID").length;

  // Filter + search
  const filtered = debtors.filter((d) => {
    const matchesFilter = filter === "ALL" || d.status === filter;
    const matchesSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.phone.includes(search);
    return matchesFilter && matchesSearch;
  });

  const getAvatar = (name: string, index: number) => ({
    initials: name.slice(0, 2).toUpperCase(),
    color: avatarColors[index % avatarColors.length],
  });

  const formatAmount = (amount: number) =>
    `₦${amount.toLocaleString("en-NG")}`;

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <div className="max-w-7xl mx-auto">

      {/* Stats bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Owed", value: formatAmount(totalOwed), color: "text-red-500", bg: "bg-red-50 text-red-400" },
          { label: "Pending", value: pendingCount.toString(), color: "text-yellow-600", bg: "bg-yellow-50 text-yellow-400" },
          { label: "Overdue", value: overdueCount.toString(), color: "text-red-600", bg: "bg-red-50 text-red-400" },
          { label: "Paid", value: paidCount.toString(), color: "text-[#65A30D]", bg: "bg-[#84CC16]/10 text-[#65A30D]" },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-2xl px-5 py-4">
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1" style={{ fontFamily: "var(--font-inter)" }}>
              {stat.label}
            </p>
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

          {/* Filter tabs */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
            {(["ALL", "PENDING", "OVERDUE", "PAID"] as FilterStatus[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 border-none cursor-pointer capitalize ${
                  filter === f
                    ? "bg-white text-gray-800 shadow-sm"
                    : "bg-transparent text-gray-400 hover:text-gray-600"
                }`}
                style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
              >
                {f === "ALL" ? `All (${debtors.length})` : f === "PENDING" ? `Pending (${pendingCount})` : f === "OVERDUE" ? `Overdue (${overdueCount})` : `Paid (${paidCount})`}
              </button>
            ))}
          </div>

          {/* Search + Add */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-55">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300">
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
                <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                placeholder="Search debtors..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10 outline-none text-sm text-gray-700 placeholder:text-gray-300 transition-all"
                style={{ fontFamily: "var(--font-inter)" }}
              />
            </div>
            <button
              onClick={() => { setEditDebtor(null); setIsModalOpen(true); }}
              className="flex items-center gap-1.5 bg-linear-to-r from-[#7C3AED] to-[#9D5CF6] text-white text-sm font-bold px-4 py-2.5 rounded-xl shadow-md shadow-purple-300/30 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 border-none cursor-pointer whitespace-nowrap"
              style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12h14" stroke="#84CC16" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              Add Debtor
            </button>
          </div>
        </div>

        {/* Table */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-3">
              <svg className="animate-spin text-[#7C3AED]" width="32" height="32" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeDashoffset="12" />
              </svg>
              <p className="text-gray-400 text-sm" style={{ fontFamily: "var(--font-inter)" }}>Loading debtors...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-red-400 text-sm" style={{ fontFamily: "var(--font-inter)" }}>{error}</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center text-2xl">
              👤
            </div>
            <p className="text-gray-700 font-semibold text-base" style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}>
              {search ? "No debtors found" : "No debtors yet"}
            </p>
            <p className="text-gray-400 text-sm text-center max-w-xs" style={{ fontFamily: "var(--font-inter)" }}>
              {search ? "Try a different name or phone number" : "Add your first debtor and KollectPay will start sending reminders automatically"}
            </p>
            {!search && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-2 flex items-center gap-2 bg-linear-to-r from-[#7C3AED] to-[#9D5CF6] text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-md shadow-purple-300/30 border-none cursor-pointer hover:-translate-y-0.5 transition-all"
                style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
              >
                Add Your First Debtor
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    {["Debtor", "Phone", "Amount", "Due Date", "Status", "Actions"].map((h) => (
                      <th
                        key={h}
                        className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-6 py-3"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map((debtor, i) => {
                    const { initials, color } = getAvatar(debtor.name, i);
                    return (
                      <tr key={debtor.id} className="hover:bg-gray-50/50 transition-colors duration-150">
                        {/* Name */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-full ${color} flex items-center justify-center text-xs font-bold shrink-0`} style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}>
                              {initials}
                            </div>
                            <div>
                              <p className="text-gray-800 font-semibold text-sm" style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}>
                                {debtor.name}
                              </p>
                              {debtor.notes && (
                                <p className="text-gray-400 text-xs truncate max-w-40" style={{ fontFamily: "var(--font-inter)" }}>
                                  {debtor.notes}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Phone */}
                        <td className="px-6 py-4">
                          <p className="text-gray-600 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
                            {debtor.phone}
                          </p>
                        </td>

                        {/* Amount */}
                        <td className="px-6 py-4">
                          <p className="text-gray-900 font-bold text-sm" style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}>
                            {formatAmount(debtor.amount)}
                          </p>
                        </td>

                        {/* Due Date */}
                        <td className="px-6 py-4">
                          <p className="text-gray-600 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
                            {formatDate(debtor.dueDate)}
                          </p>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4">
                          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${statusConfig[debtor.status].className}`} style={{ fontFamily: "var(--font-inter)" }}>
                            {statusConfig[debtor.status].label}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {debtor.status !== "PAID" && (
                              <button
                                onClick={() => handleMarkPaid(debtor.id)}
                                disabled={markingPaid === debtor.id}
                                className="flex items-center gap-1 text-[#65A30D] bg-[#84CC16]/10 hover:bg-[#84CC16]/20 text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-all border-none cursor-pointer disabled:opacity-50"
                                style={{ fontFamily: "var(--font-inter)" }}
                              >
                                {markingPaid === debtor.id ? (
                                  <svg className="animate-spin" width="12" height="12" viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeDashoffset="12" />
                                  </svg>
                                ) : (
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                                    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                )}
                                Paid
                              </button>
                            )}

                            <button
                              onClick={() => handleEdit(debtor)}
                              className="text-gray-400 hover:text-[#7C3AED] bg-gray-100 hover:bg-[#7C3AED]/10 p-1.5 rounded-lg transition-all border-none cursor-pointer"
                              title="Edit"
                            >
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </button>

                            {confirmDeleteId === debtor.id ? (
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => handleDelete(debtor.id)}
                                  disabled={deletingId === debtor.id}
                                  className="text-red-600 bg-red-50 hover:bg-red-100 text-xs font-semibold px-2 py-1.5 rounded-lg border-none cursor-pointer transition-all"
                                  style={{ fontFamily: "var(--font-inter)" }}
                                >
                                  {deletingId === debtor.id ? "..." : "Confirm"}
                                </button>
                                <button
                                  onClick={() => setConfirmDeleteId(null)}
                                  className="text-gray-400 bg-gray-100 text-xs font-semibold px-2 py-1.5 rounded-lg border-none cursor-pointer"
                                  style={{ fontFamily: "var(--font-inter)" }}
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setConfirmDeleteId(debtor.id)}
                                className="text-gray-400 hover:text-red-500 bg-gray-100 hover:bg-red-50 p-1.5 rounded-lg transition-all border-none cursor-pointer"
                                title="Delete"
                              >
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                                  <polyline points="3 6 5 6 21 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                  <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6M10 11v6M14 11v6M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden divide-y divide-gray-50">
              {filtered.map((debtor, i) => {
                const { initials, color } = getAvatar(debtor.name, i);
                return (
                  <div key={debtor.id} className="px-4 py-4 hover:bg-gray-50/50">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center text-xs font-bold shrink-0`} style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}>
                          {initials}
                        </div>
                        <div>
                          <p className="text-gray-800 font-semibold text-sm" style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}>
                            {debtor.name}
                          </p>
                          <p className="text-gray-400 text-xs" style={{ fontFamily: "var(--font-inter)" }}>
                            {debtor.phone}
                          </p>
                        </div>
                      </div>
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full shrink-0 ${statusConfig[debtor.status].className}`} style={{ fontFamily: "var(--font-inter)" }}>
                        {statusConfig[debtor.status].label}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-3 ml-13">
                      <div>
                        <p className="text-gray-900 font-bold text-base" style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}>
                          {formatAmount(debtor.amount)}
                        </p>
                        <p className="text-gray-400 text-xs" style={{ fontFamily: "var(--font-inter)" }}>
                          Due {formatDate(debtor.dueDate)}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        {debtor.status !== "PAID" && (
                          <button
                            onClick={() => handleMarkPaid(debtor.id)}
                            className="text-[#65A30D] bg-[#84CC16]/10 text-xs font-semibold px-3 py-1.5 rounded-lg border-none cursor-pointer"
                            style={{ fontFamily: "var(--font-inter)" }}
                          >
                            Mark Paid
                          </button>
                        )}
                        <button
                          onClick={() => handleEdit(debtor)}
                          className="text-gray-500 bg-gray-100 text-xs font-semibold px-3 py-1.5 rounded-lg border-none cursor-pointer"
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Modal */}
      <AddDebtorModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSuccess={fetchDebtors}
        editDebtor={editDebtor}
      />
    </div>
  );
}