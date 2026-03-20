import Link from "next/link";

export default function TermsPage() {
  const lastUpdated = "March 2026";

  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: `By creating an account on KollectPay, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform. These terms apply to all users of KollectPay, including business owners and administrators.`,
    },
    {
      title: "2. Description of Service",
      content: `KollectPay is a debt reminder platform that helps Nigerian business owners send automated SMS and WhatsApp payment reminders to their customers (debtors). We do not act as a debt collection agency, financial institution, or legal representative. We simply provide tools to help you communicate with people who owe you money.`,
    },
    {
      title: "3. User Accounts",
      content: `You are responsible for maintaining the confidentiality of your account credentials. You must provide accurate and complete information when creating your account, including your business name, email address, and phone number. You are responsible for all activity that occurs under your account. KollectPay reserves the right to suspend or terminate accounts that violate these terms.`,
    },
    {
      title: "4. Acceptable Use",
      content: `You may only use KollectPay to send reminders to individuals who genuinely owe you money from legitimate business transactions. You must not use KollectPay to harass, threaten, or intimidate debtors. You must not send false or misleading messages. You must not use the platform to contact individuals who have not had a genuine business relationship with you. Violation of these rules may result in immediate account suspension.`,
    },
    {
      title: "5. Subscription and Billing",
      content: `KollectPay offers paid subscription plans billed monthly in Nigerian Naira (NGN). Payments are processed securely through Paystack. Subscriptions automatically renew each month unless cancelled. You may cancel your subscription at any time from your billing settings. No refunds are issued for partial months. Plan limits (active debtors and monthly messages) are enforced as described on our pricing page.`,
    },
    {
      title: "6. Message Delivery",
      content: `KollectPay uses third-party messaging providers (including Termii) to deliver SMS and WhatsApp messages. While we make every effort to ensure reliable delivery, we cannot guarantee 100% message delivery due to factors outside our control, including network issues, blocked numbers, and carrier restrictions. Message delivery status is shown in your logs on a best-effort basis.`,
    },
    {
      title: "7. Data and Privacy",
      content: `The personal information of your debtors that you enter into KollectPay (names, phone numbers, amounts owed) is used solely for the purpose of sending reminders on your behalf. We do not sell, share, or use this data for any other purpose. Please refer to our Privacy Policy for full details on how we handle data.`,
    },
    {
      title: "8. Intellectual Property",
      content: `All content, features, and functionality of KollectPay — including its design, code, logos, and text — are the exclusive property of KollectPay and are protected by applicable intellectual property laws. You may not copy, reproduce, or redistribute any part of the platform without written permission.`,
    },
    {
      title: "9. Limitation of Liability",
      content: `KollectPay is provided on an "as is" basis. We make no warranties, expressed or implied, about the reliability, accuracy, or availability of the service. In no event shall KollectPay be liable for any indirect, incidental, or consequential damages arising from your use of the platform, including any failure to collect debts through our service.`,
    },
    {
      title: "10. Changes to Terms",
      content: `We reserve the right to modify these terms at any time. We will notify users of significant changes via email or a notice on the platform. Continued use of KollectPay after changes are made constitutes your acceptance of the new terms.`,
    },
    {
      title: "11. Governing Law",
      content: `These terms are governed by the laws of the Federal Republic of Nigeria. Any disputes arising from these terms or your use of KollectPay shall be subject to the jurisdiction of Nigerian courts.`,
    },
    {
      title: "12. Contact Us",
      content: `If you have any questions about these Terms of Service, please contact us at support@kollectpay.com or via WhatsApp at our support number listed on the website.`,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-[#0F0A1E] py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-[#7C3AED]/15 blur-3xl rounded-full" />
        </div>
        <div className="relative max-w-3xl mx-auto text-center">
          <Link href="/" className="inline-flex items-center gap-2.5 no-underline mb-8">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-[#7C3AED] to-[#9D5CF6] flex items-center justify-center">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#84CC16" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="font-extrabold text-lg text-white tracking-tight" style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}>
              Kollect<span className="text-[#84CC16]">Pay</span>
            </span>
          </Link>
          <h1
            className="text-4xl font-extrabold text-white tracking-tight mb-3"
            style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
          >
            Terms of Service
          </h1>
          <p className="text-white/50 text-base" style={{ fontFamily: "var(--font-inter)" }}>
            Last updated: {lastUpdated}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-16">

        {/* Intro */}
        <div className="bg-[#7C3AED]/5 border border-[#7C3AED]/15 rounded-2xl px-6 py-5 mb-10">
          <p className="text-gray-700 text-[15px] leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
            Please read these Terms of Service carefully before using KollectPay. These terms govern your use of our platform and services. By using KollectPay, you agree to these terms.
          </p>
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-8">
          {sections.map((section, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-2xl px-7 py-6">
              <h2
                className="text-lg font-bold text-gray-900 mb-3"
                style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
              >
                {section.title}
              </h2>
              <p
                className="text-gray-600 text-[15px] leading-relaxed"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {/* Footer links */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-12 pt-8 border-t border-gray-200">
          <Link href="/" className="text-gray-400 hover:text-[#7C3AED] text-sm transition-colors no-underline" style={{ fontFamily: "var(--font-inter)" }}>
            ← Back to Home
          </Link>
          <Link href="/privacy" className="text-gray-400 hover:text-[#7C3AED] text-sm transition-colors no-underline" style={{ fontFamily: "var(--font-inter)" }}>
            Privacy Policy
          </Link>
          <Link href="/signup" className="text-[#7C3AED] font-semibold text-sm hover:underline no-underline" style={{ fontFamily: "var(--font-inter)" }}>
            Create Account →
          </Link>
        </div>
      </div>
    </div>
  );
}