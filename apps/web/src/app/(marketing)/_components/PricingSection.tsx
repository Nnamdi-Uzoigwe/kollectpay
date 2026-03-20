"use client";

import { useState } from "react";
import Link from "next/link";

export default function PricingSection() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  const plans = [
    {
      name: "Starter",
      monthlyPrice: 5000,
      annualPrice: 4000,
      description: "Perfect for small businesses just getting started with debt recovery.",
      color: "border-gray-200",
      badge: null,
      iconBg: "bg-gray-100",
      iconColor: "text-gray-500",
      buttonStyle: "border-2 border-[#7C3AED] text-[#7C3AED] hover:bg-[#7C3AED] hover:text-white",
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
    },
    {
      name: "Growth",
      monthlyPrice: 12000,
      annualPrice: 9500,
      description: "For growing businesses that need more reach and WhatsApp delivery.",
      color: "border-[#7C3AED]",
      badge: "Most Popular",
      iconBg: "bg-[#7C3AED]/10",
      iconColor: "text-[#7C3AED]",
      buttonStyle: "bg-gradient-to-r from-[#7C3AED] to-[#9D5CF6] text-white shadow-lg shadow-purple-300/40 hover:-translate-y-0.5 hover:shadow-xl",
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
    },
    {
      name: "Pro",
      monthlyPrice: 25000,
      annualPrice: 20000,
      description: "For established businesses managing large volumes of outstanding debts.",
      color: "border-gray-200",
      badge: null,
      iconBg: "bg-[#84CC16]/10",
      iconColor: "text-[#65A30D]",
      buttonStyle: "border-2 border-[#7C3AED] text-[#7C3AED] hover:bg-[#7C3AED] hover:text-white",
      features: [
        { text: "Unlimited debtors", included: true },
        { text: "SMS reminders", included: true },
        { text: "Unlimited messages per week", included: true },
        { text: "Custom message templates", included: true },
        { text: "Message delivery logs", included: true },
        { text: "WhatsApp reminders", included: true },
        { text: "Reminder tone escalation", included: true },
        { text: "Priority support", included: true },
      ],
    },
  ];

  const formatPrice = (price: number) =>
    `₦${price.toLocaleString("en-NG")}`;

  return (
    <section id="pricing" className="py-24 bg-[#0F0A1E] overflow-hidden relative">

      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-225 h-100 bg-[#7C3AED]/10 blur-3xl rounded-full" />
        <div className="absolute bottom-0 left-0 w-100 h-100 bg-[#84CC16]/5 blur-3xl rounded-full" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#84CC16] animate-pulse" />
            <span
              className="text-white/60 text-sm font-semibold"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Simple, naira-based pricing
            </span>
          </div>

          <h2
            className="text-[40px] lg:text-[48px] font-extrabold leading-[1.1] tracking-[-1.5px] text-white mb-5"
            style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
          >
            Pay once. Recover{" "}
            <span className="text-[#84CC16]">many times over.</span>
          </h2>

          <p
            className="text-lg text-white/50 leading-relaxed mb-10"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            All plans billed in Naira. Cancel anytime. No hidden fees.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-white/5 border border-white/10 rounded-xl p-1 gap-1">
            {(["monthly", "annual"] as const).map((b) => (
              <button
                key={b}
                onClick={() => setBilling(b)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 border-none cursor-pointer capitalize ${
                  billing === b
                    ? "bg-white text-gray-900 shadow-sm"
                    : "bg-transparent text-white/50 hover:text-white"
                }`}
                style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
              >
                {b}
                {b === "annual" && (
                  <span className="bg-[#84CC16] text-[#0F0A1E] text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Save 20%
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative bg-white/5 border-2 ${plan.color} rounded-3xl p-8 flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                plan.badge ? "shadow-2xl shadow-purple-900/50" : ""
              }`}
            >
              {/* Popular badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-linear-to-r from-[#7C3AED] to-[#9D5CF6] text-white text-xs font-bold px-5 py-1.5 rounded-full shadow-lg shadow-purple-500/40 whitespace-nowrap" style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}>
                    ⭐ {plan.badge}
                  </div>
                </div>
              )}

              {/* Plan name & description */}
              <div className="mb-7">
                <h3
                  className="text-white font-extrabold text-xl mb-2"
                  style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                >
                  {plan.name}
                </h3>
                <p
                  className="text-white/40 text-sm leading-relaxed"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-8">
                <div className="flex items-end gap-1">
                  <span
                    className="text-[44px] font-extrabold text-white leading-none tracking-tight"
                    style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                  >
                    {formatPrice(
                      billing === "monthly" ? plan.monthlyPrice : plan.annualPrice
                    )}
                  </span>
                </div>
                <p
                  className="text-white/30 text-sm mt-1.5"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  per month{billing === "annual" ? ", billed annually" : ""}
                </p>
                {billing === "annual" && (
                  <p
                    className="text-[#84CC16] text-xs font-semibold mt-1"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    You save {formatPrice((plan.monthlyPrice - plan.annualPrice) * 12)} per year
                  </p>
                )}
              </div>

              {/* Features list */}
              <ul className="flex flex-col gap-3.5 mb-8 flex-1">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3">
                    {feature.included ? (
                      <div className="w-5 h-5 rounded-full bg-[#84CC16]/15 flex items-center justify-center shrink-0">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                          <path d="M20 6L9 17l-5-5" stroke="#65A30D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none">
                          <path d="M18 6L6 18M6 6l12 12" stroke="rgba(255,255,255,0.2)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    )}
                    <span
                      className={`text-sm ${feature.included ? "text-white/70" : "text-white/25"}`}
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link
                href="/signup"
                className={`w-full flex items-center justify-center gap-2 font-bold text-[15px] px-6 py-4 rounded-xl transition-all duration-200 no-underline ${plan.buttonStyle}`}
                style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
              >
                Get Started with {plan.name}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom reassurance */}
        <div className="flex flex-wrap items-center justify-center gap-8">
          {[
            { icon: "🔒", text: "Secured by Paystack" },
            { icon: "❌", text: "Cancel anytime" },
            { icon: "🇳🇬", text: "Naira billing only" },
            { icon: "💬", text: "Support via WhatsApp" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-lg">{item.icon}</span>
              <span
                className="text-white/40 text-sm font-medium"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {item.text}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}