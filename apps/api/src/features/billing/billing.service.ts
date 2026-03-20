import axios from "axios";
import { db } from "../../shared/db/index";
import { subscriptions, users } from "../../shared/db/schema";
import { eq } from "drizzle-orm";

const PAYSTACK_BASE = "https://api.paystack.co";
const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY!;

const paystackHeaders = {
  Authorization: `Bearer ${PAYSTACK_SECRET}`,
  "Content-Type": "application/json",
};

// Plan amounts in kobo (Paystack uses kobo)
export const PLAN_AMOUNTS = {
  STARTER: 500000,   // ₦5,000
  GROWTH: 1200000,   // ₦12,000
  PRO: 2500000,      // ₦25,000
};

export const PLAN_CODES: Record<string, string> = {
  STARTER: "starter_monthly",
  GROWTH: "growth_monthly",
  PRO: "pro_monthly",
};

// Initialize a transaction
export const initializePayment = async (
  userId: string,
  email: string,
  plan: "STARTER" | "GROWTH" | "PRO"
) => {
  const amount = PLAN_AMOUNTS[plan];

  const response = await axios.post(
    `${PAYSTACK_BASE}/transaction/initialize`,
    {
      email,
      amount,
      currency: "NGN",
      metadata: {
        userId,
        plan,
        custom_fields: [
          {
            display_name: "Plan",
            variable_name: "plan",
            value: plan,
          },
        ],
      },
      callback_url: `${process.env.FRONTEND_URL}/billing/verify`,
    },
    { headers: paystackHeaders }
  );

  return response.data.data;
};

// Verify a transaction
export const verifyPayment = async (reference: string) => {
  const response = await axios.get(
    `${PAYSTACK_BASE}/transaction/verify/${reference}`,
    { headers: paystackHeaders }
  );

  return response.data.data;
};

// Get or create subscription record
export const getSubscription = async (userId: string) => {
  const [sub] = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.userId, userId))
    .limit(1);

  return sub || null;
};

// Activate subscription after payment
export const activateSubscription = async (
  userId: string,
  plan: "STARTER" | "GROWTH" | "PRO",
  paystackReference: string
) => {
  const now = new Date();
  const periodEnd = new Date();
  periodEnd.setMonth(periodEnd.getMonth() + 1);

  // Check if subscription exists
  const existing = await getSubscription(userId);

  if (existing) {
    // Update existing
    await db
      .update(subscriptions)
      .set({
        plan,
        status: "ACTIVE",
        paystackSubCode: paystackReference,
        currentPeriodStart: now,
        currentPeriodEnd: periodEnd,
        updatedAt: new Date(),
      })
      .where(eq(subscriptions.userId, userId));
  } else {
    // Create new
    await db.insert(subscriptions).values({
      userId,
      plan,
      status: "ACTIVE",
      paystackSubCode: paystackReference,
      currentPeriodStart: now,
      currentPeriodEnd: periodEnd,
    });
  }

  // Update user plan
  await db
    .update(users)
    .set({ plan, updatedAt: new Date() })
    .where(eq(users.id, userId));

  return { plan, status: "ACTIVE" };
};