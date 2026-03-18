"use client";

import { useState } from "react";

type Channel = "sms" | "whatsapp";
type Stage = "idle" | "loading" | "sent" | "error";

export default function TryItFree() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [channel, setChannel] = useState<Channel>("whatsapp");
  const [stage, setStage] = useState<Stage>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const isValid = name.trim().length >= 2 && phone.trim().length >= 10;

  const handleSend = async () => {
    if (!isValid) return;
    setStage("loading");
    setErrorMsg("");

    // TODO: wire up to real Termii API call via your backend
    // POST /api/reminders/test  { name, phone, channel }
    await new Promise((r) => setTimeout(r, 2000)); // simulated delay

    // Simulated success — replace with real API call
    const success = true;
    if (success) {
      setStage("sent");
    } else {
      setStage("error");
      setErrorMsg("Message failed to send. Please check the number and try again.");
    }
  };

  const handleReset = () => {
    setStage("idle");
    setName("");
    setPhone("");
    setChannel("whatsapp");
    setErrorMsg("");
  };

  return (
    <section id="try-it-free" className="py-24 bg-white overflow-hidden relative">

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-125 bg-[#7C3AED]/4 blur-3xl rounded-full" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT — Copy */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[#84CC16]/10 border border-[#84CC16]/25 rounded-full px-4 py-1.5 mb-6">
              <span className="text-sm">⚡</span>
              <span
                className="text-[#65A30D] text-sm font-semibold"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Free — no account needed
              </span>
            </div>

            <h2
              className="text-[40px] lg:text-[48px] font-extrabold leading-[1.1] tracking-[-1.5px] text-gray-900 mb-5"
              style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
            >
              See it work on{" "}
              <span className="text-[#7C3AED]">your phone.</span>
              <br />
              Right now.
            </h2>

            <p
              className="text-lg text-gray-500 leading-relaxed mb-8"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Enter your name and phone number. We'll send you a real sample reminder message — exactly what your debtors will receive — so you can judge for yourself.
            </p>

            {/* Trust points */}
            <div className="flex flex-col gap-3">
              {[
                "One free test per visit — no spam",
                "Your number is never saved or shared",
                "Real message, real delivery — not a simulation",
              ].map((point, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#84CC16]/15 flex items-center justify-center shrink-0">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17l-5-5" stroke="#65A30D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span
                    className="text-gray-600 text-sm font-medium"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Form Card */}
          <div className="relative">

            {/* Glow */}
            <div className="absolute inset-4 bg-[#7C3AED]/10 blur-2xl rounded-3xl" />

            <div className="relative bg-white border border-gray-100 rounded-3xl shadow-2xl shadow-purple-100/60 p-8">

              {/* Sent state */}
              {stage === "sent" ? (
                <div className="flex flex-col items-center text-center py-6">
                  <div className="w-20 h-20 rounded-full bg-[#84CC16]/15 flex items-center justify-center mb-6">
                    <span className="text-4xl">🎉</span>
                  </div>
                  <h3
                    className="text-2xl font-extrabold text-gray-900 mb-3"
                    style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                  >
                    Message Sent!
                  </h3>
                  <p
                    className="text-gray-500 text-[15px] leading-relaxed mb-3"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Check your {channel === "whatsapp" ? "WhatsApp" : "SMS"} — a reminder message is on its way to{" "}
                    <span className="font-semibold text-gray-700">{phone}</span>.
                  </p>
                  <p
                    className="text-[#7C3AED] text-sm font-semibold mb-8"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    That's exactly what your debtors will receive. 👆
                  </p>
                  <a
                    href="/signup"
                    className="w-full flex items-center justify-center gap-2 text-white font-bold text-base px-6 py-4 rounded-xl bg-linear-to-r from-[#7C3AED] to-[#9D5CF6] shadow-lg shadow-purple-300/40 hover:-translate-y-0.5 transition-all duration-200 no-underline mb-3"
                    style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                  >
                    Start Using KollectPay Free
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M12 5l7 7-7 7" stroke="#84CC16" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                  <button
                    onClick={handleReset}
                    className="text-sm text-gray-400 hover:text-gray-600 transition-colors duration-200 bg-transparent border-none cursor-pointer"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Send another test
                  </button>
                </div>
              ) : (
                <>
                  {/* Form header */}
                  <div className="mb-7">
                    <h3
                      className="text-xl font-extrabold text-gray-900 mb-1"
                      style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                    >
                      Send a Free Test Message
                    </h3>
                    <p
                      className="text-gray-400 text-sm"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      Takes 10 seconds. Receive a real reminder on your phone.
                    </p>
                  </div>

                  {/* Channel toggle */}
                  <div className="mb-6">
                    <label
                      className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      Send via
                    </label>
                    <div className="grid grid-cols-2 gap-2 bg-gray-100 rounded-xl p-1">
                      {(["whatsapp", "sms"] as Channel[]).map((c) => (
                        <button
                          key={c}
                          onClick={() => setChannel(c)}
                          className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-semibold text-sm transition-all duration-200 border-none cursor-pointer ${
                            channel === c
                              ? "bg-white shadow-sm text-gray-800"
                              : "bg-transparent text-gray-400 hover:text-gray-600"
                          }`}
                          style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                        >
                          {c === "whatsapp" ? (
                            <>
                              <svg width="15" height="15" viewBox="0 0 24 24" fill={channel === c ? "#25D366" : "currentColor"}>
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                              </svg>
                              WhatsApp
                            </>
                          ) : (
                            <>
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.01 1.17 2 2 0 012 .01h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                              SMS
                            </>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name field */}
                  <div className="mb-4">
                    <label
                      className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      Your First Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Chidi"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10 outline-none text-gray-800 text-[15px] transition-all duration-200 placeholder:text-gray-300"
                      style={{ fontFamily: "var(--font-inter)" }}
                    />
                  </div>

                  {/* Phone field */}
                  <div className="mb-6">
                    <label
                      className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      Your Phone Number
                    </label>
                    <div className="flex gap-2">
                      <div className="flex items-center gap-2 px-3 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-500 whitespace-nowrap" style={{ fontFamily: "var(--font-inter)" }}>
                        🇳🇬 +234
                      </div>
                      <input
                        type="tel"
                        placeholder="0801 234 5678"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10 outline-none text-gray-800 text-[15px] transition-all duration-200 placeholder:text-gray-300"
                        style={{ fontFamily: "var(--font-inter)" }}
                      />
                    </div>
                  </div>

                  {/* Error */}
                  {stage === "error" && (
                    <div className="mb-4 flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="#EF4444" strokeWidth="2" />
                        <line x1="12" y1="8" x2="12" y2="12" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
                        <line x1="12" y1="16" x2="12.01" y2="16" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                      <p className="text-red-500 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
                        {errorMsg}
                      </p>
                    </div>
                  )}

                  {/* Submit button */}
                  <button
                    onClick={handleSend}
                    disabled={!isValid || stage === "loading"}
                    className={`w-full flex items-center justify-center gap-2 text-white font-bold text-base px-6 py-4 rounded-xl transition-all duration-200 border-none cursor-pointer ${
                      isValid && stage !== "loading"
                        ? "bg-linear-to-r from-[#7C3AED] to-[#9D5CF6] shadow-lg shadow-purple-300/40 hover:-translate-y-0.5 hover:shadow-xl"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                    }`}
                    style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                  >
                    {stage === "loading" ? (
                      <>
                        <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeDashoffset="12" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Me a Free Test Message
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M5 12h14M12 5l7 7-7 7" stroke="#84CC16" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </>
                    )}
                  </button>

                  {/* Fine print */}
                  <p
                    className="text-center text-gray-400 text-xs mt-4"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    One free test per visit. We will never spam or save your number.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}