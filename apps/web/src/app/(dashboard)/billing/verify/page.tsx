// apps/web/src/app/(dashboard)/billing/verify/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import api from "@/shared/lib/axios";

export default function BillingVerifyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    const reference = searchParams.get("reference");
    if (!reference) { router.push("/billing"); return; }

    api.get(`/api/billing/verify?reference=${reference}`)
      .then(({ data }) => {
        // Update localStorage user plan
        const user = JSON.parse(localStorage.getItem("kollectpay_user") || "{}");
        user.plan = data.data.plan;
        localStorage.setItem("kollectpay_user", JSON.stringify(user));
        setStatus("success");
        setTimeout(() => router.push("/billing"), 3000);
      })
      .catch(() => setStatus("error"));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-3xl p-12 text-center shadow-xl max-w-md w-full">
        {status === "loading" && (
          <>
            <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
              <svg className="animate-spin text-[#7C3AED]" width="32" height="32" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeDashoffset="12" />
              </svg>
            </div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-2" style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}>Verifying payment...</h2>
            <p className="text-gray-400 text-sm" style={{ fontFamily: "var(--font-inter)" }}>Please wait while we confirm your payment.</p>
          </>
        )}
        {status === "success" && (
          <>
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-2" style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}>Payment Successful!</h2>
            <p className="text-gray-400 text-sm" style={{ fontFamily: "var(--font-inter)" }}>Your plan has been upgraded. Redirecting...</p>
          </>
        )}
        {status === "error" && (
          <>
            <div className="text-5xl mb-4">❌</div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-2" style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}>Payment Failed</h2>
            <p className="text-gray-400 text-sm mb-4" style={{ fontFamily: "var(--font-inter)" }}>Something went wrong. Please try again.</p>
            <button onClick={() => router.push("/billing")} className="text-[#7C3AED] font-semibold text-sm border-none bg-transparent cursor-pointer">
              Back to Billing
            </button>
          </>
        )}
      </div>
    </div>
  );
}