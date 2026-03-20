export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: "Add Your Debtors",
      description:
        "Enter each debtor's name, phone number, amount owed, and due date. Takes less than 30 seconds per person. Import a list if you have many.",
      detail: "Supports CSV import for bulk upload",
      color: "from-[#7C3AED] to-[#9D5CF6]",
      lightColor: "bg-[#7C3AED]/8",
      textColor: "text-[#7C3AED]",
      borderColor: "border-[#7C3AED]/20",
    },
    {
      number: "02",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: "Set Your Reminder Schedule",
      description:
        "Choose how often KollectPay should send reminders — daily, every 2 days, weekly. Pick SMS, WhatsApp, or both. Customise your message tone.",
      detail: "Friendly, firm, or urgent — you choose",
      color: "from-[#84CC16] to-[#65A30D]",
      lightColor: "bg-[#84CC16]/10",
      textColor: "text-[#65A30D]",
      borderColor: "border-[#84CC16]/25",
    },
    {
      number: "03",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.01 1.17 2 2 0 012 .01h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: "KollectPay Sends Automatically",
      description:
        "Sit back. KollectPay sends reminders on your behalf — using your business name — at the exact intervals you set, every single day.",
      detail: "Runs 24/7, even while you sleep",
      color: "from-orange-400 to-orange-500",
      lightColor: "bg-orange-50",
      textColor: "text-orange-500",
      borderColor: "border-orange-200",
    },
    {
      number: "04",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: "Mark Paid & Track Everything",
      description:
        "When a debtor pays, mark them as paid in one tap. See your full message history, delivery status, and how much you've recovered over time.",
      detail: "Full audit trail for every debtor",
      color: "from-[#7C3AED] to-[#84CC16]",
      lightColor: "bg-linear-to-br from-[#7C3AED]/8 to-[#84CC16]/8",
      textColor: "text-[#7C3AED]",
      borderColor: "border-purple-100",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-[#0F0A1E] overflow-hidden relative">

      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-[#7C3AED]/10 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-100 h-100 bg-[#84CC16]/5 blur-3xl rounded-full" />
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#84CC16] animate-pulse" />
            <span
              className="text-white/60 text-sm font-semibold"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Simple 4-step process
            </span>
          </div>

          <h2
            className="text-[40px] lg:text-[48px] font-extrabold leading-[1.1] tracking-[-1.5px] text-white mb-5"
            style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
          >
            Up and running in{" "}
            <span className="text-[#84CC16]">under 5 minutes.</span>
          </h2>

          <p
            className="text-lg text-white/50 leading-relaxed"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            No technical knowledge needed. If you can send a WhatsApp message, you can use KollectPay.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">

          {/* Connecting line — desktop only */}
          <div className="absolute top-13 left-[12.5%] right-[12.5%] h-px bg-linear-to-r from-[#7C3AED]/30 via-[#84CC16]/30 to-[#7C3AED]/30 hidden lg:block" />

          {steps.map((step, i) => (
            <div
              key={i}
              className="relative group flex flex-col"
            >
              {/* Step card */}
              <div className={`relative bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/8 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex-1`}>

                {/* Number */}
                <span
                  className="absolute top-5 right-5 text-xs font-bold text-white/20"
                  style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                >
                  {step.number}
                </span>

                {/* Icon circle */}
                <div className={`w-14 h-14 rounded-2xl bg-linear-to-br ${step.color} flex items-center justify-center text-white mb-6 shadow-lg`}>
                  {step.icon}
                </div>

                {/* Title */}
                <h3
                  className="text-white font-bold text-lg mb-3 leading-tight"
                  style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p
                  className="text-white/50 text-sm leading-relaxed mb-5"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {step.description}
                </p>

                {/* Detail pill */}
                <div className={`inline-flex items-center gap-1.5 ${step.lightColor} border ${step.borderColor} rounded-full px-3 py-1`}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17l-5-5" stroke={step.textColor.replace("text-", "")} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span
                    className={`text-[11px] font-semibold ${step.textColor}`}
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {step.detail}
                  </span>
                </div>
              </div>

              {/* Arrow between steps — mobile only */}
              {i < steps.length - 1 && (
                <div className="flex justify-center py-3 lg:hidden">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5v14M5 12l7 7 7-7" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="flex flex-col items-center gap-4 mt-16">
          <p
            className="text-white/40 text-sm"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Join thousands of Nigerian business owners already using KollectPay
          </p>
          <a
            href="/signup"
            className="flex items-center gap-2 text-white font-bold text-base px-8 py-4 rounded-xl bg-linear-to-r from-[#7C3AED] to-[#9D5CF6] shadow-xl shadow-purple-900/40 hover:-translate-y-1 hover:shadow-2xl transition-all duration-200 no-underline"
            style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
          >
            Get Started Free — No Credit Card Needed
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="#84CC16" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}