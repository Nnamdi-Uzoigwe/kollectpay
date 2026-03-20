import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0F0A1E] flex items-center justify-center px-6 relative overflow-hidden">

      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-[#7C3AED]/15 blur-3xl rounded-full" />
        <div className="absolute bottom-0 left-0 w-100 h-100 bg-[#84CC16]/5 blur-3xl rounded-full" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-linear(circle, #ffffff 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative text-center max-w-lg w-full">

        {/* Logo */}
        <Link href="/" className="inline-flex items-center gap-2.5 no-underline mb-12">
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

        {/* 404 number */}
        <div className="relative mb-6">
          <p
            className="text-[140px] font-extrabold leading-none tracking-tight text-white/5 select-none"
            style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
          >
            404
          </p>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-2xl bg-[#7C3AED]/20 border border-[#7C3AED]/30 flex items-center justify-center">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="8" stroke="#7C3AED" strokeWidth="2" />
                <path d="M21 21l-4.35-4.35" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
                <path d="M11 8v3M11 14h.01" stroke="#84CC16" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* Message */}
        <h1
          className="text-3xl font-extrabold text-white tracking-tight mb-3"
          style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
        >
          Page not found
        </h1>
        <p
          className="text-white/50 text-base leading-relaxed mb-10"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Looks like this page doesn't exist or has been moved. Let's get you back to collecting your money.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-2 text-white font-bold text-base px-7 py-3.5 rounded-xl bg-linear-to-r from-[#7C3AED] to-[#9D5CF6] shadow-xl shadow-purple-900/40 hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-200 no-underline"
            style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
          >
            Go to Dashboard
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="#84CC16" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 text-white/70 font-semibold text-base px-7 py-3.5 rounded-xl border border-white/10 hover:border-white/20 hover:text-white hover:bg-white/5 transition-all duration-200 no-underline"
            style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
          >
            Back to Home
          </Link>
        </div>

        {/* Help links */}
        <div className="flex items-center justify-center gap-6 mt-10">
          {[
            { label: "Login", href: "/login" },
            { label: "Sign Up", href: "/signup" },
            { label: "Pricing", href: "/#pricing" },
          ].map((link, i) => (
            <Link
              key={i}
              href={link.href}
              className="text-white/30 hover:text-white/60 text-sm transition-colors duration-200 no-underline"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {link.label}
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}