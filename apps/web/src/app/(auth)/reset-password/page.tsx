"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/shared/lib/axios";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ newPassword?: string; confirmPassword?: string }>({});

  useEffect(() => {
    if (!token) {
      setError("Invalid reset link. Please request a new one.");
    }
  }, [token]);

  const validate = () => {
    const errors: { newPassword?: string; confirmPassword?: string } = {};
    if (!newPassword || newPassword.length < 8)
      errors.newPassword = "Password must be at least 8 characters";
    if (newPassword !== confirmPassword)
      errors.confirmPassword = "Passwords do not match";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    setError("");

    try {
      await api.post("/api/auth/reset-password", { token, newPassword });
      setIsSuccess(true);
      setTimeout(() => router.push("/login"), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-110">

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2.5 no-underline">
            <div className="w-9 h-9 rounded-xl bg-linear-to-br from-[#7C3AED] to-[#9D5CF6] flex items-center justify-center shadow-lg shadow-purple-300/40">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#84CC16" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="font-extrabold text-xl tracking-tight text-[#7C3AED]" style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}>
              Kollect<span className="text-[#84CC16]">Pay</span>
            </span>
          </Link>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 p-8">

          {isSuccess ? (
            /* Success state */
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#84CC16]/15 flex items-center justify-center mx-auto mb-5">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="#65A30D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <polyline points="22 4 12 14.01 9 11.01" stroke="#65A30D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2
                className="text-xl font-extrabold text-gray-900 mb-3"
                style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
              >
                Password reset successfully!
              </h2>
              <p
                className="text-gray-500 text-sm leading-relaxed mb-2"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Your password has been updated. Redirecting you to login...
              </p>
              <p className="text-gray-400 text-xs" style={{ fontFamily: "var(--font-inter)" }}>
                If you're not redirected,{" "}
                <Link href="/login" className="text-[#7C3AED] font-semibold hover:underline">
                  click here
                </Link>
              </p>
            </div>
          ) : (
            <>
              <div className="mb-7">
                <h1
                  className="text-2xl font-extrabold text-gray-900 mb-2 tracking-tight"
                  style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                >
                  Set new password
                </h1>
                <p
                  className="text-gray-500 text-[15px]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Choose a strong password for your KollectPay account.
                </p>
              </div>

              {/* Token error */}
              {(error && !token) && (
                <div className="flex flex-col items-center gap-4 bg-red-50 border border-red-100 rounded-2xl p-6 text-center mb-5">
                  <span className="text-3xl">🔗</span>
                  <p className="text-red-600 text-sm font-semibold" style={{ fontFamily: "var(--font-inter)" }}>
                    {error}
                  </p>
                  <Link
                    href="/forgot-password"
                    className="text-white font-bold text-sm px-5 py-2.5 rounded-xl bg-linear-to-r from-[#7C3AED] to-[#9D5CF6] no-underline"
                    style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                  >
                    Request New Reset Link
                  </Link>
                </div>
              )}

              {/* Server error */}
              {(error && token) && (
                <div className="flex items-center gap-3 bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-5">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="shrink-0">
                    <circle cx="12" cy="12" r="10" stroke="#EF4444" strokeWidth="2" />
                    <path d="M12 8v4M12 16h.01" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <p className="text-red-600 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
                    {error}
                  </p>
                </div>
              )}

              {token && (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                  {/* New password */}
                  <div>
                    <label
                      className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showNew ? "text" : "password"}
                        placeholder="Minimum 8 characters"
                        value={newPassword}
                        onChange={(e) => { setNewPassword(e.target.value); setFieldErrors((p) => ({ ...p, newPassword: undefined })); }}
                        className={`w-full px-4 py-3.5 pr-12 rounded-xl border text-gray-800 text-[15px] outline-none transition-all duration-200 placeholder:text-gray-300 ${
                          fieldErrors.newPassword
                            ? "border-red-300 bg-red-50"
                            : "border-gray-200 focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10"
                        }`}
                        style={{ fontFamily: "var(--font-inter)" }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNew(!showNew)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 bg-transparent border-none cursor-pointer p-0"
                      >
                        {showNew ? (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        ) : (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                          </svg>
                        )}
                      </button>
                    </div>
                    {fieldErrors.newPassword && (
                      <p className="text-red-500 text-xs mt-1.5" style={{ fontFamily: "var(--font-inter)" }}>
                        {fieldErrors.newPassword}
                      </p>
                    )}
                  </div>

                  {/* Confirm password */}
                  <div>
                    <label
                      className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirm ? "text" : "password"}
                        placeholder="Repeat new password"
                        value={confirmPassword}
                        onChange={(e) => { setConfirmPassword(e.target.value); setFieldErrors((p) => ({ ...p, confirmPassword: undefined })); }}
                        className={`w-full px-4 py-3.5 pr-12 rounded-xl border text-gray-800 text-[15px] outline-none transition-all duration-200 placeholder:text-gray-300 ${
                          fieldErrors.confirmPassword
                            ? "border-red-300 bg-red-50"
                            : "border-gray-200 focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10"
                        }`}
                        style={{ fontFamily: "var(--font-inter)" }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 bg-transparent border-none cursor-pointer p-0"
                      >
                        {showConfirm ? (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        ) : (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                          </svg>
                        )}
                      </button>
                    </div>
                    {fieldErrors.confirmPassword && (
                      <p className="text-red-500 text-xs mt-1.5" style={{ fontFamily: "var(--font-inter)" }}>
                        {fieldErrors.confirmPassword}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full flex items-center justify-center gap-2 text-white font-bold text-base py-4 rounded-xl transition-all duration-200 border-none cursor-pointer mt-2 ${
                      isLoading
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-linear-to-r from-[#7C3AED] to-[#9D5CF6] shadow-lg shadow-purple-300/40 hover:-translate-y-0.5 hover:shadow-xl"
                    }`}
                    style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeDashoffset="12" />
                        </svg>
                        Resetting password...
                      </>
                    ) : (
                      <>
                        Reset Password
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M5 12h14M12 5l7 7-7 7" stroke="#84CC16" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </>
                    )}
                  </button>

                  <Link
                    href="/login"
                    className="text-center text-gray-400 text-sm hover:text-[#7C3AED] transition-colors duration-200 no-underline"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    ← Back to Login
                  </Link>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <svg className="animate-spin text-[#7C3AED]" width="32" height="32" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeDashoffset="12" />
        </svg>
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}