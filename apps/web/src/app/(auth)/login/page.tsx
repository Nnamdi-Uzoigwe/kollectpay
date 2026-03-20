"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/shared/lib/axios";

interface FormData {
  email: string;
  password: string;
}

interface FieldError {
  email?: string;
  password?: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [fieldErrors, setFieldErrors] = useState<FieldError>({});
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validate = (): boolean => {
    const errors: FieldError = {};
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Enter a valid email address";
    if (!formData.password) errors.password = "Enter your password";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      const { data } = await api.post("/api/auth/login", formData);
      localStorage.setItem("kollectpay_token", data.data.token);
      localStorage.setItem("kollectpay_user", JSON.stringify(data.data.user));

      // ← Redirect based on role
      if (data.data.user.isAdmin) {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    } catch (error: any) {
      setServerError(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0A1E] flex">
      {/* LEFT — Branding Panel */}
      <div className="hidden lg:flex lg:w-[45%] relative flex-col justify-between p-12 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-125 h-125 bg-[#7C3AED]/20 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-100 h-100 bg-[#84CC16]/10 blur-3xl rounded-full translate-x-1/2 translate-y-1/2" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
              backgroundSize: "36px 36px",
            }}
          />
        </div>

        {/* Logo */}
        <div className="relative">
          <Link href="/" className="flex items-center gap-2.5 no-underline">
            <div className="w-9 h-9 rounded-xl bg-linear-to-br from-[#7C3AED] to-[#9D5CF6] flex items-center justify-center shadow-lg shadow-purple-500/40">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                  stroke="#84CC16"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span
              className="font-extrabold text-xl tracking-tight text-white"
              style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
            >
              Kollect<span className="text-[#84CC16]">Pay</span>
            </span>
          </Link>
        </div>

        {/* Center content */}
        <div className="relative">
          <h2
            className="text-[42px] font-extrabold leading-[1.1] tracking-[-1.5px] text-white mb-6"
            style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
          >
            Welcome back.
            <br />
            Your debtors <span className="text-[#84CC16]">missed you.</span>
          </h2>

          <p
            className="text-white/50 text-base leading-relaxed mb-10"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Log back in and check who's paid, who still owes you, and how many
            reminders went out while you were away.
          </p>

          {/* Activity feed */}
          <div className="flex flex-col gap-3">
            {[
              {
                icon: "💰",
                text: "Emeka Okafor paid ₦150,000",
                time: "2 mins ago",
                color: "text-[#84CC16]",
              },
              {
                icon: "📱",
                text: "Reminder sent to Fatima Bello",
                time: "14 mins ago",
                color: "text-white/70",
              },
              {
                icon: "📱",
                text: "Reminder sent to Tunde Adeyemi",
                time: "1 hr ago",
                color: "text-white/70",
              },
              {
                icon: "💰",
                text: "Ngozi Eze paid ₦85,000",
                time: "3 hrs ago",
                color: "text-[#84CC16]",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-white/5 border border-white/8 rounded-xl px-4 py-3"
              >
                <span className="text-base">{item.icon}</span>
                <span
                  className={`text-sm flex-1 ${item.color}`}
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {item.text}
                </span>
                <span
                  className="text-white/25 text-xs whitespace-nowrap"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom stat */}
        <div className="relative flex items-center gap-6">
          {[
            { value: "₦2.4B+", label: "Total Recovered" },
            { value: "12k+", label: "Businesses" },
            { value: "98%", label: "Delivery Rate" },
          ].map((stat, i) => (
            <div key={i}>
              <div
                className="text-xl font-extrabold text-white"
                style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
              >
                {stat.value}
              </div>
              <div
                className="text-white/40 text-xs"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT — Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-white">
        <div className="w-full max-w-100">
          {/* Mobile logo */}
          <div className="flex justify-center mb-8 lg:hidden">
            <Link href="/" className="flex items-center gap-2.5 no-underline">
              <div className="w-9 h-9 rounded-xl bg-linear-to-br from-[#7C3AED] to-[#9D5CF6] flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                    stroke="#84CC16"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span
                className="font-extrabold text-xl tracking-tight text-[#7C3AED]"
                style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
              >
                Kollect<span className="text-[#84CC16]">Pay</span>
              </span>
            </Link>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1
              className="text-[32px] font-extrabold tracking-[-1px] text-gray-900 mb-2"
              style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
            >
              Log in to your account
            </h1>
            <p
              className="text-gray-500 text-[15px]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-[#7C3AED] font-semibold hover:underline"
              >
                Sign up free
              </Link>
            </p>
          </div>

          {/* Server error */}
          {serverError && (
            <div className="flex items-center gap-3 bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-6">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                className="shrink-0"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="#EF4444"
                  strokeWidth="2"
                />
                <path
                  d="M12 8v4M12 16h.01"
                  stroke="#EF4444"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <p
                className="text-red-600 text-sm"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {serverError}
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email */}
            <div>
              <label
                className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@yourbusiness.com"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3.5 rounded-xl border text-gray-800 text-[15px] outline-none transition-all duration-200 placeholder:text-gray-300 ${
                  fieldErrors.email
                    ? "border-red-300 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                    : "border-gray-200 focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10"
                }`}
                style={{ fontFamily: "var(--font-inter)" }}
              />
              {fieldErrors.email && (
                <p
                  className="text-red-500 text-xs mt-1.5"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {fieldErrors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  className="block text-xs font-bold text-gray-500 uppercase tracking-wider"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-[#7C3AED] font-semibold hover:underline"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3.5 pr-12 rounded-xl border text-gray-800 text-[15px] outline-none transition-all duration-200 placeholder:text-gray-300 ${
                    fieldErrors.password
                      ? "border-red-300 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                      : "border-gray-200 focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10"
                  }`}
                  style={{ fontFamily: "var(--font-inter)" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors bg-transparent border-none cursor-pointer p-0"
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="3"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {fieldErrors.password && (
                <p
                  className="text-red-500 text-xs mt-1.5"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {fieldErrors.password}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex items-center justify-center gap-2 text-white font-bold text-base py-4 rounded-xl transition-all duration-200 border-none cursor-pointer mt-2 ${
                isLoading
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-linear-to-r from-[#7C3AED] to-[#9D5CF6] shadow-lg shadow-purple-300/40 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-purple-300/50"
              }`}
              style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeDasharray="32"
                      strokeDashoffset="12"
                    />
                  </svg>
                  Logging you in...
                </>
              ) : (
                <>
                  Log In to KollectPay
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12h14M12 5l7 7-7 7"
                      stroke="#84CC16"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
