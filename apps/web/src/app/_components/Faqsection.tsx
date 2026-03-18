"use client";

import { useState } from "react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How does KollectPay send messages on my behalf?",
      answer:
        "KollectPay integrates with Termii — a Nigerian messaging provider — to send SMS and WhatsApp messages using your business name as the sender. Your debtors will see your business name on every message, not 'KollectPay'. It looks and feels like you sent it personally.",
    },
    {
      question: "What if my debtor doesn't have WhatsApp?",
      answer:
        "No problem at all. You can choose SMS-only for any debtor, or enable both SMS and WhatsApp reminders simultaneously. SMS works on every phone and every Nigerian network — MTN, Airtel, Glo, 9mobile — no smartphone required on your debtor's end.",
    },
    {
      question: "Can I customise the message my debtors receive?",
      answer:
        "Yes, on the Growth and Pro plans you can fully customise your message templates. You can set a friendly tone for early reminders and a firmer tone as the due date passes. On the Starter plan, you get professionally written default templates that are proven to get responses.",
    },
    {
      question: "What happens when a debtor pays?",
      answer:
        "You simply open their profile in your dashboard and tap 'Mark as Paid'. KollectPay immediately stops all reminders to that debtor. You can also add a note about the payment for your records. The debtor's history stays in your logs so you always have a paper trail.",
    },
    {
      question: "Is my data and my customers' data safe?",
      answer:
        "Absolutely. All data is encrypted in transit and at rest. We never sell, share, or use your customer data for any purpose other than sending the reminders you configure. Your debtor list is private to your account only. We are fully compliant with Nigerian data privacy standards.",
    },
    {
      question: "What happens if I reach my plan's message limit?",
      answer:
        "KollectPay will notify you when you're approaching your weekly message quota. Once you hit the limit, reminders pause automatically until the next week begins or until you upgrade your plan. You're never charged extra — your plan limit is a hard cap, not a trigger for surprise fees.",
    },
    {
      question: "Can I try before I pay?",
      answer:
        "Yes — scroll up to the 'Try It Free' section and enter your name and phone number. We'll send you a real sample reminder message right now, completely free. No account needed. You'll see exactly what your debtors will receive before spending a kobo.",
    },
    {
      question: "How do I pay for my subscription?",
      answer:
        "All subscriptions are processed securely through Paystack — Nigeria's most trusted payment platform. You can pay with any Nigerian debit card, bank transfer, or USSD. Billing is in Naira only, and you'll receive a receipt after every payment.",
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer:
        "Yes, absolutely. You can cancel your subscription at any time from your billing settings. You'll continue to have access until the end of your current billing period. No cancellation fees, no questions asked.",
    },
    {
      question: "Do you have a plan for large businesses or agencies?",
      answer:
        "Our Pro plan covers unlimited debtors and unlimited messages per week, which handles most large businesses comfortably. If you're an agency or financial institution managing debt recovery at enterprise scale, contact us directly at support@kollectpay.com to discuss a custom arrangement.",
    },
  ];

  return (
    <section id="faq" className="py-24 bg-white overflow-hidden relative">

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[400px] h-[600px] bg-[#7C3AED]/4 blur-3xl rounded-full" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-5 gap-16 items-start">

          {/* LEFT — sticky header */}
          <div className="lg:col-span-2 lg:sticky lg:top-32">
            <div className="inline-flex items-center gap-2 bg-[#7C3AED]/8 border border-[#7C3AED]/20 rounded-full px-4 py-1.5 mb-6">
              <span className="text-sm">🤔</span>
              <span
                className="text-[#7C3AED] text-sm font-semibold"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Got questions?
              </span>
            </div>

            <h2
              className="text-[36px] lg:text-[42px] font-extrabold leading-[1.1] tracking-[-1.5px] text-gray-900 mb-5"
              style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
            >
              Everything you{" "}
              <span className="text-[#7C3AED]">need to know.</span>
            </h2>

            <p
              className="text-gray-500 text-base leading-relaxed mb-8"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Can't find the answer you're looking for? Reach us directly on WhatsApp — we typically respond within the hour.
            </p>

            <a
              href="https://wa.me/2348000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-all duration-200 no-underline hover:-translate-y-0.5 shadow-lg shadow-green-300/30"
              style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat With Us on WhatsApp
            </a>
          </div>

          {/* RIGHT — Accordion */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  openIndex === i
                    ? "border-[#7C3AED]/30 shadow-lg shadow-purple-100/50"
                    : "border-gray-100 hover:border-gray-200"
                }`}
              >
                {/* Question */}
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className={`w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-all duration-200 border-none cursor-pointer ${
                    openIndex === i ? "bg-[#7C3AED]/4" : "bg-white hover:bg-gray-50"
                  }`}
                >
                  <span
                    className={`font-semibold text-[15px] leading-snug transition-colors duration-200 ${
                      openIndex === i ? "text-[#7C3AED]" : "text-gray-800"
                    }`}
                    style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                  >
                    {faq.question}
                  </span>

                  {/* Plus / Minus icon */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      openIndex === i
                        ? "bg-[#7C3AED] rotate-45"
                        : "bg-gray-100"
                    }`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 5v14M5 12h14"
                        stroke={openIndex === i ? "white" : "#9CA3AF"}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </button>

                {/* Answer */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === i ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="px-6 pb-6 pt-1">
                    <p
                      className="text-gray-500 text-[15px] leading-relaxed"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}