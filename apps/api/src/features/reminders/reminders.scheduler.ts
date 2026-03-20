import cron from "node-cron";
import { processReminders } from "./reminders.service";

export const startScheduler = () => {
  // Run every day at 9am Nigeria time
  cron.schedule(
    "0 9 * * *",
    async () => {
      console.log("🕘 9AM — Starting daily reminder run...");
      await processReminders();
    },
    { timezone: "Africa/Lagos" }
  );

  console.log("✅ Reminder scheduler started — runs daily at 9AM WAT");
};