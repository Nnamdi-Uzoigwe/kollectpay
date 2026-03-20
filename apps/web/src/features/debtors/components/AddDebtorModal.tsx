"use client";

import { useState } from "react";
import api from "@/shared/lib/axios";

interface AddDebtorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editDebtor?: Debtor | null;
}

export interface Debtor {
  id: string;
  name: string;
  phone: string;
  amount: number;
  dueDate: string;
  status: "PENDING" | "OVERDUE" | "PAID";
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

interface FormData {
  name: string;
  phone: string;
  amount: string;
  dueDate: string;
  notes: string;
}

interface FieldError {
  name?: string;
  phone?: string;
  amount?: string;
  dueDate?: string;
}

export default function AddDebtorModal({
  isOpen,
  onClose,
  onSuccess,
  editDebtor,
}: AddDebtorModalProps) {
  const isEditing = !!editDebtor;

  const [formData, setFormData] = useState<FormData>({
    name: editDebtor?.name || "",
    phone: editDebtor?.phone || "",
    amount: editDebtor?.amount?.toString() || "",
    dueDate: editDebtor?.dueDate
      ? new Date(editDebtor.dueDate).toISOString().split("T")[0]
      : "",
    notes: editDebtor?.notes || "",
  });
  const [fieldErrors, setFieldErrors] = useState<FieldError>({});
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validate = (): boolean => {
    const errors: FieldError = {};
    if (!formData.name.trim() || formData.name.length < 2)
      errors.name = "Enter debtor's full name";
    if (!formData.phone || formData.phone.length < 10)
      errors.phone = "Enter a valid phone number";
    if (!formData.amount || isNaN(Number(formData.amount)) || Number(formData.amount) <= 0)
      errors.amount = "Enter a valid amount";
    if (!formData.dueDate)
      errors.dueDate = "Select a due date";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name as keyof FieldError]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    setServerError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    setServerError("");

    try {
      const payload = {
        name: formData.name,
        phone: formData.phone,
        amount: Number(formData.amount),
        dueDate: formData.dueDate,
        notes: formData.notes || undefined,
      };

      if (isEditing) {
        await api.patch(`/api/debtors/${editDebtor.id}`, payload);
      } else {
        await api.post("/api/debtors", payload);
      }

      onSuccess();
      onClose();
    } catch (error: any) {
      setServerError(
        error.response?.data?.message || "Something went wrong. Try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-120 bg-white z-50 shadow-2xl flex flex-col overflow-hidden animate-slide-in">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h2
              className="text-lg font-extrabold text-gray-900"
              style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
            >
              {isEditing ? "Edit Debtor" : "Add New Debtor"}
            </h2>
            <p
              className="text-gray-400 text-xs mt-0.5"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {isEditing
                ? "Update debtor information"
                : "KollectPay will start sending reminders automatically"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors border-none cursor-pointer"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="#6B7280" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-6">

          {/* Server error */}
          {serverError && (
            <div className="flex items-center gap-3 bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-5">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="shrink-0">
                <circle cx="12" cy="12" r="10" stroke="#EF4444" strokeWidth="2" />
                <path d="M12 8v4M12 16h.01" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <p className="text-red-600 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
                {serverError}
              </p>
            </div>
          )}

          <div className="flex flex-col gap-5">

            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-inter)" }}>
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                placeholder="e.g. Emeka Okafor"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3.5 rounded-xl border text-gray-800 text-[15px] outline-none transition-all duration-200 placeholder:text-gray-300 ${
                  fieldErrors.name
                    ? "border-red-300 bg-red-50"
                    : "border-gray-200 focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10"
                }`}
                style={{ fontFamily: "var(--font-inter)" }}
              />
              {fieldErrors.name && (
                <p className="text-red-500 text-xs mt-1.5" style={{ fontFamily: "var(--font-inter)" }}>
                  {fieldErrors.name}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-inter)" }}>
                Phone Number *
              </label>
              <div className="flex gap-2">
                <div className="flex items-center gap-1.5 px-3 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-500 whitespace-nowrap" style={{ fontFamily: "var(--font-inter)" }}>
                  🇳🇬 +234
                </div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="0801 234 5678"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`flex-1 px-4 py-3.5 rounded-xl border text-gray-800 text-[15px] outline-none transition-all duration-200 placeholder:text-gray-300 ${
                    fieldErrors.phone
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200 focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10"
                  }`}
                  style={{ fontFamily: "var(--font-inter)" }}
                />
              </div>
              {fieldErrors.phone && (
                <p className="text-red-500 text-xs mt-1.5" style={{ fontFamily: "var(--font-inter)" }}>
                  {fieldErrors.phone}
                </p>
              )}
            </div>

            {/* Amount */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-inter)" }}>
                Amount Owed (₦) *
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold text-[15px]" style={{ fontFamily: "var(--font-inter)" }}>
                  ₦
                </span>
                <input
                  type="number"
                  name="amount"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={handleChange}
                  className={`w-full pl-8 pr-4 py-3.5 rounded-xl border text-gray-800 text-[15px] outline-none transition-all duration-200 placeholder:text-gray-300 ${
                    fieldErrors.amount
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200 focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10"
                  }`}
                  style={{ fontFamily: "var(--font-inter)" }}
                />
              </div>
              {fieldErrors.amount && (
                <p className="text-red-500 text-xs mt-1.5" style={{ fontFamily: "var(--font-inter)" }}>
                  {fieldErrors.amount}
                </p>
              )}
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-inter)" }}>
                Due Date *
              </label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className={`w-full px-4 py-3.5 rounded-xl border text-gray-800 text-[15px] outline-none transition-all duration-200 ${
                  fieldErrors.dueDate
                    ? "border-red-300 bg-red-50"
                    : "border-gray-200 focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10"
                }`}
                style={{ fontFamily: "var(--font-inter)" }}
              />
              {fieldErrors.dueDate && (
                <p className="text-red-500 text-xs mt-1.5" style={{ fontFamily: "var(--font-inter)" }}>
                  {fieldErrors.dueDate}
                </p>
              )}
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-inter)" }}>
                Notes (optional)
              </label>
              <textarea
                name="notes"
                placeholder="e.g. Owes for October supply of goods"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10 text-gray-800 text-[15px] outline-none transition-all duration-200 placeholder:text-gray-300 resize-none"
                style={{ fontFamily: "var(--font-inter)" }}
              />
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-gray-100 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3.5 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold text-[15px] hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 cursor-pointer bg-transparent"
            style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-bold text-[15px] transition-all duration-200 border-none cursor-pointer ${
              isLoading
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-linear-to-r from-[#7C3AED] to-[#9D5CF6] shadow-lg shadow-purple-300/30 hover:-translate-y-0.5"
            }`}
            style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeDashoffset="12" />
                </svg>
                Saving...
              </>
            ) : (
              <>
                {isEditing ? "Save Changes" : "Add Debtor"}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="#84CC16" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slide-in {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slide-in 0.25s ease-out;
        }
      `}</style>
    </>
  );
}