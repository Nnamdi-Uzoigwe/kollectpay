export default function Testimonials() {
  const testimonials = [
    {
      name: "Chidinma Okonkwo",
      business: "Fashion & Clothing, Lagos",
      avatar: "CO",
      avatarBg: "bg-pink-100 text-pink-600",
      plan: "Growth Plan",
      recovered: "₦340,000",
      quote:
        "I was owed money by over 15 customers and I was too embarrassed to keep calling them. KollectPay sends the messages for me and nobody even knows it's automated. Three of them paid within 48 hours of the first reminder.",
      stars: 5,
    },
    {
      name: "Emeka Nwachukwu",
      business: "Building Materials, Onitsha",
      avatar: "EN",
      avatarBg: "bg-blue-100 text-blue-600",
      plan: "Pro Plan",
      recovered: "₦1.2M",
      quote:
        "In this business people collect materials on credit and disappear. Since I started using KollectPay my outstanding balance has dropped by almost 60%. The WhatsApp reminders especially — people respond faster to those.",
      stars: 5,
    },
    {
      name: "Fatima Aliyu",
      business: "Catering & Events, Abuja",
      avatar: "FA",
      avatarBg: "bg-amber-100 text-amber-600",
      plan: "Starter Plan",
      recovered: "₦185,000",
      quote:
        "I almost didn't subscribe because ₦5,000 felt like too much. Then I recovered ₦85,000 in the first week alone. I've already upgraded to Growth. Best investment I've made for my business this year.",
      stars: 5,
    },
    {
      name: "Tunde Adeyemi",
      business: "Auto Parts, Ibadan",
      avatar: "TA",
      avatarBg: "bg-green-100 text-green-600",
      plan: "Growth Plan",
      recovered: "₦620,000",
      quote:
        "My customers know my voice now so they don't pick up when I call. But they can't ignore the SMS messages. KollectPay sends them at the right time and the tone escalates automatically. Very professional.",
      stars: 5,
    },
    {
      name: "Ngozi Eze",
      business: "Private School, Enugu",
      avatar: "NE",
      avatarBg: "bg-purple-100 text-purple-600",
      plan: "Pro Plan",
      recovered: "₦2.1M",
      quote:
        "School fees collection used to take our admin staff days of manual follow-up every term. Now KollectPay handles all of it automatically. Parents pay faster and our staff focus on other things.",
      stars: 5,
    },
    {
      name: "Babatunde Olatunji",
      business: "Logistics & Haulage, Kano",
      avatar: "BO",
      avatarBg: "bg-orange-100 text-orange-600",
      plan: "Growth Plan",
      recovered: "₦890,000",
      quote:
        "The message log feature saved me in a dispute once. A customer claimed I never reminded them — I showed them the delivery receipts from KollectPay. They paid immediately. That alone is worth the subscription.",
      stars: 5,
    },
  ];

  return (
    <section className="py-24 bg-gray-50 overflow-hidden relative">

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-125 h-125 bg-[#7C3AED]/4 blur-3xl rounded-full" />
        <div className="absolute bottom-0 left-0 w-100 h-100 bg-[#84CC16]/5 blur-3xl rounded-full" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#84CC16]/10 border border-[#84CC16]/25 rounded-full px-4 py-1.5 mb-6">
            <span className="text-sm">⭐</span>
            <span
              className="text-[#65A30D] text-sm font-semibold"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Real results from real businesses
            </span>
          </div>

          <h2
            className="text-[40px] lg:text-[48px] font-extrabold leading-[1.1] tracking-[-1.5px] text-gray-900 mb-5"
            style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
          >
            They stopped chasing.{" "}
            <span className="text-[#7C3AED]">They started collecting.</span>
          </h2>

          <p
            className="text-lg text-gray-500 leading-relaxed"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Over ₦2.4 billion recovered by Nigerian businesses using KollectPay.
          </p>
        </div>

        {/* Testimonials Grid — Masonry-style */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="break-inside-avoid bg-white border border-gray-100 hover:border-[#7C3AED]/20 rounded-3xl p-7 hover:shadow-xl hover:shadow-purple-100/50 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.stars }).map((_, s) => (
                  <svg key={s} width="16" height="16" viewBox="0 0 24 24" fill="#F59E0B">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p
                className="text-gray-600 text-[15px] leading-relaxed mb-6 relative"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <span className="text-[#7C3AED]/20 text-5xl font-serif absolute -top-2 -left-1 leading-none select-none">
                  "
                </span>
                <span className="relative z-10 pl-4">{t.quote}</span>
              </p>

              {/* Recovered amount */}
              <div className="flex items-center gap-2 mb-5 bg-[#84CC16]/8 border border-[#84CC16]/20 rounded-xl px-4 py-2.5">
                <span className="text-base">💰</span>
                <span
                  className="text-[#65A30D] text-sm font-bold"
                  style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                >
                  {t.recovered} recovered
                </span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-full ${t.avatarBg} flex items-center justify-center font-bold text-sm shrink-0`} style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}>
                  {t.avatar}
                </div>
                <div>
                  <p
                    className="text-gray-900 font-bold text-sm"
                    style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="text-gray-400 text-xs"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {t.business}
                  </p>
                </div>
                <div className="ml-auto">
                  <span
                    className="text-[11px] font-semibold text-[#7C3AED] bg-[#7C3AED]/8 border border-[#7C3AED]/15 px-2.5 py-1 rounded-full whitespace-nowrap"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {t.plan}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom aggregate stat */}
        <div className="mt-16 bg-[#0F0A1E] rounded-3xl p-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "₦2.4B+", label: "Total Recovered" },
              { value: "12,000+", label: "Active Businesses" },
              { value: "98%", label: "Delivery Rate" },
              { value: "4.9 / 5", label: "Average Rating" },
            ].map((stat, i) => (
              <div key={i}>
                <div
                  className="text-[36px] font-extrabold text-white tracking-tight leading-none mb-2"
                  style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-white/40 text-sm"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}