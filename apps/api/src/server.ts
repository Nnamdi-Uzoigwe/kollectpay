import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./features/auth/auth.routes";
import debtorRoutes from "./features/debtors/debtors.routes";
import reminderRoutes from "./features/reminders/reminders.routes";
import messageRoutes from "./features/messages/messages.routes";
import billingRoutes from "./features/billing/billing.routes";
import settingsRoutes from "./features/settings/settings.routes";
import adminRoutes from "./features/admin/admin.routes";
import { startScheduler } from "./features/reminders/reminders.scheduler";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/debtors", debtorRoutes);
app.use("/api/reminders", reminderRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/billing", billingRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/admin", adminRoutes);

// Start the cron scheduler
startScheduler();

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "KollectPay API is running ✅" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});