"use client";

import Link from "next/link";

export default function Hero() {
  const stats = [
    { value: "₦2.4B+", label: "Recovered for businesses" },
    { value: "12,000+", label: "Active business owners" },
    { value: "98%", label: "Message delivery rate" },
  ];

  return (
    <section className="relative min-h-screen bg-white overflow-hidden flex items-center">

      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large purple blob top right */}
        <div className="absolute -top-40 -right-40 w-175 h-175 rounded-full bg-[#7C3AED]/6 blur-3xl" />
        {/* Lime accent bottom left */}
        <div className="absolute -bottom-32 -left-32 w-125 h-125 rounded-full bg-[#84CC16]/8 blur-3xl" />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(#7C3AED 1px, transparent 1px), linear-gradient(to right, #7C3AED 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 pt-32 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT — Copy */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#7C3AED]/8 border border-[#7C3AED]/20 rounded-full px-4 py-1.5 mb-8">
              <span className="w-2 h-2 rounded-full bg-[#84CC16] animate-pulse shadow-[0_0_6px_rgba(132,204,22,0.7)]" />
              <span
                className="text-[#7C3AED] text-sm font-semibold"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Trusted by 12,000+ Nigerian businesses
              </span>
            </div>

            {/* Headline */}
            <h1
              className="text-[52px] lg:text-[62px] font-extrabold leading-[1.08] tracking-[-2px] text-gray-900 mb-6"
              style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
            >
              Stop Chasing{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-[#7C3AED]">Debtors.</span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 9 C60 3, 140 3, 298 9"
                    stroke="#84CC16"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <br />
              Let KollectPay{" "}
              <span className="text-[#84CC16]">Do It.</span>
            </h1>

            {/* Subheadline */}
            <p
              className="text-lg text-gray-500 leading-relaxed mb-10 max-w-120"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Automatically send SMS and WhatsApp payment reminders to your debtors — on a schedule — until they pay.
              No more awkward follow-up calls.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-14">
              <Link
                href="/signup"
                className="flex items-center justify-center gap-2 text-white font-bold text-base px-7 py-4 rounded-xl bg-linear-to-r from-[#7C3AED] to-[#9D5CF6] shadow-xl shadow-purple-300/40 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-300/50 transition-all duration-200 no-underline"
                style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
              >
                Start For Free
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="#84CC16" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href="#try-it-free"
                className="flex items-center justify-center gap-2 text-gray-700 font-semibold text-base px-7 py-4 rounded-xl border-2 border-gray-200 hover:border-[#7C3AED]/40 hover:bg-purple-50 hover:text-[#7C3AED] transition-all duration-200 no-underline"
                style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.01 1.17 2 2 0 012 .01h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Try a Free Test Message
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div
                    className="text-2xl font-extrabold text-gray-900 tracking-tight"
                    style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-sm text-gray-400 mt-0.5"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Animated SVG Dashboard Mockup */}
          <div className="relative hidden lg:block">

            {/* Glow behind card */}
            <div className="absolute inset-8 bg-[#7C3AED]/15 blur-3xl rounded-3xl" />

            {/* Main dashboard card */}
            <div className="relative bg-white rounded-3xl shadow-2xl shadow-purple-200/50 border border-purple-100/60 overflow-hidden">

              {/* Card top bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-lg px-3 py-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#84CC16]" />
                  <span className="text-xs text-gray-400" style={{ fontFamily: "var(--font-inter)" }}>
                    app.kollectpay.com
                  </span>
                </div>
                <div className="w-16" />
              </div>

              <div className="p-6">
                {/* Dashboard header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-xs text-gray-400 mb-1" style={{ fontFamily: "var(--font-inter)" }}>Good morning,</p>
                    <h3 className="text-base font-bold text-gray-800" style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}>
                      Chidi's Electronics 👋
                    </h3>
                  </div>
                  <div className="bg-[#7C3AED]/10 text-[#7C3AED] text-xs font-semibold px-3 py-1.5 rounded-full" style={{ fontFamily: "var(--font-inter)" }}>
                    Growth Plan
                  </div>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[
                    { label: "Total Owed", value: "₦847,500", color: "text-[#7C3AED]", bg: "bg-[#7C3AED]/8" },
                    { label: "Debtors", value: "14", color: "text-orange-500", bg: "bg-orange-50" },
                    { label: "Paid This Month", value: "₦320k", color: "text-[#84CC16]", bg: "bg-lime-50" },
                  ].map((card) => (
                    <div key={card.label} className={`${card.bg} rounded-xl p-3`}>
                      <p className="text-[10px] text-gray-400 mb-1" style={{ fontFamily: "var(--font-inter)" }}>{card.label}</p>
                      <p className={`text-sm font-bold ${card.color}`} style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}>{card.value}</p>
                    </div>
                  ))}
                </div>

                {/* Debtor List */}
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3" style={{ fontFamily: "var(--font-inter)" }}>
                    Recent Debtors
                  </p>
                  <div className="flex flex-col gap-2">
                    {[
                      { name: "Emeka Okafor", amount: "₦150,000", status: "Overdue", statusColor: "bg-red-100 text-red-500", avatar: "EO" },
                      { name: "Fatima Bello", amount: "₦85,000", status: "Reminded", statusColor: "bg-yellow-100 text-yellow-600", avatar: "FB" },
                      { name: "Tunde Adeyemi", amount: "₦42,500", status: "Paid ✓", statusColor: "bg-lime-100 text-lime-600", avatar: "TA" },
                    ].map((debtor) => (
                      <div key={debtor.name} className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-[#7C3AED]/15 flex items-center justify-center text-[10px] font-bold text-[#7C3AED]" style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}>
                            {debtor.avatar}
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-gray-700" style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}>{debtor.name}</p>
                            <p className="text-[10px] text-gray-400" style={{ fontFamily: "var(--font-inter)" }}>{debtor.amount}</p>
                          </div>
                        </div>
                        <span className={`text-[10px] font-semibold px-2 py-1 rounded-full ${debtor.statusColor}`} style={{ fontFamily: "var(--font-inter)" }}>
                          {debtor.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating SMS notification */}
            <div className="absolute -right-6 top-16 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 w-50 animate-bounce" style={{ animationDuration: "3s" }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.01 1.17 2 2 0 012 .01h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </div>
                <span className="text-xs font-bold text-gray-700" style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}>SMS Sent ✓</span>
              </div>
              <p className="text-[10px] text-gray-400 leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                "Hi Emeka, this is a reminder that ₦150,000 is due..."
              </p>
            </div>

            {/* Floating payment received badge */}
            <div className="absolute -left-6 bottom-20 bg-[#0F0A1E] rounded-2xl shadow-xl p-4 w-45" style={{ animation: "floatUp 4s ease-in-out infinite" }}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">💰</span>
                <span className="text-xs font-bold text-white" style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}>Payment Received!</span>
              </div>
              <p className="text-[#84CC16] text-sm font-extrabold" style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}>+₦85,000</p>
              <p className="text-white/40 text-[10px]" style={{ fontFamily: "var(--font-inter)" }}>Fatima Bello just paid</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes floatUp {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  );
}