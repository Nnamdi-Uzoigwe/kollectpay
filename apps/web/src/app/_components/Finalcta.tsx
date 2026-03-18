import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="py-24 bg-gray-50 overflow-hidden relative">

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/4 via-transparent to-[#84CC16]/4" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="relative bg-[#0F0A1E] rounded-[40px] overflow-hidden px-8 py-20 text-center">

          {/* Inner background effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#7C3AED]/20 blur-3xl rounded-full" />
            <div className="absolute bottom-0 left-1/4 w-[300px] h-[200px] bg-[#84CC16]/10 blur-3xl rounded-full" />
            <div className="absolute bottom-0 right-1/4 w-[300px] h-[200px] bg-[#7C3AED]/10 blur-3xl rounded-full" />
            {/* Dot grid */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
                backgroundSize: "36px 36px",
              }}
            />
          </div>

          {/* Content */}
          <div className="relative max-w-3xl mx-auto">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8">
              <span className="w-2 h-2 rounded-full bg-[#84CC16] animate-pulse shadow-[0_0_8px_rgba(132,204,22,0.6)]" />
              <span
                className="text-white/60 text-sm font-semibold"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Join 12,000+ Nigerian businesses
              </span>
            </div>

            {/* Headline */}
            <h2
              className="text-[44px] lg:text-[58px] font-extrabold leading-[1.06] tracking-[-2px] text-white mb-6"
              style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
            >
              Your money is out there.{" "}
              <span className="text-[#84CC16]">Go get it.</span>
            </h2>

            {/* Subtext */}
            <p
              className="text-lg text-white/50 leading-relaxed mb-10 max-w-xl mx-auto"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Stop losing sleep over unpaid debts. Start KollectPay today and let
              automation do the chasing — while you focus on running your business.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/signup"
                className="flex items-center justify-center gap-2 text-white font-bold text-base px-8 py-4 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#9D5CF6] shadow-xl shadow-purple-900/50 hover:-translate-y-1 hover:shadow-2xl transition-all duration-200 no-underline"
                style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
              >
                Start For Free Today
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="#84CC16" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href="#pricing"
                className="flex items-center justify-center gap-2 text-white/70 font-semibold text-base px-8 py-4 rounded-xl border border-white/10 hover:border-white/20 hover:text-white hover:bg-white/5 transition-all duration-200 no-underline"
                style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
              >
                View Pricing Plans
              </Link>
            </div>

            {/* Trust signals row */}
            <div className="flex flex-wrap items-center justify-center gap-6">
              {[
                { icon: "✅", text: "No credit card required" },
                { icon: "🔒", text: "Bank-grade security" },
                { icon: "❌", text: "Cancel anytime" },
                { icon: "🇳🇬", text: "Built for Nigeria" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-sm">{item.icon}</span>
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
        </div>
      </div>
    </section>
  );
}