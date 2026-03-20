import { db } from "../db/index";
import { usageLogs, users } from "../db/schema";
import { eq, and } from "drizzle-orm";

// Plan limits
export const PLAN_LIMITS = {
  STARTER: { activeDebtors: 10, monthlyMessages: 100 },
  GROWTH:  { activeDebtors: 20, monthlyMessages: 300 },
  PRO:     { activeDebtors: 30, monthlyMessages: 700 },
};

// Get current month string e.g. "2026-03"
export const getCurrentMonth = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
};

// Get or create usage log for current month
export const getOrCreateUsageLog = async (userId: string) => {
  const month = getCurrentMonth();

  const [existing] = await db
    .select()
    .from(usageLogs)
    .where(
      and(
        eq(usageLogs.userId, userId),
        eq(usageLogs.month, month)
      )
    )
    .limit(1);

  if (existing) return existing;

  // Create new log for this month
  const [created] = await db
    .insert(usageLogs)
    .values({ userId, month, messagesSent: 0 })
    .returning();

  return created;
};

// Check if user can send more messages this month
export const canSendMessage = async (userId: string, userPlan: string): Promise<boolean> => {
  const limits = PLAN_LIMITS[userPlan as keyof typeof PLAN_LIMITS] || PLAN_LIMITS.STARTER;
  const usage = await getOrCreateUsageLog(userId);
  return usage.messagesSent < limits.monthlyMessages;
};

// Increment message count after sending
export const incrementMessageCount = async (userId: string) => {
  const month = getCurrentMonth();
  const usage = await getOrCreateUsageLog(userId);

  await db
    .update(usageLogs)
    .set({
      messagesSent: usage.messagesSent + 1,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(usageLogs.userId, userId),
        eq(usageLogs.month, month)
      )
    );
};

// Get full usage summary for a user
export const getUsageSummary = async (userId: string, userPlan: string) => {
  const limits = PLAN_LIMITS[userPlan as keyof typeof PLAN_LIMITS] || PLAN_LIMITS.STARTER;
  const usage = await getOrCreateUsageLog(userId);

  return {
    month: usage.month,
    messagesSent: usage.messagesSent,
    messagesLimit: limits.monthlyMessages,
    messagesRemaining: Math.max(0, limits.monthlyMessages - usage.messagesSent),
    activeDebtorLimit: limits.activeDebtors,
    percentageUsed: Math.round((usage.messagesSent / limits.monthlyMessages) * 100),
  };
};