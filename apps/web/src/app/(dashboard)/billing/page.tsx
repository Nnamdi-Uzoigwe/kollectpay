"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import api from "@/shared/lib/axios";

interface Subscription {
  id: string;
  plan: string;
  status: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  paystackSubCode: string;
}

interface BillingData {
  subscription: Subscription | null;
  currentPlan: "STARTER" | "GROWTH" | "PRO";
}

const plans = [
  {
    name: "STARTER" as const,
    label: "Starter",
    monthlyPrice: 5000,
    description: "Perfect for small businesses just getting started.",
    features: [
      { text: "Up to 20 debtors", included: true },
      { text: "SMS reminders only", included: true },
      { text: "5 messages per debtor/week", included: true },
      { text: "Basic message templates", included: true },
      { text: "Message delivery logs", included: true },
      { text: "WhatsApp reminders", included: false },
      { text: "Custom message templates", included: false },
      { text: "Priority support", included: false },
    ],
    color: "border-gray-200",
    badge: null,
    buttonStyle: "border-2 border-[#7C3AED] text-[#7C3AED] hover:bg-[#7C3AED] hover:text-white",
  },
  {
    name: "GROWTH" as const,
    label: "Growth",
    monthlyPrice: 12000,
    description: "For growing businesses that need more reach.",
    features: [
      { text: "Up to 100 debtors", included: true },
      { text: "SMS reminders", included: true },
      { text: "15 messages per debtor/week", included: true },
      { text: "Custom message templates", included: true },
      { text: "Message delivery logs", included: true },
      { text: "WhatsApp reminders", included: true },
      { text: "Reminder tone escalation", included: true },
      { text: "Priority support", included: false },
    ],
    color: "border-[#7C3AED]",
    badge: "Most Popular",
    buttonStyle: "bg-gradient-to-r from-[#7C3AED] to-[#9D5CF6] text-white shadow-lg shadow-purple-300/40",
  },
  {
    name: "PRO" as const,
    label: "Pro",
    monthlyPrice: 25000,
    description: "For established businesses managing large volumes.",
    features: [
      { text: "Unlimited debtors", included: true },
      { text: "SMS reminders", included: true },
      { text: "Unlimited messages/week", included: true },
      { text: "Custom message templates", included: true },
      { text: "Message delivery logs", included: true },
      { text: "WhatsApp reminders", included: true },
      { text: "Reminder tone escalation", included: true },
      { text: "Priority support", included: true },
    ],
    color: "border-gray-200",
    badge: null,
    buttonStyle: "border-2 border-[#7C3AED] text-[#7C3AED] hover:bg-[#7C3AED] hover:text-white",
  },
];

const planLimits = {
  STARTER: { debtors: 20, messages: 100 },
  GROWTH: { debtors: 100, messages: 500 },
  PRO: { debtors: Infinity, messages: Infinity },
};

export default function BillingPage() {
  const router = useRouter();
  const [billingData, setBillingData] = useState<BillingData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [processingPlan, setProcessingPlan] = useState<string | null>(null);
  const [error, setError] = useState("");

  const fetchBilling = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await api.get("/api/billing/subscription");
      setBillingData(data.data);
    } catch (err: any) {
      setError("Failed to load billing info.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBilling();
  }, [fetchBilling]);

  const handleUpgrade = async (planName: string) => {
    if (planName === billingData?.currentPlan) return;
    setProcessingPlan(planName);
    setError("");

    try {
      const { data } = await api.post("/api/billing/initialize", {
        plan: planName,
      });
      // Redirect to Paystack
      window.location.href = data.data.authorizationUrl;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to initialize payment.");
      setProcessingPlan(null);
    }
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-NG", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const formatAmount = (amount: number) =>
    `₦${amount.toLocaleString("en-NG")}`;

  const currentPlan = billingData?.currentPlan || "STARTER";
  const subscription = billingData?.subscription;
  const limits = planLimits[currentPlan];

  return (
    <div className="max-w-6xl mx-auto">

      {/* Current plan card */}
      <div className="bg-[#0F0A1E] rounded-3xl p-8 mb-8 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-100 h-75 bg-[#7C3AED]/15 blur-3xl rounded-full" />
          <div className="absolute bottom-0 left-0 w-75 h-50 bg-[#84CC16]/8 blur-3xl rounded-full" />
        </div>

        <div className="relative grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-[#84CC16] animate-pulse" />
              <span
                className="text-white/50 text-sm font-semibold"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Current Plan
              </span>
            </div>
            <h2
              className="text-4xl font-extrabold text-white tracking-tight mb-2"
              style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
            >
              {isLoading ? "..." : currentPlan.charAt(0) + currentPlan.slice(1).toLowerCase()} Plan
            </h2>
            <p
              className="text-white/40 text-sm mb-6"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {subscription
                ? `Renews on ${formatDate(subscription.currentPeriodEnd)}`
                : "No active subscription"}
            </p>

            {/* Limits */}
            <div className="flex gap-6">
              <div>
                <p
                  className="text-[#84CC16] text-2xl font-extrabold"
                  style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                >
                  {limits.debtors === Infinity ? "∞" : limits.debtors}
                </p>
                <p
                  className="text-white/40 text-xs"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Max Debtors
                </p>
              </div>
              <div className="w-px bg-white/10" />
              <div>
                <p
                  className="text-[#84CC16] text-2xl font-extrabold"
                  style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                >
                  {limits.messages === Infinity ? "∞" : limits.messages}
                </p>
                <p
                  className="text-white/40 text-xs"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Messages/Week
                </p>
              </div>
            </div>
          </div>

          {/* Subscription details */}
          {subscription && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <p
                className="text-white/40 text-xs font-bold uppercase tracking-wider mb-4"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Subscription Details
              </p>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Status", value: subscription.status, valueClass: "text-[#84CC16]" },
                  { label: "Plan", value: subscription.plan, valueClass: "text-white" },
                  { label: "Period Start", value: formatDate(subscription.currentPeriodStart), valueClass: "text-white" },
                  { label: "Period End", value: formatDate(subscription.currentPeriodEnd), valueClass: "text-white" },
                  { label: "Monthly Amount", value: formatAmount(plans.find(p => p.name === currentPlan)?.monthlyPrice || 0), valueClass: "text-[#84CC16] font-bold" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span
                      className="text-white/40 text-sm"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {item.label}
                    </span>
                    <span
                      className={`text-sm font-semibold ${item.valueClass}`}
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-6">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
            <circle cx="12" cy="12" r="10" stroke="#EF4444" strokeWidth="2" />
            <path d="M12 8v4M12 16h.01" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <p className="text-red-600 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
            {error}
          </p>
        </div>
      )}

      {/* Plans header */}
      <div className="mb-6">
        <h3
          className="text-xl font-extrabold text-gray-900 mb-1"
          style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
        >
          {currentPlan === "PRO" ? "You're on our best plan!" : "Upgrade your plan"}
        </h3>
        <p
          className="text-gray-400 text-sm"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {currentPlan === "PRO"
            ? "You have access to all features. Keep collecting!"
            : "Unlock more debtors, more messages, and WhatsApp reminders."}
        </p>
      </div>

      {/* Plans grid */}
      <div className="grid md:grid-cols-3 gap-5">
        {plans.map((plan) => {
          const isCurrent = plan.name === currentPlan;
          const isDowngrade =
            (currentPlan === "PRO" && plan.name !== "PRO") ||
            (currentPlan === "GROWTH" && plan.name === "STARTER");

          return (
            <div
              key={plan.name}
              className={`relative bg-white border-2 ${plan.color} rounded-3xl p-7 flex flex-col transition-all duration-200 ${
                isCurrent ? "shadow-lg shadow-purple-100" : "hover:-translate-y-1 hover:shadow-md"
              }`}
            >
              {/* Current badge */}
              {isCurrent && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <div
                    className="bg-[#84CC16] text-[#0F0A1E] text-[11px] font-bold px-4 py-1 rounded-full whitespace-nowrap"
                    style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                  >
                    ✓ Current Plan
                  </div>
                </div>
              )}

              {/* Popular badge */}
              {plan.badge && !isCurrent && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <div
                    className="bg-linear-to-r from-[#7C3AED] to-[#9D5CF6] text-white text-[11px] font-bold px-4 py-1 rounded-full whitespace-nowrap shadow-lg shadow-purple-300/40"
                    style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                  >
                    ⭐ {plan.badge}
                  </div>
                </div>
              )}

              {/* Plan info */}
              <div className="mb-6">
                <h4
                  className="text-gray-900 font-extrabold text-lg mb-1"
                  style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                >
                  {plan.label}
                </h4>
                <p
                  className="text-gray-400 text-sm"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-7">
                <div className="flex items-end gap-1">
                  <span
                    className="text-[38px] font-extrabold text-gray-900 leading-none tracking-tight"
                    style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                  >
                    {formatAmount(plan.monthlyPrice)}
                  </span>
                </div>
                <p
                  className="text-gray-400 text-xs mt-1"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  per month
                </p>
              </div>

              {/* Features */}
              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-2.5">
                    {feature.included ? (
                      <div className="w-4 h-4 rounded-full bg-[#84CC16]/15 flex items-center justify-center shrink-0">
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none">
                          <path d="M20 6L9 17l-5-5" stroke="#65A30D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    ) : (
                      <div className="w-4 h-4 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                        <svg width="7" height="7" viewBox="0 0 24 24" fill="none">
                          <path d="M18 6L6 18M6 6l12 12" stroke="#D1D5DB" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                      </div>
                    )}
                    <span
                      className={`text-sm ${feature.included ? "text-gray-600" : "text-gray-300"}`}
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={() => handleUpgrade(plan.name)}
                disabled={isCurrent || isDowngrade || processingPlan === plan.name}
                className={`w-full flex items-center justify-center gap-2 font-bold text-[15px] px-6 py-3.5 rounded-xl transition-all duration-200 border-none cursor-pointer ${
                  isCurrent
                    ? "bg-gray-100 text-gray-400 cursor-default"
                    : isDowngrade
                    ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                    : processingPlan === plan.name
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : plan.buttonStyle
                }`}
                style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
              >
                {processingPlan === plan.name ? (
                  <>
                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeDashoffset="12" />
                    </svg>
                    Processing...
                  </>
                ) : isCurrent ? (
                  "Current Plan"
                ) : isDowngrade ? (
                  "Contact Support"
                ) : (
                  <>
                    Upgrade to {plan.label}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Bottom note */}
      <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
        {[
          { icon: "🔒", text: "Secured by Paystack" },
          { icon: "❌", text: "Cancel anytime" },
          { icon: "🇳🇬", text: "Naira billing only" },
          { icon: "💬", text: "Support via WhatsApp" },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-sm">{item.icon}</span>
            <span
              className="text-gray-400 text-sm"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {item.text}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}