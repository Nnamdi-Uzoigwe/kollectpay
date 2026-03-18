export default function TrustedBy() {
  const businesses = [
    { emoji: "👗", label: "Fashion & Clothing" },
    { emoji: "🍔", label: "Food & Catering" },
    { emoji: "🏗️", label: "Construction" },
    { emoji: "💊", label: "Pharmacy" },
    { emoji: "🚚", label: "Logistics" },
    { emoji: "📱", label: "Electronics" },
    { emoji: "🛒", label: "Supermarkets" },
    { emoji: "🏠", label: "Real Estate" },
    { emoji: "💈", label: "Salons & Spas" },
    { emoji: "📚", label: "Schools & Tutors" },
    { emoji: "🔧", label: "Auto Mechanics" },
    { emoji: "🖥️", label: "IT & Tech" },
  ];

  // Duplicate for seamless infinite scroll
  const doubled = [...businesses, ...businesses];

  return (
    <section className="py-16 bg-gray-50 border-y border-gray-100 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-10 text-center">
        <p
          className="text-sm font-semibold text-gray-400 uppercase tracking-widest"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Trusted by Nigerian businesses across every industry
        </p>
      </div>

      {/* Scrolling track */}
      <div className="relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-linear-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-linear-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

        {/* Scrolling row */}
        <div className="flex gap-4 w-max animate-scroll">
          {doubled.map((biz, i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-5 py-3.5 shadow-sm hover:border-[#7C3AED]/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-default whitespace-nowrap"
            >
              <span className="text-2xl">{biz.emoji}</span>
              <span
                className="text-sm font-semibold text-gray-700"
                style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
              >
                {biz.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Inline keyframes */}
      <style>{`
        @keyframes scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}