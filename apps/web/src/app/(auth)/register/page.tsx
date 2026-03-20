"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/shared/lib/axios";

interface FormData {
  businessName: string;
  email: string;
  phone: string;
  password: string;
}

interface FieldError {
  businessName?: string;
  email?: string;
  phone?: string;
  password?: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    businessName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [fieldErrors, setFieldErrors] = useState<FieldError>({});
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validate = (): boolean => {
    const errors: FieldError = {};
    if (!formData.businessName.trim() || formData.businessName.length < 2)
      errors.businessName = "Enter your business name";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Enter a valid email address";
    if (!formData.phone || formData.phone.length < 10)
      errors.phone = "Enter a valid phone number";
    if (!formData.password || formData.password.length < 8)
      errors.password = "Password must be at least 8 characters";
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
      const { data } = await api.post("/api/auth/signup", formData);
      localStorage.setItem("kollectpay_token", data.data.token);
      localStorage.setItem("kollectpay_user", JSON.stringify(data.data.user));
      router.push("/dashboard");
    } catch (error: any) {
      setServerError(
        error.response?.data?.message || "Something went wrong. Please try again."
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
              backgroundImage: `radial-linear(circle, #ffffff 1px, transparent 1px)`,
              backgroundSize: "36px 36px",
            }}
          />
        </div>

        {/* Logo */}
        <div className="relative">
          <Link href="/" className="flex items-center gap-2.5 no-underline">
            <div className="w-9 h-9 rounded-xl bg-linear-to-br from-[#7C3AED] to-[#9D5CF6] flex items-center justify-center shadow-lg shadow-purple-500/40">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#84CC16" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white" style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}>
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
            Your money is
            <br />
            waiting to be{" "}
            <span className="text-[#84CC16]">collected.</span>
          </h2>

          <p
            className="text-white/50 text-base leading-relaxed mb-10"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Join 12,000+ Nigerian business owners who've stopped chasing debtors manually.
          </p>

          {/* Stats */}
          <div className="flex flex-col gap-4">
            {[
              { value: "₦2.4B+", label: "Recovered by our users" },
              { value: "98%", label: "SMS & WhatsApp delivery rate" },
              { value: "< 5 min", label: "To set up your first reminder" },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-4 bg-white/5 border border-white/8 rounded-2xl px-5 py-4">
                <span
                  className="text-[#84CC16] font-extrabold text-lg min-w-20"
                  style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                >
                  {stat.value}
                </span>
                <span
                  className="text-white/50 text-sm"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom quote */}
        <div className="relative bg-white/5 border border-white/10 rounded-2xl p-5">
          <p
            className="text-white/70 text-sm leading-relaxed mb-3 italic"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            "I recovered ₦340,000 in the first two weeks. The WhatsApp reminders work like magic."
          </p>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#7C3AED]/30 flex items-center justify-center text-xs font-bold text-[#7C3AED]" style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}>
              CO
            </div>
            <div>
              <p className="text-white text-xs font-semibold" style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}>Chidinma Okonkwo</p>
              <p className="text-white/40 text-[11px]" style={{ fontFamily: "var(--font-inter)" }}>Fashion & Clothing, Lagos</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT — Signup Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-white">
        <div className="w-full max-w-110">

          {/* Mobile logo */}
          <div className="flex justify-center mb-8 lg:hidden">
            <Link href="/" className="flex items-center gap-2.5 no-underline">
              <div className="w-9 h-9 rounded-xl bg-linear-to-br from-[#7C3AED] to-[#9D5CF6] flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#84CC16" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-[#7C3AED]" style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}>
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
              Create your account
            </h1>
            <p
              className="text-gray-500 text-[15px]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Already have an account?{" "}
              <Link href="/login" className="text-[#7C3AED] font-semibold hover:underline">
                Log in
              </Link>
            </p>
          </div>

          {/* Server error */}
          {serverError && (
            <div className="flex items-center gap-3 bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-6">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
                <circle cx="12" cy="12" r="10" stroke="#EF4444" strokeWidth="2" />
                <path d="M12 8v4M12 16h.01" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <p className="text-red-600 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
                {serverError}
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Business Name */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-inter)" }}>
                Business Name
              </label>
              <input
                type="text"
                name="businessName"
                placeholder="e.g. Chidi Electronics"
                value={formData.businessName}
                onChange={handleChange}
                className={`w-full px-4 py-3.5 rounded-xl border text-gray-800 text-[15px] outline-none transition-all duration-200 placeholder:text-gray-300 ${
                  fieldErrors.businessName
                    ? "border-red-300 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                    : "border-gray-200 focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10"
                }`}
                style={{ fontFamily: "var(--font-inter)" }}
              />
              {fieldErrors.businessName && (
                <p className="text-red-500 text-xs mt-1.5" style={{ fontFamily: "var(--font-inter)" }}>
                  {fieldErrors.businessName}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-inter)" }}>
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
                <p className="text-red-500 text-xs mt-1.5" style={{ fontFamily: "var(--font-inter)" }}>
                  {fieldErrors.email}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-inter)" }}>
                Phone Number
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
                      ? "border-red-300 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-100"
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

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-inter)" }}>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Minimum 8 characters"
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
              {fieldErrors.password && (
                <p className="text-red-500 text-xs mt-1.5" style={{ fontFamily: "var(--font-inter)" }}>
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
                  <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeDashoffset="12" />
                  </svg>
                  Creating your account...
                </>
              ) : (
                <>
                  Create My Account
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="#84CC16" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </>
              )}
            </button>

            {/* Terms */}
            <p
              className="text-center text-gray-400 text-xs leading-relaxed"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              By creating an account, you agree to our{" "}
              <Link href="/terms" className="text-[#7C3AED] hover:underline">Terms of Service</Link>
              {" "}and{" "}
              <Link href="/privacy" className="text-[#7C3AED] hover:underline">Privacy Policy</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}