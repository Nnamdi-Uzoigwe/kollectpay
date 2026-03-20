import Link from "next/link";

export default function PrivacyPage() {
  const lastUpdated = "March 2026";

  const sections = [
    {
      title: "1. Information We Collect",
      content: `When you create a KollectPay account, we collect your business name, email address, phone number, and password (stored as an encrypted hash). When you add debtors to the platform, we collect their names, phone numbers, amounts owed, and due dates. We also collect information about how you use the platform, including messages sent, reminder settings, and subscription details.`,
    },
    {
      title: "2. How We Use Your Information",
      content: `We use your information to provide and improve the KollectPay service, process your subscription payments through Paystack, send automated reminder messages to your debtors on your behalf, send you important account notifications and updates, respond to your support requests, and enforce our Terms of Service.`,
    },
    {
      title: "3. Your Debtors' Information",
      content: `The personal information of your debtors — including their names and phone numbers — is used exclusively to send payment reminders on your behalf. We do not use this data for advertising, sell it to third parties, or share it with anyone other than the messaging service (Termii) required to deliver the reminders. Your debtors' data is private to your account only.`,
    },
    {
      title: "4. Data Sharing",
      content: `We do not sell your personal data or your debtors' data to any third party. We share data only with service providers necessary to operate KollectPay: Termii (SMS and WhatsApp delivery), Paystack (payment processing), Supabase (secure database hosting), and Resend (transactional emails). All service providers are bound by data protection agreements.`,
    },
    {
      title: "5. Data Security",
      content: `All data transmitted to and from KollectPay is encrypted using industry-standard TLS encryption. Passwords are hashed using bcrypt and are never stored in plain text. Access to your account data requires authentication with your email and password. We regularly review our security practices to protect your information.`,
    },
    {
      title: "6. Data Retention",
      content: `We retain your account data and debtor records for as long as your account is active. If you delete your account, all your data including debtor records, message logs, and subscription information is permanently deleted from our systems within 30 days. Message logs may be retained for a shorter period for compliance purposes.`,
    },
    {
      title: "7. Your Rights",
      content: `You have the right to access the personal data we hold about you, request correction of inaccurate data, request deletion of your account and all associated data, export your debtor data as a CSV file, and opt out of non-essential communications. To exercise any of these rights, contact us at support@kollectpay.com.`,
    },
    {
      title: "8. Cookies",
      content: `KollectPay uses minimal cookies and local storage to keep you logged in and remember your preferences. We do not use tracking cookies or share cookie data with advertisers. You can clear cookies at any time through your browser settings, though this will log you out of your account.`,
    },
    {
      title: "9. Children's Privacy",
      content: `KollectPay is intended for use by business owners and is not directed at children under the age of 18. We do not knowingly collect personal information from minors. If you believe a minor has created an account, please contact us immediately.`,
    },
    {
      title: "10. Changes to This Policy",
      content: `We may update this Privacy Policy from time to time. We will notify you of significant changes by email or through a notice on the platform. Continued use of KollectPay after changes are made constitutes acceptance of the updated policy.`,
    },
    {
      title: "11. Contact Us",
      content: `If you have any questions, concerns, or requests regarding this Privacy Policy or how we handle your data, please contact our team at support@kollectpay.com. We aim to respond to all privacy-related inquiries within 48 hours on business days.`,
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
            Privacy Policy
          </h1>
          <p className="text-white/50 text-base" style={{ fontFamily: "var(--font-inter)" }}>
            Last updated: {lastUpdated}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-16">

        {/* Intro */}
        <div className="bg-[#84CC16]/5 border border-[#84CC16]/20 rounded-2xl px-6 py-5 mb-10">
          <p className="text-gray-700 text-[15px] leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
            At KollectPay, we take your privacy seriously. This policy explains what data we collect, how we use it, and how we protect it. We believe in full transparency — no hidden tracking, no selling your data.
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
          <Link href="/terms" className="text-gray-400 hover:text-[#7C3AED] text-sm transition-colors no-underline" style={{ fontFamily: "var(--font-inter)" }}>
            Terms of Service
          </Link>
          <Link href="/signup" className="text-[#7C3AED] font-semibold text-sm hover:underline no-underline" style={{ fontFamily: "var(--font-inter)" }}>
            Create Account →
          </Link>
        </div>
      </div>
    </div>
  );
}