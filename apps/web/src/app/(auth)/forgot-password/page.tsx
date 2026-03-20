"use client";

import { useState } from "react";
import Link from "next/link";
import api from "@/shared/lib/axios";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Enter a valid email address");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await api.post("/api/auth/forgot-password", { email });
      setIsSent(true);
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

          {isSent ? (
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
                Check your email
              </h2>
              <p
                className="text-gray-500 text-sm leading-relaxed mb-6"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                If <strong className="text-gray-700">{email}</strong> is registered on KollectPay, you'll receive a password reset link shortly. Check your spam folder if you don't see it.
              </p>
              <p className="text-gray-400 text-xs mb-6" style={{ fontFamily: "var(--font-inter)" }}>
                The link expires in 1 hour.
              </p>
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 text-white font-bold text-sm px-6 py-3.5 rounded-xl bg-linear-to-r from-[#7C3AED] to-[#9D5CF6] shadow-lg shadow-purple-300/30 hover:-translate-y-0.5 transition-all duration-200 no-underline"
                style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
              >
                Back to Login
              </Link>
            </div>
          ) : (
            /* Form state */
            <>
              <div className="mb-7">
                <h1
                  className="text-2xl font-extrabold text-gray-900 mb-2 tracking-tight"
                  style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                >
                  Forgot your password?
                </h1>
                <p
                  className="text-gray-500 text-[15px]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  No worries — enter your email and we'll send you a reset link.
                </p>
              </div>

              {error && (
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

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label
                    className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="you@yourbusiness.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10 outline-none text-gray-800 text-[15px] transition-all duration-200 placeholder:text-gray-300"
                    style={{ fontFamily: "var(--font-inter)" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex items-center justify-center gap-2 text-white font-bold text-base py-4 rounded-xl transition-all duration-200 border-none cursor-pointer ${
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
                      Sending reset link...
                    </>
                  ) : (
                    <>
                      Send Reset Link
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}