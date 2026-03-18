import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/shared/components/Navbar";
import Footer from "@/shared/components/Footer";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "KollectPay | Get Paid. On Time. Every Time.",
  description:
    "KollectPay helps Nigerian business owners automatically send SMS and WhatsApp reminders to debtors until they pay. Never chase a payment manually again.",
  keywords: [
    "debt reminder Nigeria",
    "payment reminder app",
    "SMS reminder Nigeria",
    "WhatsApp payment reminder",
    "Nigerian SME tools",
    "KollectPay",
  ],
  authors: [{ name: "KollectPay" }],
  creator: "KollectPay",
  metadataBase: new URL("https://kollectpay.com"),
  openGraph: {
    title: "KollectPay | Get Paid. On Time. Every Time.",
    description:
      "Automatically remind your debtors via SMS and WhatsApp until they pay. Built for Nigerian business owners.",
    url: "https://kollectpay.com",
    siteName: "KollectPay",
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KollectPay | Get Paid. On Time. Every Time.",
    description:
      "Automatically remind your debtors via SMS and WhatsApp until they pay.",
    creator: "@kollectpay",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakartaSans.variable} ${inter.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}