import { db } from "../../shared/db/index";
import { debtors, messages, reminderSettings, users } from "../../shared/db/schema";
import { eq, and, ne } from "drizzle-orm";
import { sendSMS } from "../../notifications/sms.service";
import { getSMSTemplate } from "../../notifications/templates";

export const processReminders = async () => {
  console.log("⏰ Running reminder scheduler...");

  try {
    // Get all active reminder settings for non-paid debtors
    const activeReminders = await db
      .select({
        setting: reminderSettings,
        debtor: debtors,
        user: users,
      })
      .from(reminderSettings)
      .innerJoin(debtors, eq(reminderSettings.debtorId, debtors.id))
      .innerJoin(users, eq(reminderSettings.userId, users.id))
      .where(
        and(
          eq(reminderSettings.isActive, true),
          ne(debtors.status, "PAID")
        )
      );

    console.log(`Found ${activeReminders.length} active reminders to process`);

    for (const { setting, debtor, user } of activeReminders) {
      // Check if it's time to send based on frequency
      const shouldSend = checkFrequency(setting.lastSentAt, setting.frequency);
      if (!shouldSend) continue;

      const reminderCount = parseInt(setting.reminderCount) + 1;

      const message = getSMSTemplate(
        {
          businessName: user.businessName,
          debtorName: debtor.name,
          amount: debtor.amount,
          dueDate: debtor.dueDate.toISOString(),
        },
        reminderCount
      );

      // Send SMS
      const result = await sendSMS({ to: debtor.phone, message });

      // Log the message
      await db.insert(messages).values({
        channel: "SMS",
        status: result.success ? "SENT" : "FAILED",
        body: message,
        userId: user.id,
        debtorId: debtor.id,
      });

      // Update reminder settings
      await db
        .update(reminderSettings)
        .set({
          lastSentAt: new Date(),
          reminderCount: reminderCount.toString(),
          updatedAt: new Date(),
        })
        .where(eq(reminderSettings.id, setting.id));

      console.log(
        `${result.success ? "✅" : "❌"} Reminder sent to ${debtor.name} (${debtor.phone})`
      );
    }
  } catch (error) {
    console.error("Scheduler error:", error);
  }
};

const checkFrequency = (
  lastSentAt: Date | null,
  frequency: string
): boolean => {
  if (!lastSentAt) return true; // Never sent before — send now

  const now = new Date();
  const diffMs = now.getTime() - lastSentAt.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);

  if (frequency === "DAILY") return diffHours >= 24;
  if (frequency === "EVERY_2_DAYS") return diffHours >= 48;
  if (frequency === "WEEKLY") return diffHours >= 168;

  return false;
};

export const createReminderSetting = async (
  userId: string,
  debtorId: string,
  frequency: string = "DAILY",
  channel: "SMS" | "WHATSAPP" = "SMS"
) => {
  // Check if setting already exists
  const existing = await db
    .select()
    .from(reminderSettings)
    .where(eq(reminderSettings.debtorId, debtorId))
    .limit(1);

  if (existing.length > 0) {
    // Update existing
    const [updated] = await db
      .update(reminderSettings)
      .set({ frequency, channel, isActive: true, updatedAt: new Date() })
      .where(eq(reminderSettings.debtorId, debtorId))
      .returning();
    return updated;
  }

  // Create new
  const [setting] = await db
    .insert(reminderSettings)
    .values({ debtorId, userId, frequency, channel })
    .returning();

  return setting;
};

export const getReminderSetting = async (debtorId: string) => {
  const [setting] = await db
    .select()
    .from(reminderSettings)
    .where(eq(reminderSettings.debtorId, debtorId))
    .limit(1);
  return setting || null;
};