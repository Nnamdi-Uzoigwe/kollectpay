export default function FeaturesSection() {
  const mainFeatures = [
    {
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.01 1.17 2 2 0 012 .01h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: "Automated SMS Reminders",
      description:
        "Send professional payment reminders directly to your debtor's phone number — no smartphone required on their end. Works on every Nigerian network.",
      tag: "Core Feature",
      tagColor: "bg-[#7C3AED]/10 text-[#7C3AED] border-[#7C3AED]/20",
      iconBg: "bg-[#7C3AED]/10 text-[#7C3AED]",
    },
    {
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: "WhatsApp Reminders",
      description:
        "Reach debtors on Nigeria's most-used messaging platform. Messages go out under your business name with a professional, customisable template.",
      tag: "Most Effective",
      tagColor: "bg-green-50 text-green-600 border-green-200",
      iconBg: "bg-green-50 text-green-600",
    },
    {
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      title: "Custom Reminder Schedules",
      description:
        "Set reminders to fire daily, every 2 days, weekly — whatever pressure fits the situation. Escalate tone automatically as the due date passes.",
      tag: "Flexible",
      tagColor: "bg-orange-50 text-orange-500 border-orange-200",
      iconBg: "bg-orange-50 text-orange-500",
    },
    {
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
          <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: "Debtor Dashboard",
      description:
        "See all your debtors in one clean list. Filter by status — Pending, Overdue, or Paid. Know exactly who owes what and for how long.",
      tag: "Always Organised",
      tagColor: "bg-blue-50 text-blue-500 border-blue-200",
      iconBg: "bg-blue-50 text-blue-500",
    },
    {
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: "Message Delivery Logs",
      description:
        "See every message ever sent — to who, on what channel, at what time, and whether it was delivered. Full proof that you followed up.",
      tag: "Full Audit Trail",
      tagColor: "bg-[#84CC16]/10 text-[#65A30D] border-[#84CC16]/25",
      iconBg: "bg-[#84CC16]/10 text-[#65A30D]",
    },
    {
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          <path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: "Plan Quota Controls",
      description:
        "Your plan defines how many messages you send per week. KollectPay tracks your usage in real time and alerts you before you hit your limit.",
      tag: "Transparent",
      tagColor: "bg-purple-50 text-purple-500 border-purple-200",
      iconBg: "bg-purple-50 text-purple-500",
    },
  ];

  const miniFeatures = [
    "One-tap Mark as Paid",
    "Business name on all messages",
    "Naira-based pricing",
    "Paystack subscription billing",
    "Works on all Nigerian networks",
    "No app install needed for debtors",
    "Secure & encrypted data",
    "Mobile-friendly dashboard",
  ];

  return (
    <section id="features" className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#7C3AED]/8 border border-[#7C3AED]/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#7C3AED]" />
            <span
              className="text-[#7C3AED] text-sm font-semibold"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Everything you need
            </span>
          </div>

          <h2
            className="text-[40px] lg:text-[48px] font-extrabold leading-[1.1] tracking-[-1.5px] text-gray-900 mb-5"
            style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
          >
            Built for how Nigerian{" "}
            <span className="text-[#7C3AED]">businesses actually work.</span>
          </h2>

          <p
            className="text-lg text-gray-500 leading-relaxed"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Every feature was designed with one goal — getting your money back into your hands, faster.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {mainFeatures.map((feature, i) => (
            <div
              key={i}
              className="group bg-white border border-gray-100 hover:border-[#7C3AED]/20 rounded-3xl p-7 hover:shadow-xl hover:shadow-purple-100/50 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Icon */}
              <div className={`w-13 h-13 rounded-2xl ${feature.iconBg} flex items-center justify-center mb-5`}>
                {feature.icon}
              </div>

              {/* Tag */}
              <span
                className={`inline-block text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${feature.tagColor} mb-4`}
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {feature.tag}
              </span>

              {/* Title */}
              <h3
                className="text-gray-900 font-bold text-lg mb-3 leading-tight group-hover:text-[#7C3AED] transition-colors duration-200"
                style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
              >
                {feature.title}
              </h3>

              {/* Description */}
              <p
                className="text-gray-500 text-[15px] leading-relaxed"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Mini Features Strip */}
        <div className="bg-white border border-gray-100 rounded-3xl p-8">
          <p
            className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 text-center"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Plus everything else you'd expect
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {miniFeatures.map((feature, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#84CC16]/15 flex items-center justify-center shrink-0">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17l-5-5" stroke="#65A30D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span
                  className="text-sm text-gray-600 font-medium"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}